<template>
  <div>
    <div class="base-form common-panel">
      <div class="panel-title">
         <h4><span class="iconfont icon-icon"></span>请简要描述您的问题：</h4>
      </div>
      <div class="textarea-wrap">
        <textarea v-model="problem" placeholder="可描述自己需要解答的问题"></textarea>
      </div>
    </div>
    <div class="common-panel">
      <div class="panel-title">
         <h4><span class="iconfont icon-icon"></span>费用</h4>
      </div>
      <div class="panel-content">
        <p class="appoint-cost-tips">咨询以节为收费单元，每节30分钟，请选择您需要的节数。</p>
        <div class="appint-class-input">
           <span @click="()=>{ this.classNum--}">-</span>
           <input type="text" v-model="classNum">
           <span @click="()=>{ this.classNum++}">+</span>
        </div>
      </div>
    </div>
    <div class="common-panel">
      <div class="estimate-cost">
         <span class="text">预计费用</span>
         <span class="amount">{{classNum*perClassCost}}<i>元</i></span>
         <span class="appoint-class">{{classNum}}节（共{{classNum*perClassTime}}分钟）</span>
      </div>
    </div>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toNext">提交</p>
    </div>
  </div>
</template>

<script>
import T from '../../tool/tool'
export default {
  name: 'MakeAppointStep2',
  components:{
 
  },
  data () {
    return {
      problem:'',
      classNum:1,
      perClassTime:30,
      perClassCost:100,
    }
  },
  methods:{
    changeExperience(num){
      
    },
    toNext(){
      T.postAppointCurrentStep(2);
    }
  },
  mounted(){
     T.postAppointCurrentStep(1);
  }
}
</script>
<style scoped>
  .base-form{
    margin-top: 60px;
    padding:15px;
  }
  .base-form.common-panel .panel-title {
    padding-bottom: 0px;
    border-bottom: none;
  }
  .textarea-wrap{
    padding-top: 15px;
  }
  .textarea-wrap textarea{
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
  }
  .panel-content{
    padding-top: 15px;
  }
  .panel-content .appoint-cost-tips{
    padding: 0 5px;
    margin-bottom:15px;
  }
  .panel-content .appint-class-input{
    display: flex;
    justify-content: center;
  }
  .panel-content .appint-class-input span{
    width: 40px;
    font-size: 30px;
    text-align: center;
    line-height: 40px;

    color: #55cbc4; 
  }
  .panel-content .appint-class-input input{
    width: 120px;
    line-height: 42px;
    font-size: 20px;
    border: 1px solid #ccc;
    margin: 0 20px;
    text-align: center;
  }
  .estimate-cost{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .estimate-cost .text{
    padding: 4px 6px;
    background-color: #55cbc4;
    color: #fff;
  }
  .estimate-cost .amount{
    font-size: 24px;
    color: #E64340;
  }
  .estimate-cost .amount i{
    font-size: 16px;
  }
  .estimate-cost .appoint-class{
     color: #666;
  }
  .btn-wrapper{
    padding:15px;
  }
</style>