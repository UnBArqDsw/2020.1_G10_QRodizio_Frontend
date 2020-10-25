import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import UserLogin from "../views/UserLogin.vue";
import UserHome from "../views/UserHome.vue";
import RegisterNewUser from "../views/RegisterNewUser";
import ListUsers from "../views/ListUsers";
import EmployeeDemands from "../views/EmployeeDemands";
import TempTableDemands from "../views/TempTableDemands";
import MakeNewDemand from "../views/MakeNewDemand";
import CostumerTable from "../views/CostumerTable";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: UserLogin,
  },
  {
    path: "/user-home",
    name: "UserHome",
    component: UserHome,
  },
  {
    path: "/register-new-user",
    name: "RegisterNewUser",
    component: RegisterNewUser,
  },
  {
    path: "/list-users",
    name: "ListUsers",
    component: ListUsers,
  },
  {
    path: "/employee-demands",
    name: "EmployeeDemands",
    component: EmployeeDemands,
  },
  {
    path: "/temp-table-demands/:id",
    name: "TempTableDemands",
    component: TempTableDemands,
  },
  {
    path: "/make-new-demand",
    name: "MakeNewDemand",
    component: MakeNewDemand,
  },
  {
    path: "/costumer_tables",
    name: "CostumerTable",
    component: CostumerTable,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
