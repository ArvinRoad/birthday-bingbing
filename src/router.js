import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Star from './views/Star.vue'

const router = createRouter({
  history: createWebHistory('/birthday-bingbing/'),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/star', name: 'Star', component: Star },
    // 404路由（可选）
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  // 手机端路由切换滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router