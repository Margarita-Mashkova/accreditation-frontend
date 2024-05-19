<template>
    <PageHeader />
    <Transition>
        <div class="form-data" v-if="this.user != null">
            <div class="heading">
                <label>Руководство {{ this.role }}</label>
            </div>
            <!-- ADMIN -->
            <div class="info" v-if="this.user.role == 'ADMIN'">
                <text>Вам доступны следующие возможности:<br><br></text>

                <text>1. Работа с пользователями:<br><br></text>
                <text class="description">
                    Необходимо выбрать пункт "Пользователи" в верхнем меню.
                    Вы можете создавать новых пользователей (кнопка "Добавить")
                    и изменять и удалять существующих (соответствующие кнопки в строках таблицы).<br><br></text>

                <text>2. Изменение личных данных<br><br></text>
                <text class="description">
                    Необходимо выбрать пункт "Личные данные" в верхнем меню.
                    На открывшейся форме можно изменить свои данные и нажать кнопку «Сохранить».<br><br></text>
                <text class="description" style="color: blue;">Внимание! </text>
                <text class="description">При изменении логина необходимо будет заново авторизоваться.<br></text>
            </div>
            <!-- DEAN -->
            <div class="info" v-else-if="this.user.role == 'DEAN'">

                <text>Для получения более подробной информации скачайте:<br><br></text>
                <div class="file-manual" @click="downloadManual()">
                    <label>
                        <img src="../assets/file.png" width="30" height="30">
                        Руководство {{ this.role }}
                    </label>
                </div>

                <text><br><b>Общий алгоритм работы:</b><br><br></text>

                <text>1. Создать образовательную программу<br><br></text>
                <text>2. Создать необходимые переменные, используемые в формулах расчета показателей<br><br></text>
                <text>3. Создать показатели для расчета<br><br></text>
                <text>4. Ввести данные для расчета<br><br></text>
                <text>5. Выполнить расчет показателей и получить отчет<br><br></text>
                <text>6. Выполнить анализ показателей и получить отчет<br><br></text>

                <text>Дополнительно: Изменение личных данных<br><br></text>
                <text class="description" style="color: blue;">Внимание! </text>
                <text class="description">При изменении логина необходимо будет заново авторизоваться.<br></text>
            </div>
            <!-- MANAGER -->
            <div class="info" v-else-if="this.user.role == 'MANAGER'">

                <text>Для получения более подробной информации скачайте:<br><br></text>
                <div class="file-manual" @click="downloadManual()">
                    <label>
                        <img src="../assets/file.png" width="30" height="30">
                        Руководство {{ this.role }}
                    </label>
                </div>

                <text><br>Общий алгоритм работы:<br><br></text>
                <text>1. Ввести данные для расчета<br><br></text>
                <text>2. Выполнить расчет показателей<br><br></text>
                <text>3. Выполнить анализ показателей<br><br></text>

                <text>Дополнительно: Изменение личных данных<br><br></text>
                <text class="description" style="color: blue;">Внимание! </text>
                <text class="description">При изменении логина необходимо будет заново авторизоваться.<br></text>
            </div>
        </div>
    </Transition>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import ProfileService from "@/services/ProfileService";
import ReportService from "@/services/ReportService";
import NProgress from "nprogress";

export default {
    name: "ManualPage",
    components: {
        PageHeader
    },
    data() {
        return {
            user: null,
            role: "Роль"
        }
    },
    methods: {
        me() {
            ProfileService.me().then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    console.log("токен " + localStorage.getItem('jwt'));
                    this.roleConverter()
                }
                NProgress.done(true)
            }).catch((ex) => {
                console.log(ex)
            })
        },
        roleConverter() {
            if (this.user.role == "ADMIN") {
                this.role = "администратора"
            }
            else if (this.user.role == "DEAN") {
                this.role = "представителя учебного управления"
            }
            else if (this.user.role == "MANAGER") {
                this.role = "руководителя образовательной программы"
            }
        },
        downloadManual() {
            ReportService.getManualWord(this.role).then(response => {
                if (response.status == 200) {
                    const s2ab = (s) => {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    };
                    const decodedFileData = atob(response.data.data);
                    const arrayBufferContent = s2ab(decodedFileData);
                    const blob = new Blob([arrayBufferContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.href = url
                    a.download = response.data.filename
                    document.body.appendChild(a)
                    a.click()
                    window.URL.revokeObjectURL(url)

                }
            }).catch((ex) => {
                console.log(ex)
            })
        }
    },
    mounted() {
        this.me()
    }
};
</script>

<style scoped>
.form-data {
    margin: 25px 400px;
    color: black;
    text-align: center;
}

.heading {
    text-align: -webkit-center;
    font-weight: bold;
    font-size: 22pt;
    margin: 20px 0px;
    color: black;
}

text {
    font-size: 14pt;
}

.info {
    margin: 20px 0px;
    text-align: justify;
    border: 1px solid;
    border-radius: 10px;
    border-color: #3D3C84;
    padding: 30px;
}

.description {
    font-size: 12pt;
}

.file-manual>label {
    color: #3D3C84;
    font-size: 14pt;
    font-weight: bolder;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.file-manual>label:hover {
    color: #201f4b;
}

.file-manual {
    display: flex;
    justify-content: center;
}

img {
    margin-right: 5px;
}
</style>