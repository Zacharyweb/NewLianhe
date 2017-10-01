<template>
  <div>
    <tab-bar :tabBarArr="subCateArr" @change="tabBarChage"></tab-bar>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="0" :top="62">
        <div class="expert-block">
             <ul class="expert-list">
               <li class="expert-item" @click="toExpertDetail(1)">
                 <img class="expert-avatar" src="../../static/timg.jpeg">
                 <div class="expert-info">
                   <p class="expert-msg text-ellipsis">
                     <b class="expert-name">威震天</b>
                     <span class="status-online">营业中</span>
                   </p>
                   <p class="expert-tags text-ellipsis">
                    幽谷数据有限公司著名导弹专家
                   </p>
                   <p class="expert-topic text-ellipsis">
                    擅长领域XXXXXXXXXXXXX
                   </p>
                 </div>
               </li>
               <li class="expert-item" @click="toExpertDetail(1)">
                 <img class="expert-avatar" src="../../static/timg.jpeg">
                 <div class="expert-info">
                   <p class="expert-msg text-ellipsis">
                     <b class="expert-name">威震天</b>
                  
                     <span class="status-outline">休息中</span>
                   </p>
                   <p class="expert-tags text-ellipsis">
                    幽谷数据有限公司著名导弹专家
                   </p>
                   <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题话题
                   </p>
                 </div>
               </li>
             </ul>
        </div>
    </v-scroll>
  </div>
</template>

<script>
import TabBar  from '../components/TabBar.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Home',
  components:{
    'tab-bar':TabBar,
    'v-scroll': Scroll
  },
  data () {
    return {
      subCateArr:[]
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    onInfinite(done){
      setTimeout(()=>{
        done('nomore');
      },1000)
    },
    tabBarChage(index){
       console.log(index);
    }
  },
  mounted(){
      var a = this.$route.query.name;
      this.subCateArr = [a+1,a+2,a+3,a+4,a+5,a+6,a+7,a+8,a+9,a+10];
      T.checkFirstPageData(this.subCateArr);
      document.title = this.$route.query.name;
      
      
  }
}
</script>
<style scoped>
    .expert-block .expert-item{
      border-top: none;
    }
    .expert-block .expert-item+.expert-item{
      border-top: 1px solid #e6e6e6;
    }

</style>