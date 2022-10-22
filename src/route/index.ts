import { createRouter, createWebHashHistory } from "vue-router";

import Welcome from "../components/welcome/Welcome.vue";
import Home from "../components/home/Home.vue";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/', component: Home
  },
  {
    path: '/welcome', component: Welcome
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;