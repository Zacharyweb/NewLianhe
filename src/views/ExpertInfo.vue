<template>
  <div>

    <div class="info-tabs">
      <p class="tab-item base-tab" :class="{'active':currentTab == 0}" @click="chageCurrentTab(0)">基本信息</p>
      <p class="tab-item inrto-tab" :class="{'active':currentTab == 1}" @click="chageCurrentTab(1)">专家信息</p>
    </div>

    <!-- 基本资料 -->
    <div class="base-form common-panel" v-show="currentTab == 0">
      <p class="base-form-item">
          <span class="label">姓名<i class="require-icon">*</i>：</span>
          <input type="text" maxlength="20" placeholder="请输入姓名" v-model="name">
      </p>
      <p class="base-form-item">
          <span class="label">手机<i class="require-icon">*</i>：</span>
          <input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="tel">
      </p>
      <p class="base-form-item">
          <span class="label">公司/机关<i class="require-icon">*</i>：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职机构以及有关部门科室" v-model="company">
      </p>
      <p class="base-form-item">
          <span class="label">职位/专业<i class="require-icon">*</i>：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职职位或所从事的专业" v-model="position">
      </p>
      <div class="tags-item">
          <p class="label">专家分类<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':experType == 1}" @click="chageExperType(1)">公开专家</span>
            <span class="tag-item" :class="{'active':experType == 2}" @click="chageExperType(2)">关系户专家</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">工作经验<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':exper == 1}" @click="changeExperience(1)">3年以下</span>
            <span class="tag-item" :class="{'active':exper == 2}" @click="changeExperience(2)">3-5年</span>
            <span class="tag-item" :class="{'active':exper == 3}" @click="changeExperience(3)">5-10年</span>
            <span class="tag-item" :class="{'active':exper == 4}" @click="changeExperience(4)">10年以上</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">擅长的领域<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':skill == 1}" @click="changeSkill(1)">财务</span>
            <span class="tag-item" :class="{'active':skill == 2}" @click="changeSkill(2)">税务</span>
            <span class="tag-item" :class="{'active':skill == 3}" @click="changeSkill(3)">工商</span>
            <span class="tag-item" :class="{'active':skill == 4}" @click="changeSkill(4)">房产</span>
  
          </p>
      </div>
      <div class="tags-item">
          <p class="label">细分领域<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':subSkill == 1}" @click="changeSubSkill(1)">财务1</span>
            <span class="tag-item" :class="{'active':subSkill == 2}" @click="changeSubSkill(2)">财务2</span>
            <span class="tag-item" :class="{'active':subSkill == 3}" @click="changeSubSkill(3)">财务3</span>
            <span class="tag-item" :class="{'active':subSkill == 4}" @click="changeSubSkill(4)">财务4</span>

          </p>
      </div>
    </div>

    
    <!-- 介绍资料 -->
    <div class="intro-form" v-show="currentTab == 1">
      <!-- 专长介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>专长介绍<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <textarea v-model="skillContent" placeholder="请填写擅长咨询的范围和案例,200字以内~"></textarea>
           </div>
      </div>     
      <!-- 个人介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>个人介绍<i class="require-icon">*</i></h4>
          </div>
           <div class="textarea-wrap">
             <textarea v-model="personIntro" placeholder="请填写学历、资质、经历、特长爱好等信息~"></textarea>
           </div>
      </div>
      <!-- 图片介绍 -->
      <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4>图片介绍</h4>
          </div>
          <div class="img-list">
            <img class="add-img-btn" src="../../static/add_img.png" @click="uploadImg" v-if="imgIntroList.length < 5">
            <div class="img-item" v-for="(item,index) in imgIntroList">
              <img :src="item"  alt="">
              <p class="edit-img">
                <span class="iconfont icon-3" @click="deleteImg(index)"></span> 
              </p>
            </div>
           <input type="file" class="upload-btn" ref="uploadBtn" @change="uploadImgChange($event)" >
          </div>
      </div>
      <!-- 营业时间 -->
      <div class="common-panel choose-open-time-panel">
          <div class="panel-title">
             <h4>营业时间<span class="require-icon">*</span></h4>
          </div>
          <div class="form-input">
            <span class="label">上午：</span>
            <span class="time-picker-input" :class="{'grey':!time1}" @click="showTimePicker(1,1)">{{time1 || '请选择'}}</span>
            <span class="devide-line">-</span>
            <span class="time-picker-input" :class="{'grey':!time2}" @click="showTimePicker(1,2)">{{time2 || '请选择'}}</span>
          </div>
          <div class="form-input">
            <span class="label">下午：</span>
            <span class="time-picker-input" :class="{'grey':!time3}" @click="showTimePicker(2,3)">{{time3 || '请选择'}}</span>
            <span class="devide-line">-</span>
            <span class="time-picker-input" :class="{'grey':!time4}" @click="showTimePicker(2,4)">{{time4 || '请选择'}}</span>
            
          </div>
          <div class="form-input">
            <span class="label">晚上：</span>
            <span class="time-picker-input" :class="{'grey':!time5}" @click="showTimePicker(3,5)">{{time5 || '请选择'}}</span>
            <span class="devide-line">-</span>
            <span class="time-picker-input" :class="{'grey':!time6}" @click="showTimePicker(3,6)">{{time6 || '请选择'}}</span>
           </div>
           
      </div>
      <!-- 咨询费用 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>咨询价格/每节（30分钟）<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <input v-model="classVal" placeholder="请填写咨询价格"></input>元
           </div>
      </div>
      <!-- 收款账号 -->
      <div class="common-panel">
           <div class="panel-title">
              <h4>收款账号（任填一个）<span class="require-icon">*</span></h4>
           </div>
           <div class="form-input">
             <span class="label">微信：</span>
             <input v-model="wxAccount" placeholder="请填写微信收款账号"></input>
           </div>
           <div class="form-input">
             <span class="label">支付宝：</span>
             <input v-model="zfbAccount" placeholder="请填支付宝收款账号"></input> 
           </div>
      </div>

    </div>
  
 
    <time-picker :show.sync="timePickerShow" @submite="submitTime" :type="timePickerType"></time-picker>
    <div class="btn-wrapper position-bottom" v-show="currentTab == 0">
      <p class="btn btn-green btn-large" @click="toSaveBase">保存</p>
    </div>

    <div class="btn-wrapper position-bottom" v-show="currentTab == 1">
      <p class="btn btn-green btn-large" @click="toSaveIntro">保存</p>
    </div>

  </div>
