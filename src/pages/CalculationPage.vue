<template>
    <HeaderAdmin />
    <div class="heading">
        <h4>Расчет аккредитационных показателей</h4>
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

    <div class="btn-bar">
        <div class="btn">
            <button class="btn-simple">Сформировать</button>
        </div>
        <div class="btn">
            <button class="btn-simple">Сохранить</button>
        </div>
    </div>    

    <div class="result">
        <table>
            <thead>
                <tr>
                    <td>Наименование показателя</td>
                    <td>Обозначение показателя</td>
                    <td>Значение</td>
                    <td>Баллы</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Средний балл ЕГЭ</td>
                    <td>АП1</td>
                    <td>70</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td><b>Итого</b></td>
                    <td></td>
                    <td></td>
                    <td><b>120 баллов</b></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import HeaderAdmin from '@/components/HeaderAdmin.vue';

export default {
    name: "IndicatorsPage",
    data() {
        return {
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

.btn{
    min-width: 300px;
}

.btn-bar {    
    display: flex;
    justify-content: space-evenly;
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

.result {
    display: flex;
    justify-content: center;
    margin-top: 30px;
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
    