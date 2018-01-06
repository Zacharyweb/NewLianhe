<template>
  <div class="expert-detail-page">
    <v-scroll :on-refresh="onRefresh" :bottom="48" :top="0" v-if="!isAjaxing">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(img,i) in detail.expertPhotos" v-bind:key="i">
          <div @click="previewImage()" class="slide_item">
            <img :src="img"/>
          </div>
        </swiper-slide>
        <swiper-slide v-if="detail.expertPhotos.length == 0">
          <div class="slide_item">
            <img src="../../static/zhanweitu_banner@2x.png">
            <p class="no-pic-intro-tips">暂无图片介绍</p>
          </div>
        </swiper-slide>
        <div v-show="detail.expertPhotos.length > 0" class="swiper-pagination" slot="pagination"></div>
      </swiper>
        <div class="expert-msg">
          <h4 class="expert-name">
            {{detail.name}}
            <span class="expert-field">{{detail.expertFirstClassName}}</span>
          </h4>
          <p class="expert-subfield">细分领域：{{detail.expertClassName}}
          </p>
          <p class="expert-tags">{{detail.organization}}</p>
          
        </div>
        <ul class="expert-dynamic common-panel">
          <li><span class="iconfont icon-pingfen1"></span>评分：{{detail.score}}</li>
          <li><span class="iconfont icon-people"></span>{{detail.servicesCount}}人约过</li>
          <li class="reply-time"><span class="iconfont icon-shijian"></span>{{detail.onlineStatus | onlinestatus}}</li>
        </ul>   

        <div class="open-time-panel common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-yingyeshijianzidingyi"></span>营业时间</h4>
          </div>
          <div class="open-time-content">
             <ul class="open-time-items">
              <li v-for="(w,i) in detail.expertWorkSettings" v-bind:key="i">
                <span>{{w.week | weekday}}</span>
                <span>{{w.startTime | datetime("HH:mm")}}-{{w.endTime | datetime("HH:mm")}}</span>
              </li>
             </ul>
          </div>
        </div>
        <!-- 评价 -->
        <div class="user-comment common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-pingjia"></span>关系户评价</h4>
          </div>
          <ul class="comment-list">
            <li class="comment-item" v-for="item in detail.expertComments" v-bind:key="item.id">
               <div class="user-msg">
                 <img class="user-avatar" :src="item.avatar">
                 <div class="user-text-msg">
                   <p class="user-nickname">{{item.name}}</p>
                   <p class="user-tags">
                     <span class="tag-item">{{item.organization}}</span>
                   </p>
                 </div>
               </div>
                <p class="comment-content text-ellipsis2">{{item.content}}</p>
               <!--  <p class="comment-time">{{item.time}}</p> -->
                <p class="to-comment-detail" @click="toCommentDetail(item.expertOrderId)">查看评论详情<span class="iconfont icon-jiantou-1"></span></p>
            </li>
            <li class="no-comment-tips" v-if="detail.expertComments.length == 0">暂无相关评价</li>
          </ul>
        </div>

         
        <div class="expert-strength common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-huatiguanli"></span>专长介绍</h4>
          </div>
          <div class="strength-item">
            <p class="strength-content">{{detail.speciality}}</p>
          </div>
        </div>


        <div class="expert-intro common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon3"></span>专家介绍</h4>
          </div>
          <!-- <p class="intro-content">{{detail.introduction}}</p> -->
          <p class="intro-content" :class="{'text-ellipsis2':!allIntroShow && detail.introduction.length > 200}">{{detail.introduction}}</p>
          <p class="to-see-all" v-show="!allIntroShow && detail.introduction.length > 200">
            <span class="to-see-all-btn" @click="allIntroShow = true">展开查看全部</span>
          </p>
          <p class="hide-all" v-show="allIntroShow && detail.introduction.length > 200">
            <span class="hide-all-btn" @click="allIntroShow = false" >收起介绍</span>
          </p>
        </div>
        <div class="consult-process">
          <h4>咨询流程</h4>
          <p>1.发起咨询：提交问题和咨询节数（每节30分钟）。</p>
          <p>2.等待确认：专家5分钟内确认能否提供此次咨询。</p>
          <p v-show="!showAllProcess">3.支付费用：按购买的节数&nbsp;...<span class="show-all-process" @click="showAllProcess = true">&nbsp;&nbsp;显示全部</span></p>
          <div class="consult-process-sec2" v-show="showAllProcess">
              <p>3.支付费用：按购买的节数通过支付宝或微信支付。</p>
              <p>4.在线咨询：进入咨询室通过语音和文字咨询专家。</p>
              <p>5.咨询完成：系统进行费用结算，并提供发票申请。</p>
              <p>6.评价反馈：对咨询进行评价，与关系户分享评价。</p>
              <p class="other-tips">咨询结束后，用户可随时查看本次咨询的详情。对本次咨询服务不满意的，可申请无忧退款。&nbsp;
                <span class="hide-all-process" @click="showAllProcess = false">收起全部</span>
              </p>    
          </div>
        </div>
    </v-scroll>
    <div class="appoint-area position-bottom">
      <div class="appoint-cost">{{detail.price}}元/节</div>
      <div class="appoint-submit" @click="toAppointment">发起咨询</div>
    </div>
      
  </div>
