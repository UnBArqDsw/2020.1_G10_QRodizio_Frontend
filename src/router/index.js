import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserLoggin from "../views/UserLoggin.vue";
import UserHome from "../views/UserHome.vue";
import RegisterNewUser from "../views/RegisterNewUser";
import ListUsers from "../views/ListUsers";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
})

export default router
