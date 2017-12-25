<template>
  <div class="comment-detail-wrap">
    <v-scroll :on-refresh="onRefresh"  :bottom="50" :top="10">
    <div class="detail-msg-item">
          <h6 class="msg-title">
            <span class="iconfont icon-pingfen2"></span>
            用户评分
          </h6>
          <div class="comment-starts">
             <span class="iconfont" v-for="item in scoreArr" :key="item" 
                  :class="{'icon-pingfen':comment.score < item ,'icon-pingfen-':comment.score >= item}"
             >
             </span>
          </div>
    </div>
    <div class="detail-msg-item">
      <h6 class="msg-title">
        <span class="iconfont icon-pingjia1"></span>
        评价内容
      </h6>
      <div class="comment-detail">
        <div class="comment-list">
          <div class="comment-item user-comment">
            <div class="comment-item-top">
                <img class="user-avatar" :src="comment.avatar | avatar">
                <div class="user-msg">
                  <p class="user-name">{{comment.name}}</p>
                  <p class="user-tags">{{comment.post}}</p>
                </div>
            </div>
            <p class="comment-content">{{comment.content}}</p>
            <p class="comment-time">{{comment.creationTime | datetime("yyyy-MM-dd HH:mm:ss")}}</p>
            <p v-if="comment.expertCommentReplies.length" class="expert-reply">专家回复：{{comment.expertCommentReplies[0].content}}</p>
          </div>
        </div>
      </div>
    </div>
  </v-scroll>
    <!-- 回复评价 -->
    <!-- <div class="btn btn-green btn-large position-bottom" @click="showReplyPanel">回复</div> -->

    <!-- 回复弹窗 -->
    <div class="reply-panel" :class="{'show':replyPanelShow}">
      <div class="reply-panel-top">
        <span class="cancel-btn" @click="hideReplyPanel">取消</span>
        <span class="panel-title">回复评论</span>
        <span class="send-btn" @click="sendReply">发送</span>
      </div>
      <div class="reply-panel-body">
        <textarea  ref="replyInput" placeholder="请输入回复内容" v-model="replyContent" maxlength="200"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import T from "../tool/tool";
import Scroll from "../components/Scroll.vue";
import api from "../ajax/index";
export default {
  name: "ConsultDetail",
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      scoreArr: [2, 4, 6, 8, 10],
      score: 4,
      replyContent: "",
      replyPanelShow: false,
      comment: {}
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    showReplyPanel() {
      this.$refs.replyInput.focus();
      this.replyPanelShow = true;
    },
    hideReplyPanel() {
      this.replyPanelShow = false;
    },
    sendReply() {
      this.replyContent = "";
      this.hideReplyPanel();
    }
  },
  mounted() {
    console.log(this.$route.params);
    api.GetExpertOrderComment(this.$route.params.id).then(res => {
      this.comment = res.data.result;
      console.log(res.data.result);
    });
  }
};
</script>
<style scoped>
.comment-detail-wrap {
  margin-top: 20px;
}
.comment-detail-wrap .detail-msg-item {
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
  margin-bottom: 10px;
}

.comment-starts {
  display: flex;
  align-items: center;
  padding-top: 15px;
}
.comment-starts .iconfont {
  line-height: 30px;
  font-size: 28px;
  margin-right: 5px;
}
.comment-starts .iconfont.icon-pingfen {
  font-size: 26px;
  color: #ff8c00;
}
.comment-starts .iconfont.icon-pingfen- {
  color: #ffc125;
}
.comment-detail-wrap .detail-msg-item .msg-title {
  font-size: 17px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.comment-detail-wrap .detail-msg-item .msg-title .iconfont {
  font-size: 18px;
  margin-right: 10px;
}

.comment-detail-wrap .comment-detail .comment-item {
  margin-top: 15px;
  position: relative;
}
.comment-detail-wrap .comment-detail .comment-item .comment-item-top {
  display: flex;
}
.comment-detail-wrap .comment-detail .user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.comment-detail-wrap .comment-detail .user-comment .user-avatar {
  margin-right: 15px;
}
.comment-detail-wrap .comment-detail .user-comment .user-msg {
  padding-top: 5px;
}
.comment-detail-wrap .comment-detail .user-comment .user-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 2px;
}
.comment-detail-wrap .comment-detail .user-comment .user-tags {
  font-size: 14px;
  color: #999;
}
.comment-detail-wrap .comment-detail .user-comment .comment-content {
  font-size: 14px;
  line-height: 1.5;
  padding: 10px 0px;
}
.comment-detail-wrap .comment-detail .comment-time {
  color: #999;
  font-size: 12px;
}

.comment-detail-wrap .comment-detail .expert-reply {
  margin-top: 10px;
  font-size: 13px;
  color: #ff6347;
}

.reply-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9;
  transform: translateY(100%);
  transition: all 0.3s;
}
.reply-panel.show {
  transform: translateY(0);
}
.reply-panel .reply-panel-top {
  height: 48px;
  padding: 0 20px;
  padding-right: 10px;
  background-color: #55cbc4;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-panel .reply-panel-top .panel-title {
  font-size: 18px;
}
.reply-panel .reply-panel-top .send-btn {
  padding: 4px 10px;
  font-size: 15px;
  border: 1px solid #fff;
  border-radius: 4px;
}
.reply-panel-body {
  padding: 15px;
}
.reply-panel-body textarea {
  width: 100%;
  height: 400px;
  font-size: 14px;
  line-height: 1.5;
  border: none;
}
</style>
