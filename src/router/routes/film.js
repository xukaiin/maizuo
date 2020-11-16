import comingsoon from '../../views/film/comingsoon.vue'
import nowplaying from '../../views/film/nowplaying.vue'


export default {
    path: '/film',
    component: () => import('@/views/film/film.vue'),
    children: [
        { path: 'comingsoon', component: comingsoon },
        { path: 'nowplaying', component: nowplaying }
    ]
}