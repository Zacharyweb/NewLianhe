<template>
   <div class="tips-mask" v-if="show">
     <div class="tips-modal">
       <p class="tips-content">{{text || '未设置弹窗内容'}}</p>
       <p class="tips-btns">
         <span class="btn-item btn-confirm" @click="confirmCb">{{btnText[0] || '确定'}}</span>
         <span class="btn-item btn-cancel" v-if="type === 'confirm'" @click="cancelCb">{{btnText[1] || '取消'}}</span>
       </p>
     </div>
   </div>
</template>
<script>
// import PubSub from 'pubsub-js';
export default {
  name: 'Tips',
  data () {
    return {
       show: false,
       type: '',
       text: '',
       btnText: [],
       callBacks: []
    }
  },
  methods:{
    Alert(msg,data){
      this.type = 'alert'
      this.Show(data); 
    },
    Confirm(msg,data){
      this.type = 'confirm'
      this.Show(data);
    },
    Show(data){
      this.text = data.text;
      this.btnText = data.btns || [];
      this.callBacks = data.callbacks || [];
      this.show = true;
    },
    Close(){
      this.show = false;
    },
    confirmCb(){
      if(this.callBacks[0]){
        this.callBacks[0]();
      }
      this.Close();
    },
    cancelCb(){
      if(this.callBacks[1]){
        this.callBacks[1]();
      }
      this.Close();
    }
  },
  mounted(){
      this.$PubSub.subscribe('ALERT',this.Alert);
      this.$PubSub.subscribe('COMFIRM',this.Confirm);
      this.$PubSub.subscribe('CLOSE',this.Close);
  }
}
</script>

<style scoped>
  .tips-mask{
     position: fixed;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0,0,0,0.5);
     text-align: center;
     box-sizing: border-box;
     color: #666;
     z-index: 9999;
  }
  .tips-modal{
     font-size: 0.32rem;
     width: 300px;
     background-color: #fff;
     position: absolute;
     left: 50%;
     top: 35%;
     margin-left: -150px;
     overflow: hidden;
     border-radius:4px;
     box-shadow: 0 0 20px #444;
     -webkit-animation: showIn 0.1s;
     animation: showIn 0.1s;
  }
  .tips-content{
    padding: 35px 20px;
    font-size: 14px;
    line-height: 1.5;
  }
  .tips-btns{
    display: flex;
    border-top:1px solid #55cbc4;
  }
  .tips-btns .btn-item{
    flex:1;
    font-size: 14px;
    line-height: 40px;
  }
  .tips-btns .btn-confirm{
    color: #55cbc4;
  }
  .tips-btns .btn-cancel{
    border-left: 1px solid #55cbc4;
  }
  .showIn{
     -webkit-animation: showIn 0.3s;
     animation:showIn 0.3s;
  }
  @keyframes showIn{
      from{
          transform: scale(0.8) translateY(-30%);
          opacity: 0.3;
      }
      to{
          transform: scale(1) translateY(0);
          opacity: 1;
      }
  }
</style>
