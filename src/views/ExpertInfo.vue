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
          <input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="phone">
      </p>
      <p class="base-form-item">
          <span class="label">公司/机关<i class="require-icon">*</i>：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职机构以及有关部门科室" v-model="organization">
      </p>
      <p class="base-form-item">
          <span class="label">职位/专业<i class="require-icon">*</i>：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职职位或所从事的专业" v-model="post">
      </p>
      <div class="tags-item">
          <p class="label">专家分类<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':expertType == 1}" @click="chageExperType(1)">公开专家</span>
            <span class="tag-item" :class="{'active':expertType == 2}" @click="chageExperType(2)">关系户专家</span>
          </p>
          <div class="select-tips">
            <span>注</span>
            <p>公开专家—为所有用户服务</p>
            <p>关系户专家—只为关系户服务</p>
          </div>
      </div>
      <div class="tags-item">
          <p class="label">工作经验<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span v-for="(item,i) in this.$store.state.exper" v-bind:key="i" class="tag-item" :class="{'active':workYears == i+1}" @click="changeExperience(i+1)">{{item}}</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">领域<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span v-for="item in skills" v-bind:key="item.id" class="tag-item" :class="{'active':expertFirstClassId == item.id}" @click="changeSkill(item.id)">{{item.name}}</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">细分领域<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span v-for="item in subSkills" v-bind:key="item.id" class="tag-item" :class="{'active':expertClassId == item.id}" @click="changeSubSkill(item.id)">{{item.name}}</span>
          </p>
      </div>
    </div>

    
    <!-- 介绍资料 -->
    <div class="intro-form" v-show="currentTab == 1">
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
            <img class="add-img-btn" src="../../static/add_img.png" @click="uploadImg" v-if="expertPhotos.length < 5">
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
          <div class="form-input" v-for="(item,index) in expertWorkSettings" v-bind:key="item.week">
            <span class="time-picker-input" :class="{'grey':!item.week}" @click="showTimePicker(1,index,1)">{{item.week | weekday('请选择')}}</span>
            <span class="time-picker-input" :class="{'grey':!item.startTime}" @click="showTimePicker(0,index,2)">{{item.startTime | datetime("HH:mm") || "请选择"}}</span>
            <span class="devide-line">-</span>
            <span class="time-picker-input" :class="{'grey':!item.endTime}" @click="showTimePicker(0,index,3)">{{item.endTime | datetime("HH:mm") || "请选择"}}</span>
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
             <input v-model="price" placeholder="请填写咨询价格"></input>元
           </div>
      </div>
      <!-- 收款账号 -->
      <div class="common-panel">
           <div class="panel-title">
              <h4>收款账号（任填一个）<span class="require-icon">*</span></h4>
           </div>
           <div class="form-input">
             <span class="label">微信：</span>
             <input v-model="weixinAccount" placeholder="请填写微信收款账号"></input>
           </div>
           <div class="form-input">
             <span class="label">支付宝：</span>
             <input v-model="alipayAccount" placeholder="请填支付宝收款账号"></input> 
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
import T from "../tool/tool";
import Scroll from "../components/Scroll.vue";
import Picker from "../components/timePicker.vue";
import api from "../ajax/index";
import qCloud from "../tool/qcloud/index";
export default {
  name: "ExpertInfo",
  components: {
    "v-scroll": Scroll,
    "time-picker": Picker
  },
  data() {
    return {
      currentTab: 0,

      name: "",
      phone: "",
      organization: "",
      post: "",
      workStatus: 1,
      expertType: 1,
      workYears: 1,
      expertFirstClassId: 0,
      expertClassId: 0,
      skills: [],
      subSkills: [],

      speciality: "",
      price: null,
      weixinAccount: "",
      alipayAccount: "",
      introduction: "",

      timePickerShow: false,
      timePickerType: 0,

      currentEditIndex: 0,
      currentEditNum: 0,

      expertWorkSettings: [{ week: "", startTime: "", endTime: "" }],
      expertPhotos: []
    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    chageCurrentTab(num) {
      this.currentTab = num;
      document.body.scrollTop = 0;
    },
    chageExperType(num) {
      this.expertType = num;
    },
    changeExperience(num) {
      this.workYears = num;
    },
    changeSkill(num) {
      this.expertFirstClassId = num;
      var subSkills = this.skills.find(s => s.id == num);
      subSkills && (this.subSkills = subSkills.childrenExpertClasses);
      this.subSkills.length && this.changeSubSkill(this.subSkills[0].id);
    },
    changeSubSkill(num) {
      this.expertClassId = num;
    },

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

    toSaveBase() {
      api
        .UpdateNonExpert({
          expertType: this.expertType,
          expertFirstClassId: this.expertFirstClassId,
          expertClassId: this.expertClassId,
          phone: this.phone,
          name: this.name,
          organization: this.organization,
          post: this.post,
          workYears: this.workYears,
          id: this.$store.state.user.id
        })
        .then(res => {
          this.$router.go(-1);
          this.$store.dispatch("getLoginInfo");
          T.showToast({ text: "修改成功" });
        });
    },

    toSaveIntro() {
      api
        .UpdateExpert({
          id: this.$store.state.user.id,
          ...this.$data,
          expertPhotos: [...this.$data.expertPhotos],
          expertWorkSettings: this.$data.expertWorkSettings.map(w => {
            return {
              ...w,
              week:
                typeof w.week === "number"
                  ? w.week
                  : this.$store.state.weeks[w.week]
            };
          })
        })
        .then(() => {
          this.$router.go(-1);
          this.$store.dispatch("getLoginInfo");
          T.showToast({ text: "修改成功" });
        });
    },

    uploadImg() {
      let uploadBtn = this.$refs.uploadBtn;
      uploadBtn.click();
    },
    uploadImgChange(e) {
      let file = e.target.files[0];
      let that = this;
      T.showLoading();
      qCloud.upload(file, function(result) {
        that.expertPhotos.push(result.data.source_url);
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
    api
      .GetAllExpertClasses()
      .then(res => {
        this.skills = res.data.result;
        this.changeSkill(this.skills[0].id);
      })
      .then(() => {
        return api.GetExpert();
      })
      .then(res => {
        let info = res.data.result;

        (this.name = info.name),
          (this.phone = info.phone),
          (this.organization = info.organization),
          (this.post = info.post),
          (this.expertType = info.expertType || 1),
          (this.workYears = info.workYears),
          (this.expertFirstClassId = info.expertFirstClassId),
          (this.expertClassId = info.expertClassId),
          (this.speciality = info.speciality);
        this.price = info.price;
        this.weixinAccount = info.weixinAccount;
        this.alipayAccount = info.alipayAccount;
        this.introduction = info.introduction;
        this.expertWorkSettings = info.expertWorkSettings;
        this.expertPhotos = info.expertPhotos;
      });
  }
};
</script>
<style scoped>
.info-tabs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #55cbc4;
  height: 60px;
}
.info-tabs .tab-item {
  font-size: 14px;
  width: 120px;
  border: 1px solid #fff;
  color: #fff;
  line-height: 36px;
  text-align: center;
}
.info-tabs .tab-item.active {
  background-color: #fff;
  color: #55cbc4;
}
.info-tabs .tab-item.base-tab {
  border-radius: 6px 0 0 6px;
}
.info-tabs .tab-item.inrto-tab {
  border-radius: 0 6px 6px 0;
}
.base-form {
  padding: 20px;
  padding-top: 65px;
  padding-bottom: 50px;
}
.base-form .base-form-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 5px;
  font-size: 14px;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}
.base-form .base-form-item input {
  flex: 1;
  padding-left: 20px;
  border: none;
  font-size: 14px;
}
.base-form .tags-item {
  padding: 15px 5px;
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
.base-form .tags-item + .tags-item {
  border-top: 1px solid #e6e6e6;
}
.base-form .tags-item .label {
  font-size: 14px;
  margin-bottom: 10px;
}
.base-form .tags-item .tags-wrap {
  display: flex;
  flex-wrap: wrap;
}
.base-form .tags-item .tags-wrap .tag-item {
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
.base-form .tags-item .tags-wrap .tag-item.active {
  color: #55cbc4;
  border-color: #55cbc4;
}

.choose-open-time-panel {
  position: relative;
}
.choose-open-time-panel .add-open-time {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 14px;
  color: #55cbc4;
}
.choose-open-time-panel .form-input {
  font-size: 14px;
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

.intro-form {
  padding-top: 65px;
  padding-bottom: 50px;
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
  font-size: 14px;
  width: 80px;
}
.intro-form .form-input input {
  width: 65%;
  margin: 0 10px;
}
.intro-form .edit-panel {
  position: relative;
}
.intro-form .edit-panel .img-list {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.intro-form .edit-panel .img-list .add-img-btn {
  margin-right: 10px;
}
.intro-form .edit-panel .img-list .img-item {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}
.intro-form .edit-panel .img-list img {
  height: 70px;
  vertical-align: bottom;
}
.intro-form .edit-panel .img-list .edit-img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  height: 30px;
}
.intro-form .edit-panel .img-list .edit-img .iconfont {
  color: #fff;
  font-size: 20px;
  text-align: right;
  flex: 1;
  padding-right: 5px;
}
.btn-wrapper {
  width: 100%;
}
.upload-btn {
  display: none;
}
</style>