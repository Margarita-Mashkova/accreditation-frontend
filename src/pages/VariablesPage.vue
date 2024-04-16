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
    <div class="btn-bar">
        <div class="btn-page">
            <button class="btn-simple" @click="previousPage()">&#9668;</button>
        </div>
        <div class="btn-page">
            <button class="btn-simple" @click="nextPage()">&#9658;</button>
        </div>
    </div>
</template>
    
<script>
import PageHeader from '@/components/PageHeader.vue'
import VariableService from '@/services/VariableService'
import NProgress from "nprogress"

export default {
    name: "VariablesPage",
    components: {
        PageHeader
    },
    data(){
        return{
            variables: [],
            amountPages: 0,
            pageNumber: 1
        }
    },
    methods:{
        getAmountPages(){
            VariableService.getAmountPages().then(response => {
                if (response.status == 200) {
                    this.amountPages = response.data
                }
            })
        },
        findAllVariablesByPage(){
            VariableService.findAllVariablesByPage(this.pageNumber).then(response => {
                if (response.status == 200) {
                    this.getAmountPages()
                    this.variables = response.data
                }
                NProgress.done(true)
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
                        this.findAllVariablesByPage()
                    }
                }).catch((ex) => {
                    alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
        },
        nextPage() {
            if (this.amountPages > this.pageNumber) {
                this.pageNumber += 1
            }
        },
        previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber -= 1
            }
        }
    },
    mounted(){
        this.findAllVariablesByPage()
    },
    watch: {
        'pageNumber'() {
            this.findAllVariablesByPage()
        }
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

.btn-page {
    margin: 40px 30px;
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
    min-width: 80%;
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
    justify-content: center;
}

.text{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
    height: 60px;
}
</style>
    