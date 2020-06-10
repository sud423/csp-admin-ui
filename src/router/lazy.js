import Vue from 'vue'
import Router from 'vue-router'


import dashboard from '../views/dashboard'
import Login from '../views/login'
import layout from '../views/shared/layout'
import pageview from '../views/shared/pageview'

import store from "../store"

Vue.use(Router)

//在路由跳转的时候同一个路由多次添加是不被允许的
//重写路由的push方法
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

function guard(to, from, next) {

  var user = store.state.account.user;
  if (user && user.exp > 0 && user.exp > Math.round(new Date().getTime() / 1000))
    next();
  else {
    store.commit("account/removeuser");
    next('/login');
  }
}

export default new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    invisible: true
  }, {
    path: '/',
    name: 'index',
    meta: { label: '首页' },
    beforeEnter: guard,
    component: layout,
    redirect: '/dashboard',
    icon: 'none',
    invisible: true,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { label: 'Dashboard' },
        component: dashboard,
        icon: 'dashboard'
      },
      {
        path: '/training',
        name: 'training',
        meta: { label: '企业培训' },
        component: pageview,
        icon: 'form',
        children: [
          {
            path: '/training/project',
            name: 'training-project',
            meta: { label: '项目管理' },
            component: () => import('@/views/training/project'),
            icon: 'none'
          },
          {
            path: '/training/cla',
            name: 'training-cla',
            meta: { label: '班级管理' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/training/cous',
            name: 'training-cous',
            meta: { label: '课程查询' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/training/tea',
            name: 'training-tea',
            meta: { label: '师资查询' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/training/alu',
            name: 'training-alu',
            meta: { label: '校友查询' },
            component: () => import('@/views/blank'),
            icon: 'none'
          }
        ]
      },
      {
        path: '/basic',
        name: 'basic',
        meta: { label: '基础教育' },
        component: pageview,
        icon: 'form',
        children: [
          {
            path: '/basic/project',
            name: 'basic-project',
            meta: { label: '项目管理' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/basic/cla',
            name: 'basic-cla',
            meta: { label: '班级管理' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/basic/cous',
            name: 'basic-cous',
            meta: { label: '课程查询' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/basic/tea',
            name: 'basic-tea',
            meta: { label: '师资查询' },
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/basic/alu',
            name: 'basic-alu',
            meta: { label: '校友查询' },
            component: () => import('@/views/blank'),
            icon: 'none'
          }
        ]
      }
      // {
      //   path: '/list',
      //   name: '列表页',
      //   component: PageView,
      //   icon: 'table',
      //   children: [
      //     {
      //       path: '/list/query',
      //       name: '查询表格',
      //       component: QueryList,
      //       icon: 'none'
      //     },
      //     {
      //       path: '/list/primary',
      //       name: '标准列表',
      //       component: StandardList,
      //       icon: 'none'
      //     },
      //     {
      //       path: '/list/card',
      //       name: '卡片列表',
      //       component: CardList,
      //       icon: 'none'
      //     },
      //     {
      //       path: '/list/search',
      //       name: '搜索列表',
      //       component: SearchLayout,
      //       icon: 'none',
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: '文章',
      //           component: ArticleList,
      //           icon: 'none'
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: '应用',
      //           component: ApplicationList,
      //           icon: 'none'
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: '项目',
      //           component: ProjectList,
      //           icon: 'none'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: '/detail',
      //   name: '详情页',
      //   icon: 'profile',
      //   component: RouteView,
      //   children: [
      //     {
      //       path: '/detail/basic',
      //       name: '基础详情页',
      //       icon: 'none',
      //       component: BasicDetail
      //     },
      //     {
      //       path: '/detail/advanced',
      //       name: '高级详情页',
      //       icon: 'none',
      //       component: AdvancedDetail
      //     }
      //   ]
      // },
      // {
      //   path: '/result',
      //   name: '结果页',
      //   icon: 'check-circle-o',
      //   component: PageView,
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: '成功',
      //       icon: 'none',
      //       component: Success
      //     },
      //     {
      //       path: '/result/error',
      //       name: '失败',
      //       icon: 'none',
      //       component: Error
      //     }
      //   ]
      // },
      // {
      //   path: '/exception',
      //   name: '异常页',
      //   icon: 'warning',
      //   component: RouteView,
      //   children: [
      //     {
      //       path: '/exception/404',
      //       name: '404',
      //       icon: 'none',
      //       component: NotFound
      //     },
      //     {
      //       path: '/exception/403',
      //       name: '403',
      //       icon: 'none',
      //       component: NotPermit
      //     },
      //     {
      //       path: '/exception/500',
      //       name: '500',
      //       icon: 'none',
      //       component: ServerError
      //     }
      //   ]
      // }
    ]
  }
  ]
})
