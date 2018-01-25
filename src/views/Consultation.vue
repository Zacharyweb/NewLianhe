<template>
  <div id="consultPage">
    <div class="consult-tabs" v-if="$store.getters.isExpert">
      <div class="consult-item customer-tab" :class="{'active':currentTab == 0}" @click="changeTab(0)">客户咨询</div>
      <div class="consult-item expert-tab" :class="{'active':currentTab == 1}" @click="changeTab(1)">专家咨询</div>
      
    </div>
    <header-nav v-if="!$store.getters.isExpert" :title="'咨询订单'" :has-return-icon="false"/>
    <v-scroll :on-refresh="onRefresh" :bottom="60" :top="listTop">
      <div class="consult-panel" ref="consultPanel" >
        <!-- <keep-alive> -->
           <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </v-scroll>
    <bottom-nav :nav-index="1"></bottom-nav>
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import BottomNav from "../components/BottomNav.vue";
import Scroll from "../components/Scroll.vue";
import T from "../tool/tool";
export default {
  name: "Mine",
  components: {
    "bottom-nav": BottomNav,
    "header-nav": HeaderNav,
    "v-scroll": Scroll
  },
  data() {
    return {
      listTop: 50,
      currentTab: 0
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
        console.log("done");
      }, 1000);
    },
    changeTab(index) {
      if (this.currentTab == index) {
        return;
      }
      this.currentTab = index;
      if (index == 0) {
        this.$router.push("/consult/");
      }
      if (index == 1) {
        this.$router.push("/consult/expert");
      }
    },
    setTab(type, index) {
      this.currentTab = index;
    }
  },
  mounted() {
    this.$PubSub.subscribe("POSTCONSULTTAB", this.setTab);
    this.$nextTick(() => {
      if (!this.$store.getters.isExpert) {
        this.listTop = 40;
        this.changeTab(1);
      }
    });
  }
};
</script>
<style>
#consultPage .consult-tabs {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  position: relative;
  z-index: 99;
}
#consultPage .consult-tabs .consult-item {
  width: 120px;
  border: 1px solid #55cbc4;
  line-height: 30px;
  text-align: center;
  color: #55cbc4;
  font-size: 14px;
}
#consultPage .consult-tabs .consult-item.active {
  color: #fff;
  background-color: #55cbc4;
}
#consultPage .consult-tabs .consult-item.expert-tab {
  border-radius: 0 4px 4px 0;
}
#consultPage .consult-tabs .consult-item.customer-tab {
  border-radius: 4px 0 0 4px;
}
#consultPage .consult-list {
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: 20px;
  padding: 0 20px;
}
#consultPage .consult-list {
  padding-bottom: 20px;
}
#consultPage .consult-list .consult-item {
  margin-top: 15px;
  position: relative;
  padding: 15px 20px;
  box-shadow: 4.6px 3.9px 16px 0px rgba(120, 119, 108, 0.2);
  border-radius: 4px;
  border: 1px solid #eee;
}
#consultPage .consult-list .consult-item .item-status {
  font-size: 13px;
  position: absolute;
  top: 12px;
  right: 20px;
  color: #e64340;
}
#consultPage .consult-list .consult-item .item-order-num {
  font-size: 13px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
#consultPage .consult-list .consult-item .item-name {
  font-size: 16px;
  color: #555;
  font-weight: 600;
  margin-bottom: 10px;
}
#consultPage .consult-list .consult-item .item-cost {
  font-size: 13px;
  color: #55cbc4;
  margin-bottom: 8px;
}
#consultPage .consult-list .consult-item .item-detail {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}
#consultPage .consult-list .consult-item .btn-area {
  padding-top: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}
#consultPage .consult-list .consult-item .btn-area .btn {
  padding: 6px 10px;
  height: 24px;
  border-radius: 14px;
  font-size: 12px;
  margin-left: 5px;
}
</style>
