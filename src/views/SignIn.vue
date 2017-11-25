<template>
  <div>
    <div class="signin-form common-panel">
      <p class="signin-form-item">
          <span class="iconfont icon-p-shouji"></span>
          <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="tel">
          <span class="get-code-btn" @click="getCode" v-if="!hasGetCode">发送验证码</span>
          <span class="has-get-code" v-if="hasGetCode">剩余{{countTimeNum}}秒</span>
      </p>
      <p class="signin-form-item">
          <span class="iconfont icon-yanzhengma"></span>
          <input type="tel" maxlength="4" placeholder="请输入短信验证码" v-model="code">
      </p>
    <div class="btn-wrapper">
      <p class="btn btn-green btn-large" @click="signIn">立即注册</p>
    </div>

    </div>

    <!-- <bottom-nav></bottom-nav> -->
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import BottomNav from "../components/BottomNav.vue";
import { mapActions } from "vuex";
export default {
  name: "SignIn",
  components: {
    "bottom-nav": BottomNav,
    "header-nav": HeaderNav
  },
  data() {
    return {
      tel: "",
      code: "",
      hasGetCode: false,
      countTimer: null,
      countTimeNum: 59
    };
  },
  methods: {
    getCode() {
      this.hasGetCode = true;
      this.countGetCodeTime();
    },
    countGetCodeTime() {
      this.countTimer = setInterval(() => {
        this.countTimeNum--;
        if (this.countTimeNum == 0) {
          clearInterval(this.countTimer);
          this.hasGetCode = false;
          this.countTimeNum = 59;
        }
      }, 1000);
    },
    signIn() {
      let tel = this.tel;
      let code = this.code;
      this.$store
        .dispatch("login", { phone: tel, phoneCode: code })
        .then(user => {
          var url = this.$route.query.redirect || "/";
          this.$router.push(url);
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.signin-form {
  margin-top: 100px;
  padding: 15px;
}
.signin-form .signin-form-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 5px;
  font-size: 20px;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}
.signin-form .signin-form-item input {
  flex: 1;
  padding-left: 20px;
  border: none;
  background-color: #fff;
  font-size: 14px;
}
.signin-form .signin-form-item .iconfont {
  color: #888;
  font-size: 22px;
}
.signin-form .signin-form-item .get-code-btn,
.signin-form .signin-form-item .has-get-code {
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  padding-left: 10px;
  border-left: 1px solid #e6e6e6;
}
.signin-form .signin-form-item .get-code-btn {
  color: #55cbc4;
}
.signin-form .signin-form-item .has-get-code {
  color: #888;
}
.btn-wrapper {
  padding-top: 20px;
}
</style>