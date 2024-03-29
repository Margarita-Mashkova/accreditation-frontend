<template>
    <div class="navbar">
        <ul class="navbar-list">

            <li v-if="this.user.role == 'ADMIN'">
                <router-link :to="'/users'">Пользователи</router-link>
            </li>
            <li v-if="this.user.role == 'ADMIN'">
                <a href='http://localhost:9000/swagger-ui/index.html#/' target="_blank">Swagger</a>
            </li>

            <li v-if="this.user.role == 'DEAN'">
                <router-link :to="'/opops'">ОПОП</router-link>
            </li>
            <li v-if="this.user.role == 'DEAN'">
                <router-link :to="'/indicators'">Показатели</router-link>
            </li>
            <li v-if="this.user.role == 'DEAN' || this.user.role == 'MANAGER'">
                <router-link :to="'/input-data'">Ввод данных</router-link>
            </li>
            <li v-if="this.user.role == 'DEAN' || this.user.role == 'MANAGER'">
                <router-link :to="'/calculation'">Расчет показателей</router-link>
            </li>
            <li v-if="this.user.role == 'DEAN' || this.user.role == 'MANAGER'">
                <router-link :to="'/analysis'">Анализ показателей</router-link>
            </li>

            <div class="navbar-item-last">
                <li>
                    <router-link :to="'/edit-profile'">Личные данные</router-link>
                </li>
                <li>
                    <router-link :to="'/auth'" @click="logout()">Выход</router-link>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
import ProfileService from '@/services/ProfileService'

export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        logout() {
            localStorage.setItem('jwt', null)
            console.log(localStorage.getItem('jwt'))
        },
        me() {
            ProfileService.me().then(response => {
                if (response.status == 200) {
                    this.user = response.data
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        }
    },
    mounted() {
        this.me()
    }
}
</script>

<style scoped>
.navbar {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #3D3C84;
    font-size: 11pt;
    font-weight: bold;
    padding: 20px 0px;
}

.navbar-list {
    display: flex;
    margin: 7px;
}

li {
    display: flex;
    list-style-type: none;
    margin-right: 40px;
    align-self: center;
}

.navbar-item-last {
    display: flex;
    align-self: center;
    position: absolute;
    right: 20px;
}
</style>