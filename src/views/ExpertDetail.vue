<template>
  <div>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="48" :top="0" :no-more-text="'没有更多评论啦~'">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="slide_item">
            <img src="../../static/timg.jpeg"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide_item">
            <img src="../../static/timg.jpeg"/>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide_item">
            <img src="../../static/timg.jpeg"/>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
        <div class="expert-msg">
          <h4 class="expert-name">朱两边</h4>
          <p class="expert-tags">上海市市政厅行政秘书长</p>
        </div>
        <ul class="expert-dynamic common-panel">
          <li><span class="iconfont icon-pingfen1"></span>评分：10</li>
          <li class="reply-time"><span class="iconfont icon-shijian"></span>12小时内回应</li>
          <li><span class="iconfont icon-people"></span>16人约过</li>
        </ul>
        <div class="expert-topic common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-huatiguanli"></span>推荐话题</h4>
          </div>
          <ul>
            <li class="topic-item" @click="toTopicDetail(22)">
              <h3 class="topic-content">定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题</h3>
              <p class="topic-cost">
                <span class="topic-price">￥<i>300</i>/次</span>
                <span class="topic-duration">约半小时 </span>
              </p>
            </li>
             <li class="topic-item" @click="toTopicDetail(33)">
              <h3 class="topic-content text-ellipsis2">定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题</h3>
              <p class="topic-cost">
                <span class="topic-price">￥<i>300</i>/次</span>
                <span class="topic-duration">约半小时</span>
              </p>
            </li>
          </ul>
        </div>


        <div class="expert-intro common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon3"></span>专家介绍</h4>
          </div>
          <p class="intro-content" :class="{'text-ellipsis2':!allIntroShow}">握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家握手庄家 </p>
          <p class="to-see-all" v-show="!allIntroShow">
            <span class="to-see-all-btn" @click="allIntroShow = true">展开查看全部</span>
          </p>
          <p class="hide-all" v-show="allIntroShow">
            <span class="hide-all-btn" @click="allIntroShow = false" >收起话题</span>
          </p>
        </div>
        <!-- 政策解读 -->
        <div class="expert-article common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-shuben"></span>政策解读</h4>
          </div>
          <ul class="article-list">
            <li class="article-item" v-for="item in articelList">
              <h3 class="article-title">{{item.title}}</h3>
              <span class="iconfont icon-jiantou-1"></span>
            </li>
          </ul>
          <p class="to-see-all" v-show="!allArticleShow">
            <span class="to-see-all-btn"  @click="showAllArticle">查看更多文章</span>
          </p>
          <p class="hide-all" v-show="allArticleShow">
            <span class="hide-all-btn" @click="hideAllArticle" >收起文章列表</span>
          </p>
        </div>
        <!-- 评价 -->
        <div class="user-comment common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-pingjia"></span>用户评价</h4>
          </div>
          <ul class="comment-list">
            <li class="comment-item" v-for="item in commentList">
               <div class="user-msg">
                 <img class="user-avatar" :src="item.img" height="800" width="800" alt="">
                 <div class="user-text-msg">
                   <p class="user-nickname">{{item.nickName}}</p>
                   <p class="user-tags">
                     <span class="tag-item "v-for="tag in item.tags">{{tag}}</span>
                   </p>
                 </div>
               </div>
                <p class="comment-content">{{item.comment}}</p>
                <div class="comment-topic">
                  <h4 class="topic-title" :class="{'text-ellipsis':!item.allTopicShow}">  参与话题：{{item.topic}}</h4>
                  <span class="show-all-btn" @click="item.allTopicShow = true" v-show="!item.allTopicShow">展开全部</span>
                </div>
                <p class="hide-all" v-show="item.allTopicShow">
                  <span class="hide-all-btn" @click="item.allTopicShow = false" >收起话题</span>
                </p>
                <p class="comment-time">{{item.time}}</p>
            </li>
          </ul>
        </div>
      </v-scroll>
      <div class="btn btn-red btn-large position-bottom" @click="topicListPanelShow = true">立即预约</div>
      <topic-list-panel v-if="topicListPanelShow" @close="hidetopicListPanel" @next="toAppointment"/>
  </div>
</template>

