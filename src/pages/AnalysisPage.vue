<template>
    <PageHeader />
    <div class="heading">
        <h4>Сравнение значений по годам в разрезе ОПОП</h4>
    </div>

    <div class="filter">
        <div class="filter-item">
            <label>ОПОП</label>
            <select class="input-simple" v-model="opopId">
                <option v-for="opop in opops" :key="opop" :value="opop.id">{{ opop.name }}</option>
            </select>
        </div>
        <div class="filter-item">
            <label>Дата начала периода</label>
            <input class="input-simple" type="date" v-model="dateStart">
        </div>
        <div class="filter-item">
            <label>Дата окончания периода</label>
            <input class="input-simple" type="date" v-model="dateEnd">
        </div>
    </div>

    <div class="btn-bar">
        <div class="btn">
            <button class="btn-simple" @click="findCalculationsByPeriod()">Сформировать</button>
        </div>
        <div class="btn">
            <button class="btn-simple" @click="saveReport()">Сохранить</button>
        </div>
    </div>

    <div class="result">
        <table hidden="true">
            <thead>
                <tr>
                    <td>Наименование показателя</td>
                    <td>Обозначение показателя</td>
                    <td>Дата мониторинга</td>
                    <td>Значение</td>
                    <td>Баллы</td>
                    <td>Планирование</td>
                </tr>
            </thead>
            <tbody v-if="calculations.length != 0">
                <tr v-for=" calculation in calculations" :key="calculation">
                    <td>
                        <div class="text">{{ calculation.indicatorName }}</div>
                    </td>
                    <td>{{ calculation.id.indicatorKey }}</td>
                    <td>{{ calculation.id.date }}</td>
                    <td>{{ calculation.value }}</td>
                    <td>{{ calculation.score }}</td>
                    <td>{{ calculation.planned }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="chart-list" v-if="showCharts === true">
        <LineChart :data="this.chartData" :options="this.chartOptions" />
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import LineChart from '@/components/LineChart.vue'
import CalculationService from '@/services/CalculationService'
import OpopService from '@/services/OpopService'

export default {
    name: "AnalysisPage",
    components: {
        PageHeader,
        LineChart
    },
    data() {
        return {
            calculations: [],
            dateStart: '',
            dateEnd: '',
            opopId: '',
            showCharts: false,

            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Сравнение значений показателей по годам',
                        color: 'black',
                        font: { family: 'Century Gothic', size: 20 },
                        padding: 15
                    },
                    legend: {
                        display: true,
                        labels: {
                            font: { family: 'Century Gothic' },
                            boxWidth: 40 /* ширина прямоугольника обозначения */
                        },
                        position: 'bottom'
                    }
                }
            }
        }
    },
    methods: {
        findAllOpops() {
            OpopService.findAllOpops().then(response => {
                if (response.status == 200) {
                    this.opops = response.data
                    this.opopId = this.opops[0].id
                }
            })
        },
        findCalculationsByPeriod() {
            if (this.dateStart <= this.dateEnd) {
                CalculationService.findCalculationsByPeriod(this.opopId, this.dateStart, this.dateEnd).then(response => {
                    if (response.status == 200) {
                        this.calculations = response.data
                        if (this.calculations.length != 0) {
                            this.convertPlannedField()
                            this.generateCharts()
                        }

                    }
                }).catch((ex) => {
                    //alert(ex.response.data)
                    console.log(ex.response.data)
                })
            } else {
                alert("Дата начала периода должна быть меньше даты окончания периода")
            }

        },
        generateCharts() {
            let preparedData = this.prepareDataForIndicatorsByYears()
            this.chartData.labels = preparedData.labels
            preparedData.sets.forEach(set => {
                this.chartData.datasets.push(
                    {                        
                        label: set.key, //АП1                   
                        data: set.values, //баллы

                        tension: 0.2, /* степень изгиба линий */
                        borderWidth: 1, /* толщина линий */
                        pointHoverBorderColor: 'green', /* цвет границ точки при наведении курсора */
                        pointHoverBackgroundColor: 'green', /* цвет точки при наведении курсора */
                        pointHoverRadius: 4, /* радиус точки при наведении */
                        spanGaps: false, /* если зачение отсутствует, линия прерывается */
                        indexAxis: 'x', /* для транспонирования графика указать значение 'y' */
                    }
                )
            })
            this.showCharts = true
        },
        prepareDataForIndicatorsByYears() {
            //let preparedData = [{labels: [], sets: [{label: '', data: []}]}]
            let dates = []
            let dataDictionary = {} //<IndicatorKey, [values]>
            this.calculations.forEach(calculation => {
                dates.push(calculation.id.date);
                let indicatorKey = calculation.id.indicatorKey
                if (indicatorKey in dataDictionary) {
                    let existValues = dataDictionary[indicatorKey] //сохраняем существующие значения
                    existValues.push(calculation.value)
                    dataDictionary[indicatorKey] = existValues
                }
                else {
                    dataDictionary[indicatorKey] = [calculation.value]
                }
            })

            //функция преобразования словаря в массив объектов
            const dictionaryToArrayOfObjects = (dictionary) => {
                return Object.keys(dictionary).map(key => ({
                    key: key,
                    values: dictionary[key]
                }));
            };
            let dataArray = dictionaryToArrayOfObjects(dataDictionary)
            let uniqueDates = [...new Set(dates)]
            
            let preparedData = { labels: uniqueDates, sets: dataArray }
            return preparedData;
        },
        convertPlannedField() {
            this.calculations.forEach((calculation) => {
                if (calculation.planned) {
                    calculation.planned = 'Да'
                } else {
                    calculation.planned = 'Нет'
                }
            })
        },
        saveReport() {
            console.log("Report was saved")
        }
    },
    mounted() {
        this.dateStart = new Date().toJSON().split("T")[0]
        this.dateEnd = new Date().toJSON().split("T")[0]
        this.findAllOpops()
    },
    watch: {
        'date'() {
            this.generateCharts()
        }
    }
};
</script>

<style scoped>
.input-simple {
    padding: 10px;
    outline: none;
    font-size: 11pt;
    font-family: "Century Gothic";
    background-color: #ffffff;
    border: 1px solid;
    border-radius: 10px;
    border-color: #3D3C84;
    margin-bottom: 15px;
    min-width: 300px;
}

.input-simple-variable {
    padding: 10px;
    outline: none;
    font-size: 11pt;
    font-family: "Century Gothic";
    background-color: #ffffff;
    border: 1px solid;
    border-radius: 10px;
    border-color: #3D3C84;
    margin-bottom: 15px;
    margin-right: 10px;
}

label {
    font-size: 11pt;
    margin-bottom: 5px;
    margin-right: 10px;
    color: black;
}

.heading {
    text-align: -webkit-center;
    font-weight: bold;
    margin: 20px 0px;
    color: black;
}

.btn {
    min-width: 300px;
}

.btn-bar {
    display: flex;
    justify-content: space-evenly;
}

thead {
    font-weight: bold;
    text-align: center;
    color: black;
}

table,
td {
    color: black;
    margin: 0px 200px 50px 200px;
}

td {
    padding: 10px 40px;
    border-bottom: 1px solid #3D3C84;
}

.summary-td {
    min-width: 90px;
}

.result {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
}

.btn-bar {
    display: flex;
}

.filter {
    display: flex;
    justify-content: space-evenly;
}

.filter-item {
    display: flex;
    flex-direction: column;
}

h4 {
    font-size: 18pt;
}

.variables-container {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 70px;
    justify-content: space-evenly;
}

.text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 60px;
}

.chart-list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0px 300px;
}
</style>