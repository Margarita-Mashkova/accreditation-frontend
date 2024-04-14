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

    <div id="click-expand"></div>
    <div class="wrap-expand-table" v-if="calculations.length != 0">
        <a href="#close">Свернуть</a><a href="#click-expand">Развернуть</a>
        <table>
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
                <tr v-for="calculation in calculations" :key="calculation">
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
        <a href="#close">Cвернуть</a><a href="#click-expand">Посмотреть весь список</a>
    </div>
    <div class="heading" v-if="calculations.length == 0 && isPerforming">
        <h4 style="margin-top: 150px;">Нет данных для указанного периода</h4>
    </div>

    <div class="filter" v-if="calculations.length != 0 && isPerforming">
        <div class="filter-item">
            <label>Тип графиков</label>
            <select class="input-simple" v-model="chartType">
                <option :value="'Line'">Линейный</option>
                <option :value="'Bar'">Столбчатый</option>
            </select>
        </div>
    </div>

    <!-- График сравнения значений показателей по годам -->
    <div class="chart-list" v-if="showCharts === true && chartType === 'Line'">
        <LineChart :data="this.chartIndicatorsValuesByYearsData" :options="this.chartIndicatorsValuesByYearsOptions" />
    </div>
    <div class="chart-list" v-if="showCharts === true && chartType === 'Bar'">
        <BarChart :data="this.chartIndicatorsValuesByYearsData" :options="this.chartIndicatorsValuesByYearsOptions" />
    </div>

    <!-- График сравнения баллов показателей по годам -->
    <div class="chart-list" v-if="showCharts === true && chartType === 'Line'">
        <LineChart :data="this.chartIndicatorsScoresByYearsData" :options="this.chartIndicatorsScoresByYearsOptions" />
    </div>
    <div class="chart-list" v-if="showCharts === true && chartType === 'Bar'">
        <BarChart :data="this.chartIndicatorsScoresByYearsData" :options="this.chartIndicatorsScoresByYearsOptions" />
    </div>

    <!-- График сравнения суммарного кол-ва баллов по годам -->
    <div class="chart-list" v-if="showCharts === true && chartType === 'Line'">
        <LineChart :data="this.chartScoresByYearsData" :options="this.chartScoresByYearsOptions" />
    </div>
    <div class="chart-list" v-if="showCharts === true && chartType === 'Bar'">
        <BarChart :data="this.chartScoresByYearsData" :options="this.chartScoresByYearsOptions" />
    </div>

    <div class="recommendation-container" v-if="calculations.length != 0 && isPerforming &&
                (recommendationList.middle != '' || recommendationList.low != '')">
        <div class="heading">
            <h4>Рекомендации</h4>
        </div>
        <div class="recommendation">
            <text>Следует обратить внимание на следующие показатели, т.к. на текущий <i><u>{{ this.nowYear }} г.</u></i>
                они имеют
                недостаточно высокий уровень баллов:<br></text>
            <div v-if="recommendationList.middle != ''">
                <text style="color: #ff8f00"><b><u>Средний</u></b></text><text> уровень значений имеют показатели: </text>
                <text><i><b>{{ recommendationList.middle }}</b></i>.</text>
            </div>
            <div v-if="recommendationList.low != ''">
                <text style="color: red"><b><u>Низкий</u></b></text><text> уровень значений имеют показатели: </text>
                <text><i><b>{{ recommendationList.low }}</b></i>.</text>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
import CalculationService from '@/services/CalculationService'
import IndicatorService from '@/services/IndicatorService'
import OpopService from '@/services/OpopService'

