<template>
    <div class="order-detail">
    <div class="step-line">
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 1}"></span>
        <span class="circle-icon" :class="{'current':status == 1,'prev':status > 1}"></span>
        <p class="step-name bottom">发起咨询</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 1}"></span>
        <span class="circle-icon" :class="{'current':status == 1,'prev':status > 1}"></span>
        <p class="step-name top">等待确认</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 2}"></span>
        <span class="circle-icon" :class="{'current':status == 2,'prev':status > 2}"></span>
        <p class="step-name bottom">支付费用</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 3}"></span>
        <span class="circle-icon" :class="{'current':status == 3,'prev':status > 3}"></span>
        <p class="step-name top">在线咨询</p>
      </div>
  
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 4}"></span>
        <span class="circle-icon" :class="{'current':status == 4,'prev':status > 4}"></span>
        <p class="step-name bottom">咨询完成</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 5}"></span>
        <span class="circle-icon" :class="{'current':status == 5,'prev':status > 5}"></span>
        <p class="step-name top">评价反馈</p>
      </div>

      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 5}"></span>
      </div>
    </div>
      <div class="top-block">
        <p class="block-title">
          {{status | orderstatus}}
          <span class="iconfont icon-youjiantou" 
                @click="()=>{this.orderStatusPanelShow = true}"
          ></span>
        </p>
        <div class="leave-time" v-if="status ==0">
            <span>剩余确认时间：</span>
            <count-timer class="count-timer" 
               ref="countTimer" 
               :show-icon="false"
               :counts="counts"  
               :on-end="countEnd" 
            />
        </div>
        
        <p class="status-tips" v-if="status == -1 && isCustomer">您已取消本次咨询，订单关闭。</p>
        <p class="status-tips" v-if="status == -1 && !isCustomer">客户已取消本次咨询，订单关闭。</p>
       

        <p class="status-tips" v-if="status == -2 && isCustomer">专家超时未确认或拒绝此次咨询，订单关闭。</p>
        <p class="status-tips" v-if="status == -2 && !isCustomer">您超时未确认或拒绝此次咨询，订单关闭。</p>

        <p class="status-tips" v-if="status == 1 && isCustomer">专家超过5分钟未确认，则订单自动关闭。</p>
        <p class="status-tips" v-if="status == 1 && !isCustomer">若您超过5分钟未确认，则订单自动关闭。</p>

        <p class="status-tips" v-if="status == 2 && isCustomer">专家已同意接受您的咨询请求，马上完成支付即可开始咨询~</p>
        <p class="status-tips" v-if="status == 2 && !isCustomer">您已同意接受此次的咨询，请等待客户支付咨询费用~</p>


        <p class="status-tips" v-if="status == 3 && isCustomer">您已支付咨询费用，进入咨询室即可与专家进行交流。</p>
        <p class="status-tips" v-if="status == 3 && !isCustomer">客户已支付咨询费用，进入咨询室即可与客户进行交流。</p>

        <p class="status-tips" v-if="status == 4 ">咨询完成，请等待系统结算。</p>


        <p class="status-tips" v-if="status == 5 && isCustomer">本次咨询已完成,快去对本次咨询做个评价分享吧~</p>
        <p class="status-tips" v-if="status == 5 && !isCustomer">本次咨询已完成,请等待客户评价</p>

        <!-- 专家拒绝 订单关闭 -->
        <div class="btn-area" v-if="status == -2">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>      
        </div>

        <!-- 客户取消 订单关闭 -->
        <div class="btn-area" v-if="status == -1">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
          <span v-if="isCustomer" class="btn btn-green btn-small" @click="toAppointment(order)">重新发起咨询</span>      
        </div>


        <!-- 等待确认 -->
        <div class="btn-area" v-if="status ==1 && isCustomer">
          <span class="btn btn-green btn-small" @click="toOrderList">返回订单列表</span>
          <span class="btn btn-green-outline btn-small" @click="cancelConsult(order)">取消咨询</span>
        </div>

        <div class="btn-area" v-if="status == 1 && !isCustomer">
            <span class="btn btn-green btn-small" @click="agreeOrder(order)">同意</span>
            <span class="btn btn-green-outline btn-small" @click="refuseOrder(order)">拒绝</span>
        </div>

        <!-- 等待支付 -->
        <div class="btn-area" v-if="status ==2 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
        </div>

        <div class="btn-area" v-if="status ==2 && isCustomer">
          <span class="btn btn-green-outline btn-small" @click="cancelConsult(order)">取消咨询</span>
          <span class="btn btn-green btn-small" @click="toPay(order)">立即支付</span>
        </div>

        <!-- 在线咨询 -->
        <div class="btn-area" v-if="status ==3">
          <span class="btn btn-green btn-small" @click="toChatRoom(order.id)">进入咨询室</span>
          <span class="btn btn-green-outline btn-small" @click="toOverChat">结束咨询</span>
        </div>

       <!-- 咨询完成 -->
        <div class="btn-area" v-if="status ==4 && isCustomer">
          <span class="btn btn-green btn-small" @click="toComment(order.id)">去评价</span>
          <span class="btn btn-green-outline btn-small" @click="toChatRoom(order.id)">咨询详情</span>
        </div>

        <div class="btn-area" v-if="status == 4 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toChatRoom(order.id)">咨询详情</span>
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
        </div>

        <!-- 评价完成 -->
        <div class="btn-area" v-if="status == 5 && isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toCommentDetail(order.id)">查看评价</span>
          <span class="btn btn-green-outline btn-small" @click="toChatRoom(order.id)">咨询详情</span>
     <!--       <span class="btn btn-green btn-small" @click="toAppointment(88)">再次咨询</span> -->
        </div>


        <div class="btn-area" v-if="status == 5 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toCommentDetail(order.id)">查看评价</span>
          <span class="btn btn-green-outline btn-small" @click="toChatRoom(order.id)">咨询详情</span>
        </div>

      </div>
      <div class="center-block">
        <p class="order-msg-item">下单时间：<span>{{order.creationTime | datetime('yyyy-MM-dd HH:mm:ss')}}</span></p>
        <p class="order-msg-item">订单编号：<span>{{order.orderNo}}</span></p>
      </div>
      <div class="bottom-block">
        <div class="detail-msg-item" v-if="status >=-2 && !isCustomer">
          <div class="msg-content">
            <span class="iconfont icon-yonghu1"></span>
            客户名称：{{order.expertName}}
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-2 && isCustomer">
          <div class="msg-content">
            <span class="iconfont icon-zhuanjiaku"></span>
            专家名称：{{order.serverExpertName}}
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-2">
          <div class="msg-content">
            <span class="iconfont icon-shiduan"></span>
            咨询时段：{{order.quantity}}节/{{order.totalDuration}}分钟
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-2">
          <div class="msg-content">
            <span class="iconfont icon-jine"></span>
            订单金额：￥{{order.amount}}
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-2">
          <h6 class="msg-title">
            <span class="iconfont icon-wenti"></span>
            问题描述
          </h6>
          <p class="problem-detail">
            {{order.questionRemark}}
          </p>
        </div>
        <template v-for="item in order.expertComments">
          <div class="detail-msg-item" :key="item.id">
            <div class="msg-content">
              <span class="iconfont icon-pingfen2"></span>
              评价：{{item.score}}分
            </div>
          </div>
          <div class="detail-msg-item" :key="item.id">
            <h6 class="msg-title">
              <span class="iconfont icon-pingjia1"></span>
              评价详情
            </h6>
            <div class="comment-detail">
              <img class="user-avatar" :src="item.avatar">
              <p class="comment-content text-ellipsis2"> {{item.content}}
              </p>
            </div>
            <p class="to-comment-detail" @click="toCommentDetail(item.id)">查看评论详情<span class="iconfont icon-jiantou-1"></span></p>
          </div>
        </template>

        <div class="detail-msg-item" v-if="status >=4 && !isCustomer">
          <h6 class="msg-title">
            <span class="iconfont icon-closeaccount"></span>
             结算汇总
          </h6>
          <div class="cost-list">
            <p class="list-item">
              <span>价格</span>
              <span class="add-text">￥{{order.amount}}</span>
            </p>
            <!-- <p class="list-item">
              <span>XX费</span>
              <span class="reduce-text">-￥30.00</span>
            </p>
            <p class="list-item">
              <span>XX费</span>
              <span class="reduce-text">-￥15.00</span>
            </p> -->
            <p class="list-item">
              <span>总计</span>
              <span class="add-text">￥{{order.amount}}</span>
            </p>  
          </div>
        </div>
     
      </div>
     <div class="order-status-panel-mask" v-if="orderStatusPanelShow"
          @click="()=>{this.orderStatusPanelShow = false}">
     </div>
     <div class="order-status-panel" :class="{'show':orderStatusPanelShow}">
        <h6>订单状态变更</h6>
        <div class="status-list-wrap">
          <ul class="status-list">
            <li v-for="item in order.expertOrderLogs" class="status-item" v-bind:key="item.id">
              <span class="status-name">{{item.title}}</span>
              <span class="status-time">{{item.creationTime | datetime('yyyy-MM-dd HH:mm:ss')}}</span>
            </li>
          </ul>
        </div>
     </div>
    </div>
