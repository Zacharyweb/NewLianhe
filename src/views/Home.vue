<template>
  <div>
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <v-scroll :on-refresh="onRefresh" :bottom="60" :top="60">
         <div>
           
         </div>
         <category-bar :tab-bar-arr='tabBarArr'></category-bar>
    <!--      <div class="recommend-expert">
           <h3 class="recommend-text">为您推荐</h3>
         </div> -->
         <div class="expert-block">
             <h4>财务专家</h4>
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
                   <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题话题
                   </p>
                 </div>
               </li>
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
                   <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题话题
                   </p>
                 </div>
               </li>
             </ul>
         </div>
        
      </v-scroll>
    <bottom-nav :nav-index="0"></bottom-nav>  
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import SearchBar  from '../components/SearchBar.vue'
import TabBar  from '../components/TabBar.vue'
import CategoryBar  from '../components/CategoryBar.vue'
import Scroll  from '../components/Scroll.vue'
import BottomNav from '../components/BottomNav.vue'
import T from '../tool/tool'

export default {
  name: 'Home',
  components:{
    'v-scroll': Scroll,
    'search-bar':SearchBar,
    'tab-bar':TabBar,
    'category-bar':CategoryBar,
    'bottom-nav': BottomNav,
    'header-nav': HeaderNav,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      arr:[],
      tabBarArr:[
        {name:'法务',icon:{'icon-zanfuwutubiao06-copy':true},color:'#7ed321',type:1},
        {name:'财务',icon:{'icon-caiwu1':true},color:'#f5a623',type:2},
        {name:'工商',icon:{'icon-gongshang1':true},color:'#f56423',type:3},
        {name:'税收',icon:{'icon-shuiwu':true},color:'#f5be3f',type:4},
        {name:'海关',icon:{'icon-haiguan':true},color:'#51a1ff',type:5}
      ]
    }
  },
  methods:{
    onRefresh(done){
      console.log('ggggggg');
      setTimeout(()=>{
        done();
      },1000)
    },
    focusSearchBar(e){
      e.preventDefault();
      this.$router.push('search')
    },
    toExpertDetail(id){
      this.$router.push('expert/'+id)

    }
  },
  mounted(){
    document.title = '首页';
  }
}
</script>
<style scoped>
.recommend-expert{
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 10px;
}
.recommend-expert h3{
  font-size: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recommend-expert h3 span{
  height: 2px;
  flex: 1;
  background-color: #55cbc4;
}
</style>