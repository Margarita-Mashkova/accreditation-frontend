<template>
    <form @submit.prevent>
        <h4>Руководитель ОПОП</h4>
        <label>Фамилия</label>
        <input class="input-simple" type="text" placeholder="Фамилия">

        <label>Имя</label>
        <input class="input-simple" type="text" placeholder="Имя">

        <label>Отчество</label>
        <input class="input-simple" type="text" placeholder="Отчество">

        <label>Логин</label>
        <input class="input-simple" type="text" placeholder="Логин">

        <label>ОПОП</label>
        <select class="input-simple">
            <option>Программная инженерия</option>
            <option>Прикладная информатика</option>
        </select>

        <div class="btn-bar">
            <button class="btn-simple" @click="save()">Сохранить</button>
        </div>
    </form>
</template>

<script>

export default {
    methods: {
        save() {
            this.$router.push("/users")
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

.btn-simple {
    margin-top: 20px;
}


</style>