<template>
    <HeaderAdmin />
    <div class="heading">
        <h4>Ввод данных для расчета</h4>
    </div>
    <div class="filter">
        <div class="filter-item">
            <label>ОПОП</label>
            <select class="input-simple">
                <option>Программная инженерия</option>
                <option>Прикладная информатика</option>
            </select>
        </div>
        <div class="filter-item">
            <label>Дата</label>
            <input class="input-simple" type="date">
        </div>
    </div>
    <div class="heading">
        <h4>Введите значения переменных:</h4>
    </div>
    <div class="btn">
        <button class="btn-simple">Загрузить из файла</button>
    </div>
    <div class="variables-container">
        <div class="filter-item" v-for="variable in variablesCount" v-bind:key="variable">
            <label>Переменная</label>
            <input class="input-simple-variable" type="text" placeholder="value">
        </div>
    </div>
    <div class="btn">
        <button class="btn-simple">Сохранить</button>
    </div>
</template>
    
<script>
import HeaderAdmin from '@/components/HeaderAdmin.vue';

export default {
    name: "IndicatorsPage",
    data(){
        return{
            variablesCount: 14
        }
    },
    components: {
        HeaderAdmin
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

.filter-item{
    display: flex;
    flex-direction: column;
}

h4{
    font-size: 18pt;
}

.variables-container{
    display: flex;
    flex-wrap: wrap;
    margin: 10px 70px;
    justify-content: space-evenly;
}
</style>
    