</template>

<script>
import T from '../tool/tool'
import Scroll  from '../components/Scroll.vue'
import Picker from '../components/timePicker.vue';
export default {
  name: 'ExpertInfo',
  components:{
   'v-scroll': Scroll,
   'time-picker': Picker
  },
  data () {
    return {
      currentTab:0,

      name:'',
      tel:'',
      company: '',
      position:'',
      experType:1,
      exper: 0,
      skill: 0,
      subSkill: 0,

      skillContent:'',
      classVal:'',
      wxAccount:'',
      zfbAccount:'',
      personIntro:'',

      timePickerShow:false,
      timePickerType:0,
      currentEditNum:0,
      time1:'',
      time2:'',
      time3:'',
      time4:'',
      time5:'',
      time6:'',

      imgIntroList:[]
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    chageCurrentTab(num){
      this.currentTab = num;
      document.body.scrollTop = 0;
    },
    chageExperType(num){
      this.experType = num;
    },
    changeExperience(num){
      this.exper = num;
    },
    changeSkill(num){
      this.skill = num;
    },
    changeSubSkill(num){
      this.subSkill = num;
    },
    showTimePicker(type,num){
      this.currentEditNum = num;
      this.timePickerType = type;
      this.timePickerShow = true;
    },
    submitTime(h,m){
      let result = h + ':' + m;
      switch(this.currentEditNum){
        case 1:
          this.time1 = result;
          break;
        case 2:
          this.time2 = result;
          break;
        case 3:
          this.time3 = result;
          break;
        case 4:
          this.time4 = result;
          break;
        case 5:
          this.time5 = result;
          break;
        case 6:
          this.time6 = result;
          break;
      }  
      console.log(h,m)
    },
    toSaveBase(){
      this.$router.go(-1);
    },
    toSaveIntro(){
      this.$router.go(-1);
    },

    uploadImg(){
      let uploadBtn = this.$refs.uploadBtn;
      uploadBtn.click();
    },
    uploadImgChange(e){
      let file = e.target.files[0];
      let localUrl = URL.createObjectURL(file);
      this.imgIntroList.push(localUrl);
    },
    deleteImg(index){
      this.imgIntroList.splice(index,1);
    }

  },
  mounted(){
   
  }
}
</script>
<style scoped>
  .info-tabs{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    z-index: 12;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #55cbc4;
    height: 60px;
  }
  .info-tabs .tab-item{
    font-size: 14px;
     width: 120px;
     border: 1px solid #fff;
     color: #fff;
     line-height: 36px;
     text-align: center;
  }
  .info-tabs .tab-item.active{
    background-color: #fff;
    color: #55cbc4;
  }
  .info-tabs .tab-item.base-tab{
    border-radius: 6px 0 0 6px;
  }
  .info-tabs .tab-item.inrto-tab{
    border-radius:0 6px 6px 0;
  }
  .base-form{
    padding:20px;
    padding-top: 65px;
    padding-bottom: 50px;
  }
  .base-form .base-form-item{
    display:flex;
    align-items:center;
    height:40px;
    padding:10px 5px;
    font-size:14px;
    position:relative;
    border-bottom: 1px solid #e6e6e6;
  }
  .base-form .base-form-item input{
    flex:1;
    padding-left: 20px;
    border:none;
    font-size:14px;
  }
  .base-form .tags-item{
    padding: 15px 5px;

  }
  .base-form .tags-item+.tags-item{
    border-top: 1px solid #e6e6e6;

  }
  .base-form .tags-item .label{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .base-form .tags-item .tags-wrap{
    display: flex;
    flex-wrap: wrap;
  }
  .base-form .tags-item .tags-wrap .tag-item{
    padding: 5px 6px;
    text-align: center;
    /*line-height: 26px;*/
    font-size: 12px;
    border: 1px solid #ccc;
    color: #ccc;
    border-radius: 4px;
    margin-right: 5px;
    margin-top: 5px;
  }
  .base-form .tags-item .tags-wrap .tag-item.active{
    color: #55cbc4;
    border-color: #55cbc4;
  }

  .choose-open-time-panel .form-input{
    font-size: 14px;
  }
  .choose-open-time-panel .form-input .label{
    width: auto;
  }
  .choose-open-time-panel .form-input .time-picker-input{
    min-width: 42px;
    min-height: 19px;
    border:1px solid #eee;
    margin:0 10px;
    padding:11px 20px;
  }
  .choose-open-time-panel .form-input .time-picker-input.grey{
    color: #aaa;
  }

  .intro-form{
     padding-top: 65px;
    padding-bottom: 50px;
  }
  .intro-form .common-panel .panel-title {
    border: none;
  }
  .intro-form input,
  .intro-form textarea{
    box-sizing: border-box;
    line-height: 40px;
    border: 1px solid #eee;
    font-size: 14px;
    padding: 0 10px;
  }
  .intro-form input{
    width:90%;
    margin-right: 10px;
  }
  .intro-form textarea{
    padding: 10px 15px;
    height: 150px;
    width: 100%;
    line-height: 1.3;
  }
  .intro-form .form-input{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .intro-form .form-input .label{
    font-size: 14px;
    width: 80px;

  }
  .intro-form .form-input input{
    width: 65%;
    margin: 0 10px;

  }
  .intro-form .edit-panel{
    position: relative;
  }
  .intro-form .edit-panel .img-list{
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .intro-form .edit-panel .img-list .add-img-btn{
    margin-right: 10px;
  }
  .intro-form .edit-panel .img-list .img-item{
    position:relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .intro-form .edit-panel .img-list img{
    height: 70px;
    vertical-align: bottom;
  }
  .intro-form .edit-panel .img-list .edit-img{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    height: 30px;
  }
  .intro-form .edit-panel .img-list .edit-img .iconfont{
    color: #fff;
    font-size: 20px;
    text-align: right;
    flex: 1;
    padding-right: 5px;
  }
  .btn-wrapper{
    width: 100%;
  }
</style>