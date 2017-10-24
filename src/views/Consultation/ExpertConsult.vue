<template>
    <!-- 专家咨询 -->
    <ul class="consult-list">
          <li class="consult-item" v-for="(item,index) in orderList" @click="toOrderDetail(item.orderNo,item.status,0)">
            <span class="item-status">{{statusTable[item.status]}}</span>
            <p class="item-order-num">{{item.orderNo}}</p>
            <p class="item-name">{{item.expert}}</p>
            <p class="item-cost"> ¥{{item.cost}} / {{item.classNum}}节</p>
            <p class="item-detail text-ellipsis">{{item.problem}}</p>
            <p class="btn-area" v-if="item.status == 0">
              <span class="btn btn-green-outline" @click.stop="cancelConsult(item.orderNo)">取消咨询</span>
            </p>

            <p class="btn-area" v-if="item.status == 1">
              <span class="btn btn-green-outline" @click.stop="toPay(item.orderNo)">立即支付</span>
              <span class="btn btn-green-outline" @click.stop="cancelConsult(item.orderNo)">取消咨询</span>
            </p>

            <p class="btn-area" v-if="item.status == 2">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">进入咨询室</span>
            </p>

            <p class="btn-area" v-if="item.status == 3">
              
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>

            <p class="btn-area" v-if="item.status == 4">
              <span class="btn btn-green-outline" @click.stop="toComment(item.orderNo)">去评价</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status == 5">
              <span class="btn btn-green-outline" @click.stop="toCommentDetail(item.orderNo)">评价详情</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>

          </li>
      
    </ul>
</template>

<script>

import T from '../../tool/tool'
export default {
  name: 'ExpertConsult',
  components:{
  
  },
  data () {
    return {
      currentIdentity:null,
      statusTable:['等待确认','等待支付','在线咨询','咨询完成','等待评价','评价完成'],


      orderList:[
        {
          status:0,
          orderNo:'20170712130020',
          expert:'专家01',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:1,
          orderNo:'20170712130021',
          expert:'专家02',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:2,
          orderNo:'20170712130022',
          expert:'专家03',
          cost:450,
          classNum:3,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:3,
          orderNo:'20170712130023',
          expert:'专家04',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:4,
          orderNo:'20170712130024',
          expert:'专家05',
          cost:150,
          classNum:1,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:5,
          orderNo:'20170712130024',
          expert:'专家06',
          cost:150,
          classNum:1,
          problem:'预约专家时输入的问题详情，最多显示一行'
        }
      ]
    }
  },
  methods:{
    toOrderDetail(orderNo,status,flag){
       this.$router.push('/order/detail/'+orderNo+'/'+status+'/'+flag);
    },

    cancelConsult(id){
      T.Confirm({
        text:'确定取消订单'+id +'?',
        confirm:function(){

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

    toConsultHome(id){
      this.$router.push({
         path:'/appoint/step4',
         query:{
           orderId:id,
         }
      })
    },
    toComment(id){
       this.$router.push('/comment/'+id);
    },
    toCommentDetail(id){
      this.$router.push('/comment/detail/'+id);
    }
  },
  mounted(){
    T.postConsultTab(1);
    document.title = '咨询列表';
  }
}
</script>
<style scoped>
 
</style>
