<template>
  <div>
    <v-scroll :on-refresh="onRefresh"  :bottom="60" :top="0" :no-more-text="'没有更多评论啦~'">
    <div class="mine-msg">
      <img class="mine-avatar" src="../../static/timg.jpeg">
      <div class="mine-text-msg">
        <p class="mine-base-msg">
          <span class="mine-nickname">朱两边</span>
          <span class="mine-tel">16767188567</span>
        </p>
        <p class="mine-status">
          <span class="status-text">当前状态：</span>
          <span class="status-item" :class="{'active':myStatus == 1}" @click="toWork">营业</span>
          <span class="status-item" :class="{'active':myStatus == 0}" @click="toRest">休息</span>
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
        <li class="router-bar-item" @click="$router.push('/myinfo')">
          <div class="item-left">
            <span class="iconfont icon-bianji"></span>
            <span class="router-bar-name">我的资料</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item" @click="becomeExpert">
          <div class="item-left">
            <span class="iconfont icon-pingjia"></span>
            <span class="router-bar-name">成为专家</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item" @click="$router.push('/einfo')">
          <div class="item-left">
            <span class="iconfont icon-icon3"></span>
            <span class="router-bar-name">专家资料</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
      </ul>  
    </div>
    </v-scroll>
    <bottom-nav :nav-index="2"></bottom-nav>
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Mine',
  components:{
    'bottom-nav': BottomNav,
    'v-scroll': Scroll
  },
   data () {
    return {
      myStatus:1
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    becomeExpert(){
      this.$router.push('/upgrade')
    },
    toWork(){
      if(this.myStatus == 1){
        return;
      }
      this.myStatus = 1;
      T.showToast({text:'开始营业咯~'});
    },
    toRest(){
      if(this.myStatus == 0){
        return;
      }
      this.myStatus = 0;
      T.showToast({text:'下班休息咯~'});
    },

  
  },
  mounted(){
   
  }
}
</script>
<style scoped>
  .mine-msg{
    margin-top: 20px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 15px 20px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .mine-msg .mine-avatar{
    width: 66px;
    height: 66px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .mine-msg .mine-text-msg{
    flex: 1;
    width: 0;
  }
  .mine-msg .mine-base-msg{
    margin-bottom: 10px;
  }
  
  .mine-msg .mine-base-msg .mine-nickname{
    font-size: 16px;
    margin-right: 20px;
    font-weight: bold;
  }
  .mine-msg .mine-base-msg .mine-tel{
    font-size: 14px;
    color: #666;
  }

  .mine-msg .mine-status{
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;

  }
  .mine-msg .mine-status .status-text{
      
      margin-right: 5px;
  }
  .mine-msg .mine-status .status-item{
     margin-right: 15px;
     line-height: 24px;
     padding: 0 8px;
     border-radius: 2px;
  }
  .mine-msg .mine-status .status-item.active{
     color: #fff;
     background-color: #55cbc4;
  }


  .router-bar{
    border-bottom: 1px solid #e6e6e6;
    padding: 0 20px;
    background-color: #fff;
  }
  .router-bar .router-bar-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding:0 10px;

  }
  .router-bar .router-bar-item+.router-bar-item{
    border-top: 1px solid #e6e6e6;
  
  }
  .router-bar .router-bar-item .item-left{
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  .router-bar .router-bar-item .item-left .iconfont{
    color: #55cbc4;
    font-size: 20px;
    margin-right: 10px;

  }
  
</style>
