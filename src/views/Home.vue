<template>
  <div>
    <div :class="{'to-top': focusOnSeach}">
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="60" :top="60">
        <div class="index-notice">
          <img class="expert-avatar" src="../../static/timg.jpeg">
          <p class="notice-text">专家xxx已同意解答问题，并约定了时间</p>
          <span class="todetail-icon iconfont icon-jiantou-copy-copy"></span>
        </div>
         <category-bar :tab-bar-arr='tabBarArr'></category-bar>
         <div class="recommend-expert">
           <h3 class="recommend-text">为您推荐</h3>
         </div>
         <div class="expert-block">
             <h4>财务专家</h4>
             <ul class="expert-list">
               <li class="expert-item">
                 <img class="expert-avatar" src="../../static/timg.jpeg">
                 <div class="expert-info">
                   <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题话题</p>
                   <p class="expert-msg text-ellipsis">
                      <b class="expert-name">威震天</b>&nbsp;&nbsp;幽谷数据有限公司&nbsp;&nbsp;著名导弹专家
                   </p>
                   <p class="personal-tag">
                     <span class="tag-item">风趣</span>
                     <span class="tag-item">幽默</span>
                     <span class="tag-item">专业知识牛</span>
                   </p>
                 </div>
               </li>
               <li class="expert-item">
                 <img class="expert-avatar" src="../../static/timg.jpeg">
                 <div class="expert-info">
                   <p class="expert-topic">制定的话题话题</p>
                   <p class="expert-msg">
                      <b class="expert-name">威震天</b>
                   </p>
                   <p class="personal-tag">
                     <span class="tag-item">风趣</span>
                     <span class="tag-item">幽默</span>
                     <span class="tag-item">专业知识牛</span>
                   </p>
                 </div>
               </li>
             </ul>
         </div>
        
      </v-scroll>
    </div>
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
        {name:'法务',icon:{'icon-zanfuwutubiao06-copy':true},color:'#7ed321'},
        {name:'财务',icon:{'icon-caiwu1':true},color:'#f5a623'},
        {name:'工商',icon:{'icon-gongshang1':true},color:'#f56423'},
        {name:'税收',icon:{'icon-shuiwu':true},color:'#f5be3f'},
        {name:'海关',icon:{'icon-haiguan':true},color:'#51a1ff'}
      ],
      focusOnSeach: true
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
    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
.index-notice{
  padding: 0 15px;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between; 
  position: relative;
}
.index-notice .notice-text{
  font-size: 15px;
}
.index-notice .expert-avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.index-notice .todetail-icon{
  font-size: 24px;
}
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
.expert-block{
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 10px;
}
.expert-block h4{
  font-size: 16px;
  position: relative;
  padding-bottom: 20px;
}
.expert-block h4:before{
  content: '';
  position: absolute;
  width: 8px;
  height: 19px;
  background-color:#55cbc4;
  top:0;
  left: -20px;

}
.expert-block .expert-item{
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #e6e6e6;
}
.expert-block .expert-item img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  vertical-align: bottom;
  margin-right: 20px;
}
.expert-block .expert-item .expert-info{
  flex: 1;
  width: 0;
}
.expert-block .expert-item .expert-topic{
  font-size: 16px;
  margin-bottom: 8px;
}
.expert-block .expert-item .expert-msg{
  margin-bottom: 8px;
  color: #ccc;
}
.expert-block .expert-item .expert-name{
  color: #666;
  font-size: 16px;
  font-weight: bold;
}
.expert-block .expert-item .personal-tag{
  display: flex;
}
.expert-block .expert-item .personal-tag .tag-item{
  padding: 2px 4px;
  border: 1px solid #55cbc4;
  border-radius: 2px;
  color: #55cbc4;
  margin-right: 8px;
}
</style>