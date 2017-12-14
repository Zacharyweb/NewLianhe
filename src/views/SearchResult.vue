<template>
  <div>
    <search-bar :keyword.sync="keyword" :auto-focus="true"></search-bar>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="0" :top="62">
        <div class="expert-block" v-if="keyword && !isAjaxing">
         <h4>搜索结果</h4>
          <ul class="expert-list">
            <li v-for="(item,index) in results" v-bind:key="index" class="expert-item" @click="toExpertDetail(item.id)">
               <img class="expert-avatar" src="../../static/timg.jpeg">
               <div class="expert-info">
                 <p class="expert-msg text-ellipsis">
                   <b class="expert-name">{{item.name}}</b>
                   <span :class="{'status-online':item.onlineStatus == 2, 'status-outline':item.onlineStatus == 1}">{{item.onlineStatus | onlinestatus}}</span>
                 </p>
                 <p class="expert-tags text-ellipsis">
                  {{item.post}}
                 </p>
                 <p class="expert-topic text-ellipsis">
                  {{item.speciality}}
                 </p>
               </div>
            </li>
            <li>
              <no-data-tips v-if="results.length == 0 && !isAjaxing && keyword" tips="没有相关结果哦"></no-data-tips>
            </li>
          </ul>
         </div>
         <p class="search-tips" v-if="!keyword">请输入搜索关键词进行搜索~</p>
    </v-scroll>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import Scroll from "../components/Scroll.vue";

import NoDataTips from "../components/NoDataTips.vue";

import T from "../tool/tool";
import api from "../ajax/index";

let timer = null;
export default {
  name: "Home",
  components: {
    "search-bar": SearchBar,
    "v-scroll": Scroll,
    "no-data-tips":NoDataTips 
  },
  data() {
    return {
      arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      results: [],
      keyword: "",
      isAjaxing:false
    };
  },
  watch: {
    keyword: function(newKeyword) {
      let keyword = newKeyword;
      timer && clearTimeout(timer);
      if (!keyword) {
        this.results = [];
        T.hideLoading();
        return;
      };
      T.showLoading();
      this.isAjaxing = true;
      timer = setTimeout(() => {
        api.GetExperts({ keyword: keyword }).then(res => {
          this.results = res.data.result;
          this.isAjaxing = false;
          T.hideLoading();
        });
      }, 500);
    }
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    onInfinite(done) {
      setTimeout(() => {
        if (this.arr.length < 40) {
          this.arr = this.arr.concat([1, 1, 1, 1, 1, 1]);
          done();
        } else {
          done("nomore");
        }
      }, 1000);
    },
    toExpertDetail(id) {
      this.$router.push("expert/" + id);
    }
  },
  mounted() {
    T.checkFirstPageData(this.arr);
  }
};
</script>
<style scoped>
/*   .expert-block .expert-item{
      border-top: none;
    }
    .expert-block .expert-item+.expert-item{
      border-top: 1px solid #e6e6e6;
    } */
    .search-tips{
      padding-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #aaa;
    }
</style>