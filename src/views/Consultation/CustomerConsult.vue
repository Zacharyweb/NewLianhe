<template>
  <!-- 客户咨询 -->
  <ul class="consult-list" v-show="!isAjaxing">
          <li v-for="item in orderList" class="consult-item" @click="toOrderDetail(item.id)" v-bind:key="item.id">
            <span class="item-status">
              {{item.status | orderstatus}}
            </span>
            <p class="item-order-num">{{item.orderNo}}</p>
            <p class="item-name">{{item.expertName}}</p>
            <p class="item-cost"> ¥{{item.amount}} / {{item.quantity}}节</p>
            <p class="item-detail text-ellipsis">{{item.questionRemark}}</p>
            <p class="btn-area" v-if="item.status==1">
              <span class="btn btn-green-outline" @click.stop="agreeConsult(item)">同意</span>
              <span class="btn btn-green-outline" @click.stop="refuseConsult(item)">拒绝</span>
            </p>
            <p class="btn-area" v-if="item.status==3">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.id)">进入咨询室</span>
            </p>
            <p class="btn-area" v-if="item.status==4">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.id)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status==5">
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
  name: "CustomerConsult",
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

    agreeConsult(order) {
      T.Confirm({
        text: "确定接受此次咨询?",
        confirm: function() {
          api.AcceptOrder(order.id).then(res => {
            order.status = res.data.result.status;
          });
        },
        cancel: function() {}
      });
    },
    refuseConsult(order) {
      T.Confirm({
        text: "确定拒绝此次咨询?",
        confirm: function() {
          api.RefuseOrder(order.id).then(res => {
            order.status = res.data.result.status;
          });
        }
      });
    }
  },
  mounted() {
    T.postConsultTab(0);
    document.title = "咨询列表";
    T.showLoading();
    api
      .GetLoggedIndExpertOrders({ serverExpertId: this.$store.state.user.id })
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
