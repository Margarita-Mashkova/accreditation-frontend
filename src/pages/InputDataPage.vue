<template>
    <PageHeader />
    <div class="heading">
        <h4>Ввод данных для расчета</h4>
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
            <input v-model="date" class="input-simple" type="date">
        </div>
    </div>
    <div class="heading">
        <h4>Введите значения переменных:</h4>
    </div>
    <div class="btn-bar">
        <button class="btn-simple" @click="getPatternFile()">Получить шаблон файла</button>
        <!-- <button class="btn-simple" @click="loadFromFile()">Загрузить из файла</button> -->
        <input @change="onFileChange" id="file" type="file" accept=".xlsx">
        <label for="file" class="input-file-btn">
            Загрузить из файла
        </label>
    </div>

    <div class="variables-container">
        <div class="filter-item" v-for="(variable, index) in variables" :key="variable">
            <input type="text" id="variableKey" v-model="valuesList[index].id.variableKey" hidden="true">
            <label for="variableKey">
                <span>{{ valuesList[index].id.variableKey }}</span>
            </label>
            <!-- <label>{{ variable.key }}</label> -->
            <input v-model="valuesList[index].value" class="input-simple-variable" type="text" placeholder="value">
        </div>
    </div>

    <div class="btn-bar">
        <button class="btn-simple" @click="save()">Сохранить</button>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import OpopService from '@/services/OpopService'
import ProfileService from '@/services/ProfileService'
import ValueService from '@/services/ValueService'
import VariableService from '@/services/VariableService'
import NProgress from "nprogress"

export default {
    name: "InputDataPage",
    components: {
        PageHeader
    },
    data() {
        return {
            opops: [],
            variables: [],
            opopId: '',
            date: '',
            valuesList: [],
            currentUser: '',
            opopName: '',
            notEnoughData: false,
            file: null
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.file = files[0]
            this.loadFromFile()
        },

        findAllOpops() {
            OpopService.findAllOpops().then(response => {
                if (response.status == 200) {
                    this.opops = response.data
                    if (this.opops.length != 0) {
                        this.opopId = this.opops[0].id
                    }
                }
            })
        },
        findAllVariables() {
            VariableService.findAllVariables().then(response => {
                if (response.status == 200) {
                    this.variables = response.data
                    this.generateValuesList()
                }
                NProgress.done(true)
            })
        },
        generateValuesList() {
            this.valuesList = []
            this.variables.forEach((variable) => {
                let val = { id: { opopId: '', variableKey: variable.key, date: '' }, value: '' }
                this.valuesList.push(val)
            })
        },
        findValuesByOpopAndDate() {
            if (this.opopId != '') {
                this.generateValuesList()
                ValueService.findValuesByOpopAndDate(this.opopId, this.date).then(response => {
                    if (response.status == 200 && response.data.length > 0) {
                        this.valuesList = response.data
                    }
                }).catch((ex) => {
                    //alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
        },
        save() {
            this.valuesList.forEach((value) => {
                if (value.value != '') {
                    value.id.opopId = this.opopId
                    value.id.date = this.date
                } else {
                    this.notEnoughData = true
                }
            })
            if (this.notEnoughData == false) {
                ValueService.addValuesList(this.valuesList).then(response => {
                    if (response.status == 200) {
                        alert("Данные добавлены")
                    }
                }).catch((ex) => {
                    alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
            else {
                alert('Необходимо заполнить все значения переменных')
            }
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
        getPatternFile() {
            ValueService.getPatternFile(this.opopId, this.date).then(response => {
                if (response.status == 200) {
                    alert("Шаблон успешно сохранен в папку 'Загрузки' на Вашем компьютере")
                }
            }).catch((ex) => {
                //alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        loadFromFile() {
            ValueService.readValuesFromFile({ file: this.file }, this.opopId, this.date).then(response => {
                if (response.status == 200) {
                    this.valuesList = response.data
                }
            }).catch((ex) => {
                //alert(ex.response)
                console.log(ex)
            })
        }
    },
    mounted() {
        this.me()
        this.date = new Date().toJSON().split("T")[0]
        this.findAllVariables()
    },
    watch: {
        'opopId'() {
            this.findValuesByOpopAndDate()
        },
        'date'() {
            if (this.date != '') {
                this.findValuesByOpopAndDate()
            }

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

.input-file-btn {
    font-family: "Century Gothic";
    padding: 10px 80px;
    color: white;
    border-radius: 10px;
    background-color: #3D3C84;
    border: 1px solid;
    border-color: #3D3C84;
    text-align: center;
    cursor: pointer;
    font-size: 11pt;
    min-width: 180px;
}

.input-file-btn:hover {
    background-color: #28275c;
}

.btn-bar>input {
    display: none;
}

.btn-bar>label {
    margin: 0;
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

.btn-bar {
    display: flex;
    justify-content: space-evenly;
    margin: 20px 0px;
}

.btn-simple {
    width: 300px;
}

thead {
    font-weight: bold;
    text-align: center;
    color: black;
}

table,
td {
    color: black;
}

td {
    padding: 10px 50px;
    border-bottom: 1px solid #3D3C84;
}

.users {
    display: flex;
    justify-content: center;
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