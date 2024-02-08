<template>
    <form novalidate="true" @submit.prevent>
        <h4>Личные данные</h4>
        <InputIcon :type="'text'" :placeholder="'Фамилия'" :src="'name.png'" :width="'18'" :height="'18'" />
        <InputIcon :type="'text'" :placeholder="'Имя'" :src="'name.png'" :width="'18'" :height="'18'" />
        <InputIcon :type="'text'" :placeholder="'Отчество'" :src="'name.png'" :width="'18'" :height="'18'" />
        <InputIcon :type="'text'" :placeholder="'Логин'" :src="'email.png'" :width="'18'" :height="'14'" />
        <InputIcon :type="'password'" :placeholder="'Пароль'" :src="'password.png'" :width="'18'" :height="'19'" />
        <div class="btn-bar">
            <button class="btn-simple">Сохранить</button>
        </div>
    </form>
</template>
  
<script>
import InputIcon from "./InputIcon.vue";

export default {
    components: {
        InputIcon,
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
</style>