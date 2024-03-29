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
                <tr v-for=" calculation in calculations" :key="calculation">
                    <td>{{ calculation.indicatorName }}</td>
                    <td>{{ calculation.id.indicatorKey }}</td>
                    <td>{{ calculation.id.date }}</td>
                    <td>{{ calculation.value }}</td>
                    <td>{{ calculation.score }}</td>
                    <td>{{ calculation.planned }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import CalculationService from '@/services/CalculationService'
import OpopService from '@/services/OpopService'

export default {
    name: "AnalysisPage",
    components: {
        PageHeader
    },
    data() {
        return {
            calculations: [],
            dateStart: '',
            dateEnd: '',
            opopId: ''
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
                        this.convertPlannedField()
                    }
                }).catch((ex) => {
                    //alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }else{
                alert("Дата начала периода должна быть меньше даты окончания периода")
            }
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
    margin: 0px 150px 50px 150px;
}

td {
    padding: 10px 60px;
    border-bottom: 1px solid #3D3C84;
}

.summary-td {
    min-width: 90px;
}

.result {
    display: flex;
    justify-content: center;
    margin-top: 30px;
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
</style>