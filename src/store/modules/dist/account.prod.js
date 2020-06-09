"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _jwtDecode=_interopRequireDefault(require("jwt-decode")),_qs=_interopRequireDefault(require("qs"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default={namespaced:!0,state:{user:_qs.default.parse(sessionStorage.getItem("currUser")),token:_qs.default.parse(sessionStorage.getItem("currToken"))},mutations:{setuser:function(e,t){var s=(0,_jwtDecode.default)(t.accessToken),r={id:s["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],tid:s["http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid"],nick:s["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],headImg:s.HeadImgUrl,exp:s.exp};e.user=r,e.token=t,sessionStorage.setItem("currUser",_qs.default.stringify(r)),sessionStorage.setItem("currToken",_qs.default.stringify(t))},removeuser:function(e){e.user={},e.token={},sessionStorage.removeItem("currUser"),sessionStorage.removeItem("currToken")}}};exports.default=_default;