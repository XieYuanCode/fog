import { createRouter, createWebHashHistory } from "vue-router";

import Welcome from "../components/welcome/Welcome.vue";
import Home from "../components/home/Home.vue";
import AddServiceAccount from "../components/serviceAccount/AddServiceAccount.vue"
import Setting from "../components/setting/Setting.vue"
import CloneGit from "../components/window/CloneGit.vue"

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
  },
  {
    path: '/setting', component: Setting
  },
  {
    path: '/clone', component: CloneGit
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;