"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _dashboard = _interopRequireDefault(require("../views/dashboard"));

var _login = _interopRequireDefault(require("../views/login"));

var _layout = _interopRequireDefault(require("../views/shared/layout"));

var _pageview = _interopRequireDefault(require("../views/shared/pageview"));

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]); //在路由跳转的时候同一个路由多次添加是不被允许的
//重写路由的push方法


var VueRouterPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(to) {
  return VueRouterPush.call(this, to)["catch"](function (err) {
    return err;
  });
};

function guard(to, from, next) {
  var user = _store["default"].state.account.user;
  if (user && user.exp > 0 && user.exp > Math.round(new Date().getTime() / 1000)) next();else next('/login');
}

var _default = new _vueRouter["default"]({
  linkActiveClass: 'active',
  routes: [{
    path: '/login',
    name: 'login',
    component: _login["default"],
    invisible: true
  }, {
    path: '/',
    name: 'index',
    meta: {
      label: '首页'
    },
    beforeEnter: guard,
    component: _layout["default"],
    redirect: '/dashboard',
    icon: 'none',
    invisible: true,
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        label: 'Dashboard'
      },
      component: _dashboard["default"],
      icon: 'dashboard'
    }, {
      path: '/training',
      name: 'training',
      meta: {
        label: '企业培训'
      },
      component: _pageview["default"],
      icon: 'form',
      children: [{
        path: '/training/project',
        name: 'training-project',
        meta: {
          label: '项目管理'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/training/project'));
          });
        },
        icon: 'none'
      }, {
        path: '/training/cla',
        name: 'training-cla',
        meta: {
          label: '班级管理'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/training/cous',
        name: 'training-cous',
        meta: {
          label: '课程查询'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/training/tea',
        name: 'training-tea',
        meta: {
          label: '师资查询'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/training/alu',
        name: 'training-alu',
        meta: {
          label: '校友查询'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }]
    }, {
      path: '/basic',
      name: 'basic',
      meta: {
        label: '基础教育'
      },
      component: _pageview["default"],
      icon: 'form',
      children: [{
        path: '/basic/project',
        name: 'basic-project',
        meta: {
          label: '项目管理'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/basic/cla',
        name: 'basic-cla',
        meta: {
          label: '班级管理'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/basic/cous',
        name: 'basic-cous',
        meta: {
          label: '课程查询'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/basic/tea',
        name: 'basic-tea',
        meta: {
          label: '师资查询'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }, {
        path: '/basic/alu',
        name: 'basic-alu',
        meta: {
          label: '校友查询'
        },
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/blank'));
          });
        },
        icon: 'none'
      }]
    } // {
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
  }]
});

exports["default"] = _default;