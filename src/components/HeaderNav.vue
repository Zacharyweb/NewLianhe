<template>
  <div class="header-nav">
    <span v-if="hasReturnIcon" class="return-icon iconfont icon-jiantou-" @click="returnBack"></span>
    <h2>{{title}}</h2>        
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    title: {
      type: String,
      default: '未设置标题'
    },
    hasReturnIcon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
   
    }
  },
  methods:{
    returnBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .header-nav{
    position: relative;
    height: 50px;
    background-color: #55cbc4;
    transform: translateZ(100px);
    display: flex;
  }
  .header-nav h2{
    flex:1;
    text-align: center;
    font-size: 18px;
    color:#fff;
    padding-top: 13px;
  }
  .header-nav .return-icon{
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color:#fff;
    font-size: 24px;
  }
</style>
