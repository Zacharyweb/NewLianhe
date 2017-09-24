<template>
  <div>
    <div class="topic-form">
      <div class="common-panel">
          <div class="panel-title">
             <h4>文章名称<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <input v-model="aritcleName" placeholder="请填写文章名称"></input>
           </div>
      </div>
      <div class="common-panel">
          <div class="panel-title">
             <h4>文章链接<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <input v-model="aritclelink" placeholder="请填写文章链接"></input>
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
      aritcleName:'',
      aritclelink:'' 
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
  .topic-form input{
    box-sizing: border-box;
    line-height: 40px;
    border: 1px solid #eee;
    width: 100%;
    font-size: 16px;
    padding: 0 10px;
  }
  .btn-wrapper{
    padding:15px;
  }
</style>