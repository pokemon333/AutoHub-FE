import { createApp } from 'vue'
import { createPinia} from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from '@/app/core/router'
import FontAwesomeIcon from './fontawsome'


const pinia  = createPinia()
createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.mount('#app')
