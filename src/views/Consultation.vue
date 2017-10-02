<template>
  <div id="consultPage">
    <div class="consult-tabs">
      <div class="consult-item expert-tab" :class="{'active':currentTab == 0}" @click="changeTab(0)">专家咨询</div>
      <div class="consult-item customer-tab" :class="{'active':currentTab == 1}" @click="changeTab(1)">客户咨询</div>
    </div>
    <v-scroll :on-refresh="onRefresh"  :bottom="60" :top="50">
      <div class="consult-panel">
           <router-view></router-view>
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
      if(this.currentTab == index){
        return;
      }
      this.currentTab = index;
      if(index == 0){
          this.$router.push('/consult/')
      }
      if(index == 1){
          this.$router.push('/consult/customer')
      }
    },
    setTab(type,index){
       this.currentTab = index;
    }
  },
  mounted(){
    this.$PubSub.subscribe('POSTCONSULTTAB',this.setTab);
  }
}
</script>
<style>
  #consultPage .consult-tabs{
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    position: relative;
    z-index: 99;
   }
  #consultPage .consult-tabs .consult-item{
    width: 120px;
    border: 1px solid  #55cbc4;
    line-height: 30px;
    text-align: center;
    color:#55cbc4;
  }
  #consultPage .consult-tabs .consult-item.active{
    color:#fff;
    background-color: #55cbc4;
  }
  #consultPage .consult-tabs .consult-item.expert-tab{
    border-radius: 4px 0 0 4px;
  }
  #consultPage .consult-tabs .consult-item.customer-tab{
    border-radius: 0 4px 4px 0;
  }
  #consultPage .consult-list{
    background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-top: 20px;
    padding: 0 20px;

  }
  #consultPage .consult-list .consult-item{
    position: relative;
    padding: 15px 10px;

  }
  #consultPage .consult-list .consult-item+.consult-item{
    border-top: 1px solid #e3e3e3;
  }
  #consultPage .consult-list .consult-item .item-status{
    position: absolute;
    top: 10px;
    right: 20px;
    color: #E64340;
  }
  #consultPage .consult-list .consult-item .item-order-num{
    color: #666;
    margin-bottom: 8px;
  }
  #consultPage .consult-list .consult-item .item-name{
    font-size: 18px;
    color: #555;
    font-weight: 600;
    margin-bottom: 10px;
  }
  #consultPage .consult-list .consult-item .item-cost{
    color: #55cbc4;
    margin-bottom: 4px;
  } 
  #consultPage .consult-list .consult-item .item-detail{
    color: #888;
    font-size: 16px;
    margin-bottom: 8px;
  }
  #consultPage .consult-list .consult-item .btn-area{
    display: flex;
    justify-content: flex-end;
  }
  #consultPage .consult-list .consult-item .btn-area .btn{
      padding: 2px 5px;
      height:30px;
      border-radius:4px;
      font-size:16px;
      margin-left: 5px;
  } 
</style>
