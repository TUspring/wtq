import axios from 'axios'
import store from './store/'
import router from './config/routes'
import { USER_SIGNOUT } from 'store/user'
import util from'./js/util' //公共方法

var token=document.getElementById("csrf-token").getAttribute("content");
// axios 配置
axios.defaults.timeout = 30000;
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (token) {
            config.headers['X-CSRF-TOKEN'] = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    if(error.response.data.error=='Unauthenticated.'){
                        store.dispatch(USER_SIGNOUT);
                        router.replace({
                            path: '/index',
                            query: {redirect: router.currentRoute.fullPath}
                        })
                        const state = {
                            loginModal:{
                                show:true
                            }
                        }

                        store.dispatch('changeCompontentStates',state);
                    }
                    break;
                case 500:
                    var errorDate=error.response.data
                    if(util.getType(errorDate)=='string'&&(errorDate.indexOf('TokenMismatchException')>-1)){
                        window.location.reload()
                    }
                    break;

            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
