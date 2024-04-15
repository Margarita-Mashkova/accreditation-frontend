<template>
    <form @submit.prevent>
        <h4>Авторизация</h4>
        <div class="error" v-if="this.wrongData">
            <label>Неверный логин и/или пароль</label>
        </div>
        <InputIcon v-model="user.login" :type="'text'" :placeholder="'Логин'" :src="'email.png'" :width="18"
            :height="14" />
        <InputIcon v-model="user.password" :type="'password'" :placeholder="'Пароль'" :src="'password.png'"
            :width="18" :height="19" />
        <div class="btn-bar">
            <button class="btn-simple" @click="login($event)">Войти</button>
        </div>
    </form>
</template>

<script>
import InputIcon from "./InputIcon.vue";
import ProfileService from "@/services/ProfileService";

export default {
    components: {
        InputIcon
    },

    data() {
        return {
            user: {},
            wrongData: false,
        };
    },

    methods: {
        login(e) {
            ProfileService.login(this.user)
                .then((response) => {
                    if (response.status == 200) {
                        console.log("токен " + response.data);
                        localStorage.setItem("jwt", response.data);                        
                    }
                    window.location.href = '/edit-profile';
                })
                .catch((ex) => {
                    this.wrongData = true;
                    console.log(ex.response.data)
                });
            e.preventDefault();
        },
    },
    watch: {
        wrongData() { },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.btn-simple {
    border-radius: 20px;
}

h4 {
    color: black;
    font-size: 30pt;
    align-self: center;
    font-family: "Century Gothic";
    margin-bottom: 25px;
}


.error {
    margin-bottom: 5px;
    font-size: 11.5pt;
    color: #b10000;
}
</style>
