<template>
    <PageHeader />
    <div class="heading">
        <label>Список ОПОП</label>
    </div>
    <div class="btn">
        <button class="btn-simple">Создать</button>
    </div>

    <div class="users">
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Наименование</td>
                    <td>Руководитель</td>
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Программная инженерия</td>
                    <td>i.ivanov</td>                    
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
    name: "OpopsPage",
    components: {
        PageHeader
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
    padding: 10px 80px;
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
    