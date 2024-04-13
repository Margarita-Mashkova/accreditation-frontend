<template>
    <form @submit.prevent>
        <h4>ОПОП</h4>

        <label>Наименование</label>
        <input v-model="opop.name" class="input-simple" type="text" placeholder="Наименование">

        <label>Руководитель</label>
        <select class="input-simple" v-model="opopUser.id">
            <option v-for="user in users" :key="user" :value="user.id">{{ user.surname }} {{ user.name }} {{ user.patronymic }}</option>
        </select>

        <label>Уровень образования</label>
        <select class="input-simple" v-model="opop.level">
            <option v-for="level in opopLevels" :key="level" :value="level">{{ level }}</option>
        </select>

        <div class="btn-bar">
            <button class="btn-simple" @click="save()">Сохранить</button>
        </div>
    </form>
</template>

<script>
import UserService from '@/services/UserService'
import OpopService from '@/services/OpopService';

export default {
    data() {
        return {
            users: [],
            opop: {},
            opopUser: {
                id: null
            },
            opopLevels:[]
        }
    },
    methods: {
        findAllUsers() {
            UserService.findAllUsers().then(response => {
                if (response.status == 200) {
                    this.users = response.data                    
                    if(this.opopUser.id == null){
                        this.opopUser.id = this.users[1].id
                    }
                }
            })
        },
        findAllOpopsLevels(){
            OpopService.findAllOpopsLevels().then(response =>{
                if(response.status == 200){
                    this.opopLevels = response.data
                    if(this.opop.level == null){
                        this.opop.level = this.opopLevels[0]
                    }
                }
            })
        },
        findUserByLogin(login){
            UserService.findUserByLogin(login).then(response =>{
                if(response.status == 200){
                    this.opopUser = response.data
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        findOpop(){
            OpopService.findOpop(this.$route.params.id).then(response =>{
                if(response.status == 200){
                    this.opop = response.data
                    this.findUserByLogin(this.opop.userLogin)
                    console.log(this.opop)
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        addOpop() {
            OpopService.createOpop(this.opop.name, this.opop.level, this.opopUser.id).then(response => {
                if (response.status == 200) {
                    this.$router.push("/opops")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        updateOpop(){
            this.opop
            OpopService.editOpop(this.$route.params.id, this.opop.name, this.opop.level, this.opopUser.id).then(response => {
                if (response.status == 200) {
                    this.$router.push("/opops")
                }
            }).catch((ex) => {
                alert(ex.response.data)
                console.log(ex.response.data)
            })
        },
        save() {
            if(this.$route.params.id != null){
                this.updateOpop()
            }
            else{
                this.addOpop()
            }
        }
    },
    mounted() {
        this.findAllUsers()
        this.findAllOpopsLevels()
    },
    created() {
        if (this.$route.params.id != null) {
            this.findOpop()
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

h4 {
    margin-top: 10px;
    margin-bottom: 15px;
}

.btn-simple {
    margin-top: 20px;
}
</style>