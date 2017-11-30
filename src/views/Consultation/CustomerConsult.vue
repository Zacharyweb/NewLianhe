<template>
  <!-- 客户咨询 -->
  <ul class="consult-list">
          <li v-for="(item,index) in orderList" class="consult-item" @click="toOrderDetail(item.id)" v-bind:key="index">
            <span class="item-status">
              {{item.status | orderstatus}}
            </span>
            <p class="item-order-num">{{item.orderNo}}</p>
            <p class="item-name">{{item.expertName}}</p>
            <p class="item-cost"> ¥{{item.amount}} / {{item.quantity}}节</p>
            <p class="item-detail text-ellipsis">{{item.questionRemark}}</p>
            <p class="btn-area" v-if="item.status==1">
              <span class="btn btn-green-outline" @click.stop="agreeConsult(item.orderNo)">同意</span>
              <span class="btn btn-green-outline" @click.stop="refuseConsult(item.orderNo)">拒绝</span>
            </p>
            <p class="btn-area" v-if="item.status==2">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">进入咨询室</span>
            </p>
            <p class="btn-area" v-if="item.status==3">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status==4">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status==5">
              <span class="btn btn-green-outline" @click.stop="toCommentDetail(item.orderNo)">评价详情</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
          </li>
     
  </ul>
</template>

<script>
import T from "../../tool/tool";
import api from "../../ajax/index";
export default {
  name: "CustomerConsult",
  components: {},
  data() {
    return {
      orderList: []
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

    agreeConsult(id) {
      T.Confirm({
        text: "确定接受此次咨询?",
        confirm: function() {
          console.log("确定接受");
        },
        cancel: function() {}
      });
    },
    refuseConsult() {
      T.Confirm({
        text: "确定拒绝此次咨询?",
        confirm: function() {
          console.log("确定拒绝");
        },
        cancel: function() {}
      });
    }
  },
  mounted() {
    T.postConsultTab(0);
    document.title = "咨询列表";
    api
      .GetLoggedIndExpertOrders({ serverExpertId: this.$store.state.user.id })
      .then(res => {
        this.orderList = res.data.result;
      });
  }
};
</script>
<style scoped>

</style>
