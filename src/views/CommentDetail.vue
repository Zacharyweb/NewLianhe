<template>
  <div class="comment-detail-wrap">
        <div class="detail-msg-item">
          <h6 class="msg-title">
            <span class="iconfont icon-queding"></span>
            用户评分
          </h6>
          <div class="comment-starts">
             <span class="iconfont" v-for="(item,index) in scoreArr" 
                  :class="{'icon-pingfen':score < item ,'icon-pingfen-':score >= item}"
             >
             </span>
          </div>
        </div>

        <div class="detail-msg-item">
          <h6 class="msg-title">
            <span class="iconfont icon-queding"></span>
            评价内容
          </h6>
          <div class="comment-detail">
            <ul class="comment-list">
              <li class="comment-item user-comment">
                <img class="user-avatar" src="../../static/timg.jpeg">
                <p class="comment-content">聊的很开心，知道了声乐有哪几种唱法，觉得很值，谢谢专家指导~</p>
              </li>
              <li class="comment-item expert-reply">
                 <p class="comment-content">谢谢您的评价~</p>
                 <img class="user-avatar" src="../../static/timg.jpeg">
               </li>
            </ul>
          </div>
        </div>
  </div>
</template>

<script>

import T from '../tool/tool'
export default {
  name: 'ConsultDetail',
  components:{
 
  },
  data () {
    return {
        scoreArr:[2,4,6,8,10],
        score:4
    }
  },
  methods:{

  
  },
  mounted(){
     console.log(this.$route.params)
  }
}
</script>
<style scoped>
.comment-detail-wrap{
  margin-top: 20px;
}
.comment-detail-wrap .detail-msg-item{
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
  margin-bottom: 10px;
}
.comment-starts{
   display: flex;
   align-items: center;
   padding-top: 15px;
 }
 .comment-starts .iconfont{
   line-height: 30px;
   font-size: 28px;
   margin-right: 5px;
 }
 .comment-starts .iconfont.icon-pingfen{
   font-size: 26px;
   color: #FF8C00;
 }
 .comment-starts .iconfont.icon-pingfen-{
   color: #FFC125;
 }
.comment-detail-wrap .detail-msg-item .msg-title{
  font-size: 18px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.comment-detail-wrap .detail-msg-item .msg-title .iconfont{
  font-size: 18px;
  margin-right: 10px;
}
.comment-detail-wrap .comment-detail .comment-item{
   padding: 15px 0;
   display: flex;
}
.comment-detail-wrap .comment-detail .expert-reply{
  justify-content: flex-end;
}
.comment-detail-wrap .comment-detail .user-avatar{
   width: 48px;
   height: 48px;
   border-radius: 50%;
}
.comment-detail-wrap .comment-detail .user-comment .user-avatar{
  margin-right: 15px;
}
.comment-detail-wrap .comment-detail .expert-reply .user-avatar{
  margin-left: 15px;
}
.comment-detail-wrap .comment-detail .comment-content{
  position: relative;
  line-height: 1.5;
  background: #B4EEB4;
  padding: 10px;
  border-radius: 8px;
}
.comment-detail-wrap .comment-detail .user-comment .comment-content{
  flex: 1;
}
.comment-detail-wrap .comment-detail  .comment-content::before{
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border-width: 6px 12px;
  border-style: solid;
  border-color: #B4EEB4;
  top: 12px;
  border-top-color: transparent;
  border-bottom-color: transparent;
}
.comment-detail-wrap .comment-detail  .user-comment .comment-content::before{
  border-left-color: transparent;
  left: -23px;
}
.comment-detail-wrap .comment-detail  .expert-reply .comment-content::before{
  border-right-color: transparent;
  right: -23px;
}
</style>
