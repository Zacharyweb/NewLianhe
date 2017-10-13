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
          <span class="label">公司：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职机构" v-model="company">
      </p>
      <p class="base-form-item">
          <span class="label">职位：</span>
          <input type="tel" maxlength="30" placeholder="请输入任职职位" v-model="position">
      </p>
      <div class="tags-item">
          <p class="label">工作经验：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':exper == 1}" @click="changeExperience(1)">3年以下</span>
            <span class="tag-item" :class="{'active':exper == 2}" @click="changeExperience(2)">3-5年</span>
            <span class="tag-item" :class="{'active':exper == 3}" @click="changeExperience(3)">5-10年</span>
            <span class="tag-item" :class="{'active':exper == 4}" @click="changeExperience(4)">10年以上</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">擅长的领域：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':skill == 1}" @click="changeSkill(1)">财务</span>
            <span class="tag-item" :class="{'active':skill == 2}" @click="changeSkill(2)">税务</span>
            <span class="tag-item" :class="{'active':skill == 3}" @click="changeSkill(3)">工商</span>
            <span class="tag-item" :class="{'active':skill == 4}" @click="changeSkill(4)">房产</span>
            <span class="tag-item" :class="{'active':skill == 5}" @click="changeSkill(5)">教育</span>
            <span class="tag-item" :class="{'active':skill == 6}" @click="changeSkill(6)">海关</span>
            <span class="tag-item" :class="{'active':skill == 7}" @click="changeSkill(7)">法务</span>
            <span class="tag-item" :class="{'active':skill == 7}" @click="changeSkill(7)">法务</span>
          </p>
      </div>
      <div class="tags-item">
          <p class="label">细分领域：</p>
          <p class="tags-wrap">
            <span class="tag-item" :class="{'active':subSkill == 1}" @click="changeSubSkill(1)">财务1</span>
            <span class="tag-item" :class="{'active':subSkill == 2}" @click="changeSubSkill(2)">财务2</span>
            <span class="tag-item" :class="{'active':subSkill == 3}" @click="changeSubSkill(3)">财务3</span>
            <span class="tag-item" :class="{'active':subSkill == 4}" @click="changeSubSkill(4)">财务4</span>
            <span class="tag-item" :class="{'active':subSkill == 5}" @click="changeSubSkill(5)">财务4</span>
            <span class="tag-item" :class="{'active':subSkill == 6}" @click="changeSubSkill(6)">财务4</span>
            <span class="tag-item" :class="{'active':subSkill == 7}" @click="changeSubSkill(7)">财务4</span>
            <span class="tag-item" :class="{'active':subSkill == 8}" @click="changeSubSkill(8)">财务4</span>
            <span class="tag-item" :class="{'active':subSkill == 9}" @click="changeSubSkill(9)">财务4</span>
          </p>
      </div>
    </div>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="toSave">保存</p>
    </div>
  </div>
</template>

<script>
import T from '../tool/tool'
export default {
  name: 'SignIn',
  components:{
 
  },
  data () {
    return {
      name:'朱坚',
      tel:'15757177498',
      company: '优谷数据',
      position:'前端工程师',
      exper: 1,
      skill: 2,
      subSkill: 4,
    }
  },
  methods:{
    changeExperience(num){
      this.exper = num;
    },
    changeSkill(num){
      this.skill = num;
    },
    changeSubSkill(num){
      this.subSkill = num;
    },
    toSave(){
      this.$router.go(-1);
    }
  },
  mounted(){

  }
}
</script>
<style scoped>
  .base-form{
    padding:15px;
    padding-top: 5px;
    padding-bottom: 0;
  }
  .base-form .base-form-item{
    display:flex;
    align-items:center;
    height:36px;
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
  .tags-item{
    padding: 10px 5px;

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
    padding: 0 6px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    border: 1px solid #ccc;
    color: #ccc;
    border-radius: 4px;
    margin-right: 5px;
    margin-top: 8px;
  }
  .tags-item .tags-wrap .tag-item.active{
    color: #55cbc4;
    border-color: #55cbc4;
  }
  .btn-wrapper{
    padding:15px;
  }
</style>