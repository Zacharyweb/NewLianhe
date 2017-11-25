import T from "../tool/tool";
import Axios from 'axios'

class Api {
  constructor() {
    //拦截器，附加Authorization头信息
    Axios.interceptors.request.use(function (config) {
      config.headers['Authorization'] = "Bearer " + localStorage.getItem("token");
      return config;
    });
    Axios.interceptors.response.use(function (res) {
      return res;
    }, function (err) {
      if (!err.response) return;
      var showErr = err.response.data.error.message;
      if (err.response.data.error.validationErrors) {
        showErr = err.response.data.error.validationErrors.map(err => err.message).join(",");
      }
      T.Alert({
        text: showErr
      })
      return Promise.reject(err);
    })
  }

  GetGroupedByClassExperts = () => {
    return T.get({
      url: "services/app/Expert/GetGroupedByClassExperts"
    });
  };

  GetExpertDetail = (accountId) => {
    return T.get({
      url: "services/app/Expert/GetExpertDetail",
      data: {
        accountId: accountId
      }
    });
  };

  GetExpertLoginInfo = () => {
    return T.get({
      url: "services/app/Expert/GetExpertLoginInfo"
    });
  };

  GetAllExpertClasses = () => {
    return T.get({
      url: "services/app/Expert/GetAllExpertClasses"
    })
  }

  UpdateNonExpert = (data) => {
    return T.put({
      url: "services/app/Expert/UpdateNonExpert",
      data: data
    })
  };

  UpdateExpert = (data) => {
    return T.put({
      url: "services/app/Expert/UpdateExpert",
      data: data
    })
  };

  Register = (data) => {
    return T.post({
      url: "/TokenAuth/Register",
      data: data
    })
  }
}

export default new Api()
