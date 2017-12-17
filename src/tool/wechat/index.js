import config from "../config";
import T from "../tool";

class Wechat {
  getOpenId() {
    return T.getQueryField("openid") || localStorage.getItem("openid");
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
}

export default new Wechat()
