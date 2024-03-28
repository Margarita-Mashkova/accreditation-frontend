<template>
    <PageHeader />
    <div class="heading">
        <label>Список переменных</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateVariableFrom()">Создать</button>
    </div>

    <div class="variables">
        <table>
            <thead>
                <tr>
                    <td>Обозначение</td>
                    <td>Наименование</td>
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="variable in variables" :key="variable">
                    <td>{{ variable.key }}</td>
                    <td>{{ variable.name }}</td>                   
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit" @click="editVariable(variable.key)">Изменить</button>
                            <button class="btn-simple-delete" @click="deleteVariable(variable.key)">Удалить</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import PageHeader from '@/components/PageHeader.vue'
import VariableService from '@/services/VariableService'

export default {
    name: "VariablesPage",
    components: {
        PageHeader
    },
    data(){
        return{
            variables: []
        }
    },
    methods:{
        findAllVariables(){
            VariableService.findAllVariables().then(response => {
                if (response.status == 200) {
                    this.variables = response.data
                }
            })
        },
        openCreateVariableFrom() {
            this.$router.push("/variable")
        },
        editVariable(key){
            this.$router.push("/variable/" + key)
        },
        deleteVariable(key){
            var sure = confirm("Вы уверены, что хотите удалить переменную?")
            if (sure) {
                VariableService.deleteVariable(key).then(response => {
                    if (response.status == 200) {
                        this.findAllVariables()
                    }
                }).catch((ex) => {
                    alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
        }
    },
    mounted(){
        this.findAllVariables()
    }
};
</script>
    
<style scoped>
.heading {
    text-align: -webkit-center;
    font-weight: bold;
    font-size: 22pt;
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
    margin: 0px 150px;
}

td {
    padding: 10px 50px;
    border-bottom: 1px solid #3D3C84;
}

.variables {
    display: flex;
    justify-content: center;
}

.btn-bar{
    display: flex;
}
</style>
    