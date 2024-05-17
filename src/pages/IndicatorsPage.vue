<template>
    <PageHeader />
    <div class="heading">
        <label>Аккредитационные показатели</label>
    </div>
    <div class="btn">
        <button class="btn-simple" @click="openCreateIndicatorFrom()">Создать</button>
    </div>

    <div class="btn-left">
        <button class="btn-simple" @click="showVariables()">Переменные</button>
    </div>
    <Transition>
        <div class="indicators" v-if="indicators.length > 0">
            <table>
                <thead>
                    <tr>
                        <td>Обозначение</td>
                        <td>Наименование</td>
                        <td>Формула</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="indicator in indicators" :key="indicator">
                        <td>{{ indicator.key }}</td>
                        <td>
                            <div class="text">{{ indicator.name }}</div>
                        </td>
                        <td style="min-width: 100px;">{{ indicator.formula }}</td>
                        <td>
                            <div class="btn-bar">
                                <button class="btn-simple-edit" @click="editIndicator(indicator.key)">Изменить</button>
                                <button class="btn-simple-delete"
                                    @click="deleteIndicator(indicator.key)">Удалить</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Transition>
    <Transition>
        <div class="btn-bar" v-if="indicators.length > 0">
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
import PageHeader from '@/components/PageHeader.vue'
import IndicatorService from '@/services/IndicatorService'
import NProgress from "nprogress"

export default {
    name: "IndicatorsPage",
    components: {
        PageHeader
    },
    data() {
        return {
            indicators: [],
            amountPages: 0,
            pageNumber: 1
        }
    },
    methods: {
        showVariables() {
            this.$router.push("/variables")
        },
        getAmountPages() {
            IndicatorService.getAmountPages().then(response => {
                if (response.status == 200) {
                    this.amountPages = response.data
                }
            })
        },
        findAllIndicatorsByPage() {
            IndicatorService.findAllIndicatorsByPage(this.pageNumber).then(response => {
                if (response.status == 200) {
                    this.getAmountPages()
                    this.indicators = response.data
                }
                NProgress.done(true)
            })
        },
        openCreateIndicatorFrom() {
            this.$router.push("/indicator")
        },
        editIndicator(key) {
            this.$router.push("/indicator/" + key)
        },
        deleteIndicator(key) {
            var sure = confirm("Вы уверены, что хотите удалить показатель?")
            if (sure) {
                IndicatorService.deleteIndicator(key).then(response => {
                    if (response.status == 200) {
                        if (this.indicators.length - 1 == 0 && this.pageNumber > 1) {
                            this.pageNumber -= 1
                        }
                        this.findAllIndicatorsByPage()
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
        this.findAllIndicatorsByPage()
    },
    watch: {
        'pageNumber'() {
            this.findAllIndicatorsByPage()
        }
    }
}
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

.btn-left {
    margin: 0px 1200px 10px 170px;
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
    min-width: 80%;
    margin: 0px 140px;
}

td {
    padding: 10px 50px;
    border-bottom: 1px solid #3D3C84;
}

.text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 60px;
}

/* table {
    border: 1px solid #3D3C84;
} */

.indicators {
    display: flex;
    justify-content: center;
}

.btn-bar {
    display: flex;
    justify-content: center;
}
</style>