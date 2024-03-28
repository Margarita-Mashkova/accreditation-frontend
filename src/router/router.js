import * as VueRouter from "vue-router";

import PageLogin from "@/pages/LoginPage";
import PageUsers from "@/pages/UsersPage";
import ProfilePage from "@/pages/ProfilePage";
import EditUserPage from "@/pages/EditUserPage";
import OpopsPage from "@/pages/OpopsPage";
import IndicatorsPage from "@/pages/IndicatorsPage";
import VariablesPage from "@/pages/VariablesPage";
import InputDataPage from "@/pages/InputDataPage";
import CalculationPage from "@/pages/CalculationPage"

const routes = [    
    { path: "/auth", component: PageLogin, name: "login", alias: "/" },
    { path: "/edit-profile", component: ProfilePage, name: "edit-profile" },

    { path: "/users", component: PageUsers, name: "users" },
    { path: "/user", component: EditUserPage, name: "create-user" },
    { path: "/user/:id", component: EditUserPage, name: "edit-user" },

    { path: "/opops", component: OpopsPage, name: "opops" },
    { path: "/indicators", component: IndicatorsPage, name: "indicators" },
    { path: "/variables", component: VariablesPage, name: "variables" },

    { path: "/input-data", component: InputDataPage, name: "input-data" },
    { path: "/calculation", component: CalculationPage, name: "calculation" },

];

let router = new VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router;