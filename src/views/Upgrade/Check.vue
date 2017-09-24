<template>
  <div>
    <div class="check-page">
       <div class="checking-tips" v-if="checkStatus == 0">
         您提交的资料正在审核中，将在3个工作日后公布结果。审核通过后，您的资料将会对用户展示。
       </div>
       <div class="checking-tips" v-if="checkStatus == 1">
         <p>审核通过啦，赶快开启专家之旅吧~ </p>

       </div>
      <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toHome" >返回首页</p>
      </div>
    </div>
  </div>
</template>

<script>
import T from '../../tool/tool'
export default {
  name: 'Check',
  components:{
 
  },
  data () {
    return {
       checkStatus:0
    }
  },
  methods:{
    toHome(){
      this.$router.push('/');
    }
  },
  mounted(){
     T.postCurrentStep(3);
     if(this.checkStatus == 1){
       T.postCurrentStep(4);
     }
  }
}
</script>
<style scoped>
 .check-page{
    margin-top: 80px;
 }
 .check-page .checking-tips{
  box-sizing: border-box;
  width: 90%;
  margin-left: 5%;
  background-color: #fff;
  padding: 15px 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  border-radius: 4px;
 }
 .btn-wrapper{
    padding:30px 5%;
  }


</style>