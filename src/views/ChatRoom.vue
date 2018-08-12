<template>
  <div class="chat-room">
    <header-nav :title="'咨询室'"/>
      <count-timer v-if="!chatOver && countShow"
                   class="count-timer" 
                   ref="countTimer" 
                   :counts="counts"  
                   :on-end="countEnd" 
                   :on-change="countChange"
                  
      />
      <div class="end-chat-btn" v-if="!chatOver && !countShow" @click="endChat">结束对话</div>
    <v-scroll ref="chatContentWrapper" :on-refresh="onRefresh"  :bottom="vScrollBottom" :top="50">
      <div class="chat-msg-wrap"  @touchstart="checkInputPanelHeight">
        <template v-for="chat in order.expertOrderCharts">
          <!-- 左侧消息 -->
          <div v-if="!isMineChat(chat)" :key="chat.id" class="msg-item left-msg">
            <!-- <span class="msg-time">{{chat.creationTime}}</span> -->
            <img class="user-avatar" :src="chat.senderExpert.avatar | avatar" >
            <div class="chat-content" :class="{'voice-content':chat.chatType === 3}" @click="chatContentClicked(chat)">
              <template v-if="chat.chatType === 1">{{chat.content}}</template>
              <template v-else-if="chat.chatType === 2"><img :src="chat.content"/></template>
              <template v-else>
                <voice-wave :id="chat.id" :play="audioPlay" :play-id="audioPlayId"></voice-wave>
                <span class="voice-time">6"</span>
              </template>
            </div>
          </div>
          <!-- 右侧消息 -->
          <div v-else :key="chat.id" class="msg-item right-msg">
            <!-- <span class="msg-time">2017-7-20 19:20:20</span> -->
            <div class="chat-content" :class="{'voice-content':chat.chatType === 3}" @click="chatContentClicked(chat)">
              <template v-if="chat.chatType === 1">{{chat.content}}</template>
              <template v-else-if="chat.chatType === 2"><img :src="chat.content"/></template>
              <template v-else>
                <span class="voice-time">6"</span>
                <voice-wave :id="chat.id" :play="audioPlay" :play-id="audioPlayId"></voice-wave>
              </template>
            </div>
            <img class="user-avatar" :src="chat.senderExpert.avatar | avatar" >
          </div>
        </template>
      </div>
    </v-scroll>
    <div class="input-panel" :class="{'lagrge_inner':voiceInputShow}" :style="{bottom:inputPanelBottom+'px'}" ref="inputPanel">

      <div class="textarea-wrap" v-show="!voiceInputShow">
        <p class="back-text">{{inputMsg}}</p>
        <textarea  v-model="inputMsg" @change="textAreaChange" @focus="textAreaFocus" @blur="textAreaBlur" maxlength="300"></textarea>
      </div>

      <div class="voice-input" v-show="voiceInputShow" @touchstart="beginVoiceInput" @touchend="endVoiceInput">按住进行语音录入</div>

      <span class="voice-btn option-btn" v-show="!voiceInputShow" @click="toVoiceInput">
        <i class="iconfont icon-yuyin1"></i>
      </span>

      <span class="text-btn option-btn" v-show="voiceInputShow" @click="toTextInput">
        <i class="iconfont icon-bianji"></i>
      </span>

      <span class="img-btn option-btn" @click="toSeleceImg">
        <i class="iconfont icon-tupian"></i>
      </span>

      <span class="send-btn" v-show="!voiceInputShow" @click="toSendMsg">发送</span>
    </div>
    <div class="input-panel-shim" ref="inputPanelShim" :style="{height:inputPanelBottom + 'px'}"></div>

    <div class="voice-input-tips" v-show="voiceInputTipsShow">
      <p class="tips-icon"><span class="iconfont icon-yuyin"></span></p>
      <p class="tips-text">正在录入语音</p>
    </div>
   
    <audio v-if="!!audioUrl" autoplay ref="audioObj" :src="audioUrl"></audio> 
  </div>
</template>

