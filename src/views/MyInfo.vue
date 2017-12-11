<template>
  <div>
    <div class="base-form common-panel">
      <div class="panel-title">
         <h4><span class="iconfont icon-bianji"></span>我的资料</h4>
      </div>
      <p class="base-form-item">
          <span class="label">姓名<i class="require-icon">*</i>：</span>
          <input type="text" maxlength="20" placeholder="请输入姓名" v-model="name">
      </p>
      <p class="base-form-item">
          <span class="label">手机<i class="require-icon">*</i>：</span>
          <input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="tel">
      </p>
      <p class="base-form-item">
          <span class="label">公司/机关：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职机构以及有关部门科室" v-model="company">
      </p>
      <p class="base-form-item">
          <span class="label">职位/专业：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职职位或所从事的专业" v-model="position">
      </p>
      <div class="tags-item">
          <p class="label">工作经验：</p>
          <p class="tags-wrap">
            <span v-for="(item,i) in this.$store.state.exper" v-bind:key="i" class="tag-item" :class="{'active':exper == i+1}" @click="changeExperience(i+1)">{{item}}</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">领域：</p>
          <p class="tags-wrap">
            <span v-for="item in skills" v-bind:key="item.id" class="tag-item" :class="{'active':skill == item.id}" @click="changeSkill(item.id)">{{item.name}}</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">细分领域：</p>
          <p class="tags-wrap">
            <span v-for="item in subSkills" v-bind:key="item.id" class="tag-item" :class="{'active':subSkill == item.id}" @click="changeSubSkill(item.id)">{{item.name}}</span>
          </p>
      </div>
    </div>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toSave">保存</p>
    </div>
  </div>
</template>

<script>
import T from "../tool/tool";
import api from "../ajax/index";
export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      name: "",
      tel: "",
      company: "",
      position: "",
      exper: 1,
      skill: 0,
      subSkill: 0,
      skills: [],
      subSkills: []
    };
  },
  methods: {
    changeExperience(num) {
      this.exper = num;
    },
    changeSkill(num) {
      this.skill = num;
      var subSkills = this.skills.find(s => s.id == num);
      subSkills && (this.subSkills = subSkills.childrenExpertClasses);
      this.subSkills.length && this.changeSubSkill(this.subSkills[0].id);
    },
    changeSubSkill(num) {
      this.subSkill = num;
    },
    toSave() {
      api
        .UpdateNonExpert({
          expertFirstClassId: this.skill,
          expertClassId: this.subSkill,
          phone: this.tel,
          name: this.name,
          organization: this.company,
          post: this.position,
          workYears: this.exper,
          id: this.$store.state.user.id
        })
        .then(res => {
          this.$store.dispatch("getLoginInfo");
          T.showToast({ text: "恭喜，资料修改成功" });
          this.$router.go(-1);
        });
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
        return api.GetNonExpert();
      })
      .then(res => {
        let info = res.data.result;
        this.skill = info.expertFirstClassId;
        this.subSkill = info.expertClassId;
        this.tel = info.phone;
        this.name = info.name;
        this.company = info.organization;
        this.position = info.post;
        this.exper = info.workYears;
      });
  }
};
</script>
<style scoped>
.base-form {
  padding-top: 20px;
  margin-top: 15px;
  padding-bottom: 0;
}
.base-form .panel-title {
  padding-bottom: 15px;
}
.base-form .panel-title h4 {
  font-size: 16px;
}
.base-form .base-form-item {
  display: flex;
  align-items: center;
  height: 36px;
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
.tags-item {
  padding: 10px 5px;
}
.tags-item + .tags-item {
  border-top: 1px solid #e6e6e6;
}
.tags-item .label {
  font-size: 14px;
  margin-bottom: 10px;
}
.tags-item .tags-wrap {
  display: flex;
  flex-wrap: wrap;
}
.tags-item .tags-wrap .tag-item {
  padding: 5px 6px;
  text-align: center;
  /*line-height: 24px;*/
  font-size: 12px;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 4px;
  margin-right: 5px;
  margin-top: 8px;
}
.tags-item .tags-wrap .tag-item.active {
  color: #55cbc4;
  border-color: #55cbc4;
}
.btn-wrapper {
  padding: 15px;
}
</style>