<template>
  <div>
    <div class="check-page">
       <div class="checking-tips">
         <p>恭喜您成为专家~ </p>
       </div>
      <div class="btn-wrapper">
          <p class="btn btn-green btn-large" @click="toHome">开始营业</p>
      </div>
    </div>
  </div>
</template>

<script>
import T from "../../tool/tool";
export default {
  name: "Check",
  components: {},
  data() {
    return {
      checkStatus: 0
    };
  },
  methods: {
    toHome() {
      T.postCurrentStep({ num: 4 });
      setTimeout(() => {
        this.$router.push("/expert/1");
      }, 500);
    }
  },
  mounted() {
    T.postCurrentStep({ num: 3 });
  }
};
</script>
<style scoped>
.check-page {
  margin-top: 80px;
}
.check-page .checking-tips {
  box-sizing: border-box;
  width: 90%;
  margin-left: 5%;
  background-color: #fff;
  padding: 15px 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  border-radius: 4px;
}
.btn-wrapper {
  padding: 30px 5%;
}
</style>