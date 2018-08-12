import config from "../config";
import C from "./cos-js-sdk-v4";
import T from "./crypto";

class CosCloudUpload {
  cosCloud = null;
  constructor() {
    this.cosCloud = new CosCloud({
      appid: config.cos.appid,
      bucket: config.cos.bucket,
      region: config.cos.region,
      getAppSign: function (callback) {
        var self = this;
        var random = parseInt(Math.random() * Math.pow(2, 32));
        var now = parseInt(Date.now() / 1000);
        var e = now + 600; //签名过期时间为当前+600s
        var path = ''; //多次签名这里填空
        var str = 'a=' + self.appid + '&k=' + config.cos.sid + '&e=' + e + '&t=' + now + '&r=' + random + '&f=' + path + '&b=' + self.bucket;
        var sha1Res = CryptoJS.HmacSHA1(str, config.cos.skey); // 这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
        var strWordArray = CryptoJS.enc.Utf8.parse(str);
        var resWordArray = sha1Res.concat(strWordArray);
        var res = resWordArray.toString(CryptoJS.enc.Base64);
        callback(res);
      },
      getAppSignOnce: function (callback) {
        var self = this;
        var random = parseInt(Math.random() * Math.pow(2, 32));
        var now = parseInt(Date.now() / 1000);
        var e = 0; // 单次签名 expire==0
        var path = self.path;
        var str = 'a=' + self.appid + '&k=' + config.cos.sid + '&e=' + e + '&t=' + now + '&r=' + random + '&f=' + path + '&b=' + self.bucket;
        var sha1Res = CryptoJS.HmacSHA1(str, config.cos.skey); // 这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
        var strWordArray = CryptoJS.enc.Utf8.parse(str);
        var resWordArray = sha1Res.concat(strWordArray);
        var res = resWordArray.toString(CryptoJS.enc.Base64);
        callback(res);
      }
    });
  }

  upload(file, success) {
    this.cosCloud.uploadFile(success,
      this.errorCallBack, this.progressCallBack, config.cos.bucket, config.cos.myFolder + file.name, file, 0);
    return new Promise((resolve, reject) => {
      this.cosCloud.uploadFile((result) => {
        this.successCallBack(result);
        resolve(result);
      }, (result) => {
        this.errorCallBack(result);
        reject(result);
      }, this.progressCallBack, config.cos.bucket, config.cos.myFolder + file.name, file, 0);
    });
  }

  successCallBack(result) {
    console.log(result);
  }

  errorCallBack(result) {
    result = result || {};
    console.log(result);
  }
  progressCallBack(curr, sha1) {
    var sha1CheckProgress = ((sha1 * 100).toFixed(2) || 100) + '%';
    var uploadProgress = ((curr || 0) * 100).toFixed(2) + '%';
    var msg = 'upload progress:' + uploadProgress + '; sha1 check:' + sha1CheckProgress + '.';
    console.log(msg);
  }

}

export default new CosCloudUpload();
