import config from "../config";
import T from "../tool";

class ChartService {

  //保存当前链接对象
  connection = null;
  //标记当前是否已手动终止链接，否则断线自动重连
  stoped = true;
  state = null;
  orderId = null;

  send(data) {
    this.connection.invoke("sendToGroup", this.orderId, data);
  }

  join(userId) {
    if (userId != this.state.user.id) {
      this.connection.invoke("startChat", this.orderId);
    }
  }

  startChat() {
    T.showToast({
      text: "可以开始咨询啦"
    });
  }

  start(state, orderId, listener) {
    this.orderId = orderId;
    this.state = state;
    let that = this;
    let url = config.chatip + "/?token=" + encodeURIComponent(state.encryptToken);
    return this
      .startConnection(url)
      .then(connection => {
        console.log('Connected to SignalR server!');
        that.stoped = false;
        that.connection = connection;
        that.configureConnection(url, orderId, listener);
        connection.on("sendToGroup", listener);
        connection.on("joinGroup", userId => {
          that.join(userId);
        });
        connection.on("startChat", () => {
          that.startChat();
        });
        connection.invoke("joinGroup", orderId);
      });
  }

  stop() {
    this.stoped = true;
    this.connection && this.connection.stop();
  }

  configureConnection(url, orderId, listener) {

    let that = this;
    this.connection.onclose(e => {
      if (that.stop) return;
      connect();
    });

    function connect() {
      setTimeout(function () {
        that.start(url, orderId, listener).catch(() => {
          connect()
        });
      }, 5000);
    }
  }

  startConnection(url) {
    return function start(transport) {
      console.log(`Starting connection using ${signalR.TransportType[transport]} transport`);
      var connection = new signalR.HubConnection(url, {
        transport: transport
      });

      return connection.start()
        .then(function () {
          return connection;
        })
        .catch(function (error) {
          console.log(`Cannot start the connection using ${signalR.TransportType[transport]} transport. ${error.message}`);
          if (transport !== signalR.TransportType.LongPolling) {
            return start(transport + 1);
          }

          return Promise.reject(error);
        });
    }(signalR.TransportType.WebSockets);
  }
}

export default new ChartService()
