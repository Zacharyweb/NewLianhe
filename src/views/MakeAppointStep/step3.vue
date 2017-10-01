<template>
  <div>
    <div class="check-page">
        <div class="checking-tips">
          专家已同意接收您的咨询请求，马上完成支付即可开始咨询。
        </div>
        <div class="btn-wrapper">
           <p class="btn btn-green btn-large" @click="toPay">支付{{amount}}元</p>
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
       amount:600,
      
    }
  },
  methods:{
    toPay(){
           
    }
    
  },
  mounted(){
     T.postAppointCurrentStep(3);
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