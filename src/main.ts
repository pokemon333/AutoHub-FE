import { createApp } from 'vue'
import { createPinia} from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from '@/app/core/router'
import FontAwesomeIcon from './fontawsome'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia  = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.mount('#app')
