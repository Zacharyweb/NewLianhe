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
    if (!T.isWeixin() || location.host.startsWith("localhost")) {
      alert("请在微信内打开");
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

  toPay(order) {
    if (typeof WeixinJSBridge == "undefined") {
      T.showToast({
        text: "请用微信打开支付"
      });
      return Promise.resolve();
    }
    return api.CreateOrderPayment(order.id).then(res => {
      let data = res.data.result;
      var promise = new Promise((resolve, reject) => {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest", {
            ...data
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              resolve(order);
            } else reject();
          }
        );
      });
      return promise;
    }).then(order => {
      return api.GetPaymentStatus(order.id);
    });
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 9,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          T.showLoading();
          resolve(res.localIds);
        },
        cancel: function () {
          reject();
        }
      });
    }).then(localIds => {
      return Promise.all(localIds.map((localId, num) => {
        return new Promise((resolve, reject) => {
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
              return resolve(res.serverId)
            }
          });
        })
      }));
    }).then(serverIds => {
      return Promise.all(serverIds.map((serverId, num) => {
        return api.UploadCos(serverId);
      }))
    }).then(results => {
      return Promise.resolve(results.map(result => {
        return result.data.result.data.access_url;
      }))
    });
  }

  stopRecord(that) {
    return new Promise((resolve, reject) => {
      wx.stopRecord({
        success: function (res) {
          that.voiceInputTipsShow = false;
          resolve(res.localId);
        },
        cancel: reject
      });
    }).then(localId => {
      return new Promise((resolve, reject) => {
        wx.uploadVoice({
          localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            resolve(res.serverId);
          },
          cancel: reject
        });
      })
    }).then(serverId => {
      return api.UploadCos(serverId);
    }).then(result => {
      return Promise.resolve(result.data.result.data.access_url);
    });
  }
}

export default new Wechat()
