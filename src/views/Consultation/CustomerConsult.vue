<template>
  <!-- 客户咨询 -->
  <ul class="consult-list">
          <li class="consult-item">
            <span class="item-status">等待同意</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">客户姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="agreeConsult(111111)">同意</span>
              <span class="btn btn-green-outline" @click="refuseConsult(222222)">拒绝</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">等待支付</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">客户姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
          </li>
          <li class="consult-item">
            <span class="item-status">支付完成</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">客户姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="toConsultHome(1)">进入咨询室</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成咨询</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">客户姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="toComment(1)">评价</span>
              <span class="btn btn-green-outline "@click="toDetail(123,1)">咨询详情</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成咨询</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">客户姓名</p>
            <p class="item-cost"> ¥300 / 2节</p>
            <p class="item-detail text-ellipsis">预约专家时输入的问题详情，最多显示一行预约专家时输入的问题详情，最多显示一行</p>
            <p class="btn-area">
              <span class="btn btn-green-outline" @click="toCommentDetail(1)">回复评价</span>
              <span class="btn btn-green-outline" @click="toDetail(123,1)">咨询详情</span>
            </p>
          </li>
          <li class="consult-item">
            <span class="item-status">完成结算</span>
            <p class="item-order-num">20170712130020</p>
            <p class="item-name">客户姓名</p>
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
  name: 'CustomerConsult',
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
  }
}
</script>
<style scoped>
 
</style>
