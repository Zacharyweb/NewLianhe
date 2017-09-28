<template>
    <div class="tab-bar">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in tabBarArr" :key="index">
          <div class="tab-item" :class="{'selected':currentIndex === index}" @click="changeTab(index)">
             <span>{{item}}</span>
             <span class="index-bar"></span> 
          </div>
        </swiper-slide>
      </swiper>
    </div>  
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    tabBarArr: {
      type: Array,
      default: ['标签1','标签2','标签3']
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
      this.currentIndex = index;
      this.$emit('change',index)
    }
   
  },
  mounted(){
  
  }
}
</script>

<style scoped>
   .tab-bar{
      height:50px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
   }
  .tab-bar .swiper-slide{
      width: auto;
      margin: 0 15px;
     
   }
   .tab-bar .tab-item{
      position:relative;
      line-height: 50px;
      text-align: center;
   }
   .tab-bar .tab-item .index-bar{
      position: absolute;
      left:0;
      bottom:0;
      height:5px;
      width: 100%;
      display: none;
      -webkit-animation: line-scale 0.2s;
      animation: line-scale 0.2s;
   }
   .tab-bar .tab-item+.tab-item{
      border-left: 1px solid #e6e6e6;
   }
   .tab-bar .tab-item.selected{
    color: #55CBC4;
   }
   .tab-bar .tab-item.selected .index-bar{
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
