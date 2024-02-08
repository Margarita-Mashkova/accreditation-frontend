<template>
    <HeaderAdmin />
    <div class="heading">
        <label>Список руководителей ОПОП</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="editUser()">Создать</button>
    </div>

    <div class="users">
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Фамилия</td>
                    <td>Имя</td>
                    <td>Отчество</td>
                    <td>Логин</td>
                    <td>ОПОП</td>
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Иванов</td>
                    <td>Иван</td>
                    <td>Иванович</td>
                    <td>i.ivanov</td>
                    <td>Программная инженерия</td>
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit" @click="editUser()">Изменить</button>
                            <button class="btn-simple-delete">Удалить</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import HeaderAdmin from '@/components/HeaderAdmin.vue';

export default {
    name: "PageUsers",
    data() {
        return {
        }
    },
    components: {
        HeaderAdmin
    },
    methods:{
        editUser(){
            this.$router.push("/edit-user")
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
    