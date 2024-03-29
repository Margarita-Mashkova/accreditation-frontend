<template>
    <PageHeader />
    <div class="heading">
        <label>Аккредитационные показатели</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateIndicatorFrom()">Создать</button>
    </div>

    <div class="btn-left">
        <button class="btn-simple" @click="showVariables()">Переменные</button>
    </div>

    <div class="indicators">
        <table>
            <thead>
                <tr>
                    <td>Обозначение</td>
                    <td>Наименование</td>
                    <td>Формула</td>
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="indicator in indicators" :key="indicator">
                    <td>{{ indicator.key }}</td>
                    <td>{{ indicator.name }}</td>
                    <td>{{ indicator.formula }}</td>                    
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit" @click="editIndicator(indicator.key)">Изменить</button>
                            <button class="btn-simple-delete" @click="deleteIndicator(indicator.key)">Удалить</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import PageHeader from '@/components/PageHeader.vue'
import IndicatorService from '@/services/IndicatorService'

export default {
    name: "IndicatorsPage",
    components: {
        PageHeader
    },
    data(){
        return{
            indicators: []
        }
    },
    methods:{
        showVariables(){
            this.$router.push("/variables")
        },
        findAllIndicators(){
            IndicatorService.findAllIndicators().then(response => {
                if (response.status == 200) {
                    this.indicators = response.data
                }
            })
        },        
        openCreateIndicatorFrom() {
            this.$router.push("/indicator")
        },
        editIndicator(key){
            this.$router.push("/indicator/" + key)
        },
        deleteIndicator(key){
            var sure = confirm("Вы уверены, что хотите удалить показатель?")
            if (sure) {
                IndicatorService.deleteIndicator(key).then(response => {
                    if (response.status == 200) {
                        this.findAllIndicators()
                    }
                }).catch((ex) => {
                    alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
        }
    },
    mounted(){
        this.findAllIndicators()
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

.btn-left {
    margin: 0px 1200px 10px 170px;
}

thead {
    font-weight: bold;
    text-align: center;
    color: black;
}

table,
td {
    color: black;
    min-width: 80%;
    margin: 0px 140px;
}

td {
    padding: 10px 50px;
    border-bottom: 1px solid #3D3C84;
}

/*table {
    border: 1px solid #3D3C84;
}*/

.indicators {
    display: flex;
    justify-content: center;
}

.btn-bar{
    display: flex;
}
</style>
    