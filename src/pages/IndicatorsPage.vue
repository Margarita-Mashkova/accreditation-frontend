<template>
    <PageHeader />
    <div class="heading">
        <label>Список аккредитационных показателей</label>
    </div>
    <div class="btn">
        <button class="btn-simple">Создать</button>
    </div>

    <div class="btn-left">
        <button class="btn-simple" @click="showVariables()">Переменные</button>
    </div>

    <div class="users">
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
                <tr>
                    <td>АП1</td>
                    <td>Средний балл ЕГЭ обучающихся, принятых по его результатам <br>
                        на обучение по программам бакалавриата и специалитета</td>
                    <td>ЕГЭб * n</td>                    
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit">Изменить</button>
                            <button class="btn-simple-delete">Удалить</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import PageHeader from '@/components/PageHeader.vue';

export default {
    name: "IndicatorsPage",
    components: {
        PageHeader
    },
    methods:{
        showVariables(){
            this.$router.push("/variables")
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
}

td {
    padding: 10px 50px;
    border-bottom: 1px solid #3D3C84;
}

/*table {
    border: 1px solid #3D3C84;
}*/

.users {
    display: flex;
    justify-content: center;
}

.btn-bar{
    display: flex;
}
</style>
    