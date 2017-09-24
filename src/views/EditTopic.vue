<template>
  <div>
    <div class="topic-form">
      <div class="common-panel">
          <div class="panel-title">
             <h4>话题名称<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <input v-model="topicName" placeholder="请填写话题名称"></input>
           </div>
      </div>
      <div class="common-panel">
          <div class="panel-title">
             <h4>话题介绍<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <textarea v-model="topicContent" placeholder="请填写话题介绍"></textarea>
           </div>
      </div>
      <div class="common-panel topic-cost-form">
    
           <div class="form-input">
             <span class="label">话题收费<i class="require-icon">*</i>：</span>
             <input v-model="topicVal"  class="topic-val"></input>元/次
           </div>
           <div class="form-input">
             <span class="label">每次时间<i class="require-icon">*</i>：</span>
             <input v-model="topicTime"  class="topic-time"></input>分钟 
           </div>
      </div>
  
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toSave">保存</p>
    </div>
  </div>
</div>
</template>

<script>
import T from '../tool/tool'
export default {
  name: 'EditTopic',
  components:{
  
  },
  data () {
    return {
      topicName:'',
      topicContent:'',
      topicVal:'',
      topicTime:''
    
    }
  },
  methods:{
  
    toSave(){
      if(this.$route.params.type == 'add'){
        this.$router.push('/upgrade/intro')
      }
      
    },

  },
  mounted(){
    if(this.$route.params.type == 'edit'){
      //去拿数据
    }else{

    }
  }
}
</script>
<style scoped>
  .topic-form{
    margin-top: 20px;
  }
  .common-panel .panel-title {
    border: none;
  }
  .topic-form input,
  .topic-form textarea{
    box-sizing: border-box;
    line-height: 40px;
    border: 1px solid #eee;
    width: 100%;
    font-size: 16px;
    padding: 0 10px;
  }
  .topic-form textarea{
    height: 150px;
  }
  .topic-cost-form .form-input{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .topic-cost-form .form-input .label{
    font-size: 18px;

  }
  .topic-cost-form .form-input input{
    width: 40%;
    margin: 0 10px;

  }
  .btn-wrapper{
    padding:15px;
  }
</style>