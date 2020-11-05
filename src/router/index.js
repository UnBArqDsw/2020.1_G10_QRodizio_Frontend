import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

// Employee routes
import UserLogin from "../views/employee/UserLogin.vue";
import UserHome from "../views/employee/UserHome.vue";
import RegisterNewUser from "../views/employee/RegisterNewUser";
import ListUsers from "../views/employee/ListUsers";
import EmployeeDemands from "../views/employee/EmployeeDemands";
import CreateTable from "../views/employee/CreateTable";
import ListTables from "../views/employee/ListTables";
import ViewSession from "../views/employee/ViewSession";
import EditUser from "../views/employee/EditUser";

// Customer routes
import CustomerTable from "../views/customer/CustomerTable";
import TempTableDemands from "../views/customer/TempTableDemands";
import MakeNewDemand from "../views/customer/MakeNewDemand";
import MakePayment from "../views/customer/MakePayment";

Vue.use(VueRouter);

const routes = [
  /** ################################################################### */
  /** ################## EMPLOYEE ROUTES ################################ */
  /** ################################################################### */
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
    path: "/create-table",
    name: "CreateTable",
    component: CreateTable,
  },
  {
    path: "/list-tables",
    name: "ListTables",
    component: ListTables,
  },
  {
    path: "/view-session/:id",
    name: "ViewSession",
    component: ViewSession,
  },
  {
    path: "/edit-user",
    name: "EditUser",
    component: EditUser, 
  },

  /** ################################################################### */
  /** ################## CUSTOMER ROUTES ################################ */
  /** ################################################################### */
  {
    path: "/temp-table-demands/:id",
    name: "TempTableDemands",
    component: TempTableDemands,
  },
  {
    path: "/make-new-demand/:sessionUrl",
    name: "MakeNewDemand",
    component: MakeNewDemand,
  },
  {
    path: "/table/:url",
    name: "CustomerTable",
    component: CustomerTable,
  },
  {
    path: "/payment/:url",
    name: "MakePayment",
    component: MakePayment,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
