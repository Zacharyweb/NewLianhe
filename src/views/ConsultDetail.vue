<template>
  <div class="consult-detail">
      <div class="top-block">
        <p class="block-title">完成咨询<span class="iconfont icon-queding"></span></p>
        <div class="btn-area">
          <!-- <span class="btn btn-green-outline btn-small">查看评价</span> -->
          <span class="btn btn-green-outline btn-small" @click="toAppointment(1)">再次咨询</span>
          <span class="btn btn-green btn-small" @click="toConsultHome">咨询详情</span>
        </div>
      </div>
      <div class="center-block">
        <p class="order-msg-item">下单时间：<span>2017-7-20 13:30:20</span></p>
        <p class="order-msg-item">订单编号：<span>2017170714130020</span></p>
      </div>
      <div class="bottom-block">
        <div class="detail-msg-item">
          <div class="msg-content">
            <span class="iconfont icon-yonghu1"></span>
            用户名称：朱两边
          </div>
        </div>

        <div class="detail-msg-item">
          <div class="msg-content">
            <span class="iconfont icon-shiduan"></span>
            咨询时段：2节/30分钟
          </div>
        </div>


        <div class="detail-msg-item">
          <div class="msg-content">
            <span class="iconfont icon-zhuanjiaku"></span>
            专家名称：习近平
          </div>
        </div>

        <div class="detail-msg-item">
          <h6 class="msg-title">
            <span class="iconfont icon-wenti"></span>
            问题描述
          </h6>
          <p class="problem-detail">在预约专家时，填写的相关话题内容。显示全部在预约专家时，填写的相关话题内容。
          </p>
        </div>

        <div class="detail-msg-item">
          <div class="msg-content">
            <span class="iconfont icon-jine"></span>
            支付金额：￥300
          </div>
        </div>

        <div class="detail-msg-item">
          <div class="msg-content">
            <span class="iconfont icon-pingfen2"></span>
            评价：10分
          </div>
        </div>

        <div class="detail-msg-item">
          <h6 class="msg-title">
            <span class="iconfont icon-pingjia1"></span>
            评价详情
          </h6>
          <div class="comment-detail">
            <img class="user-avatar" src="../../static/timg.jpeg">
            <p class="comment-content text-ellipsis2"> 我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情
            我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情我是评价详情
            </p>
          </div>
          <p class="to-comment-detail" @click="toCommentDetail(1)">查看评论详情<span class="iconfont icon-jiantou-1"></span></p>
        </div>

        <div class="detail-msg-item">
          <h6 class="msg-title">
            <span class="iconfont icon-closeaccount"></span>
             结算汇总
          </h6>
          <div class="cost-list">
            <p class="list-item">
              <span>价格</span>
              <span class="add-text">￥300.00</span>
            </p>
            <p class="list-item">
              <span>XX费</span>
              <span class="reduce-text">-￥30.00</span>
            </p>
            <p class="list-item">
              <span>XX费</span>
              <span class="reduce-text">-￥15.00</span>
            </p>
            <p class="list-item">
              <span>总计</span>
              <span class="add-text">￥255.00</span>
            </p>  
          </div>
    <!--       <div class="show-order-status">
            <span class="btn btn-green-outline btn-large" 
            @click="()=>{this.orderStatusPanelShow = true}">查看订单状态
            </span>  
          </div> -->
        </div>
     
      </div>
     <div class="order-status-panel-mask" v-if="orderStatusPanelShow"
          @click="()=>{this.orderStatusPanelShow = false}">
     </div>
     <div class="order-status-panel" :class="{'show':orderStatusPanelShow}">
      <h6>订单状态变更</h6>
      <div class="status-list-wrap">
        <ul class="status-list">
          <li class="status-item">
            <span class="status-name">下单</span>
            <span class="status-time">2017-07-30 13:30:20</span>
          </li>
          <li class="status-item">
            <span class="status-name">专家同意</span>
            <span class="status-time">2017-07-30 13:30:20</span>
          </li>
          <li class="status-item">
            <span class="status-name">支付</span>
            <span class="status-time">2017-07-30 13:30:20</span>
          </li>
          <li class="status-item">
            <span class="status-name">开始咨询</span>
            <span class="status-time">2017-07-30 13:30:20</span>
          </li>
          <li class="status-item">
            <span class="status-name">资讯完成</span>
            <span class="status-time">2017-07-30 13:30:20</span>
          </li>
          <li class="status-item">
            <span class="status-name">已结算</span>
            <span class="status-time">2017-07-30 13:30:20</span>
          </li>
        </ul>
      </div>
  <!--     <div class="close-order-status" 
          @click="()=>{this.orderStatusPanelShow = false}">
        关闭 
      </div> -->
       
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
        currentTab:0,
        orderStatusPanelShow:false,
    }
  },
  methods:{
    toAppointment(id){
      this.$router.push({
        path:'/appoint',
        query:{
          expertId:id,
        }
      })
    },
    toCommentDetail(id){
      this.$router.push('/comment/detail/'+id);
    },
    toConsultHome(){
      this.$router.push('/chat/56');
    }
    
  },
  mounted(){
     console.log(this.$route.params)
  }
}
</script>
<style scoped>
.top-block{
  background-color: #fff;
  padding: 25px 20px;
  border-bottom: 1px solid #eee;
}
.top-block .block-title{
  font-size: 18px;
  color: #333;
  text-align: center;
  line-height: 36px;
}
.top-block .block-title .iconfont{
  font-size: 24px;
  margin-left: 20px;
  color: #55cbc4;
}
.top-block .btn-area{
   display: flex;
   margin-top: 20px;
   padding:0 20px;
   justify-content: center;
}
.top-block .btn-area .btn+.btn{
  margin-left: 20px;
}
.center-block{
  margin-top: 20px;
  padding: 0 20px;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.center-block .order-msg-item{
  line-height: 50px;
  padding: 0 5px;
}
.center-block .order-msg-item+.order-msg-item{
  border-top: 1px solid #eee;
}
.bottom-block{
  margin-top: 20px;
}
.bottom-block .detail-msg-item{
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
  margin-bottom: 10px;
}
.bottom-block .detail-msg-item .msg-content{
  font-size: 14px;
  line-height: 30px;
}
.bottom-block .detail-msg-item .msg-content .iconfont{
  font-size: 18px;
  margin-right: 10px;
}


.bottom-block .detail-msg-item .msg-title{
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.bottom-block .detail-msg-item .msg-title .iconfont{
  font-size: 18px;
  margin-right: 10px;
}

.bottom-block .detail-msg-item .problem-detail{
  padding-top: 15px;
  font-size: 14px;
  line-height: 1.5;
  text-indent: 2em;
}
.bottom-block .detail-msg-item .cost-list .list-item{
  font-size: 14px;
  display: flex;
  line-height: 48px;
  justify-content: space-between;
  padding: 0 10px;
}
.bottom-block .detail-msg-item .cost-list .list-item+.list-item{
  border-top: 1px solid #eee;
}
.bottom-block .detail-msg-item .cost-list .list-item .add-text{
  color: #55cbc4;
}
.bottom-block .detail-msg-item .cost-list .list-item .reduce-text{
  color: #E64340;
}
.bottom-block .detail-msg-item .show-order-status{
  margin-top: 10px;
}

.bottom-block .detail-msg-item .comment-detail{
   padding-top: 15px;
   display: flex;
   font-size: 14px;
}
.bottom-block .detail-msg-item .comment-detail .user-avatar{
   width: 60px;
   height: 60px;
   border-radius: 50%;
   margin-right: 15px;
}
.bottom-block .detail-msg-item .comment-detail .comment-content{
   flex: 1;
   line-height: 1.5;
   width: 0;
   -webkit-line-clamp:3;
}
.bottom-block .detail-msg-item .to-comment-detail{
  font-size: 14px;
  margin-top: 15px;
  padding-right: 5px;
  text-align: right;
  color: #55cbc4;
}
.order-status-panel-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
}
.order-status-panel{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.order-status-panel{
  transition: all 0.3s;
  transform: translateY(100%);
}
.order-status-panel.show{
  transform: translateY(0);
}
.order-status-panel h6{
  font-size: 22px;
  line-height: 50px;
  background-color: #55cbc4;
  color: #fff;
  text-align: center;
}
.order-status-panel .status-list-wrap{
  margin-left: 30px;
/*   border-left: 2px solid #55cbc4; */
  padding: 5px 0;
}
.order-status-panel .status-list{
  
}
.order-status-panel .status-item{
   line-height: 48px;
   padding-left: 20px;
   padding-right: 40px;
   display: flex;
   justify-content: space-between;
   position: relative;
}
.order-status-panel .status-item::before{
  position: absolute;
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #55cbc4;
  left: -5px;
  top: 50%;
  margin-top: -5px;
  box-shadow: 1px 1px 2px #666;

}
.order-status-panel .status-item .status-name{
  color: #666;
}
.order-status-panel .status-item .status-time{
  color: #999;
}
.order-status-panel .close-order-status{
  border-top: 1px solid #55cbc4;
  color: #55cbc4;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
</style>
