import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'
import Index from '@/pages/index/index.vue';
import Login from '@/pages/login/index.vue';
import Register from '@/pages/register/index.vue';
import 'element-plus/theme-chalk/index.css';
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
  ]
})

const app = createApp(App);
app.use(router);
app.mount('#app');
