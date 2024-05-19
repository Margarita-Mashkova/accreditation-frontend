<template>
    <PageHeader />
    <Transition>
        <div class="form-data" v-if="this.user != null">
            <h2>Здравствуйте, {{ this.user.name }} {{ this.user.patronymic }}!</h2>
            <div class="info">
                <text>Если Вы впервые используете приложение, ознакомьтесь с <br></text>
                <router-link :to="'/manual'">Руководством пользователя</router-link>
            </div>
            <img src="../assets/ulstu.png" width="600" height="400">
        </div>
    </Transition>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import ProfileService from "@/services/ProfileService";
import NProgress from "nprogress";

export default {
    name: "HomePage",
    components: {
        PageHeader
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        me() {
            ProfileService.me().then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    console.log("токен " + localStorage.getItem('jwt'));
                }
                NProgress.done(true)
            }).catch((ex) => {
                console.log(ex)
            })
        },
    },
    mounted() {
        this.me()
    }
};
</script>

<style scoped>
.form-data {
    color: black;
    text-align: center;
}

text {
    font-size: 16pt;
}

a {
    color: #3D3C84;
    font-size: 18pt;
    font-weight: bolder;
}

a:hover {
    color: #201f4b;
}

.info{
    margin: 20px 0px;
}
</style>