</template>

<script>
import Scroll from "../components/Scroll.vue";
import T from "../tool/tool";
import api from "../ajax/index";

require("swiper/dist/css/swiper.css");
export default {
  name: "ExpertDetail",
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        autoplay: 2000
      },
      detail: {},
      // allstrengthShow: false,
      allIntroShow: false,
      allArticleShow: false,
      arr: [1, 2, 3],
      isAjaxing: true,

      showAllProcess: false
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    onInfinite(done) {
      setTimeout(() => {
        done("nomore");
      }, 1000);
    },
    showAllArticle() {
      this.allArticleShow = true;
      this.articelList.push({ title: "文章44标题", href: "" });
      this.articelList.push({ title: "文章55标题", href: "" });
    },
    hideAllArticle() {
      this.allArticleShow = false;
      this.articelList = this.articelList.slice(0, 3);
    },
    toCommentDetail(id) {
      this.$router.push("/comment/detail/" + id);
    },
    toAppointment() {
      this.$router.push({
        path: "/appoint",
        query: {
          expertId: this.$route.params.expertId
        }
      });
    },
    previewImage() {
      if (!this.detail.expertPhotos.length) return;
      wx.previewImage({
        current: this.detail.expertPhotos[0], // 当前显示图片的http链接
        urls: this.detail.expertPhotos // 需要预览的图片http链接列表
      });
    }
  },
  mounted() {
    document.title = "专家详情";
    T.checkFirstPageData(this.arr);
    T.showLoading();
    let expertId = this.$route.params.expertId;
    api
      .GetExpertDetail({ id: expertId })
      .then(res => {
        this.detail = res.data.result;
        this.isAjaxing = false;
        T.hideLoading();
      })
      .then(() => {
        return api.GetExpertComments(expertId);
      })
      .then(res => {
        this.detail.expertComments = res.data.result;
      });
  }
};
</script>
<style scoped>
.expert-detail-page {
  font-size: 14px;
  line-height: 1.4;
}
.slide_item {
  height: 200px;
  text-align: center;
  position: relative;
}
.slide_item img {
  height: 100%;
}
.no-pic-intro-tips {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  color: #fff;
}
.expert-msg {
  padding: 15px 10px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
}

.expert-msg .expert-name {
  display: inline-block;
  margin-left: -50px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  position: relative;
}
.expert-msg .expert-name .expert-field {
  white-space: nowrap;
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 5px;
  background-color: #e9ae6a;
  color: #fff;
  position: absolute;
  top: 0;
  right: -10px;
  transform: translateX(100%);
}
.expert-subfield {
  margin-bottom: 4px;
  font-size: 12px;
  color: #999;
}

