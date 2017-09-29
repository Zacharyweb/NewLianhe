<template>
  <div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="60" :top="0">
      <div class="expert-block common-panel">
        <div class="panel-title">
             <h3><span class="iconfont icon-icon3"></span>专家介绍</h3>
        </div>
        <ul class="expert-list">
          <li class="expert-item" @click="toExpertDetail(1)">
            <img class="expert-avatar" src="../../static/timg.jpeg">
            <div class="expert-info">
              <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题</p>
              <p class="expert-msg text-ellipsis">
                 <b class="expert-name">威震天</b>&nbsp;&nbsp;幽谷数据有限公司&nbsp;&nbsp;著名导弹专家
              </p>
              <p class="personal-tag">
                <span class="tag-item">风趣</span>
                <span class="tag-item">幽默</span>
                <span class="tag-item">专业知识牛</span>
              </p>
            </div>
          </li>
           <li class="expert-item" @click="toExpertDetail(1)">
            <img class="expert-avatar" src="../../static/timg.jpeg">
            <div class="expert-info">
              <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题</p>
              <p class="expert-msg text-ellipsis">
                 <b class="expert-name">威震天</b>&nbsp;&nbsp;幽谷数据有限公司&nbsp;&nbsp;著名导弹专家
              </p>
              <p class="personal-tag">
                <span class="tag-item">风趣</span>
                <span class="tag-item">幽默</span>
                <span class="tag-item">专业知识牛</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="user-comment common-panel">
        <div class="panel-title">
            <h4><span class="iconfont icon-icon3"></span>好评</h4>
        </div>
        <ul class="comment-list">
            <li class="comment-item" v-for="item in commentList">
               <div class="user-msg">
                 <img class="user-avatar" :src="item.img"/>
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
                <div class="expert-msg">
                  <img class="expert-avatar" :src="item.img"/>
                  <div>
                    <p class="expert-name">楼拨音</p>
                    <p class="expert-intro text-ellipsis">诗虾精品咖啡品牌创始人的朋友的亲戚的孩子的哥哥</p>
                  </div>
                </div>
                <p class="comment-time">{{item.time}}</p>
            </li>
          </ul>
      </div>
    </v-scroll>
    <bottom-nav :nav-index="1"></bottom-nav>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import BottomNav from '../components/BottomNav.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Mine',
  components:{
    'bottom-nav': BottomNav,
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
      arr:[1,1,1,1,1,1,1,1,1,1,1,1],
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
        }
      ]
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
  
  },
  mounted(){
      T.checkFirstPageData(this.arr);
  }
}
</script>
<style scoped>
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
   width: 40px;
   height: 40px;
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
  padding: 10px 0px;
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
.user-comment .expert-msg{
  display: flex;
  align-items: center;
}
.user-comment .expert-msg .expert-avatar{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.user-comment .expert-msg>div{
  flex: 1;
  width: 0;
}
.user-comment .expert-msg .expert-name{
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}
.user-comment .expert-msg .expert-intro{


}
.user-comment .comment-item .comment-time{
  padding-top: 10px;
  font-size: 14px;
  color: #999;
}


</style>
