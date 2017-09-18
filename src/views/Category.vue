<template>
  <div>
    <tab-bar :tabBarArr="subCateArr" @change="tabBarChage"></tab-bar>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="0" :top="62">
        <div class="expert-block">
          <ul class="expert-list">
            <li class="expert-item" @click="toExpertDetail(1)">
              <img class="expert-avatar" src="../../static/timg.jpeg">
              <div class="expert-info">
                <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题话题</p>
                <p class="expert-msg text-ellipsis">
                   <b class="expert-name">威震天</b>&nbsp;&nbsp;幽谷数据有限公司&nbsp;&nbsp;著名导弹专家
                </p>
                <p class="personal-tag">
                  <span class="tag-item">风趣</span>
                  <span class="tag-item">幽默</span>
                  <span class="tag-item">专业知识牛</span>
                </p>
              </div>
            </li>
             <li class="expert-item" @click="toExpertDetail(1)">
              <img class="expert-avatar" src="../../static/timg.jpeg">
              <div class="expert-info">
                <p class="expert-topic text-ellipsis">制定的话题话题制定的话题话题制定的话题话题制定的话题话题制定的话题话题</p>
                <p class="expert-msg text-ellipsis">
                   <b class="expert-name">威震天</b>&nbsp;&nbsp;幽谷数据有限公司&nbsp;&nbsp;著名导弹专家
                </p>
                <p class="personal-tag">
                  <span class="tag-item">风趣</span>
                  <span class="tag-item">幽默</span>
                  <span class="tag-item">专业知识牛</span>
                </p>
              </div>
            </li>
          </ul>
         </div>
    </v-scroll>
  </div>
</template>

<script>
import TabBar  from '../components/TabBar.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Home',
  components:{
    'tab-bar':TabBar,
    'v-scroll': Scroll
  },
  data () {
    return {
      subCateArr:['二级分类1','二级分类2','二级分类3','二级分类4']
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    onInfinite(done){
      setTimeout(()=>{
        done('nomore');
      },1000)
    },
    tabBarChage(index){
       console.log(index);
    }
  },
  mounted(){
     T.checkFirstPageData(this.subCateArr);
      document.title = this.$route.query.name;
  }
}
</script>
<style scoped>
    .expert-block .expert-item{
      border-top: none;
    }
    .expert-block .expert-item+.expert-item{
      border-top: 1px solid #e6e6e6;
    }

</style>