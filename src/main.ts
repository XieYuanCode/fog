import { createApp } from 'vue'
import App from './App.vue'

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

import router from "./route"
import { createPinia } from 'pinia'

import "./style/index.css"

createApp(App)
  .use(router)
  .use(ArcoVue, {
    componentPrefix: "Fog"
  })
  .use(createPinia())
  .mount('#app')
