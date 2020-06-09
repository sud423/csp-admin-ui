import axios from 'axios'

import { message, Modal } from 'ant-design-vue'
import store from '../store'
import route from '../router/lazy'

// axios 配置
axios.defaults.timeout = 30000;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

//POST传参序列化
axios.interceptors.request.use(function (config) {

    var user = store.state.account.user;
    var token = store.state.account.token;
console.log(user);
console.log(token);
    if (user && token && token.accessToken) {

        if (user.exp > Math.round(new Date().getTime() / 1000))
            config.headers.Authorization = token.tokenType + ' ' + token.accessToken;
        else {
            Modal.warning({
                title: '身份凭证无效',
                content: '您的身份凭证已失效，请重新登录获取凭证。',
                okText: '确定',
                onOk() {
                    store.commit("account/removeuser");
                    route.push('/login');
                }
            });

            return Promise.reject();
            // store.commit("account/removeuser");
            // route.push('/login');
        }
    }
    return config;
}, function (error) {
    message.error('参数配置错误');

    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(function (res) {

    var result = res.data;
    return result;

}, function (error) {

    if (error)
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
            msg = "您的凭证无效，无法请求资源"
            break;
        case 500:
            msg = "内部服务出错";
            break;
        case 404:
            msg = "请求的链接不存在";
            break;
    }
    message.error(msg);
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