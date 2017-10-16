<template>
  <div>
    <v-scroll :on-refresh="onRefresh"  :bottom="60" :top="0">
    <div class="mine-msg">请选择要测试的身份。</div>
  
    <div class="router-bar  expert-block">
      <ul>
        <li class="router-bar-item" @click="chooseIdentity(0)">
          <div class="item-left">
            <span class="router-bar-name">普通用户</span>
          </div>
        </li>
        <li class="router-bar-item" @click="chooseIdentity(1)">
          <div class="item-left">
            <span class="router-bar-name">专家用户</span>
          </div>
        </li>
      </ul>  
    </div>
    </v-scroll>
  </div>
</template>

<script>
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Mine',
  components:{
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
    chooseIdentity(id){
      // localStorage.setItem('USER_IDENTITY',id);
      sessionStorage.setItem('USER_IDENTITY',id);
      this.$store.commit('change_identity',id);
      this.$router.push('/');
    }


  
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
