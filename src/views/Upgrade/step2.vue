<template>
  <div>
    <div class="intro-form">
    
      <!-- 个人介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>个人介绍<i class="require-icon">*</i></h4>
          </div>
           <div class="textarea-wrap">
             <textarea v-model="introduction" placeholder="请填写学历、资质、经历、特长爱好等信息~"></textarea>
           </div>
      </div>
      <!-- 专长介绍 -->
      <div class="common-panel">
          <div class="panel-title">
             <h4>专长介绍<span class="require-icon">*</span></h4>
          </div>
           <div class="form-input">
             <textarea v-model="speciality" placeholder="请填写擅长咨询的范围和案例,200字以内~"></textarea>
           </div>
      </div>
      <!-- 图片介绍 -->
      <div class="edit-panel common-panel">
          <div class="panel-title">
             <h4>图片介绍</h4>
          </div>
          <div class="img-list">
            <img class="add-img-btn" src="../../../static/add_img.png" @click="uploadImg" v-if="expertPhotos.length < 5">
            <div class="img-item" v-for="(item,index) in expertPhotos" v-bind:key="index">
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
             <span class="add-open-time" @click="addOpenTime" v-if="expertWorkSettings.length < 7">+ 增加时段</span>
          </div>
          <div class="form-input" v-for="(item,index) in expertWorkSettings" v-bind:key="index">
            <span class="time-picker-input" :class="{'grey':!item.week}" @click="showTimePicker(1,index,1)">{{item.week || '请选择'}}</span>
            <span class="time-picker-input" :class="{'grey':!item.startTime}" @click="showTimePicker(0,index,2)">{{item.startTime || '请选择'}}</span>
            <span class="devide-line">-</span>
            <span class="time-picker-input" :class="{'grey':!item.endTime}" @click="showTimePicker(0,index,3)">{{item.endTime || '请选择'}}</span>
            <span class="iconfont icon-3" @click="deleteOpenTime(index)" v-if="expertWorkSettings.length > 1"></span>
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
             <input v-model="price" placeholder="请填写咨询价格" />元
           </div>
      </div>
      <!-- 收款账号 -->
      <div class="common-panel">
           <div class="panel-title">
              <h4>收款账号（任填一个）</h4>
           </div>
           <div class="form-input">
             <span class="label">微信：</span>
             <input v-model="weixinAccount" placeholder="请填写微信收款账号" />
           </div>
           <div class="form-input">
             <span class="label">支付宝：</span>
             <input v-model="alipayAccount" placeholder="请填支付宝收款账号" />
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
import T from "../../tool/tool";
import Picker from "../../components/timePicker.vue";
import qCloud from "../../tool/qcloud/index";
export default {
  name: "SignIn",
  components: {
    "time-picker": Picker
  },
  data() {
    return {
      timePickerShow: false,
      timePickerType: 0,
      speciality: "",
      price: null,
      weixinAccount: "",
      alipayAccount: "",
      introduction: "",

      currentEditIndex: 0,
      currentEditNum: 0,

      expertWorkSettings: [{ week: "", startTime: "", endTime: "" }],
      expertPhotos: []
    };
  },
  methods: {
    showTimePicker(type, index, num) {
      this.currentEditIndex = index;
      this.currentEditNum = num;
      this.timePickerType = type;
      this.timePickerShow = true;
    },
    submitTime(h, m) {
      let obj = this.expertWorkSettings[this.currentEditIndex];
      let result;
      if (this.timePickerType == 1) {
        result = h;
      } else {
        result = h + ":" + m;
      }

      switch (this.currentEditNum) {
        case 1:
          obj.week = result;
          break;
        case 2:
          obj.startTime = result;
          break;
        case 3:
          obj.endTime = result;
          break;
      }
      this.expertWorkSettings.splice(this.currentEditIndex, 1, obj);
    },
    addOpenTime() {
      this.expertWorkSettings.push({ week: "", startTime: "", endTime: "" });
    },
    toCheck() {
      T.postCurrentStep({ num: 3, form: { ...this.$data } });
    },
    uploadImg() {
      let uploadBtn = this.$refs.uploadBtn;
      uploadBtn.click();
    },
    uploadImgChange(e) {
      let file = e.target.files[0];
      T.showLoading();
      qCloud.upload(file).then(result => {
        this.expertPhotos.push(result.data.source_url);
        T.hideLoading();
      });
    },
    deleteImg(index) {
      this.expertPhotos.splice(index, 1);
    },
    deleteOpenTime(index) {
      this.expertWorkSettings.splice(index, 1);
    }
  },
  mounted() {
    T.postCurrentStep({ num: 2 });
    document.body.scrollTop = 0;
  }
};
</script>
<style scoped>
.intro-form {
  margin-top: 60px;
  font-size: 14px;
}
.intro-form .common-panel .panel-title {
  border: none;
}
.intro-form input,
.intro-form textarea {
  box-sizing: border-box;
  line-height: 40px;
  border: 1px solid #eee;
  font-size: 14px;
  padding: 0 10px;
}
.intro-form input {
  width: 90%;
  margin-right: 10px;
}
.intro-form textarea {
  padding: 10px 15px;
  height: 150px;
  width: 100%;
  line-height: 1.3;
}
.intro-form .form-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.intro-form .form-input .label {
  font-size: 15px;
  width: 80px;
}
.intro-form .form-input input {
  width: 65%;
  margin: 0 10px;
}
.select-tips {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
  padding-left: 25px;
  position: relative;
}
.select-tips span {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  background-color: #55cbc4;
  padding: 2px 4px;
  border-radius: 2px;
}
.select-tips p {
  padding-top: 5px;
}

.choose-open-time-panel {
  position: relative;
}
.choose-open-time-panel .form-input {
}
.choose-open-time-panel .add-open-time {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 14px;
  color: #55cbc4;
}
.choose-open-time-panel .form-input .label {
  width: auto;
}
.choose-open-time-panel .form-input .time-picker-input {
  min-width: 42px;
  min-height: 19px;
  border: 1px solid #eee;
  margin: 0 10px;
  padding: 11px 20px;
}
.choose-open-time-panel .form-input .time-picker-input.grey {
  color: #aaa;
}
.edit-panel {
  position: relative;
}
.edit-panel .img-list {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.edit-panel .img-list .add-img-btn {
  margin-right: 10px;
}
.edit-panel .img-list .img-item {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}
.edit-panel .img-list img {
  height: 70px;
  vertical-align: bottom;
}
.edit-panel .img-list .edit-img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  height: 30px;
}
.edit-panel .img-list .edit-img .iconfont {
  color: #fff;
  font-size: 20px;
  text-align: right;
  flex: 1;
  padding-right: 5px;
}

.btn-wrapper {
  padding: 15px;
}

.upload-btn {
  display: none;
}
</style>