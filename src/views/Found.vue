<template>
  <div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :bottom="60" :top="0">
       <h2 v-for="item in arr">Essential Links</h2>
       <router-link to="/header">Go to Header</router-link>
       <router-link to="/footer">Go to Foter</router-link>
    </v-scroll>
    <bottom-nav :nav-index="1"></bottom-nav>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import BottomNav from '../components/BottomNav.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'Mine',
  components:{
    'bottom-nav': BottomNav,
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
      arr:[1,1,1,1,1,1,1,1,1,1,1,1]
    }
  },
  methods:{
    onRefresh(done){
      console.log('ggggggg');
      setTimeout(()=>{
        done();
      },1000)
    },
    onInfinite(done){
      setTimeout(()=>{
        if(this.arr.length < 40){
          this.arr = this.arr.concat([1,1,1,1,1,1]);
          done();
        }
        else{
          done('nomore');
        }
      },1000)
    },
  
  },
  mounted(){
      T.checkFirstPageData(this.arr);
  }
}
</script>
<style scoped>
h2{
  height: 60px;
}
</style>
