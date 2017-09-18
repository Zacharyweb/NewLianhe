import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo'
import Home from '@/views/Home'
import Found from '@/views/Found'
import Mine from '@/views/Mine'
import SearchResult from '@/views/SearchResult'
import SignIn from '@/views/SignIn'
import ExpertDetail from '@/views/ExpertDetail'
import TopicDetail from '@/views/TopicDetail'
import Appointment from '@/views/Appointment'
import Category from '@/views/Category'
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
    // 首页
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    //发现
    {
      path: '/found',
      name: 'Found',
      component: Found
    },
    //我的
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    // 注册
    {
      path: '/sign',
      name: 'Sign',
      component: SignIn
    },
    // 搜索页
    {
      path: '/search',
      name: 'Search',
      component: SearchResult
    },
    // 专家详情
    {
      path: '/expert/:expertId',
      name: 'ExpertDetail',
      component: ExpertDetail,
      children: [
        { path: 'bar', component: TopicDetail }
      ]
    },
    // 话题详情
    {
      path: '/expert/:expertId/topic/:topicId',
      name: 'TopicDetail',
      component: TopicDetail
    },
    // 预约页
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment
    },
    //分类页
    {
      path: '/cate',
      name: 'Category',
      component: Category
    },
   
  ]
})
