import { createRouter, createWebHashHistory } from "vue-router";

import Welcome from "../components/welcome/Welcome.vue";
import Home from "../components/home/Home.vue";
import AddServiceAccount from "../components/serviceAccount/AddServiceAccount.vue"

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/', component: Home
  },
  {
    path: '/welcome', component: Welcome
  },
  {
    path: '/addServiceAccount/:type', component: AddServiceAccount
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;