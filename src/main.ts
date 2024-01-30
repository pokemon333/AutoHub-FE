import { createApp } from 'vue'
import { createPinia} from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from '@/app/core/router/index.ts'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createHead } from '@unhead/vue'

const head = createHead()
const pinia  = createPinia()
pinia.use(createPersistedState())

createApp(App)
.use(router)
.use(pinia)
.use(head)
.mount('#app')
