<template>
  <ul class="bottom-nav">
    <li class="nav-item" :class="{'active': navIndex == 0}" @click="changeNav('/','联合咨询')">
      <span class="iconfont icon-zhuye"></span>
      <p class="nav-name">首页</p>
    </li>
    <li class="nav-item" :class="{'active': navIndex == 1}" @click="changeNav('/consult','咨询列表')">
      <span class="iconfont icon-faxian"></span>
      <p class="nav-name">咨询</p>
    </li>
    <li class="nav-item" :class="{'active': navIndex == 2}" @click="changeNav('/mine','我的')">
      <span class="iconfont icon-zhuye1"></span>
      <p class="nav-name">我的</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'BottomNav',
  props: {
    navIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
   
    }
  },
  methods:{
    changeNav(path,title){
      document.title = title;
      if(path == '/consult' && !this.$store.getters.isExpert){
          this.$router.push('/consult/expert');
          return;
      }
      this.$router.push(path);
    }
 
  }
}
</script>
<style scoped>
  .bottom-nav{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 1.2rem;
    background-color: #fff;
    border-top: 0.02rem solid #e6e6e6;
  }
  .bottom-nav .nav-item{
    padding-top: 0.14rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .bottom-nav .nav-item.active{
    color: #55cbc4;
  }
  .bottom-nav .nav-item .iconfont{
    font-size: 0.44rem;
  }
  .bottom-nav .nav-item .nav-name{
    margin-top: 0.04rem;
    font-size: 0.24rem;
  }
</style>