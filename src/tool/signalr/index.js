import config from "../config";

class ChartService {

  //保存当前链接对象
  connection = null;
  //标记当前是否已手动终止链接，否则断线自动重连
  stoped = true;

  send(orderId, data) {
    this.connection.invoke("sendToGroup", orderId, data);
  }

  start(token, orderId, listener) {
    let that = this;
    let url = config.chatip + "/?token=" + token;
    return this
      .startConnection(url)
      .then(connection => {
        console.log('Connected to SignalR server!');
        that.stoped = false;
        that.connection = connection;
        that.configureConnection(url, orderId, listener);
        connection.on("sendToGroup", listener);
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
