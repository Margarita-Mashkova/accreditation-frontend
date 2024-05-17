<template>
    <PageHeader />
    <div class="heading">

        <label>Список ОПОП</label>

    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateOpopFrom()">Создать</button>
    </div>
    <Transition>
        <div class="opops" v-if="opops.length > 0">
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Наименование</td>
                        <td>Руководитель</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="opop in opops" :key="opop">
                        <td>{{ opop.id }}</td>
                        <td>
                            <div class="text">{{ opop.name }}</div>
                        </td>
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
    </Transition>
    <Transition>
        <div class="btn-bar" v-if="opops.length > 0">
            <div class="btn-page">
                <button class="btn-simple" @click="previousPage()">&#9668;</button>
            </div>
            <div class="btn-page">
                <button class="btn-simple" @click="nextPage()">&#9658;</button>
            </div>
        </div>
    </Transition>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import OpopService from '@/services/OpopService'
import NProgress from "nprogress"

export default {
    name: "OpopsPage",
    components: {
        PageHeader
    },
    data() {
        return {
            opops: [],
            amountPages: 0,
            pageNumber: 1
        }
    },
    methods: {
        getAmountPages() {
            OpopService.getAmountPages().then(response => {
                if (response.status == 200) {
                    this.amountPages = response.data
                }
            })
        },
        findAllOpopsByPage() {
            OpopService.findAllOpopsByPage(this.pageNumber).then(response => {
                if (response.status == 200) {
                    this.getAmountPages()
                    this.opops = response.data
                }
                NProgress.done(true)
            })
        },
        openCreateOpopFrom() {
            this.$router.push("/opop")
        },
        editOpop(id) {
            this.$router.push("/opop/" + id)
        },
        deleteOpop(id) {
            var sure = confirm("Вы уверены, что хотите удалить ОПОП?")
            if (sure) {
                OpopService.deleteOpop(id).then(response => {
                    if (response.status == 200) {
                        if (this.opops.length - 1 == 0 && this.pageNumber > 1) {
                            this.pageNumber -= 1
                        }
                        this.findAllOpopsByPage()
                    }
                }).catch((ex) => {
                    alert(ex.response.data)
                    console.log(ex.response.data)
                })
            }
        },
        nextPage() {
            if (this.amountPages > this.pageNumber) {
                this.pageNumber += 1
            }
        },
        previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber -= 1
            }
        }
    },
    mounted() {
        this.findAllOpopsByPage()
    },
    watch: {
        'pageNumber'() {
            this.findAllOpopsByPage()
        }
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

.btn-page {
    margin: 40px 30px;
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

.btn-bar {
    display: flex;
    justify-content: center;
}

.text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>