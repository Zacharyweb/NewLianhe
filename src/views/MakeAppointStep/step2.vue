<template>
  <div>
       <div class="check-page">
       <div class="checking-tips">
         您发起的咨询已提交，请等待专家回复~
       </div>
      <div class="btn-wrapper">
          <p class="btn btn-green btn-large" @click="returnBack">返回咨询列表</p>
      </div>
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
     
    }
  },
  methods:{
    returnBack(){
      this.$router.push('/consult');
    },
  },
  mounted(){
     T.postAppointCurrentStep(2);
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