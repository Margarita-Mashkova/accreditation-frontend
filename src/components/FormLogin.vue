<template>
    <form @submit.prevent>
        <h4>Авторизация</h4>
        <InputIcon
        :type="'text'" 
        :placeholder="'Логин'" 
        :src="'email.png'" 
        :width="'18'" 
        :height="'14'" />
        <InputIcon
        :type="'password'" 
        :placeholder="'Пароль'" 
        :src="'password.png'" 
        :width="'18'" 
        :height="'19'" />        
        <div class="btn-bar">
            <button class="btn-simple" @click="login()">Войти</button>
        </div>
    </form>
</template>

<script>
import InputIcon from './InputIcon.vue';

export default {
    components: {
        InputIcon
    },
    methods:{
        login(){
            this.$router.push("/users")
        }
    }
}

</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
}
.btn-simple{
    border-radius: 20px;
}
h4{
    color: black;
    font-size: 30pt;
    align-self: center;
    font-family: "Century Gothic";
    margin-bottom: 30px;
}
</style>