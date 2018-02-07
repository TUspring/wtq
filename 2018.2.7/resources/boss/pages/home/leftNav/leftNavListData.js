var navList=[
    //--------------用户管理----------------//
    {
        group:'userManage',
        text:'用户管理',
        iconType:'person-stalker',
        child:[
            {name:'userList',path:'/userManage/userList',text:'用户列表'},
            {name:'userBasicConfig',path:'/userManage/userBasicConfig',text:'基础配置'},
        ]
    },
    //--------------用户管理----------------//
    //--------------交易商平台管理----------------//
    {
        group:'platformManage',
        text:'交易商平台管理',
        iconType:'social-tumblr',
        child:[
            {name:'platformList',path:'/platformManage/platformList',text:'交易商平台列表'},
        ]
    }
    //--------------交易商平台管理----------------//
]

export default navList