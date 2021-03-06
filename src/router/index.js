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
import NewSession from "../views/employee/NewSession";
import ViewSession from "../views/employee/ViewSession";
import EditUser from "../views/employee/EditUser";
import ListMenus from "../views/employee/ListMenus";
import CreateMenu from "../views/employee/CreateMenu";
import EditMenu from "../views/employee/EditMenu";
import DisplayTableQRCode from "../views/employee/DisplayTableQRCode"

// Customer routes
import CustomerTable from "../views/customer/CustomerTable";
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
    name: "Home",
    component: Home,
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
    path: "/new-session",
    name: "NewSession",
    component: NewSession
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
  {
    path: "/list-menus",
    name: "ListMenus",
    component: ListMenus
  },
  {
    path: "/create-menu",
    name: "CreateMenu",
    component: CreateMenu
  },
  {
    path: "/edit-menu",
    name: "EditMenu",
    component: EditMenu
  },
  {
    path: "/display-table-qrcode/:id",
    name: "DisplayTableQRCode",
    component: DisplayTableQRCode
  },

  /** ################################################################### */
  /** ################## CUSTOMER ROUTES ################################ */
  /** ################################################################### */
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
