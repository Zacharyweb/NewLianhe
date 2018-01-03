import config from "../config";

class ChartService {

  connection = null;

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
        that.connection = connection;
        that.configureConnection(url, orderId, listener);
        connection.on("sendToGroup", listener);
        connection.invoke("joinGroup", orderId);
      });
  }

  stop() {
    this.connection.stop();
  }

  configureConnection(url, orderId, listener) {

    let that = this;
    this.connection.onclose(e => {
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
