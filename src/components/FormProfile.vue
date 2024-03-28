<template>
    <form novalidate="true" @submit.prevent>
        <h4>Личные данные</h4>
        <label>Фамилия</label>
        <InputIcon v-model="user.surname" :type="'text'" :placeholder="'Фамилия'" :src="'name.png'" :width="'18'" :height="'18'" />
        <label>Имя</label>
        <InputIcon v-model="user.name" :type="'text'" :placeholder="'Имя'" :src="'name.png'" :width="'18'" :height="'18'" />
        <label>Отчество</label>
        <InputIcon v-model="user.patronymic" :type="'text'" :placeholder="'Отчество'" :src="'name.png'" :width="'18'" :height="'18'" />
        <label>Логин</label>
        <InputIcon v-model="user.login" :type="'text'" :placeholder="'Логин'" :src="'email.png'" :width="'18'" :height="'14'" />
        <label>Пароль</label>
        <InputIcon v-model="user.password" :type="'password'" :placeholder="'Пароль'" :src="'password.png'" :width="'18'" :height="'19'" />
        <div class="btn-bar">
            <button class="btn-simple" @click="save()">Сохранить</button>
        </div>
    </form>
</template>

<script>
import InputIcon from "./InputIcon.vue";
import ProfileService from "@/services/ProfileService";

export default {
    components: {
        InputIcon,
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        me() {
            ProfileService.me().then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    this.user.password = null
                    console.log("токен " + localStorage.getItem('jwt'));
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        save(){
            ProfileService.editProfile(this.user).then(response =>{
                if (response.status == 200){
                    alert("Данные успешно изменены!")
                }
            }).catch((ex) => {
                //alert(ex.response.data)
                console.log(ex.response.data)
            })
            console.log(this.user)
        }
    },
    mounted() {
        this.me()
    }
};
</script>

<style scoped>
form {
    background-color: #fffefeec;
    color: black;
}

h4 {
    color: black;
    font-size: 20pt;
    text-align: center;
    font-family: "Century Gothic";
    margin-bottom: 30px;
}

.inp-icon{
    margin-bottom: 15px;
}

.btn-bar{
    margin-top: 30px;
}
</style>