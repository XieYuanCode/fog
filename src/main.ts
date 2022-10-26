import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.less';
import router from "./route"
import { createPinia } from 'pinia'
import i18n from "./locale";
import "./style/index.css"

createApp(App)
  .use(router)
  .use(ArcoVue, {
    componentPrefix: "Fog"
  })
  .use(ArcoVueIcon)
  .use(i18n)
  .use(createPinia())
  .mount('#app')
