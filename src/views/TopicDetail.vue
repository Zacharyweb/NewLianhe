<template>
  <div class="topic-detail">
    <v-scroll :on-refresh="onRefresh"  :bottom="50" :top="20">
     <h3 class="topic-title common-panel" >
      <span class="iconfont icon-shuben"></span> 我是话题标题
     </h3> 
     <div class="topic-contnet">
        <p>我是话题内容我是话题内容我是话题内容我是话题内容我是话题内容我是话题内容我是话题内容</p> 
        <p>我是话题内容我是话题内容我是话题内容我是话题内容我是话题内容我是话题内容我是话题内容</p>
 
     </div>
     

    </v-scroll>
    <div class="btn btn-red btn-large position-bottom">立即预约</div>
  </div>
</template>

<script>
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'

export default {
  name: 'TopicDetail',
  components:{
    'v-scroll':Scroll
  },
  data () {
    return {
    }
  },
  methods:{
    onRefresh(done){
      done();
    }
   
  },
  mounted(){

  }
}
</script>
<style scoped>
  .topic-detail{
    margin-top: 20px;
  }
  .topic-title .icon-shuben{
    font-size: 24px;
    margin-right: 5px;
    color: #55cbc4;
  }
  .topic-contnet{
    padding:0 20px;
    line-height: 1.5;
  }
</style>