var navList=[
    {
        group:'userManage',
        text:'用户管理',
        iconType:'person-stalker',
        child:[
            {name:'userInfoList',path:'/userManage/userInfoList',text:'用户列表'},
            {name:'TraderList',path:'/userManage/TraderList',text:'交易员列表'},
            {name:'BrokerList',path:'/userManage/BrokerList',text:'经纪人列表'},
            // {name:'newAddUserList',path:'/userManage/newAddUserList',text:'新增用户列表'},
            {name:'BankCard',path:'/userManage/BankCard',text:'银行卡'},
            {name:'UserRelationshipTree',path:'/userManage/UserRelationshipTree',text:'用户关系树'},
            // {name:'EntryExitRecord',path:'/userManage/EntryExitRecord',text:'出入金记录表'}
        ]
    },
    {
        group:'accountManage',
        text:'账户管理',
        iconType:'ios-navigate',
        child:[
            {name:'analogList',path:'/accountManage/analog',text:'模拟账号'},
            {name:'MT4List',path:'/accountManage/MT4',text:'MT4账号列表'}
        ]
    },
    {
        group:'strategyManage',
        text:'策略管理',
        iconType:'ios-keypad',
        child:[
            {name:'strategyExamine',path:'/strategyManage/examine',text:'策略审核'},
            {name:'strategyPublished',path:'/strategyManage/published',text:'已发布策略'},
            {name:'strategyHot',path:'/strategyManage/hot',text:'热门策略'},
            {name:'strategyOff',path:'/strategyManage/off',text:'已下架'}
        ]
    },
    // {
    //     group:'articleManage',
    //     text:'资讯管理',
    //     iconType:'earth',
    //     child:[
    //         {name:'Information_express',path:'/articleManage/Information_express',text:'资讯速递'},
    //         {name:'Economic_Calendar',path:'/articleManage/Economic_Calendar',text:'财经日历'},
    //         {name:'Financial_news_list',path:'/articleManage/Financial_news',text:'财经要闻'}
    //     ]
    // },

    {
        group:'projectManage',
        text:'项目管理',
        iconType:'social-buffer',
        child:[
            {name:'projectExamine',path:'/projectManage/projectExamine',text:'项目审核'},
            {name:'projectEnroll',path:'/projectManage/projectEnroll',text:'报名中项目'},
            {name:'ongoingProject',path:'/projectManage/ongoingProject',text:'进行中项目'},
            {name:'completedProject',path:'/projectManage/completedProject',text:'已完成项目'},
            // {name:'projectAnalysis',path:'/projectManage/projectAnalysis',text:'项目分析'},
            {name:'Blacklist',path:'/projectManage/Blacklist',text:'黑名单'},
        ]
    },
    {
        group:'rebateManage',
        text:'返佣管理',
        iconType:'social-usd',
        child:[
            {name:'commissionSettlement',path:'/rebateManage/commissionSettlement',text:'佣金结算表'},
            {name:'agentCommission',path:'/rebateManage/agentCommission',text:'经纪人佣金表'},
            {name:'presentManagement',path:'/rebateManage/presentManagement',text:'提现管理'},
            {name:'agentGradeAndCommissionManage',path:'/rebateManage/agentGradeAndCommissionManage',text:'经纪人等级及佣金管理'}
        ]
    },
    {
        group:'EA_Manage',
        text:'EA管理',
        iconType:'steam',
        child:[
            {name:'EA_banner',path:'/EA_Manage/EA_banner',text:'EA横幅图片'},
            {name:'EA_list',path:'/EA_Manage/EA_list',text:'EA列表'}
        ]
    }
]

export default navList