.open-time-panel.common-panel {
  padding-top: 8px;
}
.open-time-panel.common-panel .panel-title {
  padding-bottom: 2px;
}
.open-time-panel .open-time-content {
  margin-top: 5px;
}
.open-time-panel .open-time-items {
  display: flex;
  flex-wrap: wrap;
}
.open-time-panel .open-time-items li {
  box-sizing: border-box;
  width: 50%;
  font-size: 14px;
  padding: 8px 15px;
  margin: 0;
  position: relative;
  text-align: center;
}
.open-time-panel .open-time-items li::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1acac4;

  box-shadow: 1px 1px 2px #888;
  left: 5px;
  top: 50%;
  margin-top: -5px;
}
.open-time-panel .open-time-items li + li {
  /*border-top: 1px solid #e6e6e6;*/
}

.expert-dynamic {
  display: flex;
  justify-content: space-between;
}
.expert-dynamic li {
  flex: 1;
  padding-left: 15px;
  margin: 0;
}
.expert-dynamic li + li {
  border-left: 1px solid #e6e6e6;
}
.expert-dynamic li .iconfont {
  padding-right: 4px;
  color: #55cbc4;
}
.expert-strength {
  padding: 0px 20px;
}
.expert-strength .panel-title {
  padding-top: 15px;
}
.expert-strength .strength-item {
  padding: 15px 0;
}
.expert-strength .strength-item + .strength-item {
  border-top: 1px solid #e6e6e6;
}
.expert-strength .strength-item .strength-content {
}
.expert-intro.common-panel {
  padding-bottom: 15px;
}
.expert-intro .intro-content {
  padding-top: 15px;
  color: #666;
  -webkit-line-clamp: 5;
}
.to-see-all,
.hide-all {
  text-align: center;
  padding-top: 20px;
}
.to-see-all-btn,
.hide-all-btn {
  display: inline-block;
  padding: 4px 16px;
  border: 1px solid #55cbc4;
  border-radius: 4px;
  color: #55cbc4;
}

.user-comment .comment-list {
}
.user-comment .comment-list .no-comment-tips {
  padding-top: 15px;
  font-size: 14px;
  color: #999;
}
.user-comment .comment-item {
  padding: 10px 0px;
}
.user-comment .comment-item + .comment-item {
  border-top: 1px solid #e6e6e6;
}
.user-comment .comment-item .user-msg {
  display: flex;
  align-items: center;
}
.user-comment .comment-item .user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 15px;
}
.user-comment .comment-item .user-text-msg {
}
.user-comment .comment-item .user-nickname {
  margin-bottom: 6px;
}
.user-comment .comment-item .user-tags {
  font-size: 14px;
  color: #999;
}
.user-comment .comment-item .comment-content {
  font-size: 14px;
  padding-top: 10px;
  color: #444;
  -webkit-line-clamp: 3;
}
.user-comment .comment-item .to-comment-detail {
  font-size: 14px;
  margin-top: 15px;
  padding-right: 5px;
  text-align: right;
  color: #55cbc4;
}
.user-comment .comment-item .to-comment-detail .iconfont {
  font-size: 14px;
}
.user-comment .comment-item .comment-time {
  padding-right: 25px;
  padding-top: 15px;
  text-align: right;
  font-size: 14px;
  color: #999;
}

.consult-process {
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 25px;
}
.consult-process h4 {
  font-size: 16px;
  text-align: center;
  padding-bottom: 10px;
}
.consult-process p {
  font-size: 14px;
  line-height: 1.5;
  padding-top: 4px;
  position: relative;
}

.consult-process .show-all-process,
.consult-process .hide-all-process {
  color: #55cbc4;
}
.consult-process .other-tips {
  padding-top: 15px;
  font-size: 13px;
  color: #999;
}

.appoint-area {
  width: 100%;
  display: flex;
  background-color: #55cbc4;
  align-items: center;
}
.appoint-area .appoint-cost {
  padding: 0 15px;
  font-size: 18px;
  line-height: 30px;
  color: #fff;
}
.appoint-area .appoint-submit {
  flex: 1;
  line-height: 46px;
  text-align: center;
  font-size: 18px;
  border-top: 1px solid #55cbc4;
  background-color: #fff;
  color: #55cbc4;
}
</style>