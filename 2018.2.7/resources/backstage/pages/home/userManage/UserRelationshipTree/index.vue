<style lang="less" scoped src="./css/index.less"></style>
<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .pageErrorBox{
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 6px;
        background-color: #fff;
        margin-top: 15px;
        font-size: 18px;
        text-align: center;
    }
</style>
<style>
    .customer_relation_tree .search-box .ivu-icon{
        cursor: pointer;
    }
</style>
<template>
    <div class="layout-content-main customer_relation_tree" v-if="showPage">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalData="modalData" @refresh="refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>用户管理</BreadcrumbItem>
                <BreadcrumbItem>用户关系树</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-top">
            <div class=".myCustomer">
                <div v-show="!loading">
                    <div class="grade_top cl">
                        <div class="search-box">
                            <Input icon="ios-search" v-model="searchInput" placeholder="请输入姓名/手机号搜索" size="large" style="width: 200px;margin-right: 15px;" @on-click="search" @on-enter="search"></Input>
                        </div>
                        <!--<div class="search_input cl">-->
                        <!--<input type="text" class="input" placeholder="请输入姓名" width="80">-->
                        <!--<Icon type="ios-search" class="searchIco"></Icon>-->
                        <!--</div>-->
                    </div>
                    <div class="customer-box cl" style="width: 1030px">
                        <div :class="{'customer-box-left':true,'customer-box-center':!showCustomerLink}">
                            <div class="customerList-box">
                                <customerList :isTopCurstomer="isTopCustomer" :customer="customerlistModel" :loadingChild="loadingChild" @stickCustome="stickCustomeByData" @changeLoadingChildStatus="changeLoadingChildStatus" @changeLevel="showChangeLevelModal" @changeParent="showChangeParentModal"  v-if="customerlistModel"></customerList>
                            </div>
                        </div>
                        <!--<div class="customer-box-right" v-if="true">-->
                        <div class="customer-box-right" v-if="this.showCustomerLink">
                            <customerLink :customerLink="customerLinkModel" :curId="curStickId" @stickCustome="stickCustomeById"></customerLink>
                        </div>
                    </div>
                </div>
                <v-tableSpin v-show="loading"></v-tableSpin>
            </div>
        </div>
    </div>
    <div v-else>
        <v-tableSpin v-if="!pageErrorMsg"></v-tableSpin>
        <div class="pageErrorBox" v-else>{{pageErrorMsg}}</div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import customerList from './component/customerList/index.vue'
    import customerLink from './component/customerLink/index.vue'
    import changeLevelModal from './component/changeLevelModal/index.vue'
    import changeParentModal from './component/changeParentModal/index.vue'
    export default {
        data(){
            return {
                iviewModal: false,
                topCustomerId:'',
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    changeLevel: {
                        name: 'changeLevelModal',
                        width: ''
                    },
                    changeParent: {
                        name: 'changeParentModal',
                        width: ''
                    },
                },
                modalData: {},  //传给子组件的数据
                curStickId:'',
                customerLink:[],
                customerlist:null,
                allCustomerlist:{},
                searchInput:'',
                showPage:false,
                loading:false,
                loadingChild:false,
                pageErrorMsg:'',
                levelList:[]
            }
        },
        components: {
            customerList,
            customerLink,
            changeLevelModal,
            changeParentModal
        },
        computed:{
            customerlistModel(){
                return this.customerlist
            },
            customerLinkModel(){
                return this.customerLink
            },
            showCustomerLink(){
                return this.customerLink.length>=2
            },
            isTopCustomer(){
                return this.topCustomerId==String(this.curStickId)
            }
        },
        beforeMount() {
            this.getLevelList()
            this.getCustomerList()
        },
        mounted(){
            this.changeLeftNav()
        },
        methods:{
            //获取列表
            getLevelList(data={},type=null){
                this.showPage=false
                var getCustomerListHttp=this.getLevelListListHttp(data)
                getCustomerListHttp.then((data) => {
                    this.levelList=data
                    this.showPage=true
                }).catch((msg) => {
                    this.pageErrorMsg='加载失败'
                });
            },

            getLevelListListHttp(data){
                const ajaxData=data
                return new Promise((resolve, reject) => {
                    this.$http.get('/admin/level/simple',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode == '0'){
                                if(!retData){
                                    reject()
                                }else{
                                    resolve(retData)
                                }
                            }else{
                                reject()
                            }
                        }).catch((error) =>{
                        reject()
                    });

                })
            },

            refresh(){
                this.getCustomerList({id:this.curStickId})
            },
            showChangeParentModal(data){
                this.showModal('changeParent',data)
            },
            showChangeLevelModal(data){
                var level_id=data.level.id
                var levelList=this.levelList
                var nextLevel=null
                for(var i in levelList){
                    if(levelList[i]["id"]==level_id){
                        nextLevel=levelList[Number(i)+1]
                        break
                    }
                }
                if(!nextLevel){
                    return
                }
                var modalData=Object.assign({},data,{nextLevel})
                this.showModal('changeLevel',modalData)
            },
            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalData,data)
                this.curModal=modalList[name],
                this.iviewModal=true
            },

            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'userManage',
                    activeName:'UserRelationshipTree'
                }
                this.$emit("changeLeftNav",leftNav)
            },
            search(){
                var value=this.searchInput
                var searchData={}
                if(value){
                    if(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)){
                        searchData={phone:value}
                    }else{
                        searchData={real_name:value}
                    }
                }else{
                    searchData={}
                }
                this.getCustomerList(searchData,'search')
            },
            //获取列表
            getCustomerList(data={},type=null){
                var getCustomerList=this.getCustomerListHttp(data,type)
                Promise.all([getCustomerList]).then((data) => {
                    var customer=data[0]
                    if(type==='search'||type==='link'){
                        this.setModel(customer,false)
                    }else{
                        this.setModel(customer)
                        if(!this.topCustomerId){
                            this.topCustomerId=String(customer.users_id)
                        }
                    }
                    this.loading=false

                }).catch((msg) => {
                    if(msg){
                        this.$Message.error({content:msg})
                    }
                    this.loading=false
                });
            },

            getCustomerListHttp(data,type){
                const ajaxData=data
                this.loading=true
                return new Promise((resolve, reject) => {
                    this.$http.get('/admin/customer',{params:ajaxData})
                        .then((res) => {
                        const data = res.data
                        const {retCode,retData={}}=data
                        if(retCode == '0'){
                            if(!retData.users_id){
                                reject('搜索不到该客户')
                            }else{
                                resolve(retData)
                            }
                        }else{
                            if(type=='search'){
                                reject('搜索失败')
                            }else {
                                reject('获取失败')
                            }
                        }
                    }).catch((error) =>{
                        if(type=='search'){
                            reject('搜索失败')
                        }else {
                            reject('获取失败')
                        }
                    });

                })
            },
            /*部署数据模型*/
            setModel(customer,inherit=true){
                this.customerlist=customer
                var id=customer.users_id
                var parentId=null
                if(inherit){/*判断是否继承链*/
                    /*判断是否存在库中*/
                    parentId=this.allCustomerlist[String(id)]?this.allCustomerlist[String(id)].parentId:null
                }
                this.setAllCustomerlist(customer,parentId)
                this.curStickId=id
                this.setCustomerLink(id)
            },
            /*置顶用户*/
            stickCustomeById(data){
                this.getCustomerList({id:data.id},data.type)
            },
            stickCustomeByData(data){
                this.setModel(data)
            },
            /*建立用户列表库模型*/
            setAllCustomerlist(custom={},parentId=null){
                var id=custom.users_id
                this.allCustomerlist[String(id)]={
                    id:id,
                    name:custom.users.name,
                    real_name:custom.users.real_name,
                    avatar:custom.users.avatar,
                    parentId:parentId
                }
                var child=custom.sons
                if(child){
                    Object.keys(child).forEach((key) => {
                        this.setAllCustomerlist(child[key],custom.id)
                    })
                }
            },
            /*获取客户链*/
            getCustomerLink(id){
                var link=[]
                var customer=this.allCustomerlist[String(id)]
                link.unshift(customer)
                var parentId=customer.parentId
                if(parentId){
                    var parentLink=this.getCustomerLink(parentId)
                    link=parentLink.concat(link)
                }
                return link
            },
            /*设置客户链*/
            setCustomerLink(id){
                this.customerLink=this.getCustomerLink(id)
            },
            /*设置展开子类加载中状态*/
            changeLoadingChildStatus(bool){
                this.loading=bool;
//                this.loadingChild=bool;
            }
        }
    }
</script>













