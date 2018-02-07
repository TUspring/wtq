<style lang="less" src="./css/index.less">

</style>
<template>
    <div class="layout-content-main platformList-main">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>交易商平台管理</BreadcrumbItem>
                <BreadcrumbItem>交易商平台列表</BreadcrumbItem>
            </Breadcrumb>
            <div class="layout-breadcrumb-content">
                <Row>
                    <Button type="primary" size="large" @click="showAddPlatformModal">新增用户</Button>
                    <Table :loading="loading" :no-data-text="tableNoDataText" class="main_table" border :columns="columns2" :data="list2"></Table>
                </Row>
                <Row v-show="!loading">
                    <div class="pageIndex_box">
                        <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
                    </div>
                </Row>
            </div>
        </div>
        <!----弹窗----->
        <Modal v-model="iviewModal" :title="curModal.title" :width="curModal.width" class-name="ivu-modal-noFoot ivu-modal-middle" :mask-closable="false">
            <!--<div slot="header"></div>-->
            <!--<div slot="close"></div>-->
            <component style="max-height:450px;overflow: scroll" v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalData="modalData" @refresh="refresh">
            </component>
            <div slot="footer"></div>
        </Modal>
    </div>

</template>
<script>
    import addPlatformModal from './component/addPlatformModal/index.vue'
    import editPlatformModal from './component/editPlatformModal/index.vue'
    export default {

        data(){
            return {
                /*弹窗*/
                iviewModal: false,
                curModal: {
                    title:'',
                    name: '',
                    width: ''
                },
                modalList: {
                    addPlatform: {
                        title:'新增交易平台',
                        name: 'addPlatformModal',
                        width: ''
                    },
                    editPlatform: {
                        title:'修改交易平台',
                        name: 'editPlatformModal',
                        width: ''
                    },
                },
                modalData: {},  //传给子组件的数据
//              /*弹窗*/
                value:'ddd',
                loading:false,
                pageIndex:{
                    current_page:1,
                    last_page:1,
                    per_page:null,
                    total:null
                },
                list2:[
                    {
                        name:'EWG意威',
                        server:[
                            {name:'EWGfx-Demo'},
                            {name:'EWGfx-Live'}
                        ],
                    },
                    {
                        name:'EWG意威2',
                        server:[
                            {name:'EWGfx-ytyy'},
                            {name:'EWGfx-Live'},
                            {name:'EWGfx-dsd'},
                            {name:'EWGfx-Live'},
                        ],
                    }
                ],
                columns2:[
                    {
                        title:'平台名称',
                        key:'name',
                        align:'center'
                    },
                    {
                        title:'下属服务器',
                        key:'server',
                        align:'center',
                        className:'serverCell',
                        render:(h,params) => {
                            let list=params.row.server
                            let child=[]
                            console.log(list)
                            for(let i = 0,len = list.length;i<len;i++){
                                child.push(
                                    h('div',list[i]["name"])
                                )
                            }
                            console.log(child)
                            return h('div',{
                                'class': {
                                    'serverList-box': true
                                }
                            },child)
                        }
                    },
                    {
                        title:'操作',
                        key:'handle',
                        align:'center',
                        width:180,
                        render: (h, params) => {
                            let buttonList=[]
                            let button_1=null
                            button_1=h('Button',{
                                props:{
                                    type:'primary'
                                },
                                on:{
                                    click:()=>{
                                    }
                                }
                            },'修改')
                            let button_2=h('Button',{
                                style:{
                                    marginLeft:'8px'
                                },
                                props:{
                                    type:'error'
                                },
                                on:{
                                    click:()=>{
                                        this.deleteItem(params.row)
                                    }
                                }
                            },'删除')
                            buttonList.push(button_1,button_2)

                            return h('div', buttonList);
                        }
                    }
                ],
                userList:[],
                tableNoDataText:'暂无数据'
            }
        },
        components: {
            addPlatformModal,
            editPlatformModal
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
            deleteItem(item){
                this.$Modal.confirm({
                    title: '交易商平台删除',
                    content: `<div style="font-size: 14px">是否将交易商平台"${item.name}"删除？</div>`,
                    loading: true,
                    onOk: () => {
                        var deleteItemHttp=this.deleteItemHttp({
                                                                  id:user.id,
                                                                  status:2
                                                                  })
                        deleteItemHttp.then((data)=>{
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
            deleteItemHttp(data={}){
                const ajaxData=data
                const httpName = "交易商平台删除"
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
            },
            /*分页*/
            /*弹窗*/
            refresh(){
                this.initData()
            },
            showAddPlatformModal(data){
                this.showModal('addPlatform',data)
            },
            showEditPlatformModal(data){
                this.showModal('editPlatform',data)
            },
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalData,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },
            /*弹窗*/
        },
        watch: {
            "$route"(){
                this.initData()
            }
        }
    }

</script>















