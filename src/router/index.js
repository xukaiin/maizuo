import Vue from 'vue'
import VueRouter from 'vue-router'
import center from '@/router/routes/center.js'
import film from '@/router/routes/film.js'
import cinema from '@/router/routes/cinema.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // component: () => import('../views/film'),
    redirect: '/film/nowplaying'

  },
  center,
  film,
  cinema
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
