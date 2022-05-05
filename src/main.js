import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
 
// 1. instantiate app.
// 2. connect plugin whcih you want to use.
// 3. mount app on '#app'
const app = createApp(App)
app.use(router)
app.mount('#app')

