import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// 创建Vue实例并挂载路由
const app = createApp(App)
app.use(router)
app.mount('#app')

// 手机端日志（可选）
console.log('✨ 生日祝福页面加载成功')