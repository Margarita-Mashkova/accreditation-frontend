<template>
    <div class="navbar">
        <ul class="navbar-list">
            <li>
                <router-link :to="'/users'">Руководители ОПОП</router-link>
            </li>
            <li>
                <router-link :to="'/opops'">ОПОП</router-link>
            </li>
            <li>
                <router-link :to="'/indicators'">Показатели</router-link>
            </li>
            <li>
                <router-link :to="'/input-data'">Ввод данных</router-link>
            </li>
            <li>
                <router-link :to="'/calculation'">Расчет показателей</router-link>
            </li>
            <div class="navbar-item-last">
                <li>
                    <router-link :to="'/edit-profile'">Личные данные</router-link>
                </li>
                <li>
                    <router-link :to="'/auth'">Выход</router-link>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {};
    },
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