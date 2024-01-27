import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
import Difference from "./components/Difference.vue";
import Run from "./views/Run.vue";
import Card from "./components/Card.vue";
app.component('Run', Run);
app.component('Difference', Difference);
app.component('Card', Card);
app.mount('#app')
