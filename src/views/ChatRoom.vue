<template>
  <div class="chat-room">
    <header-nav :title="'咨询室'"/>
      <count-timer v-if="countShow"
                   class="count-timer" 
                   ref="countTimer" 
                   :counts="counts"  
                   :on-end="countEnd" 
                   :on-change="countChange"
                  
      />
      <div class="end-chat-btn" v-if="!countShow" @click="endChat">结束对话</div>
    <v-scroll ref="chatContentWrapper" :on-refresh="onRefresh"  :bottom="vScrollBottom" :top="50">
      <div class="chat-msg-wrap"  @touchstart="checkInputPanelHeight">
        <template v-for="(chat,index) in order.expertOrderCharts">
          <!-- 左侧消息 -->
          <div v-if="!isMineChat(chat)" :key="index" class="msg-item left-msg">
            <!-- <span class="msg-time">{{chat.creationTime}}</span> -->
            <img class="user-avatar" src="../../static/timg.jpeg" >
            <div class="chat-content">{{chat.content}}</div>
          </div>
          <!-- 右侧消息 -->
          <div v-else :key="index" class="msg-item right-msg">
            <!-- <span class="msg-time">2017-7-20 19:20:20</span> -->
            <div class="chat-content">{{chat.content}}</div>
            <img class="user-avatar" src="../../static/timg.jpeg" >
          </div> 
          <!-- 左侧语音 -->
          <!-- <div class="msg-item left-msg">
            <span class="msg-time">2017-7-20 19:20:20</span>
            <img class="user-avatar" src="../../static/timg.jpeg" >
            <div class="chat-content voice-content" @click="playAudio(1)"> 
              <voice-wave :id="1" :play="audioPlay" :play-id="audioPlayId"></voice-wave>
              <span class="voice-time">6"</span>
            </div>
          </div>  -->
          <!-- 右侧语音 -->
          <!-- <div class="msg-item right-msg">
            <span class="msg-time">2017-7-20 19:20:20</span>
            <div class="chat-content voice-content" @click="playAudio(2)"> 
              <span class="voice-time">6"</span>
              <voice-wave :id="2" :play="audioPlay" :play-id="audioPlayId"></voice-wave>
            </div>
            <img class="user-avatar" src="../../static/timg.jpeg">
          </div>  -->
          <!-- 左侧图片 -->
          <!-- <div class="msg-item left-msg">
            <span class="msg-time">2017-7-20 19:20:20</span>
            <img class="user-avatar" src="../../static/timg.jpeg" >
            <div class="chat-content">
              <img src="../../static/timg.jpeg"  @click="showImgDetail">
            </div>
          </div> -->
          <!-- 右侧图片 -->
          <!-- <div class="msg-item right-msg">
            <span class="msg-time">2017-7-20 19:20:20</span>
            <div class="chat-content">
              <img src="../../static/timg.jpeg"  @click="showImgDetail">
            </div>
            <img class="user-avatar" src="../../static/timg.jpeg" >
          </div>         -->
        </template>
      </div>
    </v-scroll>
    <div class="input-panel" ref="inputPanel">
      <div class="textarea-wrap" v-show="!voiceInputShow">
       <p class="back-text">{{inputMsg}}</p>
       <textarea  v-model="inputMsg" @change="textAreaChange" @focus="textAreaFocus"></textarea>
      </div>
      <div class="voice-input" v-show="voiceInputShow" @touchstart="beginVoiceInput" @touchend="endVoiceInput">
        按住进行语音输入
      </div>
      <span class="voice-btn option-btn" v-show="!voiceInputShow" @click="toVoiceInput">
        <i class="iconfont icon-yuyin1"></i>
      </span>
      <span class="text-btn option-btn" v-show="voiceInputShow" @click="toTextInput">
        <i class="iconfont icon-bianji"></i>
      </span>
      <span class="img-btn option-btn" @click="toSeleceImg">
        <i class="iconfont icon-tupian"></i>
      </span>

      <span class="send-btn" @click="toSendMsg">发送</span>
    </div>
    <div class="voice-input-tips" v-show="voiceInputTipsShow">
      <p class="tips-icon"><span class="iconfont icon-yuyin"></span></p>
      <p class="tips-text">正在录入语音</p>
    </div>
  

    <div class="img-detail-panel" v-if="imgDetailShow" @click="hideImgDetail">
      <img class="scaleIn" :class="{'scaleOut':imgDetailScaleOut}" src="https://s1.ax1x.com/2017/10/16/JQZeP.jpg" >
    </div>
   
    <audio ref="audioObj" src="http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"></audio> 
  </div>