</template>

<script>
import T from "../tool/tool";
import CountTimer from "../components/CountTimer.vue";
import Scroll from "../components/Scroll.vue";
import api from "../ajax/index";
import wechat from "../tool/wechat/index";
export default {
  name: "OrderDetail",
  components: {
    "count-timer": CountTimer,
    "v-scroll": Scroll
  },
  data() {
    return {
      counts: 300,
      isCustomer: true,
      orderStatusPanelShow: false,
      status: -4,
      order: {}
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    toAppointment(order) {
      let id = order.serverExpertId;
      this.$router.push({
        path: "/appoint",
        query: {
          expertId: id
        }
      });
    },
    toOrderList() {
      if (!this.isCustomer) {
        this.$router.push("/consult");
      } else {
        this.$router.push("/consult/expert");
      }
    },
    cancelConsult(order) {
      let that = this;
      T.Confirm({
        text: "确定取消订单" + order.orderNo + "?",
        confirm: function() {
          api.CancelOrder(order.id).then(res => {
            that.status = res.data.result.status;
          });
        }
      });
    },

    agreeOrder(order) {
      let that = this;
      T.Confirm({
        text: "确定接受此次订单咨询?",
        confirm: function() {
          api.AcceptOrder(order.id).then(res => {
            that.status = res.data.result.status;
          });
        }
      });
    },
    refuseOrder(order) {
      let that = this;
      T.Confirm({
        text: "确定拒绝此订单咨询?",
        confirm: function() {
          api.RefuseOrder(order.id).then(res => {
            that.status = res.data.result.status;
          });
        }
      });
    },

    toPay(order) {
      wechat.toPay(order).then(() => {
        T.showToast({ text: "支付成功！" });
        this.$router.replace("/order/detail/" + order.id);
      });
    },
    toChatRoom(id) {
      this.$router.push({
        path: "/chat" + "/" + id
      });
    },

    toComment(id) {
      this.$router.push("/comment/" + id);
    },

    toCommentDetail(id) {
      this.$router.push("/comment/detail/" + id);
    },
    countEnd() {
      this.status = -2;
    },
    toOverChat(){
      T.Confirm({
        text: "确定提前结束此次咨询?",
        confirm: function() {
          alert('结束咨询操作');
          this.status = 4;
        }
      });
    }
  },
  mounted() {
    document.title = "订单详情";
    api.GetExpertOrderDetail(this.$route.params.orderId).then(res => {
      let order = res.data.result;
      this.status = order.status;
      this.order = order;
      this.isCustomer = order.expertId === this.$store.state.user.id;
    });
  }
};
</script>
<style scoped>
.order-detail {
  padding-top: 50px;
}
.top-block {
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.top-block .block-title {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
  line-height: 38px;
}
.top-block .block-title .iconfont {
  font-size: 24px;
  margin-left: 10px;
  color: #55cbc4;
}
.top-block .leave-time {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  margin-bottom: 5px;
  margin-top: 5px;
}
.top-block .leave-time .count-timer {
  font-size: 22px;
  color: #f4992e;
}
.top-block .status-tips {
  text-align: center;
  font-size: 12px;
  color: #aaa;
}
.top-block .btn-area {
  display: flex;
  margin-top: 15px;
  padding: 0 20px;
  justify-content: center;
}
.top-block .btn-area .btn {
  height: 30px;
  width: 40%;
}
.top-block .btn-area .btn + .btn {
  margin-left: 20px;
}

.center-block {
  margin-top: 10px;
  padding: 0 20px;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.center-block .order-msg-item {
  line-height: 50px;
  padding: 0 5px;
}
.center-block .order-msg-item + .order-msg-item {
  border-top: 1px solid #eee;
}
.bottom-block {
  margin-top: 10px;
}
.bottom-block .detail-msg-item {
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
  margin-bottom: 10px;
}
.bottom-block .detail-msg-item .msg-content {
  font-size: 14px;
  line-height: 30px;
}
.bottom-block .detail-msg-item .msg-content .iconfont {
  font-size: 18px;
  margin-right: 10px;
}

.bottom-block .detail-msg-item .msg-title {
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.bottom-block .detail-msg-item .msg-title .iconfont {
  font-size: 18px;
  margin-right: 10px;
}

.bottom-block .detail-msg-item .problem-detail {
  padding-top: 15px;
  font-size: 14px;
  line-height: 1.5;
  text-indent: 2em;
}
.bottom-block .detail-msg-item .cost-list .list-item {
  font-size: 14px;
  display: flex;
  line-height: 48px;
  justify-content: space-between;
  padding: 0 10px;
}
.bottom-block .detail-msg-item .cost-list .list-item + .list-item {
  border-top: 1px solid #eee;
}
.bottom-block .detail-msg-item .cost-list .list-item .add-text {
  color: #55cbc4;
}
.bottom-block .detail-msg-item .cost-list .list-item .reduce-text {
  color: #e64340;
}
.bottom-block .detail-msg-item .show-order-status {
  margin-top: 10px;
}

.bottom-block .detail-msg-item .comment-detail {
  padding-top: 15px;
  display: flex;
  font-size: 14px;
}
.bottom-block .detail-msg-item .comment-detail .user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.bottom-block .detail-msg-item .comment-detail .comment-content {
  flex: 1;
  line-height: 1.5;
  width: 0;
  -webkit-line-clamp: 3;
}
.bottom-block .detail-msg-item .to-comment-detail {
  font-size: 14px;
  margin-top: 15px;
  padding-right: 5px;
  text-align: right;
  color: #55cbc4;
}
.order-status-panel-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
}
.order-status-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.order-status-panel {
  font-size: 15px;
  transition: all 0.3s;
  transform: translateY(100%);
  z-index: 11;
}
.order-status-panel.show {
  transform: translateY(0);
}
.order-status-panel h6 {
  font-size: 18px;
  line-height: 50px;
  background-color: #55cbc4;
  color: #fff;
  text-align: center;
}
.order-status-panel .status-list-wrap {
  margin-left: 30px;
  padding: 5px 0;
}
.order-status-panel .status-list {
  min-height: 200px;
}
.order-status-panel .status-item {
  line-height: 48px;
  padding-left: 20px;
  padding-right: 40px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.order-status-panel .status-item::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #55cbc4;
  left: -5px;
  top: 50%;
  margin-top: -5px;
  box-shadow: 1px 1px 2px #666;
}
.order-status-panel .status-item .status-name {
  color: #666;
}
.order-status-panel .status-item .status-time {
  color: #999;
}

.step-line {
  display: flex;
  height: 50px;
}
.step-line .step-item {
  flex: 1;
  background-color: #ddd;
  height: 2px;
  position: relative;
}
.step-line .step-item .step-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 2px;
  background-color: #55cbc4;
  width: 0;
  transition: all 0.3s;
}
.step-line .step-item .step-fill.stretch {
  width: 100%;
}
.step-line .step-item .circle-icon {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: #ccc;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 10;
}
.step-line .step-item .step-name {
  font-size: 14px;
  white-space: nowrap;
  color: #666;
  position: absolute;
  right: 0;
  transform: translateX(50%);
}
.step-line .step-item .step-name.top {
  bottom: 15px;
}
.step-line .step-item .step-name.bottom {
  top: 15px;
}
.step-line .step-item .circle-icon.current {
  background-color: #f4992e;
}

.step-line .step-item .circle-icon.prev {
  background-color: #55cbc4;
}
</style>
