<template>
  <div>
    <div class="intro-form">
    
      <!-- 个人介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>个人介绍<i class="require-icon">*</i></h4>
          </div>
           <div class="textarea-wrap">
             <textarea v-model="personIntro" placeholder="请填写学历、资质、经历、特长爱好等信息~"></textarea>
           </div>
      </div>
      <!-- 专长介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>专长介绍<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <textarea v-model="skillContent" placeholder="请填写擅长咨询的范围和案例,200字以内~"></textarea>
           </div>
      </div>
      <!-- 图片介绍 -->
      <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4>图片介绍</h4>
          </div>
          <div class="img-list">
            <img class="add-img-btn" src="../../../static/add_img.png" @click="uploadImg" v-if="imgIntroList.length < 5">
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
             <span class="add-open-time" @click="addOpenTime" v-if="openTimeArr.length < 7">+ 增加时段</span>
          </div>
          <div class="form-input" v-for="(item,index) in openTimeArr">
            <span class="time-picker-input" :class="{'grey':!item.weekDay}" @click="showTimePicker(1,index,1)">{{item.weekDay || '请选择'}}</span>
            <span class="time-picker-input" :class="{'grey':!item.timeStart}" @click="showTimePicker(0,index,2)">{{item.timeStart || '请选择'}}</span>
            <span class="devide-line">-</span>
            <span class="time-picker-input" :class="{'grey':!item.timeEnd}" @click="showTimePicker(0,index,3)">{{item.timeEnd || '请选择'}}</span>
            <span class="iconfont icon-3" @click="deleteOpenTime(index)" v-if="openTimeArr.length > 1"></span>
          </div>
          <div class="select-tips">
            <span>注</span>
            <p>不再营业时，请回到这里删除营业时间。</p>
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
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toCheck">下一步</p>
    </div>
  </div>
</template>

<script>
import T from '../../tool/tool'
import Picker from '../../components/timePicker.vue';
export default {
  name: 'SignIn',
  components:{
    'time-picker': Picker
  },
  data () {
    return {
      timePickerShow:false,
      timePickerType:0,
      skillContent:'',
      classVal:'',
      wxAccount:'',
      zfbAccount:'',
      personIntro:'',

      currentEditIndex:0,
      currentEditNum:0,
      
      openTimeArr:[
          {weekDay:'',timeStart:'',timeEnd:''},
      ],
      
 

      imgIntroList:[]
    }
  },
  methods:{
    showTimePicker(type,index,num){
      this.currentEditIndex = index;
      this.currentEditNum = num;
      this.timePickerType = type;
      this.timePickerShow = true;
    },
    submitTime(h,m){
      let obj = this.openTimeArr[this.currentEditIndex];
      let result;
      if(this.timePickerType == 1){
        result = h;
      }else{
        result = h + ':' + m;
      }

      switch(this.currentEditNum){
        case 1:
          obj.weekDay = result;
          break;
        case 2:
          obj.timeStart = result;
          break;
        case 3:
          obj.timeEnd = result;
          break;
      }  
      this.openTimeArr.splice(this.currentEditIndex,1,obj);
 
    },
    addOpenTime(){
       this.openTimeArr.push({weekDay:'',timeStart:'',timeEnd:''});
    },
    toCheck(){
      T.postCurrentStep(3);
      
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
    },
    deleteOpenTime(index){
      this.openTimeArr.splice(index,1);
    }
  },
  mounted(){
     T.postCurrentStep(2);
     document.body.scrollTop = 0;
  }
}
</script>
<style scoped>
  .intro-form{
    margin-top: 60px;
    font-size: 14px;
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
    font-size: 15px;
    width: 80px;
  }
  .intro-form .form-input input{
    width: 65%;
    margin: 0 10px;

  }
  .select-tips{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
    padding-left: 25px;
    position: relative;
  }
  .select-tips span{
    position: absolute;
    top:0;
    left:0;
    color: #fff;
    background-color: #55cbc4;
    padding: 2px 4px;
    border-radius: 2px;

  }
  .select-tips p{
    padding-top: 5px;
  }

  .choose-open-time-panel{
    position: relative;
  }
  .choose-open-time-panel .form-input{
    
  }
  .choose-open-time-panel .add-open-time{
     position: absolute;
     top:10px;
     right: 20px;
     font-size: 14px;
     color: #55cbc4;
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
  .edit-panel{
    position: relative;
  }
  .edit-panel .img-list{
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .edit-panel .img-list .add-img-btn{
    margin-right: 10px;
  }
  .edit-panel .img-list .img-item{
    position:relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .edit-panel .img-list img{
    height: 70px;
    vertical-align: bottom;
  }
  .edit-panel .img-list .edit-img{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    height: 30px;
  }
  .edit-panel .img-list .edit-img .iconfont{
    color: #fff;
    font-size: 20px;
    text-align: right;
    flex: 1;
    padding-right: 5px;
  }

  .btn-wrapper{
    padding:15px;
  }



  .upload-btn{
    display: none;
  }
</style>