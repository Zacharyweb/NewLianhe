<template>
  <div class="be-expert">
    <div class="step-line">
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 1}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 1,'prev':currentStep > 1}"></span>
        <p class="step-name">基本信息</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 2}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 2,'prev':currentStep > 2}"></span>
        <p class="step-name">介绍信息</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 3}"></span>
        <span class="circle-icon" :class="{'current':currentStep == 3,'prev':currentStep > 3}"></span>
        <p class="step-name">提交审核</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':currentStep >= 4}"></span>
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
      currentStep:1
    }
  },
  methods:{
    onRefresh(done){
      done();
    },
    setStep(type,num){
      this.currentStep = num;
      if(num == 2){
        this.$router.push('/upgrade/intro')
      }
      if(num == 3){
        this.$router.push('/upgrade/check')
      }
    } 
  },
  mounted(){
    this.$PubSub.subscribe('POSTCURRENTSTEP',this.setStep);
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
    color: #666;
    position: absolute;
    bottom: -40px;
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