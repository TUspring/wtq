import App from '../app'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/'
import iView from 'iview';
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
Vue.use(VueRouter);
const registerMeta={
    auth: false,
    header:{
        contentType:'title',
        content:'欢迎注册',
        rightContentType:'register'
    }
}
const routes = [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/test', //测试
                meta: { auth: false },
                component: resolve => require(['../pages/test/'], resolve)
            },

            {
                path: '/index', //首页
                meta: { auth: false },
                component: resolve => require(['../pages/index/'], resolve)
            },
            {
                path: '/home', //个人主页
                // redirect: '/home/mySrategy',
                redirect: '/home/myFollow',
                component: resolve => require(['../pages/home/'], resolve),
                children:[
                    {
                        path: '/home/myFollow', //我的跟随
                        redirect: '/home/myFollow/following',
                        component: resolve => require(['../pages/home/child/myFollow'], resolve),
                        children: [
                            {
                                path: '/home/myFollow/following',
                                component: resolve => require(['../pages/home/child/myFollow/child/following'], resolve)
                            },
                            {
                                path: '/home/myFollow/historyFollow',//暂停中/历史跟随
                                component: resolve => require(['../pages/home/child/myFollow/child/historyFollow'], resolve)
                            }
                            // {
                            //     path: '/home/myFollow/relieve',//已解除
                            //     component: resolve => require(['../pages/home/child/myFollow/child/relieve'], resolve)
                            // }
                        ]
                    },
                    {
                        path: '/home/mySrategy', //我的策略
                        redirect: '/home/mySrategy/publish',
                        component: resolve => require(['../pages/home/child/mySrategy'], resolve),
                        children: [
                            {
                                path: '/home/mySrategy/publish', //已发布
                                component: resolve => require(['../pages/home/child/mySrategy/child/publish'], resolve)
                            },
                            {
                                path: '/home/mySrategy/examine',   //审核中
                                component: resolve => require(['../pages/home/child/mySrategy/child/examine'], resolve)
                            },
                            {
                                path: '/home/mySrategy/off',   //已下架
                                component: resolve => require(['../pages/home/child/mySrategy/child/off'], resolve)
                            }
                        ]
                    },
                    {
                        path: '/home/myProject', //我的项目
                        redirect: '/home/myProject/ongoing',
                        component: resolve => require(['../pages/home/child/myProject'], resolve),
                        children: [
                            {
                                path: '/home/myProject/ongoing',   //进行中
                                component: resolve => require(['../pages/home/child/myProject/child/ongoing'], resolve)
                            },
                            {
                                path: '/home/myProject/enrol',   //报名中
                                component: resolve => require(['../pages/home/child/myProject/child/enrol'], resolve)
                            },
                            {
                                path: '/home/myProject/audit',   //审核中
                                component: resolve => require(['../pages/home/child/myProject/child/audit'], resolve)
                            },
                            {
                                path: '/home/myProject/finished',   //已结束
                                component: resolve => require(['../pages/home/child/myProject/child/finished'], resolve)
                            }
                        ]
                    },
                    {
                        path: '/home/myWallet', //我的钱包
                        redirect: '/home/myWallet/raiseCash',
                        component: resolve => require(['../pages/home/child/myWallet'], resolve),
                        children: [
                            {
                                path: '/home/myWallet/raiseCash',  //提现
                                component: resolve => require(['../pages/home/child/myWallet/child/raiseCash'], resolve)
                            },
                            {
                                path: '/home/myWallet/income',  //收入
                                redirect: '/home/myWallet/income/survey',
                                component: resolve => require(['../pages/home/child/myWallet/child/income'], resolve),
                                children: [
                                    {
                                        path: '/home/myWallet/income/survey',   //经济收入概况
                                        component: resolve => require(['../pages/home/child/myWallet/child/income/child/survey'], resolve)
                                    },
                                    {
                                        path: '/home/myWallet/income/detail',   //经济收入明细
                                        component: resolve => require(['../pages/home/child/myWallet/child/income/child/detail'], resolve)
                                    }
                                ]
                            },
                            {
                                path: '/home/myWallet/bankCard',  //银行卡
                                component: resolve => require(['../pages/home/child/myWallet/child/bankCard'], resolve)
                            }
                        ]
                    },
                    {
                        path: '/home/myCustomer', //我的客户
                        redirect: '/home/myCustomer/customer',
                        component: resolve => require(['../pages/home/child/myCustomer'], resolve),
                        children: [
                            {
                                path:'/home/myCustomer/customer',  //我的客户
                                component: resolve => require(['../pages/home/child/myCustomer/child/customer'], resolve)
                            },
                            // {
                            //     path:'/home/myCustomer/addCustomer',  //新增客户
                            //     component: resolve => require(['../pages/home/child/myCustomer/child/addCustomer'], resolve)
                            // },
                            // {
                            //     path:'/home/myCustomer/customerMoney',  //客户出入金
                            //     component: resolve => require(['../pages/home/child/myCustomer/child/customerMoney'], resolve)
                            // }
                        ]
                    },
                    {
                        path: '/home/mySetting', //我的设置
                        redirect: '/home/mySetting/personalData',
                        component: resolve => require(['../pages/home/child/mySetting'], resolve),
                        children: [
                            {
                                path: '/home/mySetting/personalData',
                                component: resolve => require(['../pages/home/child/mySetting/child/personalData'], resolve)
                            },
                            {
                                path: '/home/mySetting/MT4_Account',
                                component: resolve => require(['../pages/home/child/mySetting/child/MT4_Account'], resolve)
                            }
                        ]
                    },
                    {
                        path: '/home/myParticipate', //我的参与
                        redirect: '/home/myParticipate/participation',
                        component: resolve => require(['../pages/home/child/myParticipate'], resolve),
                        children: [
                            {
                                path: '/home/myParticipate/participation',
                                component: resolve => require(['../pages/home/child/myParticipate/child/participation'], resolve)
                            },
                            {
                                path: '/home/myParticipate/historyPartake',
                                component: resolve => require(['../pages/home/child/myParticipate/child/historyPartake'], resolve)
                            }
                        ]
                    },
                ]
            },
            {
                path: '/newPublish',//发布新策略
                redirect: '/newPublish/step1',
                component: resolve => require(['../pages/newPublish'], resolve),
                children: [
                    {
                        path: '/newPublish/step1',
                        component: resolve => require(['../pages/newPublish/child/step1'], resolve)
                    },
                    {
                        path: '/newPublish/step2',
                        component: resolve => require(['../pages/newPublish/child/step2'], resolve)
                    },
                    {
                        path: '/newPublish/step3',
                        component: resolve => require(['../pages/newPublish/child/step3'], resolve)
                    }
                ]
            },
            {
                path: '/publishNewProject',//发布新项目
                redirect: '/publishNewProject/step1',
                component: resolve => require(['../pages/publishNewProject'], resolve),
                children: [
                    {
                        path: '/publishNewProject/step1',
                        component: resolve => require(['../pages/publishNewProject/child/step1'], resolve)
                    },
                    {
                        path: '/publishNewProject/step2',
                        component: resolve => require(['../pages/publishNewProject/child/step2'], resolve)
                    },
                    {
                        path: '/publishNewProject/step3',
                        component: resolve => require(['../pages/publishNewProject/child/step3'], resolve)
                    }
                ]
            },
            {
                path: '/modifyNewStrategy/:id',//修改新策略
                redirect: '/modifyNewStrategy/:id/step1',
                component: resolve => require(['../pages/modifyNewStrategy'], resolve),
                children: [
                    {
                        path: '/modifyNewStrategy/:id/step1',
                        component: resolve => require(['../pages/modifyNewStrategy/child/step1'], resolve)
                    },
                    {
                        path: '/modifyNewStrategy/:id/step2',
                        component: resolve => require(['../pages/modifyNewStrategy/child/step2'], resolve)
                    },
                    {
                        path: '/modifyNewStrategy/:id/step3',
                        component: resolve => require(['../pages/modifyNewStrategy/child/step3'], resolve)
                    }
                ]
            },
            {
                path: '/becomeTrader',//成为交易员
                redirect: '/becomeTrader/step1',
                component: resolve => require(['../pages/becomeTrader'], resolve),
                children: [
                    {
                        path: '/becomeTrader/step1',
                        component: resolve => require(['../pages/becomeTrader/child/step1'], resolve)
                    },
                    {
                        path: '/becomeTrader/step2',
                        component: resolve => require(['../pages/becomeTrader/child/step2'], resolve)
                    },
                    {
                        path: '/becomeTrader/step3',
                        component: resolve => require(['../pages/becomeTrader/child/step3'], resolve)
                    }
                ]
            },
            {
                path: '/becomeAgent',//成为经纪人
                redirect: '/becomeAgent/step1',
                component: resolve => require(['../pages/becomeAgent'], resolve),
                children: [
                    {
                        path: '/becomeAgent/step1',
                        component: resolve => require(['../pages/becomeAgent/child/step1'], resolve)
                    },
                    {
                        path: '/becomeAgent/step2',
                        component: resolve => require(['../pages/becomeAgent/child/step2'], resolve)
                    },
                    {
                        path: '/becomeAgent/step3',
                        component: resolve => require(['../pages/becomeAgent/child/step3'], resolve)
                    }
                ]
            },
            {
                path: '/tradingStrategy', //交易策略
                meta: { auth: false },
                component: resolve => require(['../pages/tradingStrategy/'], resolve)
            },
            {
                path: '/Artificial_Intelligence', //人工智能
                meta: { auth: false },
                component: resolve => require(['../pages/Artificial_Intelligence/'], resolve),
            },
            {
                path: '/Artificial_Intelligence/ai_details/:id', //人工智能
                meta: { auth: false },
                component: resolve => require(['../pages/Artificial_Intelligence/ai_details/'], resolve),
            },

             {
                        path: '/Financial_Information/News_Flash', //快讯速览
                        meta: { auth: false },
                        component: resolve => require(['../pages/Financial_Information/News_Flash/'], resolve),
              },
              {
                        path: '/Financial_Information/Economic_Calendar', //财经日历
                        meta: { auth: false },
                        component: resolve => require(['../pages/Financial_Information/Economic_Calendar/'], resolve),
              },
             {
                        path: '/Financial_Information/Current_Events', //时事要闻
                        meta: { auth: false },
                        component: resolve => require(['../pages/Financial_Information/Current_Events'], resolve),
             },
            {
                path: '/Financial_Information/Current_Events/details/:id', //要闻详情
                meta: { auth: false },
                component: resolve => require(['../pages/Financial_Information/Current_Events/details'], resolve),
            },

            {
                path: '/periodicalProject', //定期项目
                meta: { auth: false },
                redirect: '/periodicalProject/projectEnroll',
                component: resolve => require(['../pages/periodicalProject'], resolve),
                children: [
                    {
                        path: '/periodicalProject/projectEnroll', //报名中项目
                        meta: { auth: false },
                        component: resolve => require(['../pages/periodicalProject/projectEnroll'], resolve),
                    },
                    {
                        path: '/periodicalProject/ongoingProject',  //进行中项目
                        meta: { auth: false },
                        component: resolve => require(['../pages/periodicalProject/ongoingProject'], resolve)
                    },
                    {
                        path: '/periodicalProject/completeProject',  //已完成项目
                        meta: { auth: false },
                        component: resolve => require(['../pages/periodicalProject/completeProject'], resolve)
                    },
                  ],
            },

            {
                path: '/periodicalProject/projectDetail/:id', //报名中项目详情
                meta: { auth: true },
                component: resolve => require(['../pages/periodicalProject/projectDetail'], resolve),
            },
            {
                path: '/periodicalProject/certification', //报名中项目详情--实名认证
                meta: { auth: true },
                component: resolve => require(['../pages/periodicalProject/certification'], resolve),
            },
            {
                path: '/policyFollowing/:id', //策略跟随
                meta: { auth: true },
                 redirect: '/policyFollowing/policyData/:id',
                component: resolve => require(['../pages/policyFollowing'], resolve),
                children: [
                    {
                        path: '/policyFollowing/dynamicComm/:id',
                        component: resolve => require(['../pages/policyFollowing/child/dynamicComm'], resolve)
                    },
                    {
                        path: '/policyFollowing/policyData/:id',
                        component: resolve => require(['../pages/policyFollowing/child/policyData'], resolve)
                    }
                ]
            },
            {
                path: '/register', //注册
                meta: registerMeta,
                redirect: '/register/step_1',
                component: resolve => require(['../pages/register/'], resolve),
                children:[
                    {
                        path: '/register/step_1', //注册第一步
                        meta: registerMeta,
                        component: resolve => require(['../pages/register/child/step_1'], resolve)
                    },
                    {
                        path: '/register/step_2', //注册第二步
                        meta: registerMeta,
                        component: resolve => require(['../pages/register/child/step_2'], resolve)
                    },
                    {
                        path: '/register/step_3', //注册第三步
                        meta: registerMeta,
                        component: resolve => require(['../pages/register/child/step_3'], resolve)
                    }
                ]
            },
            {
                path: '/resetPWD_byEmail', //首页
                meta: { auth: false },
                redirect: '/resetPWD_byEmail/sendEmail',
                component: resolve => require(['../pages/resetPWD_byEmail'], resolve),
                children:[
                    {
                        path: '/resetPWD_byEmail/sendEmail', //注册第一步
                        meta: { auth: false },
                        component: resolve => require(['../pages/resetPWD_byEmail/child/sendEmail'], resolve)
                    },
                    {
                        path: '/resetPWD_byEmail/resetPWD/:token', //注册第二步
                        meta: { auth: false },
                        component: resolve => require(['../pages/resetPWD_byEmail/child/resetPWD'], resolve)
                    }
                ]
            },
            {
                path: '/modaltest', //模态框测试
                meta: { auth: false },
                component: resolve => require(['../modaltest'], resolve)
            },
            {
                path: '/test1', //测试1
                meta: { auth: false },
                component: resolve => require(['../testPage/test1.vue'], resolve)
            },
            {
                path: '/test2', //测试2
                meta: { auth: false },
                component: resolve => require(['../testPage/test2.vue'], resolve)
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/index'
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach(({meta, path ,fullPath}, from, next) => {
    iView.LoadingBar.start();
    var {
            auth = true ,
            header ={contentType:'default',rightContentType:'default'}
    } = meta
    store.dispatch('changeCompontentStates',{header,auth})
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录
    if (auth && !isLogin && path !== '/index') {
        store.dispatch('changeCompontentStates',{loginModal:{show:true}})
        next({ path: '/index',query: {redirect:fullPath}})
        return
    }
    next()
})
router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
export default router;