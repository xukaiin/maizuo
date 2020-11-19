import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
Vue.config.productionTip = false
//懒加载
import VueLazyload from 'vue-lazyload'



const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



Vue.use(VueLazyload, {
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605768062406&di=3e75e5f2ca92e2cb1f618d879a92ef3d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1f828e876d3b9aed1bcd3213f28db91c0e8f44589965-9droKD_fw658',
});

Vue.prototype.eventBus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
