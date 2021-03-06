import Vue from 'vue'
import App from './App.vue'
import router from './router/lazy'
import 'ant-design-vue/dist/antd.css'
import './assets/style.less'
import Antd from 'ant-design-vue'
// import Viser from 'viser-vue'
// import axios from 'axios'
// import '@/mock'
import store from './store'
// import PouchDB from 'pouchdb'

import request from './utils/request'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$axios = request


// router.beforeEach((to, from, next) => {
//   // console.log(store.state.token);

//   var db = new PouchDB('admindb')
//   db.get('currUser').catch(e => {
//     if (e.status == 404 && to.path != '/login') {
//       next('/login');
//     }
//   });



//   // if (!db.get('currUser')) {
//   //   next('/login');
//   // }
//   // else
//   // next();

// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
