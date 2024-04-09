<template>
    <PageHeader />
    <div class="heading">
        <label>Список пользователей</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateUserFrom()">Создать</button>
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
                    <td>Роль</td>
                    <!-- <td>ОПОП</td> -->
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" v-bind:key="user">
                    <td>{{ user.id }}</td>
                    <td>{{ user.surname }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.patronymic }}</td>
                    <td>{{ user.login }}</td>
                    <td>{{ user.role }}</td>
                    <!-- <td> <label v-for="opop in user.opops" v-bind:key="opop">{{ opop.name }}<br></label></td> -->
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit" @click="editUser(user.id)">Изменить</button>
                            <button class="btn-simple-delete" @click="deleteUser(user.id)">Удалить</button>
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
import PageHeader from '@/components/PageHeader.vue';
import UserService from '@/services/UserService'

export default {
    name: "PageUsers",
    data() {
        return {
            users: [],
            amountPages: 0,
            pageNumber: 1
        }
    },
    components: {
        PageHeader
    },
    methods: {
        getAmountPages(){
            UserService.getAmountPages().then(response => {
                if (response.status == 200) {
                    this.amountPages = response.data
                }
            })
        },
        findAllUsersByPage() {
            UserService.findAllUsersByPage(this.pageNumber).then(response => {
                if (response.status == 200) {
                    this.getAmountPages()
                    this.users = response.data
                }
            })
        },
        openCreateUserFrom() {
            this.$router.push("/user")
        },
        editUser(id) {
            this.$router.push("/user/" + id)
        },
        deleteUser(id) {
            var sure = confirm("Вы уверены, что хотите удалить пользователя?")
            if (sure) {
                UserService.deleteUser(id).then(response => {
                    if (response.status == 200) {
                        this.findAllUsersByPage()
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
    mounted() {
        this.findAllUsersByPage()
    },
    watch: {
        'pageNumber'() {
            this.findAllUsersByPage()
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
    padding: 10px 60px;
    border-bottom: 1px solid #3D3C84;
}

/*table {
    border: 1px solid #3D3C84;
}*/

.users {
    display: flex;
    justify-content: center;
}

.btn-bar {
    display: flex;
    justify-content: center;
}

.btn-page {
    margin: 40px 30px;
}
</style>