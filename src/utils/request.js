import axios from 'axios'
// import qs from 'qs'
import PouchDB from 'pouchdb'
import { message } from 'ant-design-vue'
// import store from '../store'
import route from '../router/lazy'
import jwt_decode from 'jwt-decode'

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

//POST传参序列化
axios.interceptors.request.use(function (config) {
    // console.log(store.state.account.user.exp < Math.round(new Date().getTime() / 1000));
    var db = new PouchDB('admindb')
    db.get('currUser').then(doc => {
        var user = jwt_decode(doc.user.accessToken);
        if (user.exp > Math.round(new Date().getTime() / 1000))
            config.headers.common['Authorization'] = doc.user.tokenType + ' ' + doc.user.accessToken;
        else
            route.push('/login');
    }).catch(err=>err);

    return config;
}, function (error) {
    message.error('参数配置错误');

    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(function (res) {

    var result = res.data;
    // if (res.status != 200) {
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
            msg = "身份凭证已过期，请重新登录"
            break;
        case 500:
            msg = "内部服务出错";
            break;
        case 404:
            msg = "请求的链接不存在";
            break;
    }
    message.error(msg).then(() => {
        if (error.response.status == 401) {
            route.push('/login');
        }
    });
}

export default function (config) {
    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (response) {
                resolve(response);
            }, function (err) {
                reject(err);
            })
            .catch(function (error) {
                reject(error)
            })
    });
}