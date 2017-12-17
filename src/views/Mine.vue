<template>
  <div>
    <v-scroll :on-refresh="onRefresh"  :bottom="60" :top="0" :no-more-text="'没有更多评论啦~'">
    <div class="mine-msg">
      <img class="mine-avatar" :src="this.$store.state.user.avatar || '../../static/timg.jpeg'">
      <div class="mine-text-msg">
        <p class="mine-base-msg">
          <span @click="login" class="mine-nickname">{{this.$store.state.user.name || "请登录"}}
              <i class="mine-identity" v-if="$store.state.identity == 0">普通用户</i>
              <i class="mine-identity" v-if="$store.state.identity == 1">专家用户</i>
          </span>
         <!--  <span class="mine-tel">16767188567</span> -->
        </p>
      
        <p class="mine-status" v-if="$store.state.identity == 1">
          <span class="status-text">当前状态：</span>
          <span class="status-item">{{$store.state.user.onlineStatus | onlinestatus}}</span>
        </p>
      </div> 
    </div>
  
    <div class="router-bar  expert-block">
      <ul>
        <li class="router-bar-item" @click="$router.push('/relation')">
          <div class="item-left">
            <span class="iconfont icon-guanxi"></span>
            <span class="router-bar-name">我的关系</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item" @click="$router.push('/myinfo')" v-if="$store.state.identity == 0">
          <div class="item-left">
            <span class="iconfont icon-bianji"></span>
            <span class="router-bar-name">我的资料</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item" @click="becomeExpert" v-if="$store.state.identity == 0">
          <div class="item-left">
            <span class="iconfont icon-pingjia"></span>
            <span class="router-bar-name">成为专家</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item" @click="$router.push('/einfo')" v-if="$store.state.identity == 1">
          <div class="item-left">
            <span class="iconfont icon-icon3"></span>
            <span class="router-bar-name">我的资料</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
      </ul>  
    </div>
    <div v-if="$store.state.user.id" class="btn-wrapper"><p class="btn-logout" @click="logout">退出当前账号</p></div>
    </v-scroll>
    <bottom-nav :nav-index="2"></bottom-nav>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav.vue";
import Scroll from "../components/Scroll.vue";
import T from "../tool/tool";
export default {
  name: "Mine",
  components: {
    "bottom-nav": BottomNav,
    "v-scroll": Scroll
  },
  data() {
    return {};
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    becomeExpert() {
      this.$router.push("/upgrade");
    },
    logout() {
      let that = this;
      T.Confirm({
        text: "确定退出登录?",
        confirm: () => {
          that.$store.dispatch("logout");
          that.$router.replace("/sign");
        }
      });
    },
    login() {
      if (this.$store.state.user.id) return;
      this.$router.push("/sign");
    }
  },
  mounted() {}
};
</script>
<style scoped>
.mine-msg {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
}
.mine-msg .mine-avatar {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  margin-right: 20px;
}
.mine-msg .mine-text-msg {
  flex: 1;
  width: 0;
}
.mine-msg .mine-base-msg {
  display: flex;
  margin-bottom: 10px;
}

.mine-msg .mine-base-msg .mine-nickname {
  position: relative;
  font-size: 16px;
  /* margin-right: 15px;*/
  font-weight: bold;
}
.mine-msg .mine-base-msg .mine-tel {
  font-size: 14px;
  color: #666;
}
.mine-msg .mine-base-msg .mine-identity {
  white-space: nowrap;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 5px;
  background-color: #e9ae6a;
  color: #fff;
  position: absolute;
  top: 0;
  right: -10px;
  transform: translateX(100%);
}
.mine-msg .mine-status {
  padding-top: 5px;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 15px;
}
.mine-msg .mine-status .status-text {
  margin-right: 5px;
}
.mine-msg .mine-status .status-item {
}
.router-bar {
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
  background-color: #fff;
}
.router-bar .router-bar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
}
.router-bar .router-bar-item + .router-bar-item {
  border-top: 1px solid #e6e6e6;
}
.router-bar .router-bar-item .item-left {
  display: flex;
  align-items: center;
  font-size: 15px;
}
.router-bar .router-bar-item .item-left .iconfont {
  color: #55cbc4;
  font-size: 20px;
  margin-right: 10px;
}
.btn-wrapper {
  margin-top: 20px;
}

.btn-logout{
  background-color: #fff;
  color: #E64340;
  height: 34px;
  border:1px solid #e6e6e6;
  border-left: none;
  border-right: none;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  padding-top: 17px;
}
</style>
