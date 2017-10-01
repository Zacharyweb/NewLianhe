<template>
  <div>
    <div class="intro-form">
      <!-- 专长介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>专长介绍<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <textarea v-model="skillContent" placeholder="请填写专长介绍,200字以内"></textarea>
           </div>
      </div>
      <!-- 咨询费用 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>咨询价格/每节（30分钟）<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <input v-model="classVal" placeholder="请填写咨询价格"></input>元
           </div>
      </div>
      <!-- 收款账号 -->
      <div class="common-panel">
           <div class="panel-title">
              <h4>收款账号（任填一个）<span class="require-icon">*</span></h4>
           </div>
           <div class="form-input">
             <span class="label">微信：</span>
             <input v-model="wxAccount" placeholder="请填写微信收款账号"></input>
           </div>
           <div class="form-input">
             <span class="label">支付宝：</span>
             <input v-model="zfbAccount" placeholder="请填支付宝收款账号"></input> 
           </div>
      </div>
      <!-- 个人介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>个人介绍<i class="require-icon">*</i></h4>
          </div>
           <div class="textarea-wrap">
             <textarea v-model="personIntro" placeholder="请填写个人介绍"></textarea>
           </div>
      </div>
        <!-- 图片介绍 -->
      <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4>图片介绍</h4>
          </div>
          <div class="img-list">
            <img class="add-img-btn" src="../../../static/add_img.png" alt="">
            <div class="img-item">
              <img src="../../../static/timg.jpeg"  alt="">
              <p class="edit-img">
                <span class="iconfont icon-3"></span> 
              </p>
            </div>
        
          </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toCheck">下一步</p>
    </div>
  </div>
</template>

<script>
import T from '../../tool/tool'
export default {
  name: 'SignIn',
  components:{
  
  },
  data () {
    return {
      skillContent:'',
      classVal:'',
      wxAccount:'',
      zfbAccount:'',
      personIntro:'',
    
    }
  },
  methods:{
    toCheck(){

      T.postCurrentStep(3);
    },

  },
  mounted(){
     T.postCurrentStep(2);
     document.body.scrollTop = 0;
  }
}
</script>
<style scoped>
  .intro-form{
    margin-top: 60px;
  }
  .intro-form .common-panel .panel-title {
    border: none;
  }
  .intro-form input,
  .intro-form textarea{
    box-sizing: border-box;
    line-height: 40px;
    border: 1px solid #eee;
    font-size: 16px;
    padding: 0 10px;
  }
  .intro-form input{
    width:90%;
    margin-right: 10px;
  }
  .intro-form textarea{
    padding: 10px 15px;
    height: 150px;
    width: 100%;
    line-height: 1.3;
  }
  .intro-form .form-input{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .intro-form .form-input .label{
    font-size: 18px;
    width: 80px;

  }
  .intro-form .form-input input{
    width: 65%;
    margin: 0 10px;

  }


  .edit-panel{
    position: relative;
  }
  .edit-panel .img-list{
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .edit-panel .img-list .add-img-btn{
    margin-right: 10px;
  }
  .edit-panel .img-list .img-item{
    position:relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .edit-panel .img-list img{
    height: 70px;
  }
  .edit-panel .img-list .edit-img{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    height: 30px;
  }
  .edit-panel .img-list .edit-img .iconfont{
    color: #fff;
    font-size: 20px;
    text-align: right;
    flex: 1;
    padding-right: 5px;
  }

  .btn-wrapper{
    padding:15px;
  }
</style>