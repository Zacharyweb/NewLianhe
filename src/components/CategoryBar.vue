<template>
    <div class="category-bar">
     <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in tabBarArr" :key="item.name">
          <div  class="category-item"  :class="{'selected':currentIndex ===  index}" @click="changeTab(index)">
             <span class="iconfont" :class="item.icon" :style="{'background-color':item.color || '#55cbc4'}"></span>
             <span class="category-name">{{item.name}}</span> 
          </div>
        </swiper-slide>
      </swiper>
    </div>  
</template>

<script>
require('swiper/dist/css/swiper.css')
import T from '../tool/tool.js'
export default {
  name: 'TabBar',
  props: {
    tabBarArr: {
      type: Array,
      default:[]
    }
  },
  data () {
    return {
      currentIndex:0,
      swiperOption: {
          slidesPerView: 'auto',
          observer: true,
          observeParents: true,
          freeMode: true
      }
    }
  },
  methods:{
    changeTab(index){
      if(this.tabBarArr[index].type == -1){
        T.showToast({text:'更多分类将即将开放，敬请期待~'});
        return;
      }
      this.currentIndex = index;
      this.$router.push({
        path:'/cate',
        query:{
          type:this.tabBarArr[index].type,
          name:this.tabBarArr[index].name
        }
      })
    }
   
  },
  mounted(){
   
  }
}
</script>

<style scoped>
   .category-bar{
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
   }
   .category-bar .category-item{
      height:90px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center
   }
   .category-bar .swiper-slide{
      width: auto;
      margin:0 17px;
   }
   .category-bar .category-item .iconfont{
      box-sizing: border-box;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      color: #fff;
      padding:9px;
    /*  line-height: 48px;*/
      text-align: center;
      font-size: 30px;
   }
   .category-bar .category-item .category-name{
    margin-top: 6px;
    color: #666;
    font-size: 14px;
   }
   .category-bar .category-item .category-item{


   }
   .category-bar .category-item.selected{
    color: #55CBC4;
   }
   .category-bar .category-item.selected .index-bar{
      display: block;
      background-color:#55CBC4;
   }
   @keyframes line-scale{
      from{
          transform: scalex(0);
          opacity: 0.3;
      }
      to{
          transform: scalex(1);
          opacity: 1;
      }   
   }
   @-webkit-keyframes line-scale {
      from{
          transform: scalex(0);
          opacity: 0.3;
      }
      to{
          transform: scalex(1);
          opacity: 1;
      }   
    
  }
</style>
