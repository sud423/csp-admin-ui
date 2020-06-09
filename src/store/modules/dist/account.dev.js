"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  namespaced: true,
  state: {
    user: _qs["default"].parse(sessionStorage.getItem("currUser")),
    token: _qs["default"].parse(sessionStorage.getItem("currToken"))
  },
  mutations: {
    setuser: function setuser(state, token) {
      var jwt = (0, _jwtDecode["default"])(token.accessToken);
      var user = {
        id: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
        tid: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'],
        nick: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        headImg: jwt.HeadImgUrl,
        exp: jwt.exp
      };
      state.user = user;
      state.token = token;
      sessionStorage.setItem('currUser', _qs["default"].stringify(user));
      sessionStorage.setItem('currToken', _qs["default"].stringify(token));
    },
    removeuser: function removeuser(state) {
      state.user = {};
      state.token = {};
      sessionStorage.removeItem("currUser");
      sessionStorage.removeItem('currToken');
    }
  }
};
exports["default"] = _default;