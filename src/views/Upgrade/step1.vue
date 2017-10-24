<template>
  <div>
    <div class="base-form common-panel">
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
<!--       <div class="tags-item">
          <p class="label">目前状态<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':workStatus == 1}" @click="chageWorkStatus(1)">在职</span>
            <span class="tag-item" :class="{'active':workStatus == 2}" @click="chageWorkStatus(2)">已离退</span>
          </p>
      </div> -->
      <div class="tags-item">
          <p class="label">专家分类<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':experType == 1}" @click="chageExperType(1)">公开专家</span>
            <span class="tag-item" :class="{'active':experType == 2}" @click="chageExperType(2)">关系户专家</span>
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
            <span class="tag-item" :class="{'active':exper == 1}" @click="changeExperience(1)">3年以下</span>
            <span class="tag-item" :class="{'active':exper == 2}" @click="changeExperience(2)">3-5年</span>
            <span class="tag-item" :class="{'active':exper == 3}" @click="changeExperience(3)">5-10年</span>
            <span class="tag-item" :class="{'active':exper == 4}" @click="changeExperience(4)">10年以上</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">领域<i class="require-icon">*</i>：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':skill == 1}" @click="changeSkill(1)">财务</span>
            <span class="tag-item" :class="{'active':skill == 2}" @click="changeSkill(2)">税务</span>
            <span class="tag-item" :class="{'active':skill == 3}" @click="changeSkill(3)">工商</span>
            <span class="tag-item" :class="{'active':skill == 4}" @click="changeSkill(4)">房产</span>
            <span class="tag-item" :class="{'active':skill == 5}" @click="changeSkill(5)">教育</span>
            <span class="tag-item" :class="{'active':skill == 6}" @click="changeSkill(6)">海关</span>
            <span class="tag-item" :class="{'active':skill == 7}" @click="changeSkill(7)">法务</span>
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
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toNext">下一步</p>
    </div>
  </div>
</template>

<script>
import T from '../../tool/tool'
export default {
  name: 'SignIn',
  components:{
 
  },
  data () {
    return {
      name:'',
      tel:'',
      company: '',
      position:'',
      workStatus:1,
      experType:1,
      exper: 0,
      skill: 0,
      subSkill: 0,
    }
  },
  methods:{
    chageExperType(num){
      this.experType = num;
    },
    chageWorkStatus(num){
      this.workStatus = num;
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
    toNext(){
      T.postCurrentStep(2);
    }
  },
  mounted(){
     T.postCurrentStep(1);
  }
}
</script>
<style scoped>
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
  .base-form{
    margin-top: 60px;
    padding:15px;
    padding-bottom: 0;
    font-size: 14px;
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
    font-size: 14px;
    flex:1;
    padding-left: 20px;
    border:none;

  }
  .tags-item{
    padding: 15px 5px;

  }
  .tags-item+.tags-item{
    border-top: 1px solid #e6e6e6;

  }
  .tags-item .label{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .tags-item .tags-wrap{
    display: flex;
    flex-wrap: wrap;
  }
  .tags-item .tags-wrap .tag-item{
    padding: 5px 6px;
    text-align: center;
    /*line-height: 24px;*/
    font-size: 12px;
    border: 1px solid #ccc;
    color: #ccc;
    border-radius: 4px;
    margin-right: 5px;
    margin-top: 5px;
  }
  .tags-item .tags-wrap .tag-item.active{
    color: #55cbc4;
    border-color: #55cbc4;
  }
  .btn-wrapper{
    padding:15px;
  }
</style>