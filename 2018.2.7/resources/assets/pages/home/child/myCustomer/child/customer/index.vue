<style lang="less" scoped src="./css/index.less"></style>

<style>
    .myCustomer .search-box .ivu-icon{
        cursor: pointer;
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
<template>
    <div class="myCustomer" v-if="showPage">
        <!--1、头部信息-->
        <div class="top_msg_content cl">
            <div class="top_msg_content-left">
                <div class="level-icon-box">
                    <div class="level-icon-box-text"><span>{{myMsg.level_name}}</span></div>
                </div>
                <div class="my-level-text">
                    <span>我的等级：{{myMsg.level_name}}</span>
                </div>
            </div>
            <div class="top_msg_content-right">
                <div class="msg-row cl">
                    <div class="msg-col cl">
                        <div class="msg-title">直接客户</div>
                        <div class="msg-content">{{myMsg.immediate_customer_no}}人</div>
                        <div class="rightBorder"></div>
                    </div>
                    <div class="msg-col cl">
                        <div class="msg-title">团队人数</div>
                        <div class="msg-content">{{myMsg.team_no}}人</div>
                        <div class="rightBorder"></div>
                    </div>
                </div>
                <div class="msg-row cl">
                    <div class="msg-col cl">
                        <div class="msg-title">个人交易手数</div>
                        <div class="msg-content">{{myMsg.lots}}手</div>
                        <div class="rightBorder"></div>
                    </div>
                    <div class="msg-col cl">
                        <div class="msg-title">团队交易手数</div>
                        <div class="msg-content">{{myMsg.team_lots}}手</div>
                        <div class="rightBorder"></div>
                    </div>
                </div>
            </div>
        </div>

        <!--2、等级展开-->
        <div class="grade_content">
            <div v-show="!loading">
                <div class="grade_top cl">
                    <div class="search-box">
                        <Input icon="ios-search" v-model="searchInput" placeholder="请输入姓名搜索" size="large" style="width: 200px" @on-click="search" @on-enter="search"></Input>
                    </div>
                    <!--<div class="search_input cl">-->
                        <!--<input type="text" class="input" placeholder="请输入姓名" width="80">-->
                        <!--<Icon type="ios-search" class="searchIco"></Icon>-->
                    <!--</div>-->
                </div>
                <div class="customer-box cl">
                    <div :class="{'customer-box-left':true,'customer-box-center':!showCustomerLink}">
                        <div class="customerList-box">
                            <customerList :customer="customerlistModel" :loadingChild="loadingChild" @stickCustome="stickCustomeByData" @changeLoadingChildStatus="changeLoadingChildStatus"  v-if="customerlistModel"></customerList>
                        </div>
                    </div>
                    <div class="customer-box-right" v-if="showCustomerLink">
                        <customerLink :customerLink="customerLinkModel" :curId="curStickId" @stickCustome="stickCustomeById"></customerLink>
                    </div>
                </div>
            </div>
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>
    </div>
    <div v-else>
        <v-tableSpin v-if="!pageErrorMsg"></v-tableSpin>
        <div class="pageErrorBox" v-else>{{pageErrorMsg}}</div>
    </div>
</template>

<script>
    import customerList from './component/customerList/index.vue'
    import customerLink from './component/customerLink/index.vue'
    import {list1,list2,list3} from './list'
    export default {
        data(){
            return {
                curStickId:null,
                customerLink:[],
                customerlist:null,
                allCustomerlist:{},
                searchInput:'',
                showPage:false,
                loading:false,
                loadingChild:false,
                pageErrorMsg:'',
                myMsg:{
                    lots:'',
                    team_lots:'',
                    team_no:'',
                    immediate_customer_no:'',
                    level_name:null
                }
            }
        },
        components: {
            customerList,
            customerLink
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
            }
        },
        beforeMount(){
            this.getMyMsg()
            this.getCustomerList()
        },
        methods:{
            //获取信息
            getMyMsg(data={},type=null){
                this.showPage=false
                var getMyMsgHttp=this.getMyMsgHttp(data)
                getMyMsgHttp.then((data) => {
                    this.myMsg=Object.assign(this.myMsg,data)
                    this.showPage=true
                }).catch((msg) => {
                    this.pageErrorMsg='加载失败'
                });
            },

            getMyMsgHttp(data){
                const ajaxData=data
                return new Promise((resolve, reject) => {
                    this.$http.get('customer',{params:ajaxData})
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
            search(){
                var real_name=this.searchInput
                var searchData={}
                if(real_name){
                    searchData={real_name}
                }else{
                    searchData={}
                }
                this.getCustomerList(searchData,'search')
            },
            //获取列表
            getCustomerList(data={},type=null){
                var getCustomerList=this.getCustomerListHttp(data)
                Promise.all([getCustomerList]).then((data) => {
                    var customer=data[0]
                    if(type==='search'||type==='link'){
                        this.setModel(customer,false)
                    }else{
                        this.setModel(customer)
                        if(this.myMsg.level_name===null){
                            this.myMsg.level_name=customer.users.level.name
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

            getCustomerListHttp(data){
                const ajaxData=data
                this.loading=true
                return new Promise((resolve, reject) => {
                    this.$http.get('customer/team',{params:ajaxData})
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
                                reject('搜索失败')
                            }
                        }).catch((error) =>{
                        reject('搜索失败')
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
        },
        activated(){
            this.$emit("changeTab", 0)//切换局部导航
        }
    }
</script>