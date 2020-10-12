import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import UserLoggin from "../views/UserLoggin.vue";
import UserHome from "../views/UserHome.vue";
import RegisterNewUser from "../views/RegisterNewUser";
import ListUsers from "../views/ListUsers";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/loggin",
    name: "Loggin",
    component: UserLoggin
  },
  {
    path: "/user-home",
    name: "UserHome",
    component: UserHome
  },
  {
    path: "/register-new-user",
    name: "RegisterNewUser",
    component: RegisterNewUser
  },
  {
    path: "/list-users",
    name: "ListUsers",
    component: ListUsers
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
