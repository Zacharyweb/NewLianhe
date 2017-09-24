<template>
  <div>
    <div class="base-form common-panel">
      <p class="base-form-item">
          <span class="label">姓名：</span>
          <input type="text" maxlength="20" placeholder="请输入姓名" v-model="name">
      </p>
      <p class="base-form-item">
          <span class="label">手机：</span>
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
      exper: 0
    }
  },
  methods:{
    changeExperience(num){
      this.exper = num;
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
  .base-form{
    margin-top: 100px;
    padding:15px;
  }
  .base-form .base-form-item{
    display:flex;
    align-items:center;
    height:40px;
    padding:10px 5px;
    font-size:16px;
    position:relative;
    border-bottom: 1px solid #e6e6e6;
  }
  .base-form .base-form-item input{
    flex:1;
    padding-left: 20px;
    border:none;
    font-size:16px;
  }
  .tags-item{
    padding: 15px 5px;
    padding-bottom: 0;
  }
  .tags-item .label{
    font-size: 16px;
    margin-bottom: 15px;
  }
  .tags-item .tags-wrap{
    display: flex;
  }
  .tags-item .tags-wrap .tag-item{
    flex: 1;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    border: 1px solid #888;
    color: #888;
    border-radius: 4px;
    margin-right: 5px;
  }
  .tags-item .tags-wrap .tag-item.active{
    color: #55cbc4;
    border-color: #55cbc4;
  }
  .btn-wrapper{
    padding:15px;
  }
</style>