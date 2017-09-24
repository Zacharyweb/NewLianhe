<template>
  <div>
    <div class="intro-form">
      <!-- 个人介绍 -->
       <div class="common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon"></span>个人介绍</h4>
          </div>
           <div class="textarea-wrap">
             <textarea v-model="personIntro" placeholder="请填写个人介绍"></textarea>
           </div>
        </div>
      <!-- 话题介绍 -->
        <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon"></span>话题介绍</h4>
          </div>
          <span class="add-item-btn" @click="toAddTopic">添加话题</span>
          <ul class="edit-list">
            <li class="edit-item">
              <span>话题一</span>
              <p class="edit-icon">
                <span class="iconfont icon-bianji"></span> 
                <span class="iconfont icon-3"></span> 
              </p>
              
            </li>
            <li class="edit-item">
              <span>话题一</span>
              <p class="edit-icon">
                <span class="iconfont icon-bianji"></span> 
                <span class="iconfont icon-3"></span> 
              </p>
            </li>
          </ul>
        </div>
        <!-- 政策解读 -->
        <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon"></span>图片介绍</h4>
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

        <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon"></span>政策解读</h4>
          </div>
          <span class="add-item-btn" @click="toAddAritle">添加文章</span>
          <ul class="edit-list">
            <li class="edit-item">
              <span>文章一</span>
              <p class="edit-icon">
                <span class="iconfont icon-bianji"></span> 
                <span class="iconfont icon-3"></span> 
              </p>
              
            </li>
            <li class="edit-item">
              <span>文章二</span>
              <p class="edit-icon">
                <span class="iconfont icon-bianji"></span> 
                <span class="iconfont icon-3"></span> 
              </p>
            </li>
          </ul>
        </div>

    </div>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toCheck">提交审核</p>
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
      personIntro:'',
    
    }
  },
  methods:{
  
    toCheck(){
      let tel = this.tel;
      let code = this.code;
      T.postCurrentStep(3);
    },
    toAddTopic(){
      this.$router.push({
        path:'/etopic/add',
      })
    },
    toAddAritle(){
      this.$router.push({
        path:'/earticle/add',
      })
    }
  },
  mounted(){
     T.postCurrentStep(2);
  }
}
</script>
<style scoped>
  .intro-form{
    margin-top: 60px;
  }
  .common-panel{
 
  }
  .common-panel .panel-title {
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
  .edit-panel{
    position: relative;
  }
  .edit-panel .add-item-btn{
    position: absolute;
    font-size: 18px;
    color:  #55cbc4;
    right: 30px;
    top: 18px;
  }
  .edit-list{
    margin-top:15px;
  }
  .edit-list .edit-item{
    height:48px;
    padding: 0 10px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit-list .edit-icon{

  }
  .edit-list .edit-icon .iconfont{
    font-size: 22px;
    color: #55cbc4;
    margin-left: 10px;
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