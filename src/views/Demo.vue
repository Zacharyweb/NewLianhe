<template>
  <div>
      <div :class="{'to-top': focusOnSeach}">
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <div class="index-notice">
        <img class="expert-avatar" src="../../static/timg.jpeg">
        <p class="notice-text">专家xxx已同意解答问题，并约定了时间</p>
        <span class="todetail-icon iconfont icon-jiantou-copy-copy"></span>
      </div>
      <category-bar :tab-bar-arr='tabBarArr'></category-bar>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="60" :top="215">
         <p class="btn btn-large btn-red" @click="showAlert">Alert测试</p>
         <p class="btn btn-large btn-red" @click="showConfirm">Confirm测试</p>
         <p class="btn btn-large btn-red" @click="showToast">吐司测试</p>
         <p class="btn btn-large btn-red" @click="showLoading">Loadingt测试</p>
         <h2 v-for="item in arr">Essential Links</h2>
         <router-link to="/header">Go to Header</router-link>
         <router-link to="/footer">Go to Foter</router-link>
      </v-scroll>
    </div>
    <bottom-nav :nav-index="2"></bottom-nav>
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
    showAlert(){
      T.Alert({
        text:'',
        confirm(){
          console.log('alert确定')
        }
      })
    },
    showConfirm(){
      T.Confirm({
        text:'',
        confirm:function(){
           console.log('Confirm确定')
        },
        cancel:function(){
           console.log('Confirm取消')
        }
      });
    },
    showToast(){
      T.showToast({text:'账号密码错误'});
    },
    showLoading(){
      T.showLoading();
      setTimeout(()=>{
        T.hideLoading();
      },2000)
    },
    onRefresh(done){
      console.log('ggggggg');
      setTimeout(()=>{
        done();
      },1000)
    },
    onInfinite(done){
      console.log('hhhhhhhhhhh');
      setTimeout(()=>{
        if(this.arr.length < 40){
          this.arr = this.arr.concat([1,1,1,1,1,1]);
          done();

        }
        else{
          done('nomore');
        }
        // done('nodata');
      },2000)
    },
    focusSearchBar(e){

      e.preventDefault();
      this.$router.push('search')
    }
  
  },
  mounted(){
    T.get({
      url:'/webDev/couresByCategory.htm',
      data:{
        pageNo: 1, 
        psize: 5, 
        type: 10
      },
      headers: {},
      transformRequest: [function (data) {
         T.showLoading();
         return data;
      }],
      transformResponse: [function (data) {
         T.hideLoading();
         return data;
      }],
    }).then((res)=>{
      console.log(res);
    }).catch(function(err){
      console.log(err)
    });
     setTimeout(()=>{
      this.arr = [1,1,1,1,1,1,1,1,1,1,1,1];
        T.checkFirstPageData(this.arr);
     },2000)
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
h2{
  height: 60px;
}
.btn{
  margin-bottom: 10px;
}
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
</style>
