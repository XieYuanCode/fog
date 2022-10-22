import { createApp } from 'vue'
import App from './App.vue'

import router from "./route"

import "./style/index.css"

createApp(App)
  .use(router)
  .mount('#app')