export default {
    name: "AnalysisPage",
    components: {
        PageHeader,
        LineChart,
        BarChart
    },
    data() {
        return {
            calculations: [],
            dateStart: '',
            dateEnd: '',
            nowYear: '',
            opopId: '',
            amountIndicators: '',
            chartType: '',
            showCharts: false,
            recommendationList: {},
            isPerforming: false,

            chartIndicatorsValuesByYearsData: {
                labels: [],
                datasets: []
            },
            chartIndicatorsValuesByYearsOptions: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Название графика',
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
                },
            },

            chartIndicatorsScoresByYearsData: {
                labels: [],
                datasets: []
            },
            chartIndicatorsScoresByYearsOptions: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Название графика',
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
                },
            },

            chartScoresByYearsData: {
                labels: [],
                datasets: []
            },
            chartScoresByYearsOptions: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Название графика',
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
            },
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
        findAllIndicators() {
            IndicatorService.findAllIndicators().then(response => {
                if (response.status == 200) {
                    this.amountIndicators = response.data.length
                    let amountYears = this.calculations.length / this.amountIndicators
                    if (amountYears > 1) {
                        this.chartType = 'Line'
                    }
                    else {
                        this.chartType = 'Bar'
                    }
                }
            })
        },
        findCalculationsByPeriod() {
            this.showCharts = false
            this.isPerforming = true
            if (this.dateStart <= this.dateEnd) {
                CalculationService.findCalculationsByPeriod(this.opopId, this.dateStart, this.dateEnd).then(response => {
                    if (response.status == 200) {
                        this.calculations = response.data
                        if (this.calculations.length != 0) {
                            this.findAllIndicators()
                            this.convertPlannedField()
                            this.generateCharts()
                            this.generateRecommendations()
                        }
                    }
                }).catch((ex) => {
                    //alert(ex.response.data)
                    console.log(ex)
                })
            } else {
                alert("Дата начала периода должна быть меньше даты окончания периода")
            }

        },
        generateCharts() {
            this.generateIndicatorsByYearsChart()
            this.generateScoresByYearsChart()
            this.showCharts = true
        },
        generateIndicatorsByYearsChart() {
            // Сравнение значений
            this.chartIndicatorsValuesByYearsData = { labels: [], datasets: [] }
            this.chartIndicatorsValuesByYearsOptions.plugins.title.text = 'Сравнение значений показателей по годам'
            let preparedValuesData = this.prepareDataForIndicatorsByYears()
            this.chartIndicatorsValuesByYearsData.labels = preparedValuesData.labels
            preparedValuesData.dataValues.forEach(set => {
                this.chartIndicatorsValuesByYearsData.datasets.push(
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

            // Сравнение баллов
            this.chartIndicatorsScoresByYearsData = { labels: [], datasets: [] }
            this.chartIndicatorsScoresByYearsOptions.plugins.title.text = 'Сравнение баллов показателей по годам'
            let preparedScoresData = this.prepareDataForIndicatorsByYears()
            this.chartIndicatorsScoresByYearsData.labels = preparedScoresData.labels
            preparedScoresData.dataScores.forEach(set => {
                this.chartIndicatorsScoresByYearsData.datasets.push(
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
        },
        prepareDataForIndicatorsByYears() {
            //let preparedData = [{labels: [], sets: [{label: '', data: []}]}]
            let dates = []
            let planned = []
            let dataValuesDictionary = {} //<IndicatorKey, [values]>
            let dataScoresDictionary = {} //<IndicatorKey, [scores]>
            this.calculations.forEach(calculation => {
                dates.push(calculation.id.date);
                planned.push(calculation.planned)
                let indicatorKey = calculation.id.indicatorKey

                if (indicatorKey in dataValuesDictionary) {
                    // Для значений
                    let existValues = dataValuesDictionary[indicatorKey] //сохраняем существующие значения
                    existValues.push(calculation.value)
                    dataValuesDictionary[indicatorKey] = existValues
                    // Для баллов
                    let existScores = dataScoresDictionary[indicatorKey] //сохраняем существующие значения
                    existScores.push(calculation.score)
                    dataScoresDictionary[indicatorKey] = existScores
                }
                else {
                    // Для значений
                    dataValuesDictionary[indicatorKey] = [calculation.value]
                    // Для баллов
                    dataScoresDictionary[indicatorKey] = [calculation.score]
                }
            })

            //функция преобразования словаря в массив объектов
            const dictionaryToArrayOfObjects = (dictionary) => {
                return Object.keys(dictionary).map(key => ({
                    key: key,
                    values: dictionary[key]
                }));
            };
            let dataValuesArray = dictionaryToArrayOfObjects(dataValuesDictionary)
            let dataScoresArray = dictionaryToArrayOfObjects(dataScoresDictionary)
            let uniqueDates = [...new Set(dates)]

            let preparedData = { labels: uniqueDates, dataValues: dataValuesArray, dataScores: dataScoresArray, planned: planned }
            return preparedData;
        },
        generateScoresByYearsChart() {
            this.chartScoresByYearsData = { labels: [], datasets: [] }
            this.chartScoresByYearsOptions.plugins.title.text = 'Сравнение суммарного количества баллов по годам'
            let preparedData = this.prepareDataForScoresByYears()
            this.chartScoresByYearsData.labels = preparedData.labels
            this.chartScoresByYearsData.datasets.push(
                {
                    label: 'Суммарное количество баллов за аккредитацию',
                    data: preparedData.values, //баллы

                    tension: 0.2, /* степень изгиба линий */
                    borderWidth: 1, /* толщина линий */
                    pointHoverBorderColor: 'green', /* цвет границ точки при наведении курсора */
                    pointHoverBackgroundColor: 'green', /* цвет точки при наведении курсора */
                    pointHoverRadius: 4, /* радиус точки при наведении */
                    spanGaps: false, /* если зачение отсутствует, линия прерывается */
                    indexAxis: 'x', /* для транспонирования графика указать значение 'y' */
                }
            )
        },
        prepareDataForScoresByYears() {
            // Сортировка вычисленных значений по дате ASC
            function sortByDate(a, b) {
                if (a.id.date < b.id.date) {
                    return -1;
                }
                if (a.id.date > b.id.date) {
                    return 1;
                }
                return 0;
            }
            const sortedCalculations = this.calculations.sort(sortByDate);
            // Делим весь массив вычислений на подмассивы по годам
            let curDate = sortedCalculations[0].id.date
            let arrCalculationsByYear = []
            let arrCalculations = []
            sortedCalculations.forEach(calc => {
                if (calc.id.date == curDate) {
                    arrCalculations.push(calc)
                }
                else {
                    arrCalculationsByYear.push({ date: curDate, calculations: arrCalculations })
                    curDate = calc.id.date
                    arrCalculations = [calc]
                }
            })
            arrCalculationsByYear.push({ date: curDate, calculations: arrCalculations })

            let scores = []
            let dates = []
            arrCalculationsByYear.forEach(calcByYear => {
                let sum = this.calculateSum(calcByYear.calculations)
                scores.push(sum)
                dates.push(calcByYear.date)
            })

            let preparedData = { labels: dates, values: scores }
            return preparedData;
        },
        calculateSum(calculations) {
            let sum = 0;
            let ap1 = 0;
            let ap11 = 0;
            calculations.forEach((calculation) => {
                if (calculation.id.indicatorKey === 'АП1') {
                    ap1 = calculation.score
                }
                else if (calculation.id.indicatorKey === 'АП1.1') {
                    ap11 = calculation.score
                }
                else {
                    sum += calculation.score
                }
            })
            if (ap11 != 0) {
                sum += ap1 / ap11
            }
            return sum;
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
        generateRecommendations() {
            let today = new Date().toJSON().split("T")[0]
            this.nowYear = today.split('-')[0]
            let currentCalculations = []
            this.calculations.forEach(calc => {
                if (calc.id.date.split('-')[0] == this.nowYear) {
                    currentCalculations.push(calc)
                }
            })
            let middleScore = []
            let lowScore = []
            currentCalculations.forEach(calc => {
                if (calc.level === 'Низкий') {
                    lowScore.push(calc.id.indicatorKey)
                }
                else if (calc.level === 'Средний') {
                    middleScore.push(calc.id.indicatorKey)
                }
            })
            this.recommendationList = { middle: middleScore.join(", "), low: lowScore.join(", ") }
            console.log(this.recommendationList)
        },
        saveReport() {
            console.log("Report was saved")
        }
    },
    mounted() {
        this.dateStart = new Date().toJSON().split("T")[0]
        this.dateEnd = new Date().toJSON().split("T")[0]
        this.findAllOpops()
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
    margin: 20px 0px;
}

td {
    padding: 10px 40px;
    border-bottom: 1px solid #3D3C84;
}

.summary-td {
    min-width: 90px;
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
    margin: 0px 250px 10px 250px;
}

.recommendation-container {
    margin: 10px 150px;
}

.recommendation {
    font-size: 13pt;
    color: black;
    border: 1px solid #3D3C84;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 40px;
}

.wrap-expand-table {
    margin: 10px 150px 10px 150px;
    text-align: -webkit-right;
}

.wrap-expand-table a[href^="#click-expand"],
.wrap-expand-table a[href="#close"] {
    text-decoration: none;
    border-bottom: 1px dashed;
    color: black;
}

/* Если браузер не поддерживает структурные псевдоклассы, то список будет раскрыт и доступ к данным сохранится */
[id^="click-expand"] {
    position: fixed;
    /* чтобы страница "не подпрыгивала" к id */
}

[id^="click-expand"]:target+.wrap-expand-table a[href^="#click-expand"],
[id^="click-expand"]:not(:target)+.wrap-expand-table tbody tr:nth-of-type(n+4),
/* 5 — порядковый номер строки, после которой строки будут скрыты */
[id^="click-expand"]:not(:target)+.wrap-expand-table a[href="#close"] {
    display: none;
}
</style>