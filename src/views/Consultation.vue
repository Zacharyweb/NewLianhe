<template>
  <div>
    <div class="consult-tabs">
      <div class="consult-item expert-tab" :class="{'active':currentTab == 0}" @click="changeTab(0)">专家咨询</div>
      <div class="consult-item customer-tab" :class="{'active':currentTab == 1}" @click="changeTab(1)">客户咨询</div>
    </div>
    <v-scroll :on-refresh="onRefresh"  :bottom="60" :top="50">
      <div class="consult-panel">
        <!-- 专家咨询 -->
        <ul class="consult-list" v-if="currentTab == 0">
          <li class="consult-item">
            <span class="item-status">等待同意</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">取消咨询</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">等待支付</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">立即支付</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">等待咨询/咨询中</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">咨询室</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成咨询</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">评价</span>
              <span class="btn btn-green-outline" @click="toDetail(123,1)">咨询详情</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">已评价</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">查看评价</span>
              <span class="btn btn-green-outline">咨询详情</span>
            </p>
          </li>
        </ul>
        <!-- 客户咨询 -->
        <ul class="consult-list" v-if="currentTab == 1">
          <li class="consult-item">
            <span class="item-status">等待同意</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">同意</span>
              <span class="btn btn-green-outline">拒绝</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">等待支付</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
          </li>
          <li class="consult-item">
            <span class="item-status">等待咨询/咨询中</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">咨询室</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成咨询</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">评价</span>
              <span class="btn btn-green-outline">咨询详情</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成咨询</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">回复评价</span>
              <span class="btn btn-green-outline">咨询详情</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成结算</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline">查看评价</span>
              <span class="btn btn-green-outline">咨询详情</span>
            </p>
          </li>
        </ul>
      </div>
     
    </v-scroll>
    <bottom-nav :nav-index="1"></bottom-nav>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import BottomNav from '../components/BottomNav.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Mine',
  components:{
    'bottom-nav': BottomNav,
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
        currentTab:0
    }
  },
  methods:{
    onRefresh(done){
     
      setTimeout(()=>{
        done();
      },1000)
    },
    changeTab(index){
       this.currentTab = index;
    },
    toDetail(id,type){
      this.$router.push('/consult/detail/'+id+'/'+type)
    }
  
  
  },
  mounted(){
    
  }
}
</script>
<style scoped>
  .consult-tabs{
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    position: relative;
    z-index: 99;
   }
  .consult-tabs .consult-item{
    width: 120px;
    border: 1px solid  #55cbc4;
    line-height: 30px;
    text-align: center;
    color:#55cbc4;
  }
  .consult-tabs .consult-item.active{
    color:#fff;
    background-color: #55cbc4;
  }
  .consult-tabs .consult-item.expert-tab{
    border-radius: 4px 0 0 4px;
  }
    .consult-tabs .consult-item.customer-tab{
    border-radius: 0 4px 4px 0;
  }
  .consult-list{
    background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-top: 20px;
    padding: 0 20px;

  }
  .consult-list .consult-item{
    position: relative;
    padding: 15px 10px;

  }
  .consult-list .consult-item+.consult-item{
    border-top: 1px solid #e3e3e3;
  }
  .consult-list .consult-item .item-status{
    position: absolute;
    top: 10px;
    right: 20px;
    color: #E64340;
  }
  .consult-list .consult-item .item-order-num{
    color: #666;
    margin-bottom: 8px;
  }
  .consult-list .consult-item .item-name{
    font-size: 18px;
    color: #555;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .consult-list .consult-item .item-cost{
    color: #55cbc4;
    margin-bottom: 4px;
  } 
  .consult-list .consult-item .item-detail{
    color: #888;
    font-size: 16px;
    margin-bottom: 8px;
  }
  .consult-list .consult-item .btn-area{
    display: flex;
    justify-content: flex-end;
  }
  .consult-list .consult-item .btn-area .btn{
      padding: 2px 5px;
      height:30px;
      border-radius:4px;
      font-size:16px;
      margin-left: 5px;
  } 
</style>
