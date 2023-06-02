import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
const ctgy = () => import('../views/ctgy/index.vue')
const routes: RouteRecordRaw[] = [{
  name: 'ctgy',
  path: '/ctgy',
  component: ctgy
}, {
  name: 'default',
  path: '/',
  component: ctgy
}]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router