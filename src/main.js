import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/router";
import axios from "axios";

const token = localStorage.getItem('jwt')
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
}
/*axios.interceptors.response.use(null, function (error) {
    if(error.response.status===403){
        router.push("/forbidden")
    }
    else if(error.response.status===404){
        router.push("/not-found")
    }
});*/

createApp(App)
.use(router)
.provide('$axios', axios)
.mount('#app')
