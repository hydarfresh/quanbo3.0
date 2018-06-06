import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    name: 'dashboard',
    redirect: '/dashboard',
    meta: { title: '数据', icon: 'tree' },
    children: [{
      path: 'dashboard',
      meta: { title: '数据', icon: 'tree' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '',
    component: Layout,
    name: 'adminlist',
    redirct: 'adminlist',
    meta: { title: '管理员列表', icon: 'tree' },
    children: [{
      path: 'adminlist',
      meta: { title: '管理员列表', icon: 'tree' },
      component: () => import('@/views/adminlist/index')
    }]
  },
  {
    path: '',
    component: Layout,
    name: 'ads',
    redirct: 'ads',
    meta: { title: '广告管理', icon: 'tree' },
    children: [{
      path: 'banner',
      meta: { title: 'banner管理', icon: 'tree' },
      component: () => import('@/views/ads/banner')
    },
    {
      path: 'kaiping',
      meta: { title: '开屏广告管理', icon: 'tree' },
      component: () => import('@/views/ads/kaiping')
    }]
  },
  {
    path: '',
    component: Layout,
    name: 'act',
    redirct: 'act',
    meta: { title: '数据', icon: 'tree' },
    children: [{
      path: 'act',
      meta: { title: '活动管理', icon: 'tree' },
      component: () => import('@/views/act/index')
    }]
  },
  {
    path: '',
    component: Layout,
    name: 'msg',
    redirect: 'msg',
    meta: { title: '数据', icon: 'tree' },
    children: [{
      path: 'msg',
      meta: { title: '消息管理', icon: 'tree' },
      component: () => import('@/views/msg/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    redirect: '/user',
    meta: { title: '用户管理', icon: 'tree' },
    children: [{
      path: 'msg',
      meta: { title: '用户消息', icon: 'tree' },
      component: () => import('@/views/user/msg')
    },
    {
      path: 'sug',
      meta: { title: '意见反馈', icon: 'tree' },
      component: () => import('@/views/user/sug')
    }]
  },
  {
    path: '',
    component: Layout,
    name: 'version',
    redirect: 'version',
    meta: { title: '数据', icon: 'tree' },
    children: [{
      path: 'version',
      meta: { title: '版本管理', icon: 'tree' },
      component: () => import('@/views/version/index')
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

