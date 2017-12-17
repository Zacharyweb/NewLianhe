// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PubSub from 'pubsub-js'
import store from './tool/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import R from "./tool/signalr/signalr-clientES5-1.0.0-alpha2-final";
import filter from "./tool/filter"

Vue.prototype.$PubSub = PubSub;
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

let indexScrollTop = 0;

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
    store.dispatch("wechatLogin");
  }
})
