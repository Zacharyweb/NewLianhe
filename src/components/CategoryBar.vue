<template>
    <ul class="category-bar">
      <li v-for="(item,index) in tabBarArr" :class="{'selected':currentIndex === index}" @click="changeTab(index)">
        <span class="iconfont" :class="item.icon" :style="{'background-color':item.color || '#55cbc4'}"></span>
        <span class="category-name">{{item.name}}</span> 
      </li>
    </ul>
</template>

<script>
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
     currentIndex:0
    }
  },
  methods:{
    changeTab(index){
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
      display: flex;
      align-items:center;
      height:90px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
   }
   .category-bar li{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center
   }
   .category-bar li .iconfont{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: #fff;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
   }
   .category-bar li .category-name{
    margin-top: 6px;
    color: #666;
   }
   .category-bar li .category-item{


   }
   .category-bar li.selected{
    color: #55CBC4;
   }
   .category-bar li.selected .index-bar{
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
