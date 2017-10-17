<template>
  <div>
      <v-scroll :on-refresh="onRefresh"  :bottom="48" :top="0" :no-more-text="'没有更多评论啦~'">
        <!-- 政策解读 -->
        <div class="common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-guanxi"></span>我的关系</h4>
          </div>
          <ul class="has-resign-list relation-list">
             <li class="relation-item" v-for="(item,index) in hasResignUser">
               <img class="user-avatar" :src="item.avatarImg">
               <div class="user-msg">
                 <p class="user-remark">备注：{{item.name}}（{{item.mobile}}）</p>
                 <p class="user-intro text-ellipsis">{{item.nickName}}（{{item.tags}}）</p>
                 <p class="user-status">提问次数：{{item.askNum}}次</p>
               </div>
             </li>
          </ul>
        </div>
        <div class="common-panel">
          <ul class="not-resign-list relation-list">
             <li class="relation-item" v-for="(item,index) in notResignUser">
                <img class="user-avatar" :src="item.avatarImg">
                <div class="user-msg">
                  <p class="user-remark">备注：{{item.name}}（{{item.mobile}}）</p>
                  <p class="user-status">未注册</p>
                </div>
             </li>
          </ul>
        </div>
        <p class="add-relation-tips">添加关系人，当对方注册“联合咨询”时，将向对方推荐您的资料。</p>
      </v-scroll>
      <div class="add-relation-modal" :class="{'show':showModal}">
        <h5>联系人信息</h5>
        <p class="input-wrap">
          <span class="label">姓名：</span>
          <input type="text" v-model="newName" placeholder="请输入姓名">
        </p>
        <p class="input-wrap">
          <span class="label">手机：</span>
          <input type="number" v-model="newMobile" placeholder="请输入手机">
        </p>
        <p class="btns-wrap">
          <span class="btn btn-green btn-small" @click="submitModal">确定</span>
          <span class="btn btn-green-outline btn-small" @click="showModal = false">取消</span>
        </p>
      </div>
      <div class="modal-mask" v-if="showModal" @click="showModal = false"></div>
      <div class="btn btn-green btn-large position-bottom" @click="showModal = true">添加关系</div>
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
      newName:'',
      newMobile:'',
      hasResignUser:[],
      notResignUser:[],
      showModal:false
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
   
    submitModal(){
      var obj = {};
      obj.name = this.newName;
      obj.avatarImg = '../../static/timg.jpeg';
      obj.mobile = this.newMobile;
      this.notResignUser = [...this.notResignUser,obj];
      this.showModal = false;
      T.showToast({text:'添加联系人成功~'});
    }
  },
  mounted(){
    this.hasResignUser = [{
      name:'真实姓名',
      avatarImg:'https://s1.ax1x.com/2017/10/16/JQZeP.jpg',
      mobile:'手机号码',
      nickName:'网站昵称',
      tags:'个人标签',
      askNum:'1'
    }];
    this.notResignUser =  [{
      name:'真实姓名',
      avatarImg:'https://s1.ax1x.com/2017/10/16/JQZeP.jpg',
      mobile:'手机号码',
    }];
  }
}
</script>
<style scoped>
  .relation-list{
    
  }
  .relation-list .relation-item{
    display: flex;
    align-items: center;
    height: 80px;
    position: relative;
  }
  .relation-list .relation-item .user-msg{
    flex: 1;
    width: 0;
    font-size: 14px;
  }
  .relation-list .relation-item+.relation-item{
    border-top: 1px solid #eee;
  }
  .relation-list .relation-item .user-avatar{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .relation-list .relation-item .user-remark{
      margin-bottom: 6px;
      color: #666;  
      
  }
  .relation-list .relation-item .user-intro{
      
  }
  .relation-list .relation-item .user-status{
      color: #999;
  }
  .relation-list.has-resign-list .relation-item{
    padding-bottom: 15px;
  }
  .relation-list.has-resign-list .relation-item .user-status{
     position: absolute;
     bottom: 12px;
     left: 75px;
     font-size: 12px;
  }
  .add-relation-tips{
    font-size: 14px;
    padding: 10px 20px;
    text-align: center;
    line-height: 1.5;
    color: #666;
  }
  .add-relation-modal{
    position: fixed;
    top: 30%;
    left: 50%;
    width: 260px;
    margin-left: -150px;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
    z-index: 10;
    transition: all 0.3s;
    transform: scale(0);
  }
  .add-relation-modal.show{
     transform: scale(1);
  }
  .modal-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    z-index: 9;
  }
  .add-relation-modal h5{
    font-size: 16px;
    color: #55cbc4;
  }
  .add-relation-modal .input-wrap{
    display: flex;
    margin-top: 15px;
    align-items: center;
  }
  .add-relation-modal .input-wrap .label{
    font-size: 14px;
    color: #666;
  }
  .add-relation-modal .input-wrap input{
     flex: 1;
     border: 1px solid #ccc;
     padding: 0 15px;
     font-size: 14px;
     line-height: 36px;
  }
  .add-relation-modal .btns-wrap{
    margin-top: 15px;
    padding-left: 48px;
    display: flex;
    justify-content: space-between;
  }
  .add-relation-modal .btns-wrap .btn-small{
    font-size: 14px;
  }
</style>