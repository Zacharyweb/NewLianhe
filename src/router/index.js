import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo'

//首页
import Home from '@/views/Home'
//搜索页
import SearchResult from '@/views/SearchResult'
//分类页
import Category from '@/views/Category'
//专家详情页
import ExpertDetail from '@/views/ExpertDetail'
//注册页
import SignIn from '@/views/SignIn'

//咨询页
import Consultation from '@/views/Consultation'
import ExpertConsult from '@/views/Consultation/ExpertConsult' 
import CustomerConsult from '@/views/Consultation/CustomerConsult' 
//咨询详情页
import ConsultDetail from '@/views/ConsultDetail'



//用户评价页
import Comment from '@/views/Comment'
//评价详情页
import CommentDetail from '@/views/CommentDetail'


// 发起咨询
import MakeAppoint from '@/views/MakeAppoint'
import MakeAppointStep1 from '@/views/MakeAppointStep/step1'
import MakeAppointStep2 from '@/views/MakeAppointStep/step2'
import MakeAppointStep3 from '@/views/MakeAppointStep/step3'
import MakeAppointStep4 from '@/views/MakeAppointStep/step4'


//我的
import Mine from '@/views/Mine'
//我的关系
import Relation from '@/views/MyRelation'
// 我的资料
import MyInfo from '@/views/MyInfo'
// 升级成为专家
import Upgrade from '@/views/Upgrade'
import UpgradeStep1 from '@/views/Upgrade/step1'
import UpgradeStep2 from '@/views/Upgrade/step2'
import UpgradeStep3 from '@/views/Upgrade/step3'
// 专家资料
import ExpertInfo from '@/views/ExpertInfo'

Vue.use(Router)

export default new Router({
  routes: [
    // 测试页
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    // 首页
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    // 搜索页
    {
      path: '/search',
      name: 'Search',
      component: SearchResult
    },

    //分类页
    {
      path: '/cate',
      name: 'Category',
      component: Category
    },

    // 专家详情
    {
      path: '/expert/:expertId',
      name: 'ExpertDetail',
      component: ExpertDetail
    },

    //发起咨询
    {
      path: '/appoint',
      component: MakeAppoint,
      children:[
        { path: '/',name: 'MakeAppointStep1',component: MakeAppointStep1},
        { path: 'step2',name: 'MakeAppointStep2',component: MakeAppointStep2},
        { path: 'step3',name: 'MakeAppointStep3',component: MakeAppointStep3},
        { path: 'step4',name: 'MakeAppointStep4',component: MakeAppointStep4},
      ]
    },
    // 注册
    {
      path: '/sign',
      name: 'Sign',
      component: SignIn
    },

    //咨询
    {
      path: '/consult',
      component: Consultation,
      children:[
        { path: '/',name: 'ExpertConsult',component: ExpertConsult},
        { path: 'customer',name: 'CustomerConsult',component: CustomerConsult},
      ]
    },

    // 咨询详情
    {
      path: '/consult/detail/:id/:type',
      name: 'ConsultDetail',
      component: ConsultDetail
    },

    // 用户评价
    {
      path: '/comment/:id',
      name: 'Comment',
      component: Comment
    },

    //评价详情页
    {
      path: '/comment/detail/:id',
      name: 'CommentDetail',
      component: CommentDetail
    },



    //我的
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    //我的关系
    {
      path: '/relation',
      name: 'Relation',
      component: Relation
    },

    // 我的资料
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: MyInfo
    },
    //成为专家
    {
      path: '/upgrade',
      component: Upgrade,
      children:[
        { path: '/',name: 'UpgradeStep1',component: UpgradeStep1},
        { path: 'step2',name: 'UpgradeStep2',component: UpgradeStep2},
        { path: 'step3',name: 'UpgradeStep3',component: UpgradeStep3}
      ]
    },
    // 专家资料
    {
      path: '/einfo',
      name: 'ExpertInfo',
      component: ExpertInfo
    }  
  ]
})
