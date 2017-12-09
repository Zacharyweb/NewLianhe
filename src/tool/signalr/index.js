import config from "../config";

class ChartService {

  connection = null;

  send(orderId, data) {
    this.connection.invoke("sendToGroup", orderId, data);
  }

  start(token, orderId, listener) {
    var transportType = signalR.TransportType.ServerSentEvents;
    this.connection = new signalR.HubConnection(config.chatip + "/?token=" + token, {
      transport: transportType
    });

    this.connection.on("sendToGroup", listener);

    this.connection.start().then(() => {
      this.connection.invoke("joinGroup", orderId)
    });
  }

  stop() {
    this.connection.stop();
  }
}

export default new ChartService()
