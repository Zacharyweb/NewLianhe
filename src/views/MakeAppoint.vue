<template>
  <div class="be-expert">
    <div class="step-line">
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 1}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 1,'prev':currentStep > 1}"></span>
        <p class="step-name">发起咨询</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 2}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 2,'prev':currentStep > 2}"></span>
        <p class="step-name">等待确认</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 3}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 3,'prev':currentStep > 3}"></span>
        <p class="step-name">支付费用</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 4}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 4,'prev':currentStep > 3}"></span>
        <p class="step-name">开始咨询</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 5}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 5,'prev':currentStep > 3}"></span>
        <p class="step-name">咨询室</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 6}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 6,'prev':currentStep > 3}"></span>
        <p class="step-name">反馈</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 7}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 7,'prev':currentStep > 3}"></span>
        <p class="step-name">完成</p>
      </div>

      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 8}"></span>
      </div>
    </div>
    <!-- 步骤表单 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'

export default {
  name: 'TopicDetail',
  components:{
    'v-scroll':Scroll
  },
  data () {
    return {
      currentStep:1,
      a:'abc'
    }
  },
  methods:{
    onRefresh(done){
      done();
    },
    setStep(type,num){
      this.currentStep = num;
      console.log(num)
      if(num == 2){
          this.$router.push({
             path:'/appoint/step2',
             query:{
               expertId:this.$route.query.expertId,
             }
          })
      }
    } 
  },
  mounted(){
    this.$PubSub.subscribe('POSTAPPOINTCURRENTSTEP',this.setStep);
    document.title="咨询";
  }
}
</script>
<style scoped>
  .be-expert{
    margin-top: 40px;
  }
  .step-line{
    display: flex;

  }
  .step-line .step-item{
    flex: 1;
    background-color: #ddd;
    height: 2px;
    position: relative;
  }
  .step-line .step-item .step-fill{
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    background-color: #FF4040;
    width: 0;
    transition: all 0.3s;
  }
  .step-line .step-item .step-fill.stretch{
    width: 100%;
  }
  .step-line .step-item .circle-icon{
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: #ccc;
    top: 50%;
    right: 0;
    transform: translate(50%,-50%);
    z-index: 10;
  } 
  .step-line .step-item .step-name{
    font-size: 14px;
    max-width: 30px;
    color: #666;
    position: absolute;
    top: 15px;
    right: 0;
    transform: translateX(50%);

  }
  .step-line .step-item .circle-icon.current{
     background-color: #55cbc4;
  } 

  .step-line .step-item .circle-icon.prev{
   background-color: #FF4040;
  } 

</style>