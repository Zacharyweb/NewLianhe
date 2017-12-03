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

// global filters
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
Vue.filter('orderstatus', function (value) {
  switch (value) {
    case 1:
      return "待确认"
      break;
    case 2:
      return "待支付";
    case 3:
      return "待咨询"
      break;
    case 4:
      return "咨询完成";
    case 5:
      return "已评价"
      break;
    case -1:
      return "已取消";
    case -2:
      return "已拒绝";
    default:
      return "已取消"
      break;
  }
})
Vue.filter("datetime", function (date, fmt) {
  if (!date) return null;
  date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "H+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
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
