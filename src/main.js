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
Vue.filter('onlinestatus', function (value) {
  switch (value) {
    case 1:
      return "休息中"
      break;
    case 2:
      return "营业中";
    default:
      return "未知"
      break;
  }
})
Vue.filter('weekday', function (value) {
  switch (value) {
    case 1:
      return "周一"
      break;
    case 2:
      return "周二";
    case 3:
      return "周三"
      break;
    case 4:
      return "周四";
    case 5:
      return "周五"
      break;
    case 6:
      return "周六";
    case 6:
      return "周天";
    default:
      return "未知"
      break;
  }
})
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
