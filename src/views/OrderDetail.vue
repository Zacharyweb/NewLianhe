<template>
  <div class="order-detail">
    <div class="step-line">
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= -1}"></span>
        <span class="circle-icon" :class="{'current':status == -1,'prev':status > -1}"></span>
        <p class="step-name bottom">发起咨询</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 0}"></span>
        <span class="circle-icon" :class="{'current':status == 0,'prev':status > 0}"></span>
        <p class="step-name top">等待确认</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 1}"></span>
        <span class="circle-icon" :class="{'current':status == 1,'prev':status > 1}"></span>
        <p class="step-name bottom">支付费用</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 2}"></span>
        <span class="circle-icon" :class="{'current':status == 2,'prev':status > 2}"></span>
        <p class="step-name top">在线咨询</p>
      </div>
  
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 3}"></span>
        <span class="circle-icon" :class="{'current':status == 3,'prev':status > 3}"></span>
        <p class="step-name bottom">咨询完成</p>
      </div>
      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 4}"></span>
        <span class="circle-icon" :class="{'current':status == 4,'prev':status > 4}"></span>
        <p class="step-name top">评价反馈</p>
      </div>

      <div class="step-item">
        <span class="step-fill" :class="{'stretch':status >= 5}"></span>
      </div>
    </div>
      <div class="top-block">
        <p class="block-title">
          {{statusTable[status] || '订单关闭'}}
          <span class="iconfont icon-youjiantou" 
                @click="()=>{this.orderStatusPanelShow = true}"
          ></span>
        </p>
        <div class="leave-time" v-if="status ==0">
            <span>剩余确认时间：</span>
            <count-timer class="count-timer" 
               ref="countTimer" 
               :show-icon="false"
               :counts="counts"  
               :on-end="countEnd" 
            />
        </div>
        
        <p class="status-tips" v-if="status == -3 && isCustomer">您已取消本次咨询，订单关闭。</p>
        <p class="status-tips" v-if="status == -3 && !isCustomer">客户已取消本次咨询，订单关闭。</p>
       

        <p class="status-tips" v-if="status == -2 && isCustomer">专家超时未确认或拒绝此次咨询，订单关闭。</p>
        <p class="status-tips" v-if="status == -2 && !isCustomer">您超时未确认或拒绝此次咨询，订单关闭。</p>

        <p class="status-tips" v-if="status == 0 && isCustomer">专家超过5分钟未确认，则订单自动关闭。</p>
        <p class="status-tips" v-if="status == 0 && !isCustomer">若您超过5分钟未确认，则订单自动关闭。</p>

        <p class="status-tips" v-if="status ==1 && isCustomer">专家已同意接受您的咨询请求，马上完成支付即可开始咨询~</p>
        <p class="status-tips" v-if="status ==1 && !isCustomer">您已同意接受此次的咨询，请等待客户支付咨询费用~</p>


        <p class="status-tips" v-if="status ==2 && isCustomer">您已支付咨询费用，进入咨询室即可与专家进行交流。</p>
        <p class="status-tips" v-if="status ==2 && !isCustomer">客户已支付咨询费用，进入咨询室即可与客户进行交流。</p>

        <p class="status-tips" v-if="status ==3 ">咨询完成，请等待系统结算。</p>


        <p class="status-tips" v-if="status ==4 && isCustomer">本次咨询已完成,快去对本次咨询做个评价分享吧~</p>
        <p class="status-tips" v-if="status ==4 && !isCustomer">本次咨询已完成,请等待客户评价</p>

        <!-- 专家拒绝 订单关闭 -->
        <div class="btn-area" v-if="status == -2">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>      
        </div>

        <!-- 客户取消 订单关闭 -->
        <div class="btn-area" v-if="status == -3">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
          <span v-if="isCustomer" class="btn btn-green btn-small" @click="toAppointment(88)">重新发起咨询</span>      
        </div>


        <!-- 等待确认 -->
        <div class="btn-area" v-if="status ==0 && isCustomer">
          <span class="btn btn-green btn-small" @click="toOrderList">返回订单列表</span>
          <span class="btn btn-green-outline btn-small" @click="cancelConsult($route.params.orderNo)">取消咨询</span>
        </div>

        <div class="btn-area" v-if="status == 0 && !isCustomer">
            <span class="btn btn-green btn-small" @click="agreeOrder($route.params.orderNo)">同意</span>
            <span class="btn btn-green-outline btn-small" @click="refuseOrder($route.params.orderNo)">拒绝</span>
        </div>

        <!-- 等待支付 -->
        <div class="btn-area" v-if="status ==1 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
        </div>

        <div class="btn-area" v-if="status ==1 && isCustomer">
          <span class="btn btn-green-outline btn-small" @click="cancelConsult($route.params.orderNo)">取消咨询</span>
          <span class="btn btn-green btn-small" @click="toPay($route.params.orderNo)">立即支付</span>
        </div>

        <!-- 在线咨询 -->
        <div class="btn-area" v-if="status ==2">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
          <span class="btn btn-green btn-small" @click="toChatRoom($route.params.orderNo)">进入咨询室</span>
        </div>

       <!-- 咨询完成 -->
        <div class="btn-area" v-if="status ==3 && isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toChatRoom($route.params.orderNo)">咨询详情</span>
        </div>

        <div class="btn-area" v-if="status == 3 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
        </div>

        <!-- 评价反馈 -->
        <div class="btn-area" v-if="status == 4 && isCustomer">
          <span class="btn btn-green btn-small" @click="toComment($route.params.orderNo)">去评价</span>
          <span class="btn btn-green-outline btn-small" @click="toChatRoom($route.params.orderNo)">咨询详情</span>
        </div>


        <div class="btn-area" v-if="status == 4 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toChatRoom($route.params.orderNo)">咨询详情</span>
          <span class="btn btn-green-outline btn-small" @click="toOrderList">返回订单列表</span>
        </div>

        <!-- 评价完成 -->
        <div class="btn-area" v-if="status == 5 && isCustomer">
         
          <span class="btn btn-green-outline btn-small" @click="toCommentDetail($route.params.orderNo)">查看评价</span>
          <span class="btn btn-green-outline btn-small" @click="toChatRoom($route.params.orderNo)">咨询详情</span>
     <!--       <span class="btn btn-green btn-small" @click="toAppointment(88)">再次咨询</span> -->
        </div>


        <div class="btn-area" v-if="status == 5 && !isCustomer">
          <span class="btn btn-green-outline btn-small" @click="toCommentDetail($route.params.orderNo)">查看评价</span>
          <span class="btn btn-green-outline btn-small" @click="toChatRoom($route.params.orderNo)">咨询详情</span>
        </div>

      </div>
      <div class="center-block">
        <p class="order-msg-item">下单时间：<span>2017-7-20 13:30:20</span></p>
        <p class="order-msg-item">订单编号：<span>{{$route.params.orderNo}}</span></p>
      </div>
      <div class="bottom-block">
        <div class="detail-msg-item" v-if="status >=-3 && !isCustomer">
          <div class="msg-content">
            <span class="iconfont icon-yonghu1"></span>
            客户名称：客户名称
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-3 && isCustomer">
          <div class="msg-content">
            <span class="iconfont icon-zhuanjiaku"></span>
            专家名称：专家名称
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-3 ">
          <div class="msg-content">
            <span class="iconfont icon-shiduan"></span>
            咨询时段：2节/30分钟
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-3">
          <div class="msg-content">
            <span class="iconfont icon-jine"></span>
            订单金额：￥300
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=-3">
          <h6 class="msg-title">
            <span class="iconfont icon-wenti"></span>
            问题描述
          </h6>
          <p class="problem-detail">在预约专家时，填写的相关话题内容。显示全部在预约专家时，填写的相关话题内容。
          </p>
        </div>



        <div class="detail-msg-item" v-if="status >=5">
          <div class="msg-content">
            <span class="iconfont icon-pingfen2"></span>
            评价：10分
          </div>
        </div>

        <div class="detail-msg-item" v-if="status >=5">
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
          <p class="to-comment-detail" @click="toCommentDetail($route.params.orderNo)">查看评论详情<span class="iconfont icon-jiantou-1"></span></p>
        </div>

        <div class="detail-msg-item" v-if="status >=4 && !isCustomer">
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
        </div>
     
      </div>
     <div class="order-status-panel-mask" v-if="orderStatusPanelShow"
          @click="()=>{this.orderStatusPanelShow = false}">
     </div>
     <div class="order-status-panel" :class="{'show':orderStatusPanelShow}">
        <h6>订单状态变更</h6>
        <div class="status-list-wrap">
          <ul class="status-list">
            <li class="status-item" v-if="status >=-3">
              <span class="status-name">下单</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
            <li class="status-item" v-if="status == -2 || status == -3">
              <span class="status-name">订单关闭</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
            <li class="status-item" v-if="status >=1">
              <span class="status-name">专家确认</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
            <li class="status-item" v-if="status >=2">
              <span class="status-name">支付</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
            <li class="status-item" v-if="status >=3">
              <span class="status-name">完成咨询</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
            <li class="status-item" v-if="status >=4">
              <span class="status-name">完成评价</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
            <li class="status-item" v-if="status >=5">
              <span class="status-name">完成结算</span>
              <span class="status-time">2017-07-30 13:30:20</span>
            </li>
          </ul>
        </div>
     </div>
  </div>
