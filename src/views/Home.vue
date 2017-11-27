<template>
  <div>
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <v-scroll :on-refresh="onRefresh" :bottom="60" :top="60">
         <category-bar :tab-bar-arr='tabBarArr'></category-bar>
    <!--      <div class="recommend-expert">
           <h3 class="recommend-text">为您推荐</h3>
         </div> -->
         <div class="expert-block">
            <div v-for="c in experts" v-bind:key="c.id">
              <h4>{{c.name}}</h4>
              <ul class="expert-list">
               <li v-for="e in c.experts" v-bind:key="e.id" class="expert-item" @click="toExpertDetail(e.id)">
                 <img class="expert-avatar" src="../../static/timg.jpeg">
                 <div class="expert-info">
                   <p class="expert-msg text-ellipsis">
                     <b class="expert-name">{{e.name}}</b>
                     <span :class="{'status-online':e.onlineStatus == 2, 'status-outline':e.onlineStatus == 1}">{{e.onlineStatus == 1 ? "休息中":"营业中"}}</span>
                   </p>
                   <p class="expert-tags text-ellipsis">
                    {{e.post}}
                   </p>
                   <p class="expert-topic text-ellipsis">
                    {{e.speciality}}
                   </p>
                 </div>
               </li>
             </ul>
            </div>
         </div>
      </v-scroll>
    <bottom-nav :nav-index="0"></bottom-nav>  
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import SearchBar from "../components/SearchBar.vue";
import TabBar from "../components/TabBar.vue";
import CategoryBar from "../components/CategoryBar.vue";
import Scroll from "../components/Scroll.vue";
import BottomNav from "../components/BottomNav.vue";
import T from "../tool/tool";
import api from "../ajax/index";

export default {
  name: "Home",
  components: {
    "v-scroll": Scroll,
    "search-bar": SearchBar,
    "tab-bar": TabBar,
    "category-bar": CategoryBar,
    "bottom-nav": BottomNav,
    "header-nav": HeaderNav
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: [],
      experts: [],
      tabBarArr: [
        // {name:'法务',icon:{'icon-zanfuwutubiao06-copy':true},color:'#7ed321',type:1},
        // {name:'财务',icon:{'icon-caiwu1':true},color:'#f5a623',type:2},
        // {name:'工商',icon:{'icon-gongshang1':true},color:'#f56423',type:3},
        {
          name: "税务",
          icon: { "icon-shuiwu": true },
          color: "#f5be3f",
          type: 4
        },
        // {name:'海关',icon:{'icon-haiguan':true},color:'#51a1ff',type:5},
        // {name:'教育',icon:{'icon-shuben':true},color:'#f56423',type:6},
        {
          name: "更多分类",
          icon: { "icon-gengduo": true },
          color: "#e6e6e6",
          type: -1
        }
      ]
    };
  },
  methods: {
    onRefresh(done) {
      console.log("ggggggg");
      setTimeout(() => {
        done();
      }, 1000);
    },
    focusSearchBar(e) {
      e.preventDefault();
      this.$router.push("search");
    },
    toExpertDetail(id) {
      this.$router.push("expert/" + id);
    }
  },
  mounted() {
    document.title = "联合咨询";
    api.GetGroupedByClassExperts().then(res => {
      this.experts = res.data.result;
    });
  }
};
</script>
<style scoped>
.recommend-expert {
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 10px;
}
.recommend-expert h3 {
  font-size: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recommend-expert h3 span {
  height: 2px;
  flex: 1;
  background-color: #55cbc4;
}
</style>