import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory()


import Home from './pages/Home.vue'
import Users from './pages/Users.vue'
import noteFoundPage from './pages/404.vue'

const routers = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Users',
      name: 'users',
      component: Users
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: noteFoundPage
    }
  ]
})

export default routers