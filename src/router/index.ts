import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import storage from '../utils/goodstorageUtil'
import { ElMessage } from 'element-plus'
const ctgy = () => import('../views/ctgy/index.vue')
const books = () => import('../views/books/index.vue')
const shopcartlist = () => import('../views/shopcartlist/shopcartlist.vue')
const search = () => import('../views/search/index.vue')
const login = () => import('../views/userinfo/login.vue')
const bookdetail = () => import('../views/bookdetail/index.vue')
const goods = () => import('../views/bookdetail/components/goods.vue')
const evaluate = () => import('../views/bookdetail/components/evaluate/index.vue')
const home = () => import('../views/home/home.vue')
const order = () => import('../views/orderinfo/index.vue')
const ordersort = () => import('../views/orderinfo/ordersort/index.vue')
const routes: RouteRecordRaw[] = [{
  name: 'default',
  path: '/',
  component: home
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
}, {
  name: 'search',
  path: '/search',
  component: search
}, {
  name: 'login',
  path: '/login',
  component: login,
  beforeEnter(to, from, next) {
    const token = storage.get('token')
    if (token) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
}, {
  name: 'bookdetail',
  path: '/bookdetail',
  redirect: '/goods',
  component: bookdetail,
  children: [{
    name: 'goods',
    path: '/goods',
    component: goods
  }, {
    name: 'evaluate',
    path: '/evaluate',
    component: evaluate
  }]
}, {
  name: 'home',
  path: '/home',
  component: home
}, {
  name: 'order',
  path: '/order',
  component: order
}, {
  name: 'ordersort',
  path: '/ordersort',
  component: ordersort
}]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
const pathArr = ['/login']
router.beforeEach((to, from, next) => {
  const token = storage.get('token')
  if (token || pathArr.indexOf(to.path) !== -1) {
    next()
  } else {
    ElMessage.info({
      message: '请先登录再进行操作'
    })
    next({
      path: '/login'
    })
  }
})
export default router