import Vue from 'vue'
import VueRouter from 'vue-router'
import center from '@/router/routes/center.js'
import film from '@/router/routes/film.js'
import cinema from '@/router/routes/cinema.js'
import detail from '@/router/routes/detail.js'
import city from '@/router/routes/city.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // component: () => import('../views/film'),
    redirect: '/film/nowplaying'

  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  center,
  film,
  cinema,
  detail,
  city
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
