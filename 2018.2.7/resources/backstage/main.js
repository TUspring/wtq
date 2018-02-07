import Vue from 'vue'
import router from './config/routes' //vue路由配置

import axios from './http' //axios http请求配置
Vue.prototype.$http = axios;

import store from './store/' //vuex配置
import util from'./js/util' //公共方法
Vue.prototype.util=util;

import filters from'./config/filters' //过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import components from './publicComponents/' //加载公共组件
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase())  //组件首字母大写 v-Xxxxx
    Vue.component(`v${name}`, components[key])
})
import './css/common.css' //公共css
import './less/common.less'

// import './css/font_zhonghui.css' //中汇字体图标'

import iview from 'iview';
import './less/iview.less'; //iview自定义过的主题样式
Vue.use(iview);

import validate,{ config } from './config/vee-validate';//表单验证插件配置
Vue.use(validate,config);
new Vue({
    el: '#app',
    axios,
    router,
    store
}).$mount('#app');
