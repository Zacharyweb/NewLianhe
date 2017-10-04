<template>
  <div>
    <div class="check-page">
       <div class="checking-tips">
         <p>咨询费用已支付，进入咨询室即可开始咨询~ </p>
       </div>
       <div class="btn-wrapper">
           <p class="btn btn-green btn-large" @click="toConsultHome">进入咨询室</p>
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

    }
  },
  methods:{

    toConsultHome(){
        T.postAppointCurrentStep(5);
        setTimeout(()=>{
          this.$router.push('/chat/56');

        },300)
    }
  },
  mounted(){
    T.postAppointCurrentStep(4);
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