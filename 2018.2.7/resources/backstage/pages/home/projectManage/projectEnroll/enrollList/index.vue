

<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }


    .newUserList-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .newUserList-content .leftInfo {
        float: left;
        width: 140px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        box-shadow: 0px 0px 3px 0px #CCCCCC;
        background-color: #fff;
    }

    .leftInfo .number {
        color: #ffa114;
    }

    /*.rightInfo {*/
        /*float: right;*/
        /*height: 34px;*/
        /*padding-right: 50px;*/
        /*display: flex;*/
        /*justify-content: space-between;*/
    /*}*/

    /*.rightInfo-r {*/
        /*margin-left: 50px;*/
    /*}*/

    /*.rightInfo-r input {*/
        /*width: 174px;*/
        /*height: 34px;*/
        /*border: 1px solid #CCCCCC;*/
        /*box-sizing: border-box;*/
        /*vertical-align: top;*/
        /*padding-left: 10px;*/
    /*}*/

    /*.rightInfo-r span {*/
        /*width: 70px;*/
        /*height: 34px;*/
        /*background-color: #ffa114;*/
        /*color: #FFFFFF;*/
        /*font-size: 14px;*/
        /*display: inline-block;*/
        /*line-height: 34px;*/
        /*text-align: center;*/
        /*margin-left: 5px;*/
        /*cursor: pointer;*/
    /*}*/



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
        height:50px;
        text-align:center;
    }


    .icon-eye-box{
        font-size: 36px;
        color: #999999;
        cursor: pointer;
    }
    .icon-eye{
        color: #999999;
    }
    .icon-eye-box .icon-eye:hover{
        color: #ffa114;
    }

    .operation-box span{
        padding:0px 10px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        border: 1px solid #D4D4D4;
        border-radius: 4px;
        cursor: pointer;
    }
    .operation-box span:hover{
        color: #ffa114;
        border: 1px solid #ffa114;
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
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >项目管理</BreadcrumbItem>
                <BreadcrumbItem>报名中项目</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="newUserList-content">
            <div class="leftInfo">
                <p>共 <span class="number"> {{totalNum ? totalNum : '-'}} </span>条记录</p>
            </div>

            <!--<div class="rightInfo">-->
                <!--<div class="rightInfo-l">-->
                    <!--<span>状态：</span>-->
                    <!--<Select style="width:120px;margin-left: 20px" size="large" placeholder="全部">-->
                        <!--<Option value="1">全部</Option>-->
                        <!--<Option value="2">已审核</Option>-->
                        <!--<Option value="3">未审核</Option>-->
                    <!--</Select>-->
                <!--</div>-->
                <!--<div class="rightInfo-r">-->
                    <!--<input type="text" placeholder="请输入姓名/项目名称">-->
                    <!--<span>搜索</span>-->
                <!--</div>-->
            <!--</div>-->
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>项目名称</th>
                    <th>项目类型</th>
                    <th>标准账号平台</th>
                    <th>标准账号</th>
                    <th>登录状态</th>
                    <th>项目详情</th>
                    <th>利润提成比例</th>
                    <th>报名截止时间</th>
                    <th>参与详情</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in project_ListData">
                    <td>{{item.users.name}}</td>
                    <td>{{item.users.phone}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        <!--1-保本保息型 2-保本型 3-普通型-->
                        <span v-if="item.project_type==1">保本利息型</span>
                        <span v-if="item.project_type==2">保本型</span>
                        <span v-if="item.project_type==3">普通型</span>
                    </td>
                    <td>{{item.standard_mt4_account ? item.standard_mt4_account.platform.platform : '-'}}</td>
                    <td>{{item.standard_mt4_account ? item.standard_mt4_account.MT4_account : '-'}}</td>
                    <td>
                        <!--1:在线 2:登录失败 3:验证中-->
                        <span v-if="item.login_status==1">在线</span>
                        <span v-if="item.login_status==2">登录失败</span>
                        <span v-if="item.login_status==3">验证中</span>
                    </td>
                    <td class="icon-eye-box">
                        <span @click="showModal('projectDetails',{id:item.id})"><Icon type="eye" class="icon-eye"></Icon></span>
                    </td>
                    <td>{{item.trader_royalty_rate ? item.trader_royalty_rate +'%' :'--'}}</td>
                    <td>{{item.registration_deadline}}</td>
                    <td class="icon-eye-box">
                        <!--<router-link :to="{path:'/projectManage/projectEnroll/participateDetails/'+item.id}">-->
                        <span @click="participateDetails({id:item.id,name:item.name})"><Icon type="eye" class="icon-eye"></Icon></span>
                        <!--</router-link>-->

                    </td>
                    <td class="operation-box">
                        <!--<span @click="showModal('offShelf',{id:item.id,name:item.name})">提前结束</span>-->
                        <Button type="error"  @click="showModal('offShelf',{id:item.id,name:item.name})">提前结束</Button>
                    </td>
                </tr>
            </table>
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>
        <!--暂无数据-->
        <div class="no_data" v-if="project_ListData==''&&!loading">暂无数据 ！</div>
        <div class="pageIndex_box">
        <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>
<script>
    import  offShelfModal from './components/offShelfModal/index.vue'
    import  detailsModal from './components/detailsModal/index.vue'
    export default {
        components:{
            offShelfModal,
            detailsModal,
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
                    offShelf: {
                        name: 'offShelfModal',
                        width: ''
                    },
                    projectDetails: {
                        name: 'detailsModal',
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
            this.getProjectEnrollListData()
        },

        methods:{

            getProjectEnrollListData(page=1){
                var ajaData={
                    page,
                }
                this.loading=true
                this.$http.get('/admin/regular_project/enroll',{params:ajaData})
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

            participateDetails(obj){
                this.$router.push({
                    path:'/projectManage/projectEnroll/participateDetails/'+obj.id,
                    query:{name:obj.name}
                })
            },


            //分页
            changePage(page){
                this.getProjectEnrollListData(page)
            },

            Refresh(){
               this.getProjectEnrollListData()
            },
            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },

        }
    }
</script>













