<template>
  <div class="expert-detail-page">
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
          <h4 class="expert-name">专家姓名</h4>
          <p class="expert-tags">专家任职机构职位个人标签</p>
        </div>
        <ul class="expert-dynamic common-panel">
          <li><span class="iconfont icon-pingfen1"></span>评分：10</li>
          <li><span class="iconfont icon-people"></span>16人约过</li>
          <li class="reply-time"><span class="iconfont icon-shijian"></span>营业中</li>
        </ul>   
        <!-- 评价 -->
        <div class="user-comment common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-pingjia"></span>关系户评价</h4>
          </div>
          <ul class="comment-list">
            <li class="comment-item" v-for="item in commentList">
               <div class="user-msg">
                 <img class="user-avatar" :src="item.img" height="800" width="800" alt="">
                 <div class="user-text-msg">
                   <p class="user-nickname">{{item.nickName}}</p>
                   <p class="user-tags">
                     <span class="tag-item">{{item.tags}}</span>
                   </p>
                 </div>
               </div>
                <p class="comment-content text-ellipsis2">{{item.comment}}</p>

               <!--  <p class="comment-time">{{item.time}}</p> -->
                <p class="to-comment-detail" @click="toCommentDetail(item.id)">查看评论详情<span class="iconfont icon-jiantou-1"></span></p>
            </li>
          </ul>
        </div>

         
        <div class="expert-strength common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-huatiguanli"></span>专长介绍</h4>
          </div>
          <div class="strength-item">
            <p class="strength-content">我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容我是专长介绍内容。</p>
          </div>
        </div>


        <div class="expert-intro common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-icon3"></span>专家介绍</h4>
          </div>
          <p class="intro-content" :class="{'text-ellipsis2':!allIntroShow}">这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍这是自我介绍</p>
          <p class="to-see-all" v-show="!allIntroShow">
            <span class="to-see-all-btn" @click="allIntroShow = true">展开查看全部</span>
          </p>
          <p class="hide-all" v-show="allIntroShow">
            <span class="hide-all-btn" @click="allIntroShow = false" >收起介绍</span>
          </p>
        </div>
    
      </v-scroll>
      <div class="appoint-area position-bottom">
        <div class="appoint-cost">100元/节</div>
        <div class="appoint-submit" @click="toAppointment">立即预约</div>
      </div>
      
  </div>
</template>

<script>
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'

require('swiper/dist/css/swiper.css')
export default {
  name: 'ExpertDetail',
  components:{
    'v-scroll':Scroll,
  },
  data () {
    return {
      swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay:2000
      },
      // allstrengthShow: false,
      allIntroShow:false,
      allArticleShow:false,
      articelList:[
        {title:'文章11标题',href:''},
        {title:'文章22标题',href:''},
        {title:'文章33标题',href:''},
      ],
      commentList:[
        {
          nickName:'关系户01昵称',
          img:'https://s1.ax1x.com/2017/10/16/JQZeP.jpg',
          tags:'关系户01的任职机构职位等个人标签',
          comment:'我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
          time:'2017-9-10',
          id:'22222222'
        },
         {
          nickName:'关系户02昵称',
          img:'https://s1.ax1x.com/2017/10/16/JQZeP.jpg',
          tags:'关系户02的任职机构职位等个人标签',
          comment:'我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
          time:'2017-9-10',
          id:'12213213'
        }
      ],
      arr:[1,2,3],
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
    toCommentDetail(id){
      this.$router.push('/comment/detail/'+id);
    },
    toAppointment(){
      this.$router.push({
        path:'/appoint',
        query:{
          expertId:this.$route.params.expertId,
        }
      })
    }
  },
  mounted(){
     document.title = '专家详情';
     T.checkFirstPageData(this.arr);
  }
}
</script>
<style scoped>
.expert-detail-page{
  font-size: 14px;
  line-height: 1.4;
}
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
  font-size: 18px;
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
.expert-strength{
  padding: 0px 20px;
}
.expert-strength .panel-title{
  padding-top: 15px;
}
.expert-strength .strength-item{
  padding: 15px 0;
}
.expert-strength .strength-item+.strength-item{
  border-top: 1px solid #e6e6e6;
}
.expert-strength .strength-item .strength-content{
}



.expert-intro .intro-content{
  padding-top: 15px;
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
  font-size: 14px;
  padding-top: 10px;
  color: #444;
  -webkit-line-clamp:3;
}
.user-comment .comment-item .to-comment-detail{
  font-size: 14px;
  margin-top: 15px;
  padding-right: 5px;
  text-align: right;
  color: #55cbc4;
}
.user-comment .comment-item .to-comment-detail .iconfont{
  font-size: 14px;
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
.appoint-area .appoint-submit{
    flex: 1;
    line-height: 46px;
    text-align: center;
    font-size: 18px;
    border-top: 1px solid  #55cbc4;
    background-color: #fff;
    color: #55cbc4;
}
</style>