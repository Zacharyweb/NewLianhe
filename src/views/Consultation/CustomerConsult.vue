<template>
  <!-- 客户咨询 -->
  <ul class="consult-list">
          <li v-for="(item,index) in orderList" class="consult-item" @click="toOrderDetail(item.orderNo,item.status,1)">
            <span class="item-status">
              {{statusTable[item.status]}}
            </span>
            <p class="item-order-num">{{item.orderNo}}</p>
            <p class="item-name">{{item.customer}}</p>
            <p class="item-cost"> ¥{{item.cost}} / {{item.classNum}}节</p>
            <p class="item-detail text-ellipsis">{{item.problem}}</p>
            <p class="btn-area" v-if="item.status==0">
              <span class="btn btn-green-outline" @click.stop="agreeConsult(item.orderNo)">同意</span>
              <span class="btn btn-green-outline" @click.stop="refuseConsult(item.orderNo)">拒绝</span>
            </p>
      
            <p class="btn-area" v-if="item.status==2">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">进入咨询室</span>
            </p>
            <p class="btn-area" v-if="item.status==3">
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status==4">
              <span class="btn btn-green-outline" @click.stop="toCommentDetail(item.orderNo)">评价详情</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
            <p class="btn-area" v-if="item.status==5">
              <span class="btn btn-green-outline" @click.stop="toCommentDetail(item.orderNo)">评价详情</span>
              <span class="btn btn-green-outline" @click.stop="toChatRoom(item.orderNo)">咨询详情</span>
            </p>
          </li>
     
  </ul>
</template>

<script>

import T from '../../tool/tool'
export default {
  name: 'CustomerConsult',
  components:{

  },
  data () {
    return {
      statusTable:['等待确认','等待支付','支付完成','完成咨询','已评价','完成结算'],
      orderList:[
        {
          status:0,
          orderNo:'20170712130020',
          customer:'客户01',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:1,
          orderNo:'20170712130021',
          customer:'客户02',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:2,
          orderNo:'20170712130022',
          customer:'客户03',
          cost:450,
          classNum:3,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:3,
          orderNo:'20170712130023',
          customer:'客户04',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:4,
          orderNo:'20170712130024',
          customer:'客户05',
          cost:150,
          classNum:1,
          problem:'预约专家时输入的问题详情，最多显示一行'
        },
        {
          status:5,
          orderNo:'20170712130025',
          customer:'客户06',
          cost:300,
          classNum:2,
          problem:'预约专家时输入的问题详情，最多显示一行'
        }
      ]
    }
  },
  methods:{
    toOrderDetail(orderNo,status,flag){
       this.$router.push('/order/detail/'+orderNo+'/'+status+'/'+flag);
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

    agreeConsult(id){
      T.Confirm({
        text:'确定接受此次咨询?',
        confirm:function(){
           console.log("确定接受")
        },
        cancel:function(){
        
        }
      });
    },
    refuseConsult(){
      T.Confirm({
        text:'确定拒绝此次咨询?',
        confirm:function(){
           console.log("确定拒绝")
        },
        cancel:function(){
        
        }
      });
    }
  },
  mounted(){
    T.postConsultTab(0);
    document.title = '咨询列表';
  }
}
</script>
<style scoped>
 
</style>
