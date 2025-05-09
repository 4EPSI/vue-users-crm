import { createApp } from 'vue'
import routers from './routers'
import { store } from './store'
import App from './App.vue'
import './assets/scss/main.scss'

const app = createApp(App)

app.use(routers)
app.use(store)


app.mount('#app')