</template>

<script>
import Scroll from "../components/Scroll.vue";
import HeaderNav from "../components/HeaderNav.vue";
import CountTimer from "../components/CountTimer.vue";
import VoiceWave from "../components/VoiceWave.vue";
import config from "../tool/config";
import T from "../tool/tool";
import api from "../ajax/index";
import chat from "../tool/signalr/index";
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
      imgDetailShow: false,
      imgDetailScaleOut: false,
      audioPlay: false,
      voiceInputShow: false,
      voiceInputTipsShow: false,
      counts: 130,
      countShow: false,
      audioPlayId: -1,
      order: {}
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    scrollToBottom(){
      this.$refs.chatContentWrapper.toBottom();
    },
    isMineChat(chat) {
      return chat.senderExpert.id === this.$store.state.user.id;
    },
    showImgDetail() {
      this.imgDetailShow = true;
      this.imgDetailScaleOut = false;
    },
    hideImgDetail() {
      this.imgDetailScaleOut = true;
      setTimeout(() => {
        this.imgDetailShow = false;
      }, 200);
    },
    toVoiceInput() {
      this.voiceInputShow = true;
      this.vScrollBottom = 70;
    },
    toSeleceImg() {},
    toTextInput() {
      this.voiceInputShow = false;
      this.vScrollBottom = this.$refs.inputPanel.offsetHeight;
    },
    checkInputPanelHeight() {
      this.vScrollBottom = this.$refs.inputPanel.offsetHeight;
    },
    toSendMsg() {
      let userId = this.$store.state.user.id;
      chat.send(this.order.id, {
        expertOrderId: this.order.id,
        expertId: userId,
        experReceiverId:
          userId === this.order.expertId
            ? this.order.serverExpertId
            : this.order.expertId,
        content: this.inputMsg
      });

      

      // api
      //   .CreateExpertChat({
      //     expertOrderId: this.order.id,
      //     expertId: userId,
      //     experReceiverId:
      //       userId === this.order.expertId
      //         ? this.order.serverExpertId
      //         : this.order.expertId,
      //     content: this.inputMsg
      //   })
      //   .then(res => {
      //     this.connection.invoke("sendToGroup", this.order.id, this.inputMsg);
      //     this.inputMsg = "";
      //     this.vScrollBottom = 70;

      //     console.log(res);
      //   });
    },
    playAudio(id) {
      if (id == this.audioPlayId) {
        this.audioPlay = false;
        this.$refs.audioObj.pause();
        return;
      }
      this.audioPlayId = id;
      this.audioPlay = true;
      this.$refs.audioObj.play();
    },
    beginVoiceInput() {
      this.voiceInputTipsShow = true;
    },
    endVoiceInput() {
      this.voiceInputTipsShow = false;
    },
    textAreaChange() {
      // this.vScrollBottom = this.$refs.inputPanel.offsetHeight;
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
      this.$router.push("/order/detail/20170712130023/3/0");
    },
    textAreaFocus() {
      let inputPanel = this.$refs.inputPanel;
      this.$nextTick(()=>{
        inputPanel.scrollIntoView(false);
      });
    }
  },
  mounted() {
    document.title = "咨询室";
    api.GetExpertOrderChats(this.$route.params.id).then(res => {
      this.order = res.data.result;
      this.counts = this.order.totalDuration * 60;
      this.countShow = true;
      this.scrollToBottom();
      console.log(this.order);
    });
    var that = this;
    chat.start(this.$store.state.accessToken, this.$route.params.id, data => {
      that.order.expertOrderCharts.push(data);
      that.inputMsg = "";
      that.vScrollBottom = 70;
    });
  },
  destroyed() {
    chat.stop();
  },
  watch:{
    order:{
      handler(){
        this.$nextTick(()=>{
          this.scrollToBottom();
        })
      },
      deep:true
    }
  }
};
</script>
<style scoped>
.input-panel {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #e3e3e3;
  padding: 10px 55px 10px 90px;
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
  margin-top: 15px;
  display: flex;
  position: relative;
}

.chat-msg-wrap .msg-item .msg-time {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px 4px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
}
.chat-msg-wrap .msg-item .user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.chat-msg-wrap .msg-item .chat-content {
  position: relative;
  line-height: 1.5;
  background: #b4eeb4;
  padding: 10px;
  border-radius: 8px;
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
