<template>
    <PageHeader />
    <div class="heading">
        <label>Список переменных</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateVariableFrom()">Создать</button>
    </div>

    <div class="users">
        <table>
            <thead>
                <tr>
                    <td>Обозначение</td>
                    <td>Наименование</td>
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ЕГЭб</td>
                    <td>Cуммарное значение баллов ЕГЭ обучающихся, зачисленных за счет средств <br>
                         соответствующих бюджетов бюджетной системы Российской Федерации</td>                   
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit">Изменить</button>
                            <button class="btn-simple-delete">Удалить</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>n</td>
                    <td>Численность обучающихся, зачисленных наобучение за счет средств<br>
                         соответствующих бюджетов бюджетной системы Российской Федерации</td>                   
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
    data(){
        return{
            variables: []
        }
    },
    methods:{
        openCreateVariableFrom() {
            this.$router.push("/variable")
        },
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
}

td {
    padding: 10px 50px;
    border-bottom: 1px solid #3D3C84;
}

.users {
    display: flex;
    justify-content: center;
}

.btn-bar{
    display: flex;
}
</style>
    