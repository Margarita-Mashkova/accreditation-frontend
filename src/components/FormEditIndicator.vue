<template>
    <form @submit.prevent>
        <h4>Показатель</h4>

        <div class="form-container">
            <div class="first-part">
                <div v-if="this.$route.params.key != null" class="input-key">
                    <!--  <label>Обозначение: <b>{{ variable.key }}</b></label> -->
                    <label>Обозначение</label>
                    <input v-model="indicator.key" class="input-simple" type="text" placeholder="Обозначение" disabled>
                </div>
                <div v-else class="input-key">
                    <label>Обозначение</label>
                    <input v-model="indicator.key" class="input-simple" type="text" placeholder="Обозначение">
                </div>

                <div class="input-key">
                    <label>Наименование</label>
                    <textarea v-model="indicator.name" class="input-simple" type="text"
                        placeholder="Наименование"></textarea>
                </div>

                <div class="input-key">
                    <label>Тип показателя</label>
                    <select class="input-simple" v-model="indicator.boolType">
                        <option :value="true">Булевый</option>
                        <option :value="false">Обычный</option>
                    </select>
                </div>

                <div class="input-key" v-if="indicator.boolType">
                    <label>Значение</label>
                    <div>
                        <input type="checkbox" id="checkbox" v-model="indicator.boolValue" />
                        <label for="checkbox" style="margin-left: 8px;">Соответствует</label>
                    </div>
                </div>

                <div class="input-key" v-if="!indicator.boolType">
                    <label>Формула</label>
                    <input v-model="indicator.formula" class="input-simple" type="text" placeholder="Формула">
                </div>

                <div class="calculator-part" v-if="!indicator.boolType">
                    <button v-for="variable in variables" :key="variable" :value="variable.key"
                        @click="clickVariable(variable.key)">
                        {{ variable.key }}</button>
                </div>
                <div class="calculator-part" v-if="!indicator.boolType">
                    <button v-for="operator in operators" :key="operator" :value="operator"
                        @click="clickVariable(operator)">
                        {{ operator }}</button>
                </div>

                <div class="calculator-part" v-if="!indicator.boolType">
                    <button v-for="number in numbers" :key="number" :value="number" @click="clickVariable(number)">
                        {{ number }}</button>
                </div>
                <div class="calculator-part" v-if="!indicator.boolType">
                    <button @click="backspace()"><img src="../assets/backspace.png" width="18" height="18" /></button>
                </div>
            </div>

            <div class="second-part">
                <div class="add-rule">
                    <label>Правила выставления баллов</label>
                    <button class="btn-simple-edit" @click="addRule()">Добавить правило</button>
                </div>
                <div class="rules" v-for="(rule, index) in listRules" :key="rule">
                    <div class="item-rule">

                        <div class="rule-bound">
                            <label>От</label>
                            <input v-model="this.listRules[index].min" class="input-simple" type="number"
                                placeholder="от">
                        </div>
                        <div class="rule-bound">
                            <label>До</label>
                            <input v-model="this.listRules[index].max" class="input-simple" type="number"
                                placeholder="до">
                        </div>
                        <div class="rule-bound">
                            <label>Балл</label>
                            <input v-model="this.listRules[index].score" class="input-simple" type="number"
                                placeholder="балл">
                        </div>
                        <div class="rule-bound">
                            <label>Уровень</label>
                            <select class="input-simple" v-model="this.listRules[index].level">
                                <option v-for="level in ruleLevels" :key="level" :value="level">{{ level }}</option>
                            </select>
                        </div>

                        <button class="btn-simple-delete" @click="deleteRule(index)">Удалить</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="btn-bar">
            <button class="btn-simple" @click="save()">Сохранить</button>
        </div>
    </form>
</template>

<script>
import IndicatorService from '@/services/IndicatorService'
import VariableService from '@/services/VariableService'
import NProgress from "nprogress"

export default {
    data() {
        return {
            indicator: {
                boolType: false,
                formula: ''
            },
            variables: [],
            operators: ['+', '-', '*', '/', '^', '%', '(', ')'],
            numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
            listRules: [],
            rules: 0,
            ruleLevels: []
        }
    },
    methods: {
        clickVariable(key) {
            this.indicator.formula += key
        },
        backspace() {
            this.indicator.formula = this.indicator.formula.substring(0, this.indicator.formula.length - 1)
        },
        findIndicator() {
            IndicatorService.findIndicator(this.$route.params.key).then(response => {
                if (response.status == 200) {
                    this.indicator = response.data
                    this.listRules = response.data.rules
                    this.rules = response.data.rules.length
                }
                NProgress.done(true)
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        addRule() {
            if(this.indicator.boolType && this.rules < 2){
                this.rules += 2
                this.listRules.push({ min: 1, max: '', score: '', level: 'Высокий' })
                this.listRules.push({ min: '', max: 1, score: '', level: 'Низкий' })
            }
            else if (!this.indicator.boolType && this.rules < 4) {
                this.rules += 1
                this.listRules.push({ min: '', max: '', score: '', level: '' })
            }
        },
        deleteRule(index) {
            this.rules -= 1
            this.listRules.splice(index, 1)
        },
        addIndicator() {
            this.indicator.rules = this.listRules
            IndicatorService.createIndicator(this.indicator).then(response => {
                if (response.status == 200) {
                    this.$router.push("/indicators")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        updateIndicator() {
            IndicatorService.editIndicator(this.indicator).then(response => {
                if (response.status == 200) {
                    this.$router.push("/indicators")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        save() {
            if (this.$route.params.key != null) {
                this.updateIndicator()
            }
            else {
                this.addIndicator()
            }
        },
        findAllVariables() {
            VariableService.findAllVariables().then(response => {
                if (response.status == 200) {
                    this.variables = response.data
                }
            })
        },
        findAllRuleLevels() {
            IndicatorService.findAllRuleLevels().then(response => {
                if (response.status == 200) {
                    this.ruleLevels = response.data
                }
            })
        }
    },
    mounted() {
        this.findAllVariables()
        this.findAllRuleLevels()
    },
    created() {
        if (this.$route.params.key != null) {
            this.findIndicator()
        }
        else{
            NProgress.done(true)
        }
    }
}
</script>

<style scoped>
label {
    font-size: 11pt;
    margin-bottom: 5px;
    margin-right: 10px;
    color: black;
}

.input-key {
    display: flex;
    flex-direction: column;
}

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
}

form {
    display: flex;
    flex-direction: column;
}

.form-container {
    display: flex;
    justify-content: space-evenly;
    margin: 20px 0px;
}

.first-part {
    width: 100%;
    margin-right: 30px;
}

.second-part {
    width: 100%;
}

.second-part .input-simple {
    margin-top: 2px;
    max-width: 115px;
}

h4 {
    margin-top: 10px;
    margin-bottom: 15px;
}

.btn-bar {
    margin: 0px 350px
}

textarea {
    outline: none;
    padding: 20px;
    min-height: 100px;
    resize: none;
}

.calculator-part button {
    padding: 3px 8px;
    margin-bottom: 10px;
    margin-right: 5px;
    font-weight: bold;
}

.item-rule {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.add-rule {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.rule-bound {
    margin-right: 10px;
}
</style>