<template>
    <!-- 专家咨询 -->
    <ul class="consult-list" v-show="!isAjaxing">
          <li class="consult-item" v-for="(item,index) in orderList" @click="toOrderDetail(item.id,0)" v-bind:key="index">
            <span class="item-status">{{item.status | orderstatus}}</span>
            <p class="item-order-num">{{item.orderNo}}</p>
            <p class="item-name">{{item.serverExpertName}}</p>
            <p class="item-cost"> ¥{{item.amount}} / {{item.quantity}}节</p>
            <p class="item-detail text-ellipsis">{{item.questionRemark}}</p>
            <p class="btn-area" v-if="item.status == 1">
              <span class="btn btn-green-outline" @click.stop="cancelConsult(item)">取消咨询</span>
            </p>

            <p class="btn-area" v-if="item.status == 2">
              <span class="btn btn-green-outline" @click.stop="toPay(item)">立即支付</span>
              <span class="btn btn-green-outline" @click.stop="cancelConsult(item)">取消咨询</span>
            </p>

            <p class="btn-area" v-if="item.status == 3">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.id)">进入咨询室</span>
            </p>

            <!-- <p class="btn-area" v-if="item.status == 4">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p> -->

            <p class="btn-area" v-if="item.status == 4">
              <span class="btn btn-green-outline" @click.stop="toComment(item.id)">去评价</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.id)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status == 5">
              <span class="btn btn-green-outline" @click.stop="toCommentDetail(item.id)">评价详情</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.id)">咨询详情</span>
            </p>
          </li>
          <li>
             <no-data-tips v-if="orderList.length == 0 && !isAjaxing" tips="暂无相关订单"></no-data-tips>
          </li>
    </ul>
</template>

<script>
import T from "../../tool/tool";
import api from "../../ajax/index";
import NoDataTips from "../../components/NoDataTips.vue";
export default {
  name: "ExpertConsult",
  components: {
    "no-data-tips":NoDataTips
  },
  data() {
    return {
      orderList: [],
      isAjaxing:true
    };
  },
  methods: {
    toOrderDetail(id) {
      this.$router.push("/order/detail/" + id);
    },

    cancelConsult(order) {
      T.Confirm({
        text: "确定取消订单" + order.orderNo + "?",
        confirm: function() {
          api.CancelOrder(order.id).then(res => {
            order.status = res.data.result.status;
          });
        }
      });
    },
    toPay(order) {
      api.PayOrder(order.id).then(res => {
        T.showToast("支付成功~");
        order.status = res.data.result.status;
      });
    },

    toChatRoom(id) {
      this.$router.push({
        path: "/chat" + "/" + id
      });
    },

    toConsultHome(id) {
      this.$router.push({
        path: "/appoint/step4",
        query: {
          orderId: id
        }
      });
    },
    toComment(id) {
      this.$router.push("/comment/" + id);
    },
    toCommentDetail(id) {
      this.$router.push("/comment/detail/" + id);
    }
  },
  mounted() {
    T.postConsultTab(1);
    document.title = "咨询列表";
    T.showLoading();
    api
      .GetLoggedIndExpertOrders({ expertId: this.$store.state.user.id })
      .then(res => {
        this.orderList = res.data.result;
        this.isAjaxing = false;
        T.hideLoading();
      });
  }
};
</script>
<style scoped>

</style>
