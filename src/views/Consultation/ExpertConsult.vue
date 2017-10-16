<template>
    <!-- 专家咨询 -->
    <ul class="consult-list">
          <li class="consult-item">
            <span class="item-status">等待同意</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="cancelConsult(1)">取消咨询</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">等待支付</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="toPay(1)">立即支付</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">支付完成</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="toConsultHome(1)">进入咨询室</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成咨询</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline"  @click="toComment(1)">评价</span>
              <span class="btn btn-green-outline" @click="toDetail(123,1)">咨询详情</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">已评价</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">专家姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="toCommentDetail(1)">查看评价</span>
              <span class="btn btn-green-outline" @click="toDetail(123,1)">咨询详情</span>
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
       
    }
  },
  methods:{
    toDetail(id,type){
      this.$router.push('/consult/detail/'+id+'/'+type)
    },
    cancelConsult(id){
      T.Confirm({
        text:'确定取消订单'+id +'?',
        confirm:function(){
           console.log("取消订单")
        },
        cancel:function(){
           console.log('不取消订单')
        }
      });
    },
    toPay(id){
      this.$router.push({
         path:'/appoint/step3',
         query:{
           orderId:id,
         }
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
  }
}
</script>
<style scoped>
 
</style>
