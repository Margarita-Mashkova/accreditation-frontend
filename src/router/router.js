import * as VueRouter from "vue-router";

import PageLogin from "@/pages/LoginPage";
import PageUsers from "@/pages/UsersPage";
import ProfilePage from "@/pages/ProfilePage";
import EditUserPage from "@/pages/EditUserPage";
import EditOpopPage from "@/pages/EditOpopPage";
import EditIndicatorPage from "@/pages/EditIndicatorPage";
import EditVariablePage from "@/pages/EditVariablePage";
import OpopsPage from "@/pages/OpopsPage";
import IndicatorsPage from "@/pages/IndicatorsPage";
import VariablesPage from "@/pages/VariablesPage";
import InputDataPage from "@/pages/InputDataPage";
import CalculationPage from "@/pages/CalculationPage";
import AnalysisPage from "@/pages/AnalysisPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFoundPage from "@/pages/NotFoundPage";

const routes = [
    { path: "/auth", component: PageLogin, name: "login", alias: "/" },
    { path: "/edit-profile", component: ProfilePage, name: "edit-profile" },

    { path: "/users", component: PageUsers, name: "users" },
    { path: "/user", component: EditUserPage, name: "create-user" },
    { path: "/user/:id", component: EditUserPage, name: "edit-user" },

    { path: "/opops", component: OpopsPage, name: "opops" },
    { path: "/opop", component: EditOpopPage, name: "create-opop" },
    { path: "/opop/:id", component: EditOpopPage, name: "edit-opop" },

    { path: "/indicators", component: IndicatorsPage, name: "indicators" },
    {
        path: "/indicator",
        component: EditIndicatorPage,
        name: "create-indicator",
    },
    {
        path: "/indicator/:key",
        component: EditIndicatorPage,
        name: "edit-indicator",
    },

    { path: "/variables", component: VariablesPage, name: "variables" },
    { path: "/variable", component: EditVariablePage, name: "create-variable" },
    {
        path: "/variable/:key",
        component: EditVariablePage,
        name: "edit-variable",
    },

    { path: "/input-data", component: InputDataPage, name: "input-data" },
    { path: "/calculation", component: CalculationPage, name: "calculation" },
    { path: "/analysis", component: AnalysisPage, name: "analysis" },

    { path: "/forbidden", component: ForbiddenPage, name: "forbidden" },
    { path: "/not-found", component: NotFoundPage, name: "not-found" },
    { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'not-found' },
];

let router = new VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Если не авторизирован
    if (localStorage.getItem('jwt') == 'null') {
        if (to.path == '/auth') {
            next()
        }
        else {
            router.push("/auth")
        }
    }
    // Если авторизирован
    else {
        if (to.path == '/') {
            router.push("/edit-profile")
        }
        else {
            next()
        }
    }
})
export default router;
