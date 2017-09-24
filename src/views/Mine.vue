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
        <p class="mine-intro">做个有趣的人。做个有趣的人。</p>
      </div> 
    </div>
    <div class="router-bar">
      <ul>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-guanzhu"></span>
            <span class="router-bar-name">我关注的专家</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-yuyuedingdan"></span>
            <span class="router-bar-name">预约订单</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-youhuiquan"></span>
            <span class="router-bar-name">我的优惠券</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
      </ul>
      
    </div>

    <div class="router-bar expert-mgnt expert-block">
      <h4>专家管理</h4>
      <ul>
        <li class="router-bar-item" @click="becomeExpert">
          <div class="item-left">
            <span class="iconfont icon-zhuanjia"></span>
            <span class="router-bar-name">成为专家</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-ziliao"></span>
            <span class="router-bar-name">专家资料</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-yuyue"></span>
            <span class="router-bar-name">预约我的</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item" @click="$router.push('/relation')">
          <div class="item-left">
            <span class="iconfont icon-guanxi"></span>
            <span class="router-bar-name">我的关系</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-zhengce"></span>
            <span class="router-bar-name">政策解读</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-chaojihuati-wode"></span>
            <span class="router-bar-name">话题管理</span>
          </div>
          <span class="iconfont icon-jiantou-1"></span>
        </li>
      </ul>  
    </div>

    <div class="router-bar service-panel">
      <ul>
        <li class="router-bar-item">
          <div class="item-left">
            <span class="iconfont icon-htmal5icon31-copy"></span>
            <span class="router-bar-name">联系客服</span>
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
    }

  
  },
  mounted(){
   
  }
}
</script>
<style scoped>
  .mine-msg{
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 15px 20px;
    border-bottom: 1px solid #e6e6e6;
  }
  .mine-msg .mine-avatar{
    width: 80px;
    height: 80px;
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
    font-size: 20px;
    margin-right: 20px;
  }
  .mine-msg .mine-base-msg .mine-tel{
    color: #666;
  }
  .mine-msg .mine-intro{
    color: #666;
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
    height: 50px;
    padding:0 10px;
  }
  .router-bar .router-bar-item+.router-bar-item{
    border-top: 1px solid #e6e6e6;
    display: flex;
  }
  .router-bar .router-bar-item .item-left .iconfont{
    color: #55cbc4;
    font-size: 22px;
    margin-right: 5px;

  }
  .expert-mgnt{
    border-top: 1px solid #e6e6e6;
    margin-top: 20px;
    padding-top: 15px;
    margin-bottom:20px;
  }
  .expert-mgnt h4{
    font-size: 18px;
   padding-bottom: 10px;
   border-bottom: 1px solid #e6e6e6;
  }
  .service-panel{
       
  }
  .service-panel .service-tips{
    text-align: center;
  }
  .service-panel .service-tel{
    
  }
</style>
