<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }

    .projectExamine-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .projectExamine-content .leftInfo {
        float: left;
        width: 140px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        box-shadow: 0px 0px 3px 0px #CCCCCC;
        background-color: #fff;
    }
    .leftInfo  .number{
        color: #ffa114;
    }
    .list_box {
        margin-left:10px;
        margin-right:10px;
    }
    table {
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .list_box  th {
        height:40px;
        color:#666666;
        font-size:14px;
        background:#F5F7F9;
    }
    .list_box  td {
        width: 7%;
        height:50px;
        text-align:center;
    }

.icon-eye-box{
    font-size: 36px;
    color: #999999;
    cursor: pointer;
}
    .icon-eye-box:hover{
        color: #ffa114;
    }
    /*.operation-box span{*/
        /*width: 50px;*/
        /*height: 30px;*/
        /*line-height: 30px;*/
        /*display: inline-block;*/
        /*border: 1px solid #D4D4D4;*/
        /*border-radius: 4px;*/
        /*cursor: pointer;*/
    /*}*/
    /*.operation-box span:hover{*/
        /*color: #ffa114;*/
        /*border: 1px solid #ffa114;*/
    /*}*/


    .pageIndex_box{
        height: 42px;
        line-height: 40px;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        margin-top: 20px;
    }
    .no_data {
        text-align: center;
        margin-top:30px;
        font-size:20px;
        color:#999999;
    }

</style>
<template>
    <div class="layout-content-main">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg" @Refresh="Refresh">
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >项目管理</BreadcrumbItem>
                <BreadcrumbItem>项目审核</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="projectExamine-content">
            <div class="leftInfo">
                <p>共 <span class="number">{{totalNum ? totalNum : '-'}}</span>条记录</p>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>项目名称</th>
                    <th>项目类型</th>
                    <th>交易商名称</th>
                    <th>观摩MT4账号</th>
                    <th>服务器名称</th>
                    <th>投资人密码</th>
                    <th>项目详情</th>
                    <th>申请时间</th>
                    <th>状态</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in project_ListData">
                    <td>{{item.users.name}}</td>
                    <td>{{item.users.phone}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        <!--1-保本保息型 2-保本型 3-普通型-->
                      <span v-if="item.project_type==1">保本保息型</span>
                      <span v-if="item.project_type==2">保本型</span>
                      <span v-if="item.project_type==3">普通型</span>
                    </td>
                    <td>{{item.trade_platform.platform}}</td>
                    <td>{{item.MT4_account}}</td>
                    <td>{{item.trade_platform.server_name}}</td>
                    <td>{{item.investor_password}}</td>
                    <td class="icon-eye-box">
                        <span @click="showModal('projectDetails',{id:item.id})"><Icon type="eye"></Icon></span>
                    </td>
                    <td>{{item.created_at}}</td>
                    <td>
                        <!--0审核中- 1审核成功报名中- 2进行中- 3结束- 4审核拒绝- 5提前结束-->
                        <span v-if="item.review_status==0">审核中</span>
                        <span v-if="item.review_status==1">审核成功报名中</span>
                        <span v-if="item.review_status==2">进行中</span>
                        <span v-if="item.review_status==3">结束</span>
                        <span v-if="item.review_status==4">审核拒绝</span>
                        <span v-if="item.review_status==5">提前结束</span>
                        <span v-if="item.review_status==6">发布中</span>
                    </td>
                    <td style="width: 10%;">
                        {{item.trader_fail_publish_reason ? item.trader_fail_publish_reason.content :''}}
                    </td>
                    <td style="width: 18%;"  class="operation-box">
                        <!--<span v-if="item.review_status!=4&&item.review_status!=6" @click="showModal('published',{id:item.id,name:item.name})">发布</span>-->
                        <!--<span v-if="item.review_status!=4&&item.review_status!=6" @click="showModal('refuse',{id:item.id,name:item.name})">拒绝</span>-->
                        <Button type="primary"  v-if="item.review_status!=4&&item.review_status!=6" @click="showModal('published',{id:item.id,name:item.name})">发布</Button>
                        <Button type="error"  v-if="item.review_status!=4&&item.review_status!=6" @click="showModal('refuse',{id:item.id,name:item.name})">拒绝</Button>
                        <p v-if="item.review_status==4||item.review_status==6">--</p>
                        <!--<span @click="analysis">分析</span>-->
                    </td>
                </tr>
            </table>
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>
        <!--暂无数据-->
        <!--v-if="!listModal.length && !loading"-->
        <div class="no_data" v-if="project_ListData==''&&!loading">暂无数据 ！</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>
<script>
    import  projectDetailsModal from './components/detailsModal/index.vue'
    import publishedModal from  './components/publicModal/index.vue'
    import refuseModal from  './components/refuseModal/index.vue'
    export default {
        components: {
            projectDetailsModal,
            refuseModal,
            publishedModal,
        },
        data(){
            return {
                loading:false,
                iviewModal: false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    projectDetails: {
                        name: 'projectDetailsModal',
                        width: ''
                    },
                    published: {
                     name: 'publishedModal',
                     width: ''
                  },
                    refuse: {
                        name: 'refuseModal',
                        width: ''
                    },
                },
                modalMsg: {},  //传给子组件的数据
                project_ListData:'',
                totalNum:'',
            }
        },
        computed: {

        },
        beforeMount() {
     this.getProjectExamineList()
        },

        methods:{
            getProjectExamineList(page=1){
                var ajaxData={
                    page,
                }
                this.loading=true
                this.$http.get('/admin/regular_project/check',{params: ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.totalNum=retData.total
                            var {current_page, last_page, per_page, total, data:list}=retData
                            var pageIndexMsg = {current_page, last_page, per_page, total}
                            if (current_page != '1' && !list.length) {
                                this.getProjectExamineList(--current_page)
                            }
                            Object.assign(this.pageIndex, pageIndexMsg)
                            this.project_ListData = list
                            this.loading=false
                        }
                            })
                    .catch((error)=>{

                })
            },


            Refresh(){
                //刷新
                this.getProjectExamineList()
            },
            //分页
            changePage(page){
                this.getProjectExamineList(page)
            },
            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },

            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'projectExamine',
                    activeName:'projectManage'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













