import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from '@/app/core/router'

createApp(App)
.use(router)
.mount('#app')
