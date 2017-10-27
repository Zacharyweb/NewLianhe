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



let indexScrollTop = 0;



// 页面回退滚动到之前位置 或者 启用router的history模式下的scrollBehavior
// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   if (from.path.indexOf('/order/detail') != -1) {
//       indexScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
//   }
//   if (to.path.indexOf('/order/detail') != -1) {
//       window.scrollTo(0, 100);
//   }
//   next();
// });



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
