<template>
   <div class="panel-mask" @click.self="close">
     <div class="topic-list-panel slide-in-bottom" :class="{'slide-out-bottom':isClose}">
       <p class="select-topic-tips">请选择需要预约的话题~</p>
       <ul class="topic-list">
         <li class="topic-item" @click="selectedIndex = 0" :class="{'active': selectedIndex == 0}">
           <h4 class="topic-name">话题名称1</h4>
           <p class="topic-cost"> 
             <span class="topic-price">￥<i>300</i>/次</span>
             <span class="topic-duration">约半小时</span>
           </p>
           <span class="selected-icon iconfont icon-queding"></span>
         </li>
         <li class="topic-item" @click="selectedIndex = 1" :class="{'active': selectedIndex == 1}">
           <h4 class="topic-name">话题名称2</h4>  
           <p class="topic-cost"> 
             <span class="topic-price">￥<i>300</i>/次</span>
             <span class="topic-duration">约半小时</span>
           </p>
           <span class="selected-icon iconfont icon-queding"></span>
         </li>
       </ul>
       <div>
         <p class="btn btn-red btn-large" :class="{'disabled':selectedIndex == -1}" @click="toNext">下一步</p>
       </div>
     </div>
   </div>
</template>
<script>
import T from '../tool/tool'
export default {
  name: 'TopicListPanel',
  props:{
     bottom:{
        type: Number,
        default: 0
      }
    },
   
  data () {
    return {
      selectedIndex:-1,
      isClose:false
    }
  },
  methods:{
   close(){
    this.isClose = true;
    this.$emit('close');
   },
   toNext(){
    if(this.selectedIndex == -1){
      T.showToast({text:'请先选择一个话题'});
      return;
    }
    this.$emit('next',this.selectedIndex);
   }
    
  },
  mounted(){
     
  },

}
</script>

<style scoped>
  .panel-mask{
     position: fixed;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0,0,0,0.5);
     text-align: center;
     box-sizing: border-box;
     color: #666;
     z-index: 9999;
  }
  .topic-list-panel{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  .topic-list-panel .select-topic-tips{
    padding:15px 20px;
    border-bottom: 1px solid #e6e6e6; 
  }
  .topic-list-panel .topic-list{
    padding: 0 20px;
  }
  .topic-list-panel .topic-item{
    padding: 15px 0;
    position: relative;
  }
  .topic-list-panel .topic-item .selected-icon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #55cbc4;
    right: 20px;
    font-size: 30px;
    display: none;

  }
  .topic-list-panel .topic-item.active .selected-icon{
    display: block;
  }
  .topic-list-panel .topic-item+.topic-item{
    border-top: 1px solid #e6e6e6;
    
  }
    
  .topic-list-panel .topic-item .topic-name{
    line-height: 1.6;
    margin-bottom: 10px;
    text-align: left;
  }
  .topic-list-panel .topic-item .topic-cost{
    display: flex;
    font-size: 14px;
  }
  .topic-list-panel .topic-item .topic-price{
    color: #E64340;
    margin-right: 10px;
  }
  .topic-list-panel .topic-item .topic-price i{
    font-size: 18px;
  }
  .topic-list-panel .topic-item .topic-duration{
    color: #666;
    line-height: 22px;
  }
  .slide-in-bottom{
     -webkit-animation: slideInBottom 0.3s;
     animation:slideInBottom 0.3s;
  }
  @keyframes slideInBottom{
      from{
          transform: translateY(100%);
          opacity: 0.3;
      }
      to{
          transform: translateY(0);
          opacity: 1;
      }
  }
  .slide-out-bottom{
     -webkit-animation: slideOutBottom 0.3s;
     animation:slideOutBottom 0.3s;
  }
  @keyframes slideOutBottom{
      from{
          transform: translateY(0);
          opacity: 0.3;
      }
      to{
          transform: translateY(100%);
          opacity: 1;
      }
  }
</style>