<script>
import Scroll from "../components/Scroll.vue";
import HeaderNav from "../components/HeaderNav.vue";
import CountTimer from "../components/CountTimer.vue";
import VoiceWave from "../components/VoiceWave.vue";
import T from "../tool/tool";
import api from "../ajax/index";
import chat from "../tool/signalr/index";
import wechat from "../tool/wechat/index";
import Player from "web-audio-player";
export default {
  name: "ChatRoom",
  components: {
    "header-nav": HeaderNav,
    "v-scroll": Scroll,
    "count-timer": CountTimer,
    "voice-wave": VoiceWave
  },
  data() {
    return {
      vScrollBottom: 70,
      inputMsg: "",
      audioPlay: false,
      voiceInputShow: false,
      voiceInputTipsShow: false,
      counts: 0,
      countShow: false,
      audioPlayId: -1,
      audioUrl: null,
      chatOver: true,
      order: {},

      inIos: false,
      inputPanelBottom: 20,
      isSendingMsg: false,
      startTime: 0,
      endTime: 0
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    scrollToBottom() {
      this.$refs.chatContentWrapper.toBottom(this.inputPanelBottom);
    },
    isMineChat(chat) {
      return chat.senderExpert.id === this.$store.state.user.id;
    },
    showImgDetail(chat) {
      wx.previewImage({
        current: chat.content, // 当前显示图片的http链接
        urls: [chat.content] // 需要预览的图片http链接列表
      });
    },

    toVoiceInput() {
      this.voiceInputShow = true;
      this.vScrollBottom = this.inputPanelBottom + 70;
    },
    toSeleceImg() {
      let that = this;
      wechat.uploadImage().then(images => {
        images.forEach(imgUrl => {
          chat.send({
            chatType: 2,
            content: imgUrl
          });
        });
      });
    },
    toTextInput() {
      this.voiceInputShow = false;
      this.vScrollBottom =
        this.inputPanelBottom + this.$refs.inputPanel.offsetHeight;
    },
    checkInputPanelHeight() {
      this.vScrollBottom =
        this.inputPanelBottom + this.$refs.inputPanel.offsetHeight;
    },
    toSendMsg() {
      if (this.isSendingMsg) {
        return;
      }
      this.isSendingMsg = true;
      let that = this;
      chat.send({
        content: that.inputMsg
      });
    },
    playAudio(chat) {
      if (chat.id == this.audioPlayId) {
        this.audioStoped();
        return;
      }

      this.audioUrl = chat.content;
      this.audioPlayId = chat.id;
      this.audioPlay = true;

      let audio = Player(this.audioUrl, {
        buffer: true
      });
      audio.on("load", () => {
        console.log("Audio loaded...");
        // start playing audio file
        audio.play();
      });

      audio.on("ended", () => {
        console.log("Audio ended...");
      });
      // setTimeout(() => {
      //   console.log("audio url:" + this.audioUrl);
      //   if (!this.$refs.audioObj) console.log("audioObj 不存在,无法播放");
      //   this.$refs.audioObj.play(this.audioUrl);
      // }, 0);
    },
    beginVoiceInput(e) {
      e.preventDefault();
      wechat.startRecord().then(() => {
        this.startTime = new Date().getTime();
        this.voiceInputTipsShow = true;
      });
      return false;
    },
    endVoiceInput() {
      this.endTime = new Date().getTime();
      if (this.endTime - this.startTime < 1000) {
        this.endTime = this.startTime = 0;
        this.voiceInputTipsShow = false;
        wx.stopRecord({});
        T.showToast("录音时间太短！");
        return false;
      }
      let that = this;
      wechat.stopRecord(that).then(voiceUrl => {
        chat.send({
          chatType: 3,
          content: voiceUrl
        });
      });
    },
    textAreaChange() {
      // this.vScrollBottom = this.inputPanelBottom +  this.$refs.inputPanel.offsetHeight;
    },
    countChange(i) {
      if (i == 120) {
        T.showToast({ text: "咨询时间还剩2分钟，请注意时间~" });
      }
    },
    countEnd() {
      T.showToast({ text: "咨询结束~" });
      this.countShow = false;
    },
    endChat() {
      api.CompleteOrder(this.$route.params.id).then(res => {
        this.$router.push("/order/detail/" + this.$route.params.id);
      });
    },
    beginChat(userId) {
      T.showToast({
        text: `${
          this.order.expertId == userId ? "专家" : "用户"
        }已进入咨询室，可以开始咨询啦`
      });
      this.counts = this.order.totalDuration * 60;
      this.countShow = true;
    },
    leaveChat(userId) {
      let text =
        this.order.expertId == userId ? "用户已离开咨询室" : "专家已离开咨询室";
      T.showToast({ text: text });
      this.countShow = false;
    },
    textAreaFocus() {},
    textAreaBlur() {},
    checkIfInIos() {
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        this.inIos = true;
      } else {
        this.inIos = false;
      }
    },
    chatContentClicked(chat) {
      if (chat.chatType === 1) return;
      if (chat.chatType === 2) {
        this.showImgDetail(chat);
      } else {
        this.playAudio(chat);
      }
    },
    audioStoped() {
      this.audioPlayId = -1;
      this.audioPlay = false;
      this.audioUrl = null;
    }
  },
  mounted() {
    let that = this;
    document.title = "咨询室";
    this.checkIfInIos();
    api
      .GetExpertOrderChats(this.$route.params.id)
      .then(res => {
        this.order = res.data.result;
        this.chatOver = this.order.status > 3;
        this.scrollToBottom();
      })
      .then(() => {
        if (that.chatOver) return;
        chat.start(this.$store.state, this.order, {
          onSend: data => {
            that.order.expertOrderCharts.push(data);
            that.inputMsg = "";
            T.hideLoading();
            setTimeout(() => {
              that.scrollToBottom();
            }, 0);
          },
          onStart: userId => {
            that.beginChat(userId);
          },
          onLeave: userId => {
            that.leaveChat(userId);
          }
        });
      });

    wechat.initJsSdk();
    wechat.initRecord();
  },
  destroyed() {
    chat.stop();
  },
  watch: {
    order: {
      handler() {
        this.$nextTick(() => {
          this.isSendingMsg = false;
          this.scrollToBottom();
        });
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.input-panel {
  box-sizing: border-box;
  /*position: fixed;*/
  /*bottom: 0;*/

  position: absolute;
  left: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #e3e3e3;
  padding: 10px 55px 10px 90px;
}
.input-panel.lagrge_inner {
  padding-right: 15px;
}
.input-panel-shim {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #e3e3e3;
}
.voice-input {
  min-height: 44px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  line-height: 44px;
  background-color: #f1f1f1;
  -webkit-user-select: none;
}
.input-panel .textarea-wrap {
  position: relative;
  min-height: 46px;
}
.input-panel .back-text {
  word-break: break-all;
  padding: 13px;
  font-size: 14px;
  line-height: 1.5;
}
.voice-input-tips {
  position: fixed;
  top: 30%;
  left: 50%;
  margin-left: -60px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  width: 120px;
  padding: 20px 0;
  text-align: center;
  color: #fff;
}
.voice-input-tips .tips-icon .iconfont {
  font-size: 40px;
}
.input-panel textarea {
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 11px;
  font-size: 14px;
  line-height: 1.5;
}
.input-panel .option-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 15px;
  border-radius: 50%;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
}
.input-panel .option-btn.voice-btn {
  left: 10px;
}
.input-panel .option-btn.text-btn {
  left: 10px;
}
.input-panel .option-btn.img-btn {
  left: 50px;
}

.input-panel .send-btn {
  position: absolute;
  bottom: 15px;
  right: 10px;
  font-size: 16px;
  color: #55cbc4;
}
.chat-msg-wrap {
  padding: 0 15px;
  padding-bottom: 10px;
}
.chat-msg-wrap .msg-item {
  padding-top: 30px;
  padding-bottom: 15px;
  /*margin-top: 15px;*/
  display: flex;
  position: relative;
}

.chat-msg-wrap .msg-item .msg-time {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 4px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
}
.chat-msg-wrap .msg-item .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.chat-msg-wrap .msg-item .chat-content {
  position: relative;
  line-height: 1.5;
  font-size: 14px;
  background: #b4eeb4;
  padding: 10px;
  border-radius: 4px;
  max-width: 240px;
  word-break: break-all;
}
.chat-msg-wrap .msg-item .chat-content::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border-width: 6px 12px;
  border-style: solid;
  border-color: #b4eeb4;
  top: 12px;
  border-top-color: transparent;
  border-bottom-color: transparent;
}
.chat-msg-wrap .msg-item.left-msg .user-avatar {
  margin-right: 15px;
}
.chat-msg-wrap .msg-item.left-msg .chat-content::before {
  border-left-color: transparent;
  left: -23px;
}
.chat-msg-wrap .msg-item.right-msg {
  justify-content: flex-end;
}
.chat-msg-wrap .msg-item.right-msg .user-avatar {
  margin-left: 15px;
}
.chat-msg-wrap .msg-item.right-msg .chat-content::before {
  border-right-color: transparent;
  right: -23px;
}
.chat-msg-wrap .msg-item .chat-content img {
  width: 120px;
  vertical-align: bottom;
}

.img-detail-panel {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 11;
}
.img-detail-panel img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.scaleIn {
  animation: scaleIn 0.3s;
}
@keyframes scaleIn {
  from {
    transform: scale(0.3, 0.3) translateY(0%);
  }
  to {
    transform: scale(1, 1) translateY(-50%);
  }
}

.scaleOut {
  animation: scaleOut 0.3s;
}
@keyframes scaleOut {
  from {
    transform: scale(1, 1) translateY(-50%);
  }
  to {
    transform: scale(0.3, 0.3) translateY(0%);
  }
}

.chat-msg-wrap .msg-item .chat-content.voice-content {
  display: flex;
  align-items: center;
}
audio {
  position: absolute;
  visibility: hidden;
}
.chat-room .count-timer {
  height: 50px;
  position: fixed;
  top: 0;
  right: 10px;
  color: #fff;
  z-index: 10;
  transform: translateZ(101px);
}
.end-chat-btn {
  position: fixed;
  top: 12px;
  right: 10px;
  color: #fff;
  z-index: 10;
  color: #fff;
  border: 1px solid #fff;
  font-size: 14px;
  line-height: 24px;
  padding: 0 6px;
  border-radius: 4px;
  transform: translateZ(101px);
}
</style>