</template>

<script>

import T from '../tool/tool'
import CountTimer  from '../components/CountTimer.vue'
export default {
  name: 'OrderDetail',
  components:{
    'count-timer':CountTimer
  },
  data () {
    return {
        counts:300,
        isCustomer:true,
        orderStatusPanelShow:false,
        statusTable:['等待确认','等待支付','在线咨询','咨询完成','评价反馈','评价完成'],
        status:this.$route.params.status*1
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
    toConsultHome(){
      this.$router.push('/chat/56');
    },

    toOrderList(){
      if(this.$route.params.flag == 1) {
        this.$router.push('/consult');
      }else{
        this.$router.push('/consult/expert');
      }
    },
    cancelConsult(id){
      let that = this;
      T.Confirm({
        text:'确定取消订单'+id +'?',
        confirm:function(){
          that.status = -3;
        },
        cancel:function(){

        }
      });
    },

    agreeOrder(){
      T.Confirm({
        text:'确定接受此次订单咨询?',
        confirm:function(){
          
        },
        cancel:function(){
        
        }
      });
    },
    refuseOrder(){
      let that = this;
      T.Confirm({
        text:'确定拒绝此订单咨询?',
        confirm:function(){
           that.status = -2;
        },
        cancel:function(){
        
        }
      });
    },

    toPay(id){
      console.log('去支付~');
    },
    toChatRoom(id){
      this.$router.push({
         path:'/chat'+'/'+id,
      })
    },

    toComment(id){
      this.$router.push('/comment/'+id);
    },

    toCommentDetail(id){
       this.$router.push('/comment/detail/'+id);
    },
    countEnd(){
        this.status = -2;
    }
  },
  mounted(){
     console.log(this.$route.params);
     document.title = '订单详情';
     if(this.$route.params.flag == 1){
        this.isCustomer =false;
     }
  }
}
</script>
<style scoped>
.order-detail{
  padding-top: 50px;
}
.top-block{
  background-color: #fff;
  padding:  20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.top-block .block-title{
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
  line-height: 38px;
}
.top-block .block-title .iconfont{

  font-size: 24px;
  margin-left: 10px;
  color: #55cbc4;
}
.top-block .leave-time{
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  margin-bottom: 5px;
  margin-top: 5px;
}
.top-block .leave-time .count-timer{
  font-size: 22px; 
  color:#f4992e;
}
.top-block .status-tips{
  text-align: center;
  font-size: 12px;
  color: #aaa;
}
.top-block .btn-area{
   display: flex;
   margin-top: 15px;
   padding:0 20px;
   justify-content: center;
}
.top-block .btn-area .btn{
  height: 30px;
  width: 40%;
}
.top-block .btn-area .btn+.btn{
  margin-left: 20px;
}


.center-block{
  margin-top: 10px;
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
  margin-top: 10px;
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
  z-index: 10;
}
.order-status-panel{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.order-status-panel{
  font-size: 15px;
  transition: all 0.3s;
  transform: translateY(100%);
  z-index: 11;
}
.order-status-panel.show{
  transform: translateY(0);
}
.order-status-panel h6{
  font-size: 18px;
  line-height: 50px;
  background-color: #55cbc4;
  color: #fff;
  text-align: center;
}
.order-status-panel .status-list-wrap{
  margin-left: 30px;
  padding: 5px 0;
}
.order-status-panel .status-list{
  min-height: 200px;
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



  .step-line{
    display: flex;
    height: 50px;
  }
  .step-line .step-item{
    flex: 1;
    background-color: #ddd;
    height: 2px;
    position: relative;
  }
  .step-line .step-item .step-fill{
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    background-color: #55cbc4;
    width: 0;
    transition: all 0.3s;
  }
  .step-line .step-item .step-fill.stretch{
    width: 100%;
  }
  .step-line .step-item .circle-icon{
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: #ccc;
    top: 50%;
    right: 0;
    transform: translate(50%,-50%);
    z-index: 10;
  } 
  .step-line .step-item .step-name{
    font-size: 14px;
    white-space: nowrap;
    color: #666;
    position: absolute;
    right: 0;
    transform: translateX(50%);
  }
  .step-line .step-item .step-name.top{
    bottom: 15px;
  }
  .step-line .step-item .step-name.bottom{
    top: 15px;  
  }
  .step-line .step-item .circle-icon.current{
     background-color: #f4992e;
  } 

  .step-line .step-item .circle-icon.prev{
   background-color: #55cbc4;
  } 

</style>
