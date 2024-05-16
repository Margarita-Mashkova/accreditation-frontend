<template>
    <PageHeader />
    <div class="heading">
        <h4>Расчет аккредитационных показателей</h4>
    </div>
    <div class="filter">
        <div class="filter-item" v-if="currentUser.role == 'DEAN'">
            <label>ОПОП</label>
            <select class="input-simple" v-model="opopId">
                <option v-for="opop in opops" :key="opop" :value="opop.id">{{ opop.name }}</option>
            </select>
        </div>
        <div class="filter-item" v-else>
            <label>ОПОП</label>
            <input v-model="opopName" class="input-simple" type="text" disabled>
        </div>
        <div class="filter-item">
            <label>Дата</label>
            <select class="input-simple" v-model="date">
                <option v-for="date in existsDates" :key="date" :value="date">{{ date }}</option>
            </select>
            <!-- <input class="input-simple" type="date" v-model="date"> -->
        </div>
    </div>

    <div class="btn-bar">
        <div class="btn">
            <button class="btn-simple" @click="makeCalculationOpopReport()">Сформировать</button>
        </div>
        <div class="btn">
            <button class="btn-simple" @click="saveReport()">Сохранить</button>
        </div>
    </div>

    <div id="click-expand"></div>
    <div class="wrap-expand-table" v-if="reportData.calculations.length != 0">
        <a href="#close">Свернуть</a><a href="#click-expand">Развернуть</a>
        <table>
            <thead>
                <tr>
                    <td>Наименование показателя</td>
                    <td>Обозначение показателя</td>
                    <td>Значение</td>
                    <td>Баллы</td>
                </tr>
            </thead>
            <tbody v-if="reportData.length != 0">
                <tr v-for=" calculation in reportData.calculations" :key="calculation">
                    <td>
                        <div class="text">{{ calculation.indicatorName }}</div>
                    </td>
                    <td>{{ calculation.id.indicatorKey }}</td>
                    <td>{{ calculation.value }}</td>
                    <td>{{ calculation.score }}</td>
                </tr>
                <tr>
                    <td><b>Итого</b></td>
                    <td></td>
                    <td><b>{{ reportData.accreditationStatus }}</b></td>
                    <td class="summary-td"><b>{{ reportData.sum }} баллов</b></td>
                </tr>
            </tbody>
        </table>
        <a href="#close">Cвернуть</a><a href="#click-expand">Посмотреть весь список</a>
    </div>

    <div class="heading" v-if="reportData.calculations.length == 0 && isPerforming == true">
        <h4 style="margin-top: 150px;">Нет данных для указанного периода</h4>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import OpopService from '@/services/OpopService'
import ReportService from '@/services/ReportService'
import ValueService from '@/services/ValueService'
import ProfileService from '@/services/ProfileService'
import NProgress from "nprogress"

export default {
    name: "CalculationPage",
    components: {
        PageHeader
    },
    data() {
        return {
            opops: [],
            date: '',
            opopId: '',
            reportData: {
                calculations: []
            },
            isPerforming: false,
            existsDates: [],
            currentUser: '',
            opopName: ''
        }
    },
    methods: {
        findAllOpops() {
            OpopService.findAllOpops().then(response => {
                if (response.status == 200) {
                    this.opops = response.data
                    if (this.opops.length != 0) {
                        this.opopId = this.opops[0].id
                    }
                    //this.date = new Date().toJSON().split("T")[0]
                    this.findAllDates()
                }
            })
        },
        findAllDates() {
            ValueService.findDatesByOpop(this.opopId).then(response => {
                if (response.status == 200) {
                    this.existsDates = response.data
                    if (this.existsDates.length != 0) {
                        this.date = this.existsDates[0]
                    }
                    NProgress.done(true)
                }
            }).catch((ex) => {
                console.log(ex)
            })
        },
        makeCalculationOpopReport() {
            NProgress.start()
            this.reportData = { calculations: [] }
            this.isPerforming = true
            ReportService.makeCalculationOpopReport(this.opopId, this.date).then(response => {
                if (response.status == 200) {
                    this.reportData = response.data
                }
                NProgress.done(true)
            }).catch((ex) => {
                //alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        saveReport() {
            ReportService.saveCalculationOpopReportExcel(this.opopId, this.date).then(response => {
                if (response.status == 200) {
                    const s2ab = (s) => {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    };
                    const decodedFileData = atob(response.data.data);
                    const arrayBufferContent = s2ab(decodedFileData);
                    const blob = new Blob([arrayBufferContent], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.href = url
                    a.download = response.data.filename
                    document.body.appendChild(a)
                    a.click()
                    window.URL.revokeObjectURL(url)

                }
            }).catch((ex) => {
                console.log(ex)
            })
        },

        me() {
            ProfileService.me().then(response => {
                if (response.status == 200) {
                    this.currentUser = response.data
                    if (this.currentUser.role == "MANAGER" && this.currentUser.opops.length != 0) {
                        this.opopId = this.currentUser.opops[0].id
                        this.opopName = this.currentUser.opops[0].name
                    }
                    if (this.currentUser.role == "DEAN") {
                        this.findAllOpops()
                    }
                }
            })
        },
    },
    mounted() {
        this.me()
    },
    watch: {
        'opopId'() {
            this.findAllDates()
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
    margin: 15px 0px;
    text-align-last: center;
}

td {
    padding: 10px 60px;
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
    text-align-last: auto;
}

.wrap-expand-table {
    margin: 20px 200px 50px 200px;
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