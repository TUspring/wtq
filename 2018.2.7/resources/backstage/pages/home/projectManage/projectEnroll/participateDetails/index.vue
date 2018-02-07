
<style lang="css" scoped>
    .layout-content-main {
        padding: 20px 20px 50px;
    }

    .newUserList-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        padding:0px 10px;
    }

    .newUserList-content .leftInfo {
        float: left;
        height: 34px;
        line-height: 34px;

    }
    .details-title{
        font-size: 16px;
    }

    .rightInfo {
        float: right;
        height: 34px;
        line-height: 34px;
        display: flex;
        justify-content: space-between;
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
        height:50px;
        text-align:center;
    }

    .operation-box span{
        width: 60px;
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


    .page_box{
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

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>项目管理</BreadcrumbItem>
                <BreadcrumbItem href="/projectManage/projectEnroll">报名中项目</BreadcrumbItem>
                <BreadcrumbItem>参与详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="newUserList-content">
            <div class="leftInfo">
                <p class="details-title"><span style="color: #ffa114;">{{projectName}}</span> 参与详情</p>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>平台名称</th>
                    <th>MT4账号</th>
                    <th>参与金额</th>
                </tr>
                <tr v-for="item in details_ListData">
                    <td>{{item.users.real_name}}</td>
                    <td>{{item.users.phone}}</td>
                    <td>{{item.mt4_account.platform.platform}}</td>
                    <td>{{item.mt4_account.MT4_account}}</td>
                    <td>{{item.join_money}}</td>
                </tr>
            </table>
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>
        <!--暂无数据-->
        <div class="no_data" v-if="!details_ListData.length && !loading">暂无数据 ！</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                loading:false,
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {

                },

                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
                modalMsg: {},  //传给子组件的数据
                participateDetailsId:'',
                details_ListData:'',
                totalNum:'',
                projectName:'',
            }
        },
        computed: {},
        beforeMount() {
            this.projectName=this.$router.currentRoute.query.name
            this.participateDetailsId=this.$router.currentRoute.params.id
            this.getDetailsListData()
        },
        mounted () {

        },
        destroyed () {
        },
        methods: {

            getDetailsListData(){
                this.loading=true
                this.$http.get('/admin/regular_project/joinDetail/'+this.participateDetailsId)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.totalNum=retData.total
                            var {current_page, last_page, per_page, total, data:list}=retData
                            var pageIndexMsg = {current_page, last_page, per_page, total}
                            if (current_page != '1' && !list.length) {
                                this.getDetailsListData(--current_page)
                            }
                            Object.assign(this.pageIndex, pageIndexMsg)
                            this.details_ListData = list
                            this.loading=false
                        }
                    })
                    .catch((error)=>{

                    })
            },

            //分页
            changePage(page){
                this.getDetailsListData(page)
            },

        }
    }
</script>
