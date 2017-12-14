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
                     <b class="expert-name">专家01</b>
                     <span class="status-online">营业中</span>
                   </p>
                   <p class="expert-tags text-ellipsis">
                    杭州市滨江区国家税务局副局长
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
                     <b class="expert-name">专家02</b>
                  
                     <span class="status-outline">休息中</span>
                   </p>
                   <p class="expert-tags text-ellipsis">
                    杭州市江干区国家税务局科长
                   </p>
                   <p class="expert-topic text-ellipsis">擅长领域XXXXXXXXXXXXXXXXXXXXXXXXXX
                   </p>
                 </div>
               </li>
             </ul>
        </div>
        <no-data-tips v-if="results.length == 0" tips="暂无相关专家"></no-data-tips>
    </v-scroll>
  </div>
</template>

<script>
import TabBar  from '../components/TabBar.vue'
import Scroll  from '../components/Scroll.vue'
import NoDataTips from "../components/NoDataTips.vue";

import config from '../tool/config'
import T from '../tool/tool'
export default {
  name: 'Home',
  components:{
    'tab-bar':TabBar,
    'v-scroll': Scroll,
    'no-data-tips':NoDataTips 
  },
  data () {
    return {
      subCateArr:[{name:'全部',id:0}],
      results:[{}],
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
      if(this.$route.query.type == 4){
        this.subCateArr = [...this.subCateArr,...config.taxCate];
      }else{
        this.subCateArr = [...this.subCateArr,{name:a+'细分领域',id:1}];
      }
      
      T.checkFirstPageData(this.subCateArr);
      document.title = this.$route.query.name+'专家';
      
      
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