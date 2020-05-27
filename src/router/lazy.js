import Vue from 'vue'
import Router from 'vue-router'
import PouchDB from 'pouchdb'

import dashboard from '../views/dashboard'
import Login from '../views/login'
import layout from '../views/shared/layout'

Vue.use(Router)

function guard(to, from, next) {

  var db = new PouchDB('admindb')
  db.get('currUser').catch(e => {
    if (e.status == 404 && to.path != '/login') {
      next('/login');
    }
  });
  // next();
}

export default new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/login',
    name: '登录页',
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
      // {
      //   path: '/form',
      //   name: '表单页',
      //   component: PageView,
      //   icon: 'form',
      //   children: [
      //     {
      //       path: '/form/basic',
      //       name: '基础表单',
      //       component: BasicForm,
      //       icon: 'none'
      //     },
      //     {
      //       path: '/form/step',
      //       name: '分步表单',
      //       component: StepForm,
      //       icon: 'none'
      //     },
      //     {
      //       path: '/form/advanced',
      //       name: '高级表单',
      //       component: AdvancedForm,
      //       icon: 'none'
      //     }
      //   ]
      // },
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
