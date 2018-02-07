

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

    .rightInfo {
        float: right;
        height: 34px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
    }

    .rightInfo-r {
        margin-left: 50px;
    }

    .rightInfo-r input {
        width: 174px;
        height: 34px;
        border: 1px solid #CCCCCC;
        box-sizing: border-box;
        vertical-align: top;
        padding-left: 10px;
    }

    .rightInfo-r span {
        width: 70px;
        height: 34px;
        background-color: #ffa114;
        color: #FFFFFF;
        font-size: 14px;
        display: inline-block;
        line-height: 34px;
        text-align: center;
        margin-left: 5px;
        cursor: pointer;
    }



    .list_box {
        padding:0 10px;
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
    .eye{
        font-size: 36px;
        color: #999999;
        cursor: pointer;
    }
    .eye:hover{
        color: #ffa114;
    }
    .remarkList {
        /*display: flex;*/
        align-items: center;
        justify-content: center;
    }
    .remarkList .remark {
        max-width:100px;
        text-align: center;

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
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >项目管理</BreadcrumbItem>
                <BreadcrumbItem>已结束项目</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="newUserList-content">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
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
                    <th>标准账号平台</th>
                    <th>标准账号</th>
                    <th>登录状态</th>
                    <th>项目详情</th>
                    <th>参与人数</th>
                    <th>总参与资金</th>
                    <th>参与详情</th>
                    <th>状态</th>
                    <th>备注</th>
                </tr>
                <tr  v-for="value in listModal"  v-if="listModal.length && !loading">
                    <td>{{value.users.name}}</td>
                    <td>{{value.users.phone}}</td>
                    <td>{{value.name}}</td>
                    <td>
                        <span v-if="value.project_type == 1">保本保息型</span>
                        <span v-if="value.project_type == 2">保本型</span>
                        <span v-if="value.project_type == 3">普通型</span>
                    </td>
                    <td>{{value.standard_mt4_account ? value.standard_mt4_account.platform.platform:'--'}}</td>
                    <td>{{value.standard_mt4_account ? value.standard_mt4_account.MT4_account:'--'}}</td>
                    <td>
                        <span v-if="value.login_status == 1">登陆成功</span>
                        <span v-if="value.login_status == 2">验证中</span>
                        <span v-if="value.login_status == 3">登陆失败</span>
                    </td>
                    <td>
                        <Icon type="eye" class="eye"  @click.native="showModal('details',{id:value})" ></Icon>
                    </td>
                    <td>{{value.total_join_number}}</td>
                    <td>{{value.total_join_money}}</td>
                    <td>
                        <Icon type="eye" class="eye" @click.native="detail(value.id,value.name)"></Icon>
                    </td>
                    <td>
                        <span v-if="value.review_status == 3">到期结束</span>
                        <span v-if="value.review_status == 5">提前结束</span>
                    </td>
                    <td class="remarkList">
                        <div v-if="value.review_status == 5" class="remark">
                           {{value.trader_fail_publish_reason ? value.trader_fail_publish_reason.content:'--'}}
                        </div>
                    </td>
                </tr>
            </table>
            <!--=======加载中=====-->
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>

        <!--暂无数据-->
        <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>

    </div>
</template>
<script>
    import detailsModal from './component/detailsModal/detailsModal.vue'
    export default {
        components:{
            detailsModal
        },
        data(){
            return {
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    details: {
                        name: detailsModal,
                        width: ''
                    }
                },
                finishList:'',
                modalMsg: {}  //传给子组件的数据
            }
        },
        computed: {
            listModal(){
                return this.finishList
            }
        },
        beforeMount() {
            this.getFinishList()
        },

        methods:{
            //获取已结束列表信息
            getFinishList(page=1){
                this.loading = true
                var ajaxData = {
                    page
                }
                this.$http.get('/admin/regular_project/finish',{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0') {
                            var {current_page, last_page, per_page, total, data:list}=retData
                            var pageIndexMsg = {current_page, last_page, per_page, total}
                            if (current_page != '1' && !list.length) {
                                this.getFinishList(--current_page)
                            }
                            Object.assign(this.pageIndex, pageIndexMsg)
                            this.finishList = list
                            this.loading = false
                        }
                    })
            },
            //分页
            changePage(page){
                this.getFinishList(page)
            },

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },

            detail(id,name){
                var value = JSON.stringify(id)
                var name = name
                this.$router.push({
                    path:'/projectManage/completedProject/completedProjectDetail',
                    query:{id:value,name:name}
                })
            }
        }
    }
</script>













