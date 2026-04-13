import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Star from './views/Star.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/star', name: 'Star', component: Star },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],

  scrollBehavior() {
    return { top: 0 }
  }
})

export default router