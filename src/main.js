// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import PubSub from 'pubsub-js'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.prototype.$PubSub = PubSub;
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
var store = new Vuex.Store({
  state: {
    identity: 99 // 存储当前用户身份 0：普通用户 1：专家用户 99:身份未确认
  },
  mutations: {
    change_identity(state,identity){
      state.identity = identity;
    }
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted(){
    // let identity = localStorage.getItem('USER_IDENTITY') || 99;
    let identity = sessionStorage.getItem('USER_IDENTITY') || 99;
    this.$store.commit('change_identity',identity);
  }
})
