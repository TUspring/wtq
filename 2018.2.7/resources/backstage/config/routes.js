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
                        name:'userInfoList',
                        path: '/userManage/userInfoList', //用户列表
                        component: resolve => require(['../pages/home/userManage/userInfoList'], resolve)
                    },
                    {
                        name:'TraderList',
                        path: '/userManage/TraderList', //交易员列表
                        component: resolve => require(['../pages/home/userManage/TraderList'], resolve)
                    },
                    {
                        name:'BrokerList',
                        path: '/userManage/BrokerList', //经纪人列表
                        component: resolve => require(['../pages/home//userManage/BrokerList'], resolve)
                    },
                    {
                        name:'newAddUserList',
                        path: '/userManage/newAddUserList', //新增用户列表
                        component: resolve => require(['../pages/home/userManage/newAddUserList'], resolve)
                    },
                    {
                        name:'BankCard',
                        path: '/userManage/BankCard', //银行卡
                        component: resolve => require(['../pages/home//userManage/BankCard'], resolve)
                    },
                    {
                        name:'UserRelationshipTree',
                        path: '/userManage/UserRelationshipTree', //用户关系树
                        component: resolve => require(['../pages/home//userManage/UserRelationshipTree'], resolve)
                    },
                    {
                        name:'EntryExitRecord',
                        path: '/userManage/EntryExitRecord', //出入金记录表
                        component: resolve => require(['../pages/home//userManage/EntryExitRecord'], resolve)
                    },
                    //--------------用户管理 end----------------//


                    //--------------账号管理----------------//
                    {
                        name:'analogList',
                        path: '/accountManage/analog', //模拟账号
                        component: resolve => require(['../pages/home/accountManage/analog'], resolve)
                    },
                    {
                        name:'MT4List',
                        path: '/accountManage/MT4', //MT4账号列表
                        component: resolve => require(['../pages/home/accountManage/MT4'], resolve)
                    },
                    //--------------账号管理 end----------------//

                    //--账号管理/模拟账号/查看详情--//
                    {
                        path: '/analogTrading', //查看详情
                        redirect: '/analogTrading/followTrade', //重定向到 跟随交易
                        component: resolve => require(['../pages/analogTrading'], resolve),
                        children: [
                            //1、跟随交易
                            {
                                path: '/analogTrading/followTrade', // 跟随交易
                                redirect: '/analogTrading/followTrade/positioning',
                                component: resolve => require(['../pages/analogTrading/followTrade'], resolve),
                                children: [
                                    {
                                        path: '/analogTrading/followTrade/positioning', //正在持仓
                                        component: resolve => require(['../pages/analogTrading/followTrade/positioning'], resolve)
                                    },
                                    {
                                        path: '/analogTrading/followTrade/historyRecord',//历史记录
                                        component: resolve => require(['../pages/analogTrading/followTrade/historyRecord'], resolve)
                                    }
                                ]
                            },
                            //2、自主交易
                            {
                                path: '/analogTrading/independentTrade', // 自主交易
                                redirect: '/analogTrading/independentTrade/positioning',
                                component: resolve => require(['../pages/analogTrading/independentTrade'], resolve),
                                children: [
                                    {
                                        path: '/analogTrading/independentTrade/positioning', //正在持仓
                                        component: resolve => require(['../pages/analogTrading/independentTrade/positioning'], resolve)
                                    },
                                    {
                                        path: '/analogTrading/independentTrade/historyRecord',//历史记录
                                        component: resolve => require(['../pages/analogTrading/independentTrade/historyRecord'], resolve)
                                    }
                                ]
                            },
                        ]
                    },
                    //--账号管理/模拟账号/查看详情 end --//

                    //---账号管理/MT4账户列表/查看详情----//
                    {
                        path: '/MT4Trading', //查看详情
                        redirect: '/MT4Trading/followTrade', //重定向到 跟随交易
                        component: resolve => require(['../pages/MT4Trading'], resolve),
                        children: [
                            //1、跟随交易
                            {
                                path: '/MT4Trading/followTrade', // 跟随交易
                                redirect: '/MT4Trading/followTrade/positioning',
                                component: resolve => require(['../pages/MT4Trading/followTrade'], resolve),
                                children: [
                                    {
                                        path: '/MT4Trading/followTrade/positioning', //正在持仓
                                        component: resolve => require(['../pages/MT4Trading/followTrade/positioning'], resolve)
                                    },
                                    {
                                        path: '/MT4Trading/followTrade/historyRecord',//历史记录
                                        component: resolve => require(['../pages/MT4Trading/followTrade/historyRecord'], resolve)
                                    }
                                ]
                            },
                            //2、自主交易
                            {
                                path: '/MT4Trading/independentTrade', // 自主交易
                                redirect: '/MT4Trading/independentTrade/positioning',
                                component: resolve => require(['../pages/MT4Trading/independentTrade'], resolve),
                                children: [
                                    {
                                        path: '/MT4Trading/independentTrade/positioning', //正在持仓
                                        component: resolve => require(['../pages/MT4Trading/independentTrade/positioning'], resolve)
                                    },
                                    {
                                        path: '/MT4Trading/independentTrade/historyRecord',//历史记录
                                        component: resolve => require(['../pages/MT4Trading/independentTrade/historyRecord'], resolve)
                                    }
                                ]
                            },
                        ]
                    },
                    //---账号管理/MT4账户列表/查看详情 end ---//


                    //--------------策略管理 ----------------//
                    {
                        name:'strategyExamine',
                        path: '/strategyManage/examine', //策略审核
                        component: resolve => require(['../pages/home/strategyManage/examine'], resolve)
                    },
                    {
                        name:'strategyPublished',
                        path: '/strategyManage/published', //已发布策略
                        component: resolve => require(['../pages/home/strategyManage/published'], resolve)
                    },
                    {
                        name:'strategyHot',
                        path: '/strategyManage/hot', //热门策略
                        component: resolve => require(['../pages/home/strategyManage/hot'], resolve)
                    },
                    {
                        name:'strategyOff',
                        path: '/strategyManage/off', //已下架
                        component: resolve => require(['../pages/home/strategyManage/off'], resolve)
                    },
                    //--------------策略管理 end ----------------//


                    //--------------资讯管理----------------//
                    {
                        path: '/articleManage/Information_express', //资讯速递
                        component: resolve => require(['../pages/home/articleManage/Information_express'], resolve),
                    },
                    {
                        path: '/articleManage/Economic_Calendar', //财经日历
                        component: resolve => require(['../pages/home/articleManage/Economic_Calendar'], resolve),
                    },
                    {
                        path: '/articleManage/Financial_news', //财经要闻
                        component: resolve => require(['../pages/home/articleManage/Financial_news'], resolve),
                    },
                    {
                        path: '/articleManage/addNews', //新增要闻
                        component: resolve => require(['../pages/home/articleManage/Financial_news/addNews'], resolve),
                    },
                    {
                        path: '/articleManage/modify_news', //修改要闻
                        component: resolve => require(['../pages/home/articleManage/Financial_news/modify_news'], resolve),
                    },
                    //--------------资讯管理----------------//


                    //--------------项目管理----------------//
                    {
                        name:'projectExamine',
                        path: '/projectManage/projectExamine', //项目审核
                        component: resolve => require(['../pages/home/projectManage/projectExamine'], resolve),
                    },
                    {
                        name:'projectEnroll',
                        path: '/projectManage/projectEnroll', //报名中的项目
                        redirect:'/projectManage/projectEnroll/enrollList',
                        component: resolve => require(['../pages/home/projectManage/projectEnroll'], resolve),
                        children:[
                            {
                                path: '/projectManage/projectEnroll/enrollList', //报名中的项目
                                component: resolve => require(['../pages/home/projectManage/projectEnroll/enrollList'], resolve)
                            },
                            {
                                path: '/projectManage/projectEnroll/participateDetails/:id', //报名中的项目-参与详情
                                component: resolve => require(['../pages/home/projectManage/projectEnroll/participateDetails'], resolve),
                            },
                        ]
                    },
                    {
                        name:'ongoingProject',
                        path: '/projectManage/ongoingProject',
                        redirect:'/projectManage/ongoingProject/list',
                        component: resolve => require(['../pages/home/projectManage/ongoingProject'], resolve),
                        children:[
                            {
                                path: '/projectManage/ongoingProject/list', //进行中项目
                                component: resolve => require(['../pages/home/projectManage/ongoingProject/list'], resolve)
                            },
                            {
                                path: '/projectManage/ongoingProject/ongoingProjectDetail', //进行中项目/参与详情
                                component: resolve => require(['../pages/home/projectManage/ongoingProject/ongoingProjectDetail'], resolve)
                            }
                        ]
                    },
                    {
                        name:'completedProject',
                        path: '/projectManage/completedProject',
                        redirect:'/projectManage/completedProject/list',
                        component: resolve => require(['../pages/home/projectManage/completedProject'], resolve),
                        children:[
                            {
                                path: '/projectManage/completedProject/list', //已完成项目
                                component: resolve => require(['../pages/home/projectManage/completedProject/list'], resolve)
                            },
                            {
                                path: '/projectManage/completedProject/completedProjectDetail', //已完成项目/参与详情
                                component: resolve => require(['../pages/home/projectManage/completedProject/completedProjectDetail'], resolve)
                            }
                        ]
                    },
                    {
                        name:'projectAnalysis',
                        path: '/projectManage/projectAnalysis', //项目分析
                        component: resolve => require(['../pages/home/projectManage/projectAnalysis'], resolve),
                    },
                    {
                        name:'Blacklist',
                        path: '/projectManage/Blacklist', //项目黑名单
                        component: resolve => require(['../pages/home/projectManage/Blacklist'], resolve),
                    },
                    //--------------项目管理----------------//


                    //--------------返佣管理----------------//
                    {
                        name:'commissionSettlement',
                        path: '/rebateManage/commissionSettlement', //佣金结算表
                        component: resolve => require(['../pages/home/rebateManage/commissionSettlement'], resolve)
                    },
                    {
                        name:'agentCommission',
                        path: '/rebateManage/agentCommission', //经纪人佣金表
                        component: resolve => require(['../pages/home/rebateManage/agentCommission'], resolve)
                    },
                    {
                        name:'presentManagement',
                        path: '/rebateManage/presentManagement', //提现管理
                        redirect: '/rebateManage/presentManagement/apply',
                        component: resolve => require(['../pages/home/rebateManage/presentManagement'], resolve),
                        children: [
                            {
                                path:'/rebateManage/presentManagement/apply',     //申请中
                                component: resolve => require(['../pages/home/rebateManage/presentManagement/child/apply'], resolve)
                            },
                            {
                                path:'/rebateManage/presentManagement/alreadyPresented',     //已提现
                                component: resolve => require(['../pages/home/rebateManage/presentManagement/child/alreadyPresented'], resolve)
                            },
                            {
                                path:'/rebateManage/presentManagement/alreadyRefused',     //已拒绝
                                component: resolve => require(['../pages/home/rebateManage/presentManagement/child/alreadyRefused'], resolve)
                            }
                        ]
                    },
                    {
                        name:'agentGradeAndCommissionManage',
                        path: '/rebateManage/agentGradeAndCommissionManage', //经纪人等级及佣金管理
                        component: resolve => require(['../pages/home/rebateManage/agentGradeAndCommissionManage'], resolve)
                    },
                    //--------------返佣管理 end----------------//


                    //--------------EA管理----------------//
                    {
                        path: '/EA_Manage/EA_list', //EA列表
                        component: resolve => require(['../pages/home/EA_Manage/EA_list'], resolve),
                    },
                    {
                        path: '/EA_Manage/EA_list/addEA', //增加EA
                        component: resolve => require(['../pages/home/EA_Manage/EA_list/childs/addEA'], resolve)
                    },
                    {
                        path: '/EA_Manage/EA_list/modifyEA/:id', //修改EA
                        component: resolve => require(['../pages/home/EA_Manage/EA_list/childs/modifyEA/'], resolve)
                    },
                    {
                        path: '/EA_Manage/EA_banner',  //EA_banner
                        component: resolve => require(['../pages/home/EA_Manage/EA_banner'], resolve),
                    },
                    //--------------EA管理----------------//


                    //审核预览
                    {
                        path: '/examinePreview/:id', //查看详情
                        component: resolve => require(['../pages/examinePreview'], resolve)
                    },


                    {
                        path: '*', //其他页面，强制跳转到登录页面
                        redirect: '/index'
                    }
                ],
                redirect: '/index'
            },
            {
                path:'/login', //首页
                component: resolve => require(['../pages/login'], resolve),
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