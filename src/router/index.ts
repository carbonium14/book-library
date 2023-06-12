import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
const ctgy = () => import('../views/ctgy/index.vue')
const books = () => import('../views/books/index.vue')
const shopcartlist = () => import('../views/shopcartlist/shopcartlist.vue')
const routes: RouteRecordRaw[] = [{
  name: 'default',
  path: '/',
  component: ctgy
}, {
  name: 'ctgy',
  path: '/ctgy',
  component: ctgy
}, {
  name: 'books',
  path: '/books',
  component: books
}, {
  name: 'shopcartlist',
  path: '/shopcartlist',
  component: shopcartlist
}]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router