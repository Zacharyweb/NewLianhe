<template>
  <div>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="48" :top="0" :no-more-text="'没有更多评论啦~'">
        <!-- 政策解读 -->
        <div class="common-panel">
          <div class="panel-title">
             <h4><span class="iconfont icon-shuben"></span>我的关系</h4>
          </div>
          <ul class="has-resign-list relation-list">
             <li class="relation-item">
               <img class="user-avatar" src="../../static/timg.jpeg">
               <div class="user-msg">
                 <p class="user-remark">备注：朱坚（15757177498）</p>
                 <p class="user-intro text-ellipsis">朱两边（懒人投资前端工程师）</p>
                 <p class="user-status">提问次数：0次</p>
               </div>
             </li>
             <li class="relation-item">
               <img class="user-avatar" src="../../static/timg.jpeg">
               <div class="user-msg">
                 <p class="user-remark">备注：朱坚（15757177498）</p>
                 <p class="user-intro text-ellipsis">朱两边（懒人投资前端工程师）</p>
                 <p class="user-status">提问次数：0次</p>
               </div>
             </li>
          </ul>
        </div>
        <div class="common-panel">
          <ul class="not-resign-list relation-list">
             <li class="relation-item">
                <img class="user-avatar" src="../../static/timg.jpeg">
                <div class="user-msg">
                  <p class="user-remark">备注：朱坚（15757177498）</p>
                  <p class="user-status">未注册</p>
                </div>
             </li>
             <li class="relation-item">
                <img class="user-avatar" src="../../static/timg.jpeg">
                <div class="user-msg">
                  <p class="user-remark">备注：朱坚（15757177498）</p>
                  <p class="user-status">未注册</p>
                </div>
             </li>
              <li class="relation-item">
                <img class="user-avatar" src="../../static/timg.jpeg">
                <div class="user-msg">
                  <p class="user-remark">备注：朱坚（15757177498）</p>
                  <p class="user-status">未注册</p>
                </div>
             </li>
          </ul>
        </div>
      </v-scroll>
      <div class="add-relation-modal" v-if="showModal">
        <h5>联系人信息</h5>
        <p class="input-wrap">
          <span class="label">姓名：</span>
          <input type="text" placeholder="请输入姓名">
        </p>
        <p class="input-wrap">
          <span class="label">手机：</span>
          <input type="tel" placeholder="请输入手机">
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
import TopicListPanel from '../components/TopicListPanel.vue'
require('swiper/dist/css/swiper.css')
export default {
  name: 'ExpertDetail',
  components:{
    'v-scroll':Scroll,
    'topic-list-panel':TopicListPanel
  },
  data () {
    return {
      arr:[1,2,3],
      showModal:false
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
    submitModal(){
      this.showModal = false;
    }
  },
  mounted(){
     T.checkFirstPageData(this.arr);
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
      margin-bottom: 10px;
      color: #666;  
  }
  .relation-list .relation-item .user-intro{
      
  }
  .relation-list .relation-item .user-status{
      color: #999;
  }
  .relation-list.has-resign-list .relation-item{
    padding-bottom: 20px;
  }
  .relation-list.has-resign-list .relation-item .user-status{
     position: absolute;
     bottom: 10px;
     left: 75px;
     font-size: 14px;
  }
  .add-relation-modal{
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 260px;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
    z-index: 10;
    -webkit-animation: showIn 0.1s;
    animation: showIn 0.1s;
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
    font-size: 18px;
    color: #55cbc4;
  }
  .add-relation-modal .input-wrap{
    display: flex;
    margin-top: 15px;
    align-items: center;
  }
  .add-relation-modal .input-wrap .label{
    font-size: 16px;
    color: #666;
  }
  .add-relation-modal .input-wrap input{
     flex: 1;
     border: 1px solid #ccc;
     padding: 0 15px;
     font-size: 16px;
     line-height: 36px;
  }
  .add-relation-modal .btns-wrap{
    margin-top: 15px;
    padding-left: 48px;
    display: flex;
    justify-content: space-between;
  }
</style>