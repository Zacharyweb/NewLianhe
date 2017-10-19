<template>
  <div>
    <search-bar :auto-focus="true"></search-bar>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="0" :top="62">
        <div class="expert-block">
        <h4>搜索结果</h4>
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
                   <span class="status-online">休息中</span>
                 </p>
                 <p class="expert-tags text-ellipsis">
                  杭州市江干区国家税务局科长
                 </p>
                 <p class="expert-topic text-ellipsis">
                  擅长领域XXXXXXXXXXXXX
                 </p>
               </div>
            </li>
          </ul>
         </div>
    </v-scroll>
  </div>
</template>

<script>
import SearchBar  from '../components/SearchBar.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Home',
  components:{
    'search-bar':SearchBar,
    'v-scroll': Scroll
  },
  data () {
    return {
      arr:[1,1,1,1,1,1,1,1,1,1,1,1]
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
        if(this.arr.length < 40){
          this.arr = this.arr.concat([1,1,1,1,1,1]);
          done();
        }
        else{
          done('nomore');
        }
      },1000)
    }
  
  },
  mounted(){
     T.checkFirstPageData(this.arr);
  }
}
</script>
<style scoped>
  /*   .expert-block .expert-item{
      border-top: none;
    }
    .expert-block .expert-item+.expert-item{
      border-top: 1px solid #e6e6e6;
    } */

</style>