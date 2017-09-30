<template>
  <div>
      <v-scroll :on-refresh="onRefresh"  :bottom="48" :top="0" >
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
          <li><span class="iconfont icon-people"></span>16人约过</li>
          <li class="reply-time"><span class="iconfont icon-shijian"></span>营业中</li>
        </ul>   
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
                <p class="comment-time">{{item.time}}</p>
            </li>
          </ul>
        </div>

        <div class="expert-topic common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-huatiguanli"></span>专长介绍</h4>
          </div>
          <div class="topic-item">
            <p class="topic-content">定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题定制的话题</p>
          </div>
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
    
      </v-scroll>
      <div class="appoint-area position-bottom">
        <div class="appoint-cost">100元/节</div>
        <div class="btn btn-red btn-large" @click="topicListPanelShow = true">立即预约</div>
      </div>
      
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
        }
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
.user-comment .comment-item .comment-content{
  padding-top: 10px;
  
  color: #444;
  line-height: 1.4;
}
.user-comment .comment-item .comment-time{
  padding-right: 25px;
  padding-top: 15px;
  text-align: right;
  font-size: 14px;
  color: #999;
}
.appoint-area{
  width: 100%;
  display: flex;
  background-color: #55cbc4;
  align-items: center;
}
.appoint-area .appoint-cost{
  padding: 0 15px;
  font-size: 18px;
  line-height: 30px;
  color: #fff;
}
.appoint-area .btn{
  flex: 1;
  border-radius: 0;
}

</style>