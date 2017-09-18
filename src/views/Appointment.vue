<template>
  <div>
  <!-- 话题名称 -->
    <div class="common-panel">
        <div class="panel-title">
            <h4><span class="iconfont icon-huatiguanli"></span>预约话题</h4>
        </div>
        <p class="topic-content">
           我是话题我是话题我是话题我是话题我是话题我是话题我是话题我是话题我是话题我是话题
        </p>
    </div>
    <!-- 问题描述 -->
    <div class="common-panel">
        <div class="panel-title">
            <h4><span class="iconfont icon-icon"></span>详细问题描述</h4>
        </div>
        <p class="problem-desc-block">
          <textarea v-model="problemDesc" placeholder="可描述自己需要解答的问题~"></textarea>
        </p>
    </div>
    <!-- 空闲时间段 -->
    <div class="date-time-block common-panel">
      <div class="panel-title">
          <h4><span class="iconfont icon-shijian"></span>我的空闲时间段</h4>
      </div>
      <p class="date-time-item">
          <input class="date-picker" type="date" v-model="BeginDate">
          <input class="time-picker" type="time" v-model="BeginTime">
      </p>
      <p class="zhi-text">至</p>
      <p class="date-time-item">
          <input class="date-picker" type="date" v-model="EndDate">
          <input class="time-picker" type="time" v-model="EndTime">  
      </p>
    </div>

    <div class="btn btn-red btn-large position-bottom" @click="submitAppointment">提交</div>
  </div>
</template>

<script>
import T from '../tool/tool'

export default {
  name: 'Appointment',
  data () {
    return {
      BeginDate:'',
      BeginTime:'',
      EndDate:'',
      EndTime:'',
      problemDesc:'',
      now:null
    }
  },
  methods:{
    submitAppointment(){
      if(!this.checkDateTime()){
        return;
      }
      this.$router.push('sign');
    },
    checkDateTime(){
       var begin = new Date(this.BeginDate+' '+this.BeginTime).getTime();
       var end = new Date(this.EndDate+' '+this.EndTime).getTime();
       if(begin < this.now || end <this.now || end < begin){
         T.showToast({text:'空闲时间段不对哦~'});
         return false;
       }
       return true;
    }
  },
  mounted(){
    this.now = new Date().getTime() - 60*1000; 
    var dateTime = T.getDateTime(new Date());
    this.BeginDate = dateTime.date;
    this.BeginTime = dateTime.time;
    this.EndDate = dateTime.date;
    this.EndTime = dateTime.time;
    
  }
}
</script>
<style scoped>
  .topic-content{
    padding-top: 15px;
    line-height: 1.5;
  }
  .problem-desc-block{
    padding-top: 15px;
  }
  .problem-desc-block textarea{
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    padding: 15px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
  }
  .date-time-block input{
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0;
    appearance:none;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari 和 Chrome */
    text-align: center;
  }
  .date-time-block{
    padding: 15px 20px;
    margin-bottom:50px; 
  }
  .date-time-block .zhi-text{
    padding-top: 15px;
    color: #666;
  }
  .date-time-item{
    padding-top: 15px;
    display: flex;
    height: 34px;
    line-height: 32px;
  }
  .date-time-item .date-picker{
     flex: 2;
     margin-right: 20px;
  }
  .date-time-item .time-picker{
     flex: 1;
  }
  
</style>