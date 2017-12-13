import T from "../tool/tool";
import Axios from 'axios'

class Api {
  constructor() {
    //拦截器，附加Authorization头信息
    Axios.interceptors.request.use(function (config) {
      config.headers['Authorization'] = "Bearer " + localStorage.getItem("token");
      return config;
    });
    //错误友好提示
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

  GetExpertDetail = (data) => {
    return T.get({
      url: "services/app/Expert/GetExpertDetail",
      data: data
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

  GetExpertPrice = (id) => {
    return T.get({
      url: "services/app/Expert/GetExpertPrice",
      data: {
        expertId: id
      }
    })
  }

  GetLoggedIndExpertOrders = (data) => {
    return T.get({
      url: "services/app/ExpertOrder/GetLoggedIndExpertOrders",
      data: data
    })
  }

  GetExpertOrderDetail = (id) => {
    return T.get({
      url: "services/app/ExpertOrder/GetExpertOrderDetail",
      data: {
        orderId: id
      }
    })
  }

  GetExperts = (data) => {
    return T.get({
      url: "services/app/Expert/GetExperts",
      data: data
    })
  }

  UpdateNonExpert = (data) => {
    return T.post({
      url: "services/app/Expert/CreateNonExpert",
      data: data
    })
  };

  UpdateExpert = (data) => {
    return T.post({
      url: "services/app/Expert/CreateExpert",
      data: data
    })
  };

  Register = (data) => {
    return T.post({
      url: "/TokenAuth/Register",
      data: data
    })
  }

  RegisterOrAuthenticate = (data) => {
    return T.post({
      url: "/TokenAuth/RegisterOrAuthenticate",
      data: data
    })
  }

  CreateOrder = (data) => {
    return T.post({
      url: "services/app/ExpertOrder/CreateOrder",
      data: data
    })
  }

  CancelOrder = (orderId) => {
    return T.post({
      url: "services/app/ExpertOrder/CancelOrder",
      data: {
        id: orderId
      }
    })
  }

  RefuseOrder = (orderId) => {
    return T.post({
      url: "services/app/ExpertOrder/RefuseOrder",
      data: {
        id: orderId
      }
    })
  }

  AcceptOrder = (orderId) => {
    return T.post({
      url: "services/app/ExpertOrder/AcceptOrder",
      data: {
        id: orderId
      }
    })
  }

  PayOrder = (orderId) => {
    return T.post({
      url: "services/app/ExpertOrder/PayOrder",
      data: {
        id: orderId
      }
    })
  }

  GetExpertOrderChats = (orderId) => {
    return T.get({
      url: "services/app/ExpertChatService/GetExpertOrderChats",
      data: {
        orderId: orderId
      }
    })
  }

  CreateExpertChat = (data) => {
    return T.post({
      url: "services/app/ExpertChatService/CreateExpertChat",
      data: data
    })
  }

  CreateExpertFriend = (data) => {
    return T.post({
      url: "services/app/Expert/CreateExpertFriend",
      data: data
    })
  }

  GetExpertFriends = () => {
    return T.get({
      url: "services/app/Expert/GetExpertFriends"
    })
  }

  GetNonExpert = () => {
    return T.get({
      url: "services/app/Expert/GetNonExpert"
    })
  }

  GetExpert = () => {
    return T.get({
      url: "services/app/Expert/GetExpert"
    })
  }

  CompleteOrder = (orderId) => {
    return T.post({
      url: "services/app/ExpertOrder/CompleteOrder",
      data: {
        id: orderId
      }
    })
  }

  CommentOrder = (data) => {
    return T.post({
      url: "services/app/ExpertOrder/CommentOrder",
      data: data
    })
  }

  GetExpertOrderComment = (orderId) => {
    return T.get({
      url: "services/app/ExpertOrder/GetExpertOrderComment",
      data: {
        orderId: orderId
      }
    })
  }

}

export default new Api()
