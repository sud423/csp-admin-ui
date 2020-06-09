import jwt_decode from 'jwt-decode'
import qs from 'qs'

export default {
  namespaced: true,
  state: {
    user: qs.parse(sessionStorage.getItem("currUser")),
    token: qs.parse(sessionStorage.getItem("currToken"))
  },
  mutations: {
    setuser(state, token) {
      var jwt = jwt_decode(token.accessToken);

      var user = {
        id: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
        tid: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'],
        nick: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        headImg: jwt.HeadImgUrl,
        exp: jwt.exp
      }
      state.user = user;
      state.token = token;
      sessionStorage.setItem('currUser', qs.stringify(user));
      sessionStorage.setItem('currToken', qs.stringify(token))
    },
    removeuser(state) {
      state.user = {};
      state.token = {};
      sessionStorage.removeItem("currUser");
      sessionStorage.removeItem('currToken');
    }

  }
}
