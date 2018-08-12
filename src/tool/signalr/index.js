import config from "../config";
import * as signalR from "@aspnet/signalr";

class ChartService {

  //保存当前链接对象
  connection = null;
  //标记当前是否已手动终止链接，否则断线自动重连
  stoped = true;
  state = null;
  //当前咨询订单
  order = null;
  //默认事件
  events = {
    onSend: (data) => {
      console.log(data)
    },
    onStart: (userId) => {
      console.log("chat start")
    },
    onLeave: (userId) => {
      console.log(`user ${userId} leaved`);
    }
  }

  send(data) {
    let that = this;
    let userId = that.state.user.id;
    data = {
      ...data,
      expertOrderId: that.order.id,
      expertId: userId,
      experReceiverId: userId === that.order.expertId ?
        that.order.serverExpertId : that.order.expertId,
    }
    this.connection.invoke("sendToGroup", this.order.id, data);
  }

  join(userId) {
    if (userId != this.state.user.id) {
      this.connection.invoke("startChat", this.order.id);
    }
  }

  start(state, order, events) {
    this.order = order;
    this.state = state;
    this.events = {
      ...this.events,
      ...events
    }
    let that = this;
    let url = `${config.chatip}/?token=${encodeURIComponent(state.encryptToken)}`;
    return this
      .startConnection(url)
      .then(connection => {
        console.log('Connected to SignalR server!');
        that.stoped = false;
        that.connection = connection;
        that.configureConnection(url);
        that.configureConnectionEvent(connection);
        connection.invoke("joinGroup", that.order.id);
      });
  }

  stop() {
    this.connection.invoke("leaveGroup", this.order.id).then(() => {
      this.stoped = true;
      this.connection && this.connection.stop();
    });
  }

  configureConnectionEvent(connection) {
    let that = this;
    connection.on("sendToGroup", (data) => {
      that.events.onSend(data);
    });
    connection.on("joinGroup", userId => {
      that.join(userId);
    });
    connection.on("startChat", userId => {
      that.events.onStart(userId);
    });
    connection.on("leaveGroup", userId => {
      that.events.onLeave(userId);
    });
  }

  configureConnection(url) {

    let that = this;
    this.connection.onclose(e => {
      if (that.stop) return;
      connect();
    });

    function connect() {
      setTimeout(function () {
        that.start(url, that.order, that.events).catch(() => {
          connect()
        });
      }, 5000);
    }
  }

  startConnection(url) {
    return function start(transport) {
      console.log(`Starting connection using ${signalR.HttpTransportType[transport]} transport`);
      var connection = new signalR.HubConnectionBuilder()
        .withUrl(url, transport)
        .build();

      return connection.start()
        .then(function () {
          return connection;
        })
        .catch(function (error) {
          console.log(`Cannot start the connection using ${signalR.HttpTransportType[transport]} transport. ${error.message}`);
          if (transport !== signalR.HttpTransportType.LongPolling) {
            return start(transport + 1);
          }

          return Promise.reject(error);
        });
    }(signalR.HttpTransportType.WebSockets);
  }
}

export default new ChartService()
