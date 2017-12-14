<template>
    <div class="no_data_tips"> 
      <p class="tips_text">{{tips}}</p>
    </div>
</template>
<script>
export default {
  name: 'NoDataTips',
  props: {
    tips:{
      type: String,
      default: '暂无结果'
    }
  },
  data () {
    return {
   
    }
  },
  methods:{
 
  }
}
</script>
<style scoped>
   .no_data_tips{
    padding-top: 160px;
    background:url(../../static/no-data.png) no-repeat center center;
    background-size: 100px 100px;
    padding-bottom: 10px;
   }
   .no_data_tips .tips_text{
    font-size: 14px;
    text-align: center;
    color: #c6c6c6;
   }
</style>