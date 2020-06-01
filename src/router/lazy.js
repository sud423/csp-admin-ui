import Vue from 'vue'
import Router from 'vue-router'
import PouchDB from 'pouchdb'

import dashboard from '../views/dashboard'
import Login from '../views/login'
import layout from '../views/shared/layout'
import pageview from '../views/shared/pageview'

import store from "../store"
import jwt_decode from 'jwt-decode'

Vue.use(Router)

//在路由跳转的时候同一个路由多次添加是不被允许的
//重写路由的push方法
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }


function guard(to, from, next) {

    //创建db对象
    var db = new PouchDB('admindb')

    //获取当前用户对象
    db.get('currUser').then(doc => {
      //修改当前用户，避免vuex刷新页面时当前用名为空
      store.commit('account/edituser', doc.user);
      redirectTo(doc.user, next);
    }).catch(e => {
      //如果当前用户不存在就跳转到登录页面
      if (e.status == 404) {
        next('/login');
      }
    });
  // next();
}

function redirectTo(user, next) {

  //解析token
  var jwt = jwt_decode(user.accessToken);

  //判断 token是否过期，过期就跳转到登录页面
  if (jwt.exp > Math.round(new Date().getTime() / 1000)) {
    next();
  }
  else
    next('/login');
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
    name: '首页',
    beforeEnter: guard,
    component: layout,
    redirect: '/dashboard',
    icon: 'none',
    invisible: true,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: dashboard,
        icon: 'dashboard',

      },
      {
        path: '/training',
        name: '企业培训',
        component: pageview,
        icon: 'form',
        children: [
          {
            path: '/training/project',
            name: '项目管理',
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/training/cla',
            name: '班级管理',
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/training/cous',
            name: '课程查询',
            component: () => import('@/views/blank'),
            icon: 'none'
          },
          {
            path: '/training/tea',
            name: '师资查询',
            component: () => import('@/views/blank'),
            icon: 'none'
          }
        ]
      },
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