<script>
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
import TopicListPanel from '../components/TopicListPanel.vue'
require('swiper/dist/css/swiper.css')
export default {
  name: 'ExpertDetail',
  components:{
    'v-scroll':Scroll,
    'topic-list-panel':TopicListPanel
  },
  data () {
    return {
      swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay:2000
      },
      // allTopicShow: false,
      allIntroShow:false,
      allArticleShow:false,
      articelList:[
        {title:'文章11标题',href:''},
        {title:'文章22标题',href:''},
        {title:'文章33标题',href:''},
      ],
      commentList:[
        {
          nickName:'董子健',
          img:'../../static/timg.jpeg',
          tags:['独立','客观','青年演员阿'],
          comment:'我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
          topic:'演员的自我修养演员的自我修养演员的自我修养演员的自我修养演员的自我修养我修养演员的自我修养演员的自我修养',
          allTopicShow:false,
          time:'2017-9-10'
        },
         {
          nickName:'董子健',
          img:'../../static/timg.jpeg',
          tags:['独立','客观','青年演员阿'],
          comment:'我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
          topic:'演员的自我修养演员的自我修养演员的自我修养演员的自我修养演员的自我修养我修养演员的自我修养演员的自我修养',
          allTopicShow:false,
          time:'2017-9-10'
        },
         {
          nickName:'董子健',
          img:'../../static/timg.jpeg',
          tags:['独立','客观','青年演员阿'],
          comment:'我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
          topic:'演员的自我修养演员的自我修养演员的自我修养演员的自我修养演员的自我修养我修养演员的自我修养演员的自我修养',
          allTopicShow:false,
          time:'2017-9-10'
        },
      ],
      arr:[1,2,3],
      topicListPanelShow:false
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    onInfinite(done){
      setTimeout(()=>{
        done('nomore');
      },1000)
      
    },
    showAllArticle(){
      this.allArticleShow = true;
      this.articelList.push({title:'文章44标题',href:''});
      this.articelList.push({title:'文章55标题',href:''});
    },
    hideAllArticle(){
      this.allArticleShow = false;
      this.articelList = this.articelList.slice(0,3);
    },
    toTopicDetail(id){
      var expertId = this.$route.params.expertId;
      this.$router.push('/expert/'+expertId+'/topic/'+id)
    },
    hidetopicListPanel(){
      setTimeout(()=>{
        this.topicListPanelShow = false;
      },300)
    },
    toAppointment(id){
      console.log(id);
      this.$router.push({
        path:'/appointment',
        query:{
          expertId:this.$route.params.expertId,
          topicId:id
        }
      })
    }
  },
  mounted(){
     document.title = '专家详情';
     T.checkFirstPageData(this.arr);
     console.log(TopicListPanel)
  }
}
</script>
<style scoped>
.slide_item{
  height: 200px;
  text-align: center;
}
.slide_item img{
  height: 100%;
}
.expert-msg{
  padding: 15px 10px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
}
.expert-msg .expert-name{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.expert-dynamic{
  display: flex;
  justify-content: space-between;
}
.expert-dynamic li+li{
  padding-left: 10px;
  border-left:  1px solid #e6e6e6;
}
.expert-dynamic li .iconfont{
  padding-right: 4px;
  color: #55cbc4;
}
.expert-topic{
  padding: 0px 20px;
}
.expert-topic .panel-title{
  padding-top: 15px;
}
.expert-topic .topic-item{
  padding: 15px 0;
}
.expert-topic .topic-item+.topic-item{
  border-top: 1px solid #e6e6e6;
}
.expert-topic .topic-item .topic-content{
  line-height: 1.6;
  margin-bottom: 14px;
}
.expert-topic .topic-item .topic-cost{
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  font-size: 14px;
}
.expert-topic .topic-item .topic-price{
  color: #E64340;
}
.expert-topic .topic-item .topic-price i{
  font-size: 18px;
}
.expert-topic .topic-item .topic-duration{
  color: #666;
  line-height: 22px;
}
.expert-intro .intro-content{
  padding-top: 15px;
  line-height: 1.4;
  color: #666;
 -webkit-line-clamp:5;
}
.to-see-all,.hide-all{
  text-align: center;
  padding-top: 20px;
}
.to-see-all-btn,.hide-all-btn{
 display: inline-block;
 padding: 4px 16px;
 border: 1px solid #55cbc4;
 border-radius: 4px;
 color: #55cbc4;
}
.expert-article .article-list{
  
}
.expert-article .article-list .article-item{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6; 
}

.expert-article .article-list .article-item .iconfont{
  color: #888;
}
.user-comment .comment-list{
   
}
.user-comment .comment-item{
  padding: 10px 0px;
}
.user-comment .comment-item+.comment-item{
  border-top: 1px solid #e6e6e6;
}
.user-comment .comment-item .user-msg{
   display: flex;
   align-items: center;
}
.user-comment .comment-item .user-avatar{
   width: 48px;
   height: 48px;
   border-radius: 50%;
   margin-right: 15px;
}
.user-comment .comment-item .user-text-msg{
  
}
.user-comment .comment-item .user-nickname{
   margin-bottom: 6px;
}
.user-comment .comment-item .user-tags{
  font-size: 14px;
  color: #999;
}
.user-comment .comment-item .user-tags .tag-item{
  padding-right: 10px;
}
.user-comment .comment-item .comment-content{
  padding-top: 10px;
  color: #444;
  line-height: 1.4;
}
.user-comment .comment-item .comment-topic{
  padding-top: 10px;
  display: flex;
  line-height: 29px;
}
.user-comment .comment-item .topic-title{
  color: #666;
  flex: 1;
  width: 0;
}
.user-comment .comment-item .show-all-btn{
  color: #55cbc4;
  padding:0 20px;
}
.user-comment .comment-item .hide-all{
  padding-top: 10px;
}
.user-comment .comment-item .hide-all-btn{
border: none;
}
.user-comment .comment-item .comment-time{
  padding-top: 5px;
  font-size: 14px;
  color: #999;
}


</style>