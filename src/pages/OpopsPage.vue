<template>
    <PageHeader />
    <div class="heading">
        <label>Список ОПОП</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateOpopFrom()">Создать</button>
    </div>

    <div class="opops">
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Наименование</td>
                    <td>Руководитель</td>
                    <td>Действия</td>
                </tr>
            </thead>
            <tbody v-for="opop in opops" :key="opop">
                <tr>
                    <td>{{ opop.id }}</td>
                    <td>{{ opop.name }}</td>
                    <td>{{ opop.userLogin }}</td>                    
                    <td>
                        <div class="btn-bar">
                            <button class="btn-simple-edit" @click="editOpop(opop.id)">Изменить</button>
                            <button class="btn-simple-delete" @click="deleteOpop(opop.id)">Удалить</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import PageHeader from '@/components/PageHeader.vue';
import OpopService from '@/services/OpopService'

export default {
    name: "OpopsPage",
    components: {
        PageHeader
    },
    data(){
        return{
            opops:[]
        }
    },
    methods: {
        findAllOpops(){
            OpopService.findAllOpops().then(response => {
                if (response.status == 200) {
                    this.opops = response.data
                }
            })
        },
        openCreateOpopFrom() {
            this.$router.push("/opop")
        },
        editOpop(id){
            this.$router.push("/opop/" + id)
        },
        deleteOpop(id){
            var sure = confirm("Вы уверены, что хотите удалить ОПОП?")
            if (sure) {
                OpopService.deleteOpop(id).then(response => {
                    if (response.status == 200) {
                        this.findAllOpops()
                    }
                }).catch((ex) => {
                    alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
        }
    },
    mounted() {
        this.findAllOpops()
    }
};
</script>
    
<style scoped>
.heading {
    text-align: -webkit-center;
    font-weight: bold;
    font-size: 22pt;
    margin: 20px 0px;
    color: black;
}

.btn {
    margin: 30px 680px;
}

thead {
    font-weight: bold;
    text-align: center;
    color: black;
}

table,
td {
    color: black;
}

td {
    padding: 10px 80px;
    border-bottom: 1px solid #3D3C84;
}

/*table {
    border: 1px solid #3D3C84;
}*/

.opops {
    display: flex;
    justify-content: center;
}

.btn-bar{
    display: flex;
}
</style>
    