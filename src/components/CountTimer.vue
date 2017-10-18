<template>
  <div class="count-time-wrap">
    <span class="iconfont icon-shijian" v-if="showIcon"></span>
    <span class="count-hours">{{hours}}:</span>
    <span class="count-minutes">{{minutes}}:</span>
    <span class="count-seconds">{{seconds}}</span>
  </div>
</template>
<script>
export default {
  name: 'CountTimer',
  data () {
    return {
      countTimes:this.counts,
      hours:'00',
      minutes:'00',
      seconds:'00',
      timer:null
    }
  },
  props: {
      counts: {
        type: Number,
        default: 60
      },
      showIcon:{
        type:Boolean,
        default:true
      },
      autoBegin:{
        type:Boolean,
        default:true
      },
      onBegin: {
        type: Function,
        default: undefined,
        required: false
      },
      onChange: {
        type: Function,
        default: undefined,
        required: false
      },
      onEnd: {
        type: Function,
        default: undefined,
        require: false
      }
    },
  methods:{
     transformTime(time){
        var h = Math.floor(time / 3600);
        var m = Math.floor(time / 60 % 60);
        var s = Math.floor(time % 60);
        this.hours = h < 10 ? '0' + h : '' + h;
        this.minutes = m < 10 ? '0' + m : '' + m;
        this.seconds = s < 10 ? '0' + s : '' + s;
     },
     initCountTime(){
        if(this.countTimes == -1){
          return;
        } 
        let flag = false;
        this.timer = setInterval(()=>{
            this.transformTime(this.countTimes);

            // 开始回调
            (!flag && this.onBegin)?this.onBegin():'';
            flag = true;

            // 计时变更回调
            this.onChange?this.onChange(this.countTimes):'';

            this.countTimes = --this.countTimes;

            if(this.countTimes == -1){
               clearInterval(this.timer);
               // 结束回调
               this.onEnd?this.onEnd():'';
            }
        },1000)
    },
    begin(){
      this.initCountTime();
    }
  },
  mounted(){
    this.transformTime(this.countTimes);
    if(this.autoBegin){
      this.initCountTime();
    }
    
  },
  destroyed(){
    clearInterval(this.timer);
  }
}
</script>

<style>
  .count-time-wrap{
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .count-time-wrap .iconfont{
    padding-right: 10px;
    font-size: 20px;
  }
</style>
