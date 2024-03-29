<template>
    <PageHeader />
    <div class="heading">
        <h4>Ввод данных для расчета</h4>
    </div>
    <div class="filter">
        <div class="filter-item">
            <label>ОПОП</label>
            <select class="input-simple" v-model="opopId">
                <option v-for="opop in opops" :key="opop" :value="opop.id">{{ opop.name }}</option>
            </select>
        </div>
        <div class="filter-item">
            <label>Дата</label>
            <input v-model="date" class="input-simple" type="date">
        </div>
    </div>
    <div class="heading">
        <h4>Введите значения переменных:</h4>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="loadFromFile()">Загрузить из файла</button>
    </div>

    <div class="variables-container">
        <div class="filter-item" v-for="(variable, index) in variables" :key="variable">
            <!-- <input type="text" id="variableKey" :value="variable.key" v-bind="valuesList[index]">
            <label for="variableKey">
                <span>{{ variable.key }}</span>
            </label> -->
            <label>{{ variable.key }}</label>
            <input v-model="valuesList[index].value" class="input-simple-variable" type="text" placeholder="value">
        </div>
    </div>

    <div class="btn">
        <button class="btn-simple" @click="save()">Сохранить</button>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import OpopService from '@/services/OpopService'
import ValueService from '@/services/ValueService'
import VariableService from '@/services/VariableService';

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
            valuesList: []
        }
    },
    methods: {
        findAllOpops() {
            OpopService.findAllOpops().then(response => {
                if (response.status == 200) {
                    this.opops = response.data
                    this.opopId = this.opops[0].id
                    this.date = new Date().toJSON().split("T")[0]
                }
            })
        },
        findAllVariables() {
            VariableService.findAllVariables().then(response => {
                if (response.status == 200) {
                    this.variables = response.data
                    this.generateValuesList()
                    console.log(this.valuesList)
                }
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
            ValueService.findValuesByOpopAndDate(this.opopId, this.date).then(response => {
                if (response.status == 200 && response.data.length > 0) {
                    this.valuesList = response.data
                }
                else {
                    this.generateValuesList()
                }
            }).catch((ex) => {
                //alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        save() {
            this.valuesList.forEach((value) => {
                value.id.opopId = this.opopId
                value.id.date = this.date
            })
            console.log(this.valuesList)
            ValueService.addValuesList(this.valuesList).then(response => {
                if (response.status == 200) {
                    console.log(this.valuesList)
                    alert("Данные добавлены")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        loadFromFile(){
            
        }
    },
    mounted() {
        this.findAllOpops()
        this.findAllVariables()
    },
    watch: {
        'opopId'() {
            this.findValuesByOpopAndDate()
        },
        'date'() {
            this.findValuesByOpopAndDate()
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
    margin: 30px 680px;
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