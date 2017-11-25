// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PubSub from 'pubsub-js'
import store from './tool/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.prototype.$PubSub = PubSub;
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
// var store = new Vuex.Store({
//   state: {
//     identity: 99, // 存储当前用户身份 0：普通用户 1：专家用户 99:身份未确认
//     accessToken: '', //当前用户授权token信息
//     user: {} //当前用户信息
//   },
//   mutations: {
//     change_identity(state, identity) {
//       state.identity = identity;
//     },
//     change_auth(state, token) {
//       state.accessToken = token
//       localStorage.setItem("token", token.accessToken);
//     },
//     change_user(state, user) {
//       state.user = user
//     }
//   }
// })



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
  components: {
    App
  },
  mounted() {
    store.dispatch("initTokenFromLocal");
  }
})
