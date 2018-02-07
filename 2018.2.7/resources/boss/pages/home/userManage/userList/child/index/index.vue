<style scoped>
    @import './css/index.css'

</style>
<template>
    <div class="layout-content-main">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>用户管理</BreadcrumbItem>
                <BreadcrumbItem>用户列表</BreadcrumbItem>
            </Breadcrumb>
            <div class="layout-breadcrumb-content">
                <Row>
                    <router-link to="/userManage/userList/add"><Button type="primary" size="large">新增用户</Button></router-link>
                    <Table :loading="loading" :no-data-text="tableNoDataText" class="main_table" border :columns="columns" :data="listModel"></Table>
                </Row>
                <Row v-show="!loading">
                    <div class="pageIndex_box">
                        <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
                    </div>
                </Row>
            </div>
        </div>
    </div>

</template>
<script>
    export default {

        data(){
            return {
                value:'ddd',
                loading:false,
                pageIndex:{
                    current_page:1,
                    last_page:1,
                    per_page:null,
                    total:null
                },
                columns:[
                    {
                        title:'用户名称',
                        key:'short_name',
                        align:'center'
                    },
                    {
                        title:'用户域名',
                        key:'domain',
                        align:'center'
                    },
                    {
                        title:'手机号码',
                        key:'phone',
                        align:'center',
                        width:135,
                    },
                    {
                        title:'添加时间',
                        key:'created_at',
                        align:'center'
                    },
                    {
                        title:'状态',
                        key:'status',
                        align:'center',
                        width:100,
                        render: (h, params) => {
                            let text=''
                            if(params.row.status=='1'){
                                text='正常'
                            }else{
                                text='停用'
                            }
                            return h('span', [text]);
                        }
                    },
                    {
                        title:'操作',
                        key:'handle',
                        align:'center',
                        width:235,
                        render: (h, params) => {
                            let buttonList=[]
                            let button_1=null
                            if(params.row.status=='1'){
                                button_1=h('Button',{
                                    props:{
                                        type:'error'
                                    },
                                    on:{
                                        click:()=>{
                                            this.disableUser(params.row)
                                        }
                                    }
                                },'停止使用')
                                let button_2=h('Button',{
                                    style:{
                                        marginLeft:'8px'
                                    },
                                    props:{
                                        type:'warning'
                                    },
                                    on:{
                                        click:()=>{
                                            this.resetPWD(params.row)
                                        }
                                    }
                                },'初始化密码')
                                buttonList.push(button_1,button_2)
                            }else{
                                button_1=h('Button',{
                                    props:{
                                        type:'success'
                                    },
                                    on:{
                                        click:()=>{
                                            this.enableUser(params.row)
                                        }
                                    }
                                },'恢复使用')
                                buttonList.push(button_1)
                            }
                            return h('div', buttonList);
                        }
                    },

                ],
                userList:[],
                tableNoDataText:'暂无数据'
            }
        },
        computed: {
            listModel(){
                return this.userList
            }
        },
        created(){
            this.initData()
        },
        methods: {
            initData(){
                var page=1
                if(this.$route.query.page){
                    page=this.$route.query.page
                }
                this.pageIndex.current_page=+page
                this.getUserList({page})
            },
            /*刷新页面至第一页*/
            goFirstPage(){
                if(this.$route.query.page==1){
                    this.initData()
                }else{
                    var routerData={
                        query:{
                            page:1
                        }
                    }
                    this.routerPush(routerData)
                }
            },
            /*获取列表数据*/
            getUserList(data={}){
                var ajaxData=data
                this.loading=true
                var getUserListHttp=this.getUserListHttp(ajaxData)
                getUserListHttp.then((retData)=>{
                    var {current_page,last_page,per_page,total,data:list}=retData
                    if(!list.length){
                        if(current_page!='1'){
                            return this.changePage(--current_page)
                        }else{
                            this.tableNoDataText='暂无数据'
                        }
                    }
                    var pageIndexMsg={current_page,last_page,per_page,total}
                    Object.assign(this.pageIndex,pageIndexMsg)
                    this.userList=list
                    this.loading=false

                }).catch((data='获取数据失败')=>{
                    let msg='获取数据失败'
                    this.userList=[] 
                    this.tableNoDataText=msg
                    this.$Message.error({content: msg})
                    this.loading=false
                })
            },
            getUserListHttp(data={}){
                const ajaxData=data
                const httpName = "获取用户列表"
                return new Promise((resolve, reject) => {
                    this.$http.get('/boss/shop',{params:ajaxData})
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                resolve(retData)
                            }else{
                                reject(retMsg)
                            }
                        }).catch((error) =>{
                        reject(this.util.getHttpText(error))
                    });
                })
            },
            /*获取列表数据*/
            /*按钮操作*/
            enableUser(user){
                this.$Modal.confirm({
                    title: '用户恢复使用',
                    content: `<div style="font-size: 14px">是否将用户"${user.short_name}"恢复使用？</div>`,
                    loading: true,
                    onOk: () => {
                        var enableUserHttp=this.enableUserHttp({
                                                                  id:user.id,
                                                                  status:1
                                                                })
                        enableUserHttp.then((data)=>{
                            this.$Modal.remove();
                            this.$Message.success({content: data});
                            this.initData()
                        }).catch((data='用户恢复使用')=>{
                            this.$Modal.remove();
                            this.$Message.error({content: data});
                        })
                    }
                })
            },
            enableUserHttp(data={}){
                const ajaxData=data
                const httpName = "用户恢复使用"
                return new Promise((resolve, reject) => {
                    this.$http.put('/boss/shop',ajaxData)
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                resolve(`${httpName}成功`)
                            }else{
                                reject(retMsg)
                            }
                        }).catch((error) =>{
                        reject(this.util.getHttpText(error))
                    });
                })
            },
            disableUser(user){
                this.$Modal.confirm({
                    title: '用户停止使用',
                    content: `<div style="font-size: 14px">是否将用户"${user.short_name}"停止使用？</div>`,
                    loading: true,
                    onOk: () => {
                        var disableUserHttp=this.disableUserHttp({
                                                                  id:user.id,
                                                                  status:2
                                                                  })
                        disableUserHttp.then((data)=>{
                            this.$Modal.remove();
                            this.$Message.success({content: data});
                            this.initData()
                        }).catch((data='用户停止使用')=>{
                            this.$Modal.remove();
                            this.$Message.error({content: data});
                        })
                    }
                })
            },
            disableUserHttp(data={}){
                const ajaxData=data
                const httpName = "用户停止使用"
                return new Promise((resolve, reject) => {
                    this.$http.put('/boss/shop',ajaxData)
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                resolve(`${httpName}成功`)
                            }else{
                                reject(retMsg)
                            }
                        }).catch((error) =>{
                        reject(this.util.getHttpText(error))
                    });
                })
            },
            resetPWD(user){
                this.$Modal.confirm({
                    title: '用户初始化密码',
                    content: `<div style="font-size: 14px">是否初始化用户"${user.short_name}"的密码？</div>`,
                    loading: true,
                    onOk: () => {
                        var resetPWDHttp=this.resetPWDHttp({id:user.id})
                        resetPWDHttp.then((data)=>{
                            this.$Modal.remove();
                            this.$Message.success({content: data});
                        }).catch((data='用户初始化密码')=>{
                            this.$Modal.remove();
                            this.$Message.error({content: data});
                        })
                    }
                })
            },
            resetPWDHttp(data={}){
                const ajaxData=data
                const httpName = "用户初始化密码"
                return new Promise((resolve, reject) => {
                    this.$http.put('/boss/init_pwd',ajaxData)
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                resolve(`${httpName}成功`)
                            }else{
                                reject(retMsg)
                            }
                        }).catch((error) =>{
                        reject(this.util.getHttpText(error))
                    });
                })
            },
            /*按钮操作*/

            /*分页*/
            changePage(page){
                var query=Object.assign({},this.$route.query,{page:page})
                var routerData={
                    query
                }
                this.routerPush(routerData)
            },
            routerPush(data={}){
                var routerData={
                    path:'/userManage/userList/index'
                }
                Object.assign(routerData,data)
                this.$router.push(routerData)
            }
            /*分页*/
        },
        watch: {
            "$route"(){
                this.initData()
            }
        }
    }

</script>















