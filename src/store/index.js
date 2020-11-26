import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '上海',
    cityId: 310100,
    mobile: '请登录',
  },
  mutations: {
    add(state, step) {
      console.log("我进入mutations里面了add ");
      console.log('step', step)
      state.city = step
    },
    add1(state, cityid) {
      console.log("我进入mutations里面了add1 ");
      console.log('cityid', cityid)
      state.cityId = cityid
    },
    addmobile(state,mobile) {
      state.mobile = mobile
    }
  },
  actions: {
  },
  modules: {
  }
})
