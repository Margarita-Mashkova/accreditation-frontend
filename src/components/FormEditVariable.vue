<template>
    <form @submit.prevent>
        <h4>Переменная</h4>

        <div v-if="this.$route.params.key != null" class="input-key">
            <!--  <label>Обозначение: <b>{{ variable.key }}</b></label> -->
            <label>Обозначение</label>
            <input v-model="variable.key" class="input-simple" type="text" placeholder="Обозначение" disabled>
        </div>
        <div v-else class="input-key">
            <label>Обозначение</label>
            <input v-model="variable.key" class="input-simple" type="text" placeholder="Обозначение">
        </div>

        <label>Наименование</label>
        <textarea v-model="variable.name" class="input-simple" type="text" placeholder="Наименование"></textarea>

        <div class="btn-bar">
            <button class="btn-simple" @click="save()">Сохранить</button>
        </div>
    </form>
</template>

<script>
import VariableService from '@/services/VariableService'

export default {
    data() {
        return {
            variable: {}
        }
    },
    methods: {
        findVariable() {
            VariableService.findVariable(this.$route.params.key).then(response => {
                if (response.status == 200) {
                    this.variable = response.data
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        addVariable() {
            VariableService.createVariable(this.variable).then(response => {
                if (response.status == 200) {
                    this.$router.push("/variables")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        updateVariable() {
            VariableService.editVariable(this.$route.params.key, this.variable.name).then(response => {
                if (response.status == 200) {
                    this.$router.push("/variables")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        save() {
            if (this.$route.params.key != null) {
                this.updateVariable()
            }
            else {
                this.addVariable()
            }
        }
    },
    mounted() {
    },
    created() {
        if (this.$route.params.key != null) {
            this.findVariable()
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

h4 {
    margin-top: 10px;
    margin-bottom: 15px;
}

.btn-simple {
    margin-top: 20px;
}

textarea {
    outline: none;
    padding: 20px;
    min-height: 100px;
    resize: none;
}
</style>