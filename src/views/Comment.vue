<template>
  <div>
    <div class="comment-form">
      <!-- 评分 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>评分<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
              <div class="comment-starts">
                <span class="iconfont" v-for="(item,index) in scoreArr"  @click="score = item" 
                     :class="{'icon-pingfen':score < item ,'icon-pingfen-':score >= item}"
                >
                </span>
              </div>
           </div>
      </div>
      <!-- 评价内容 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>评价内容<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <textarea v-model="commentContent" placeholder="请填写评价内容~"></textarea>
           </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toSubmit">提交评价</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SignIn',
  components:{
     
  },
  data () {
    return {
      commentContent:'',
      scoreArr:[2,4,6,8,10],
      score:0
    }
  },
  methods:{
    toSubmit(){
       console.log(this.commentContent);
       console.log(this.score);
       this.$router.go(-1);
       
    },

  },
  mounted(){
 
    
  }
}
</script>
<style scoped>
  .comment-form{
    margin-top: 20px;
  }
  .comment-form .comment-starts{
    display: flex;
    align-items: center;
  }
  .comment-form .comment-starts .iconfont{
    line-height: 30px;
    font-size: 28px;
    margin-right: 5px;
  }
  .comment-form .comment-starts .iconfont.icon-pingfen{
    font-size: 26px;
    color: #FF8C00;
  }
  .comment-form .comment-starts .iconfont.icon-pingfen-{
    color: #FFC125;
  }
  .comment-form .common-panel .panel-title {
    border: none;
  }
  .comment-form textarea{
    box-sizing: border-box;
    line-height: 1.3;
    border: 1px solid #eee;
    font-size: 16px;
    padding: 10px 15px;
    height: 150px;
    width: 100%;
  }
  
  .btn-wrapper{
    padding:15px;
  }
</style>