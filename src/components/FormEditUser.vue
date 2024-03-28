<template>
    <form @submit.prevent>
        <h4>Пользователь</h4>
        <label>Фамилия</label>
        <input v-model="user.surname" class="input-simple" type="text" placeholder="Фамилия">

        <label>Имя</label>
        <input v-model="user.name" class="input-simple" type="text" placeholder="Имя">

        <label>Отчество</label>
        <input v-model="user.patronymic" class="input-simple" type="text" placeholder="Отчество">

        <label>Логин</label>
        <input v-model="user.login" class="input-simple" type="text" placeholder="Логин">

        <label>Роль</label>
        <select class="input-simple" v-model="user.role">
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>

        <div v-if="this.$route.params.id != null" class="opops-list">
            <label>Список ОПОП:</label>
            <!-- <label v-for="opop in user.opops" :key="opop"> {{ opop.name }}</label> -->
            <!-- <label>{{ this.opops }}</label> -->
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Наименование</td>
                    </tr>
                </thead>
                <tbody v-for="opop in user.opops" v-bind:key="opop">
                    <tr>
                        <td>{{ opop.id }}</td>
                        <td>{{ opop.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="btn-bar">
            <button class="btn-simple" @click="save()">Сохранить</button>
        </div>
    </form>
</template>

<script>
import UserService from '@/services/UserService';

export default {
    data() {
        return {
            roles: [],
            user: {},
            roleNames: ['Администратор', 'Представитель учебного управления', 'Руководитель ОПОП'],
            //opops: ''
        }
    },
    methods: {
        findAllRoles() {
            UserService.findAllRoles().then(response => {
                if (response.status == 200) {
                    this.roles = response.data
                    this.user.role = this.roles[0]
                }
            })
        },
        findUser() {
            UserService.findUser(this.$route.params.id).then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    /* this.user.opops.forEach((opop) => {
                        this.opops += opop.name + ', '
                    }) */
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        addUser() {
            this.user.password = this.user.login
            UserService.createUser(this.user).then(response => {
                if (response.status == 200) {
                    this.$router.push("/users")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        updateUser() {
            this.user.password = null
            UserService.editUser(this.$route.params.id, this.user).then(response => {
                if (response.status == 200) {
                    this.$router.push("/users")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        save() {
            if (this.$route.params.id != null) {
                this.updateUser()
            }
            else {
                this.addUser()
            }
        }
    },
    mounted() {
        this.findAllRoles()
    },
    created() {
        if (this.$route.params.id != null) {
            this.findUser()
        }
    }
}
</script>

<style scoped>
label {
    font-size: 11pt;
    margin-bottom: 5px;
    margin-right: 10px;
    color: black;
}

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
}

form {
    display: flex;
    flex-direction: column;
}

.opops-list{
    display: flex;
    flex-direction: column;
}

h4 {
    margin-top: 5px;
    margin-bottom: 5px;
}

.btn-simple {
    margin-top: 20px;
}

thead {
    font-weight: bold;
    color: black;
}

table,
td {
    color: black;
}

td {
    padding: 5px 10px;
    font-size: 11pt;
    border-bottom: 1px solid #3D3C84;
}
</style>