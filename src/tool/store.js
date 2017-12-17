import Vue from 'vue'
import Vuex from 'vuex'
import api from '../ajax/index'
import wechat from './wechat/index'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    identity: 0, // 存储当前用户身份 0：普通用户 1：专家用户 99:身份未确认
    accessToken: '', //当前用户授权token信息
    user: {}, //当前用户信息
    exper: ["3年以下", "3-5年", "5-10年", "10年以上"],
    weeks: {
      "周一": 1,
      "周二": 2,
      "周三": 3,
      "周四": 4,
      "周五": 5,
      "周六": 6,
      "周天": 7
    }
  },
  mutations: {
    change_identity(state, identity) {
      state.identity = identity;
    },
    change_auth(state, token) {
      state.accessToken = token
    },
    change_user(state, user) {
      state.user = user
    }
  },
  actions: {
    wechatLogin({
      dispatch,
      commit
    }) {
      wechat.login(() => {
        return dispatch("initTokenFromLocal");
      })
    },

    initTokenFromLocal({
      dispatch,
      commit
    }) {
      var token = localStorage.getItem("token");
      if (!token) return;
      api.GetExpertLoginInfo().then((res) => {
        commit("change_auth", token);
        return dispatch("getLoginInfo");
      })
    },
    getLoginInfo({
      commit
    }) {
      return api.GetExpertLoginInfo().then((res) => {
        var user = res.data.result;
        commit("change_user", user);
        commit("change_identity", user.isExpert ? 1 : 0);
        return user;
      })
    },
    login({
      dispatch,
      commit,
      state
    }, data) {
      return api.RegisterOrAuthenticate(data).then((res) => {
        var token = res.data.result.accessToken;
        commit("change_auth", token);
        localStorage.setItem("token", token);
        return dispatch("getLoginInfo");
      })
    },
    logout({
      commit
    }) {
      localStorage.removeItem("token");
      commit("change_user", {});
      commit("change_identity", 0);
    }
  }
})

export default store
