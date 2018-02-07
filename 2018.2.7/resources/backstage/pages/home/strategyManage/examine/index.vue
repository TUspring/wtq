<style lang="css" scoped src="./css/index.css"></style>
<style>
    .list_box {
        /*overflow-x: scroll;*/
    }
    .layout-content-main .ivu-select-large.ivu-select-single .ivu-select-selection{
        height: 34px;
    }
</style>
<template>
    <div class="layout-content-main">

        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
               :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg" @refresh="refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>策略管理</BreadcrumbItem>
                <BreadcrumbItem>策略审核</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-container">
            <div class="examine-top">
                <div class="leftInfo">
                    <p>共 <span class="number"> {{examineForm.total}} </span> 条记录</p>
                </div>
                <div class="rightInfo">
                    <div class="rightInfo-l">
                        <span>状态：</span>
                        <Select style="width:120px;margin-left: 20px" size="large" placeholder="全部" v-model="selectPort" @on-change="searchType()">
                            <Option :value="1">全部</Option>
                            <Option :value="0">待审核</Option>
                            <Option :value="2">已拒绝</Option>
                            <Option :value="6">发布中</Option>
                        </Select>
                    </div>
                    <div class="rightInfo-r">
                        <input type="text" placeholder="请输入策略名称" v-model="search" @keyup.enter="Submit">
                        <span @click="searchTop">搜索</span>
                    </div>
                </div>
            </div>
            <div class="table-content list_box">
                <table border="1" width="100%">
                    <thead>
                    <tr>
                        <th>昵称</th>
                        <th>手机号码</th>
                        <th>策略名称</th>
                        <th>交易商名称</th>
                        <th>观摩MT4账号</th>
                        <th>服务器名称</th>
                        <th>投资人密码</th>
                        <th>策略详情</th>
                        <th>申请时间</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tr v-for="item in examineDataForm" class="examine-ct">
                        <td>{{item.user.name}}</td>
                        <td>{{item.user.phone}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.trade_platform.platform}}</td>
                        <td>{{item.MT4_account}}</td>
                        <td>{{item.trade_platform.server_name}}</td>
                        <td>{{item.investor_password}}</td>
                        <td>
                            <Icon type="eye" size="36" class="Eyeicon"
                                  @click.native="showModal('details',{id:item,platformList})"></Icon>
                        </td>
                        <td>{{item.created_at}}</td>
                        <!--订单状态-0审核中-1审核成功-2审核拒绝-5提前下架-->
                        <td>
                            <span v-if="item.review_status==0">审核中</span>
                            <span v-if="item.review_status==1">审核成功</span>
                            <span v-if="item.review_status==2">审核拒绝</span>
                            <span v-if="item.review_status==5">提前下架</span>
                            <span v-if="item.review_status==6">发布中</span>
                        </td>
                        <td><span  v-if="item.refused" class="refuseContent">{{item.refused.content}}</span></td>
                        <td style="width: 12%;">
                            <!--<ul class="operation">-->
                                <!--<li v-if="item.review_status!=1&&item.review_status!=6">-->
                                    <!--<span @click="showModal('publishing',{id:item,platformList})" >发布</span></li>-->
                                <!--<li v-if="item.review_status!=2">-->
                                    <!--<span @click="showModal('refuse',{id:item})">拒绝</span></li>-->
                                <!--&lt;!&ndash;<li><span @click="preview(item.id)">预览</span></li>&ndash;&gt;-->
                            <!--</ul>-->
                            <Button  v-if="item.review_status!=1&&item.review_status!=6" type="primary"  @click="showModal('publishing',{id:item,platformList})">发布</Button>
                            <Button  v-if="item.review_status!=2" type="error" @click="showModal('refuse',{id:item})">拒绝</Button>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
        <v-tableSpin v-show="loading"></v-tableSpin>
        <div v-if="examineDataForm==''&&!loading" style="text-align: center;font-size: 16px;padding-top: 30px">暂无数据</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>

</template>
<script>
    import publishingStrategy from './components/publishing_strategy/index.vue'
    import refusePublish from './components/refusePublish/index.vue'
    import detailsModal from './components/detailsModal/detailsModal.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            'publishingStrategy': publishingStrategy,
            'detailsModal': detailsModal,
            'refusePublish': refusePublish
        },
        data(){
            return {
                loading:false,
                platformDataList: '',
                examineForm: '',
                examineDataForm: '',
                iviewModal: false,
                platformList: '',
                arrDataListInfo: '',
                selectPort:'',
                showPage: false,
                searchList:'',
                search:'',
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    publishing: {
                        name: 'publishingStrategy',
                        width: '600'
                    },
                    refuse: {
                        name: 'refusePublish',
                        width: '514'
                    },
                    details: {
                        name: 'detailsModal',
                        width: '514'
                    },
                },
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                   total: 1
               },
                reviewStatus:'',
            }
        },
        computed: {

       },
        beforeMount(){
            this.getExamineInfo()
            this.platformCooperative()
        },
        mounted(){
            this.changeLeftNav()
        },
        methods: {
            changePage(page){
                this.getAnalogList(page)
            },

            getAnalogList(page=1){
                         var getAnalogList=this.getExamineInfo(page)
                        Promise.all([getAnalogList]).then(() => {
                         this.showPage=true
                                }).catch(() => {
                               });
                            },

            getExamineInfo(page=1){
                if(this.selectPort==1){
                    this.selectPort=''
                }
               const ajaxData={
                  review_status:this.selectPort,
                         page
                         }
                console.log(ajaxData);
                //请求策略列表数据
                return new Promise((resolve, reject) => {
                   this.loading=true
                        this.$http.get('/admin/policy',{params:ajaxData})
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.examineForm = retData
                                var {current_page,last_page,per_page,total,data:list}=retData
                                this.analogListLen = retData.total
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                this.getAnalogList(--current_page)
                                           }
                                this.examineDataForm = retData.data
                                Object.assign(this.pageIndex,pageIndexMsg)
                                this.loading=false
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            //列表和交易商构建新列表
            getListModal(data){
                var list = []
                var p_list = this.platformList
                for (let i in data) {
                    var item = data[i]
                    for (let i in p_list) {
                        var p_item = p_list[i]
                        if (item.trade_platform_id == p_item.id) {
                            item.platform = p_item.platform
                            item.server_name = p_item.server_name
                        }
                    }
                    list.push(item)
                }
                return list
            },

            //请求交易商平台列表
            platformCooperative(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/platform/cooperative')
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.platformList = retData
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            Submit () {
                this.searchTop()
            },
            searchTop(){
//               this.selectPort=4
                var ajaxData = {
                    search: this.search
                }
                this.loading=true
                this.$http.get('/admin/policy', {params:ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData}=data;
                        if (retCode == '0') {
                            this.examineDataForm=retData.data
                            this.loading=false
                        } else {
                            this.$Message.error({content: '搜索失败'})
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            searchType(){
                this.getAnalogList()
            },
            changeLeftNav(){
                var leftNav = {
                    openName: 'strategyManage',
                    activeName: 'examine'
                }
                this.$emit("changeLeftNav", leftNav)
            },
            publishing(){
                var data = {
                    publishing_strategy: {
                        show: true
                    }
                };
                this.changeCompontentStates(data)
            },
            showModal(name, data = {}){
                const modalList = this.modalList
                this.modalMsg = data
                this.curModal = modalList[name],
                    this.iviewModal = true
            },
            refresh(){
                this.getExamineInfo(this.pageIndex.current_page)
            },

            preview(UserId){
                this.$router.push({
                    path: '/examinePreview/'+UserId
                })
            }
        }
    }

</script>

