import App from '../app'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/'
import iView from 'iview';
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
Vue.use(VueRouter);
const registerMeta = {
    auth: false,
    header: {
        contentType: 'title',
        content: '欢迎注册',
        rightContentType: 'register'
    }
}
const routes = [
    {
        path: '/',
        component:App,
        children: [
            {
                path: '/home', //home
                component: resolve => require(['../pages/home'], resolve),
                children: [
                    {
                        path: '/index', //首页
                        component: resolve => require(['../pages/home/index/index.vue'], resolve)
                    },

                    //--------------用户管理----------------//
                    {
                        name:'userList',
                        path: '/userManage/userList', //用户列表
                        component: resolve => require(['../pages/home/userManage/userList/index.vue'], resolve),
                        children: [
                            {
                                path: '/userManage/userList/index', //用户列表
                                component: resolve => require(['../pages/home/userManage/userList/child/index/index.vue'], resolve)
                            },
                            {
                                path: '/userManage/userList/add', //用户添加
                                component: resolve => require(['../pages/home/userManage/userList/child/add/index.vue'], resolve)
                            }
                        ],
                        redirect: '/userManage/userList/index'
                    },


                    {
                        name:'userBasicConfig',
                        path: '/userManage/userBasicConfig', //基础配置
                        component: resolve => require(['../pages/home/userManage/userBasicConfig/index.vue'], resolve),
                        // children: [
                        //     {
                        //         path: '/userManage/userBasicConfig/basicInformation', //基本信息
                        //         component: resolve => require(['../pages/home/userManage/userBasicConfig/child/basicInformation/index.vue'], resolve)
                        //     },
                        //     {
                        //         path: '/userManage/userBasicConfig/traders', //交易商
                        //         component: resolve => require(['../pages/home/userManage/userBasicConfig/child/traders/index.vue'], resolve)
                        //     },
                        //     {
                        //         path: '/userManage/userBasicConfig/agreement', //协议
                        //         component: resolve => require(['../pages/home/userManage/userBasicConfig/child/agreement/index.vue'], resolve)
                        //     },
                        //     {
                        //         path: '/userManage/userBasicConfig/banner', //图片
                        //         component: resolve => require(['../pages/home/userManage/userBasicConfig/child/banner/index.vue'], resolve)
                        //     },
                        // ],
                        // redirect: '/userManage/userBasicConfig/basicInformation'
                    },
                    //--------------用户管理----------------//
                    //--------------交易商平台管理----------------//
                    {
                        name:'platformList',
                        path: '/platformManage/platformList', //交易商平台列表
                        component: resolve => require(['../pages/home/userManage/userList/index.vue'], resolve),
                        children: [
                            {
                                path: '/platformManage/platformList/index', //交易商平台列表
                                component: resolve => require(['../pages/home/platformManage/platformList/child/index/index.vue'], resolve)
                            }
                        ],
                        redirect: '/platformManage/platformList/index'
                    },
                    //--------------交易商平台管理----------------//
                ],
                redirect: '/index'
            },
            {
                path:'/login', //首页
                component: resolve => require(['../pages/login'], resolve),
            },
            {
                path:'/test', //首页
                component: resolve => require(['../pages/test'], resolve),
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/login'
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach(({meta, path,fullPath}, from, next) => {
    iView.LoadingBar.start();
    var {
        auth = true,
        header = {contentType: 'default', rightContentType: 'default'}
    } = meta
    store.dispatch('changeCompontentStates', {header, auth})
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录
    if (auth && !isLogin && path !== '/login') {
        next({ path: '/login',query: {redirect:fullPath}})
        return
    }
    next()
})
router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
export default router;