import axios from 'axios'
// import qs from 'qs'
import PouchDB from 'pouchdb'
import { message } from 'ant-design-vue'

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

//POST传参序列化
axios.interceptors.request.use(function (config) {

    var db = new PouchDB('admindb')
    db.get('currUser').then(doc => {
        config.headers.common['Authorization'] = 'bear ' + doc.token;
    }).catch(e => {
        if (e.status == 404) {
            console.log(e);
        }
    });

    return config;
}, function (error) {
    message.error('参数配置错误');
    
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(function (res) {

    var result = res.data;

    if(res.code!=200 || !result.succ){
        message.error(result.msg);
        return Promise.reject(res);
    }

    return result;

}, function (error) {
    
    var msg = "网络异常";
    switch (error.response && error.response.status) {
        case 400:
            msg = error.response.data.error_description;
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
    message.error(msg);
    return Promise.reject(error);
});

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