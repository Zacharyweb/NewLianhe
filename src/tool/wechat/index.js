import config from "../config";
import T from "../tool";
import api from "../../ajax/index";

class Wechat {
  getOpenId() {
    return T.getQueryField("openid") || localStorage.getItem("openid");
  }

  getAccessToken() {
    return T.getQueryField("token");
  }

  login(callback) {
    if (!config.enablewechatlogin || location.host.startsWith("localhost")) {
      callback();
      return;
    }
    var openid = this.getOpenId();
    if (!openid || openid == "undefined") {
      console.log(config.wechatlogin)
      location = config.wechatlogin;
    } else {
      localStorage.setItem("openid", openid);
      callback();
    }
  }

  logout() {
    localStorage.removeItem("openid");
  }

  initJsSdk(callback) {
    api.JsSdkConfig(location.href.split("#")[0]).then(res => {
      var config = {
        ...res.data.result,
        debug: false,
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "translateVoice",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "onVoicePlayEnd",
          "pauseVoice",
          "stopVoice",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard"
        ]
      };
      wx.config(config);
    });
    wx.ready(callback || function () {});
  }
}

export default new Wechat()
