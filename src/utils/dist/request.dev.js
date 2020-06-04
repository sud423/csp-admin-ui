"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

var _antDesignVue = require("ant-design-vue");

var _store = _interopRequireDefault(require("../store"));

var _lazy = _interopRequireDefault(require("../router/lazy"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import qs from 'qs'
// import PouchDB from 'pouchdb'
// axios 配置
_axios["default"].defaults.timeout = 30000; // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

_axios["default"].defaults.baseURL = process.env.VUE_APP_BASE_API_URL; //POST传参序列化

_axios["default"].interceptors.request.use(function (config) {
  // console.log(store.state.account.user.exp < Math.round(new Date().getTime() / 1000));
  // var db = new PouchDB('admindb')
  // db.get('currUser').then(doc => {
  //     console.log(doc);
  //     var user = jwt_decode(doc.user.accessToken);
  //     if (user.exp > Math.round(new Date().getTime() / 1000))
  //         axios.defaults.headers.Authorization = doc.user.tokenType + ' ' + doc.user.accessToken;
  //     else {
  //         store.commit("account/removeuser");
  //         route.push('/login');
  //     }
  // }).catch(err => { console.log(err) });
  var user = _store["default"].state.account.user;

  if (user && user.accessToken) {
    var jwt = (0, _jwtDecode["default"])(user.accessToken);
    if (user.accessToken && jwt.exp > Math.round(new Date().getTime() / 1000)) config.headers.Authorization = user.tokenType + ' ' + user.accessToken;else {
      _store["default"].commit("account/removeuser");

      _lazy["default"].push('/login');
    }
  }

  return config;
}, function (error) {
  _antDesignVue.message.error('参数配置错误');

  return Promise.reject(error);
}); //返回状态判断


_axios["default"].interceptors.response.use(function (res) {
  var result = res.data; // if (res.status != 200) {
  //     if (res.status == 400)
  //         message.error(result.msg);
  //     else
  //         print(res.status);
  //     return Promise.reject(res);
  // }

  return result;
}, function (error) {
  print(error);
  return Promise.reject(error);
});

function print(error) {
  var msg = error.response.statusText;

  switch (error.response.status) {
    case 400:
      var data = error.response.data;

      if (data && !data.succ) {
        msg = data.msg;
      }

      break;

    case 401:
      msg = "身份凭证已过期，请重新登录";
      break;

    case 500:
      msg = "内部服务出错";
      break;

    case 404:
      msg = "请求的链接不存在";
      break;
  }

  _antDesignVue.message.error(msg).then(function () {
    if (error.response.status == 401) {
      _store["default"].commit("account/removeuser");

      _lazy["default"].push('/login');
    }
  });
}

function _default(config) {
  return new Promise(function (resolve, reject) {
    (0, _axios["default"])(config).then(function (response) {
      resolve(response);
    }, function (err) {
      reject(err);
    })["catch"](function (error) {
      reject(error);
    });
  });
}