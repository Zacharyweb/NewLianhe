<template>
  <div class="make-appoint">
    <div class="base-form common-panel">
      <div class="panel-title">
         <h4><span class="iconfont icon-wenti"></span>问题：</h4>
      </div>
      <div class="textarea-wrap">
        <textarea v-model="problem" placeholder="请具体描述您需要咨询的问题"></textarea>
      </div>
    </div>
    <div class="common-panel appoint-cost-panel">
      <div class="panel-title">
         <h4><span class="iconfont icon-jine"></span>费用</h4>
      </div>
      <div class="panel-content">
        <p class="appoint-cost-tips">咨询以节为收费单元，每节30分钟。在第一次使用时，建议先选择一节，以后再按需购买，咨询费按实际使用节数结算，未使用的节数原路返回。</p>
        <div class="appint-class-input">
           <span class="iconfont icon-jianshao1" @click="()=>{ this.classNum>1 && this.classNum--}"></span>
           <input type="text" v-model="classNum">
           <span class="iconfont icon-zengjia1" @click="()=>{ this.classNum++}"></span>
        </div>
      </div>
    </div>
    <div class="common-panel estimate-cost-panel">
      <div class="estimate-cost">
         <span class="text">预计费用</span>
         <span class="amount">{{classNum*perClassCost}}<i>元</i></span>
         <span class="appoint-class">{{classNum}}节（共{{classNum*perClassTime}}分钟）</span>
      </div>
    </div>
    <p class="agree-clause">
      <span class="iconfont icon-queding" :class="{'disabled':!agreecClause}" @click="toggleClause"></span>
      我已阅读并同意服务条款
    </p>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="submitAppiont">提交</p>
    </div>
  </div>
</template>

<script>
import T from "../tool/tool";
import api from "../ajax/index";
export default {
  name: "MakeAppoint",
  components: {},
  data() {
    return {
      problem: "",
      classNum: 1,
      perClassTime: 30,
      perClassCost: 0,
      agreecClause: true
    };
  },
  methods: {
    changeExperience(num) {},
    submitAppiont() {
      if (!this.agreecClause) {
        T.showToast({ text: "您未同意服务条款" });
        return;
      }
      api
        .CreateOrder({
          serverExpertId: this.$route.query.expertId,
          questionRemark: this.problem,
          quantity: this.classNum,
          totalDuration: this.classNum * 30
        })
        .then(res => {
          T.showToast({ text: "提交成功，请等待专家确认~" });

          setTimeout(() => {
            this.$router.push("/order/detail/" + res.data.result);
          }, 1000);
        });
    },
    toggleClause() {
      this.agreecClause = !this.agreecClause;
    }
  },
  mounted() {
    document.title = "发起咨询";
    api.GetExpertPrice(this.$route.query.expertId).then(res => {
      this.perClassCost = res.data.result.price;
    });
  }
};
</script>
<style scoped>
.make-appoint {
  margin-top: 0px;
}

.base-form {
  margin-top: 20px;
  padding: 15px;
}
.base-form.common-panel .panel-title {
  padding-bottom: 0px;
  border-bottom: none;
}
.textarea-wrap {
  padding-top: 15px;
}
.textarea-wrap textarea {
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
}
.common-panel.appoint-cost-panel {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 20px;
}
.common-panel.estimate-cost-panel {
  border-top: none;
}
.panel-content {
  padding-top: 15px;
}
.panel-content .appoint-cost-tips {
  font-size: 14px;
  padding: 0 5px;
  margin-bottom: 15px;
}
.panel-content .appint-class-input {
  display: flex;
  justify-content: center;
}
.panel-content .appint-class-input span {
  width: 40px;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  color: #55cbc4;
}
.panel-content .appint-class-input input {
  width: 60px;
  line-height: 40px;
  font-size: 20px;
  border: none;
  margin: 0 20px;
  text-align: center;
}
.estimate-cost {
  padding-top: 15px;
  padding-left: 10px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.estimate-cost .text {
  font-size: 12px;
  padding: 4px 8px;
  background-color: #e9ae6a;
  color: #fff;
  position: relative;
}
.estimate-cost .text::before,
.estimate-cost .text::after {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
}
.estimate-cost .text::before {
  left: -4px;
}
.estimate-cost .text::after {
  right: -4px;
}
.estimate-cost .amount {
  font-weight: bold;
  font-size: 20px;
  color: #f4992e;
}
.estimate-cost .amount i {
  font-size: 14px;
}
.estimate-cost .appoint-class {
  font-size: 15px;
  color: #666;
}
.agree-clause {
  font-size: 14px;
  padding: 0 18px;
}
.agree-clause .iconfont {
  color: #55cbc4;
  margin-right: 5px;
}
.agree-clause .iconfont.disabled {
  color: #ccc;
}
.btn-wrapper {
  padding: 15px;
}
</style>