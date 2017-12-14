import Vue from 'vue'
import Router from 'vue-router'
import T from '@/tool/tool.js'

//测试页
import Demo from '@/views/Demo'
import ChooseIdentity from '@/views/ChooseIdentity'

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

//订单详情页
import OrderDetail from '@/views/OrderDetail'
//咨询室
import ChatRoom from '@/views/ChatRoom'


//用户评价页
import Comment from '@/views/Comment'
//评价详情页
import CommentDetail from '@/views/CommentDetail'


// 发起咨询
import MakeAppoint from '@/views/MakeAppoint'
// import MakeAppointStep1 from '@/views/MakeAppointStep/step1'
// import MakeAppointStep2 from '@/views/MakeAppointStep/step2'


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

const router = new Router({
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: [
    // 测试页
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/identity',
      name: 'ChooseIdentity',
      meta: {
        title: '选择身份'
      },
      component: ChooseIdentity
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
      name: 'MakeAppoint',
      meta: {
        requiresAuth: true
      },
      component: MakeAppoint,
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
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '/',
          name: 'CustomerConsult',
          component: CustomerConsult,
        },
        {
          path: 'expert',
          name: 'ExpertConsult',
          component: ExpertConsult
        },
      ]
    },

    // 订单详情
    {
      path: '/order/detail/:orderId/:isCustomer?',
      name: 'OrderDetail',
      meta: {
        requiresAuth: true
      },
      component: OrderDetail
    },

    //咨询室
    {
      path: '/chat/:id',
      name: 'ChatRoom',
      meta: {
        requiresAuth: true
      },
      component: ChatRoom
    },


    // 用户评价
    {
      path: '/comment/:id',
      name: 'Comment',
      meta: {
        requiresAuth: true
      },
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
      meta: {
        requiresAuth: true
      },
      component: Relation
    },

    // 我的资料
    {
      path: '/myinfo',
      name: 'MyInfo',
      meta: {
        requiresAuth: true
      },
      component: MyInfo
    },
    //成为专家
    {
      path: '/upgrade',
      component: Upgrade,
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '/',
          name: 'UpgradeStep1',
          component: UpgradeStep1
        },
        {
          path: 'step2',
          name: 'UpgradeStep2',
          component: UpgradeStep2
        },
        {
          path: 'step3',
          name: 'UpgradeStep3',
          component: UpgradeStep3
        }
      ]
    },
    // 专家资料
    {
      path: '/einfo',
      name: 'ExpertInfo',
      meta: {
        requiresAuth: true
      },
      component: ExpertInfo
    }
  ]
});
router.beforeEach((to, from, next) => {
  T.hideLoading();
  if (!router.app.$store) {
    next();
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!router.app.$store.state.accessToken) {
      next({
        path: '/sign',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});
export default router;
