import { createApp } from 'vue'
import { createPinia} from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from '@/app/core/router/index.ts'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia  = createPinia()
pinia.use(createPersistedState())

createApp(App)
.use(router)
.use(pinia)
.mount('#app')
