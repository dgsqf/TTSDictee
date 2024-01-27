import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RunView from '../views/Run.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/run/:id',
      name: 'run',
      component: RunView
    }
   
  ]
})

export default router
