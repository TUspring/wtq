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


    .rightInfo {
    float: right;
    height: 34px;
    padding-right: 50px;
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
        margin-left:10px;
        margin-right:10px;
    }
    table {
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .list_box  th {
        width:12%;
        height:40px;
        color:#666666;
        font-size:14px;
        background:#F5F7F9;
    }
    .list_box  td {
        width: 12%;
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
                <BreadcrumbItem>黑名单</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="projectExamine-content">
            <div class="leftInfo">
                <p>共 <span class="number">{{totalNum ? totalNum : '-'}}</span>条记录</p>
            </div>
            <div class="rightInfo">
            <div class="rightInfo-r">
            <input type="text" placeholder="请输入姓名" v-model="BlackListName">
            <span @click="search">搜索</span>
            </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th rowspan="2">姓名</th>
                    <th rowspan="2">手机号码</th>
                    <th rowspan="2">待支付总额（$）</th>
                    <th colspan="4">明细</th>
                    <th rowspan="2">操作</th>
                </tr>
                <tr>
                    <th>时间</th>
                    <th>MT4账号</th>
                    <th>项目名称</th>
                    <th>账单金额（$）</th>
                </tr>

            </table>
            <table style="margin-top: -1px" border="1" width="100%" v-for="item in blackManageData">
                <tr>
                    <td :rowspan="item.black_list.length+1">{{item.real_name}}</td>
                    <td :rowspan="item.black_list.length+1">{{item.phone}}</td>
                    <td :rowspan="item.black_list.length+1">{{item.total_unpaid_money ? item.total_unpaid_money :'--'}}</td>
                    <td>{{item.black_list[0].created_at}}</td>
                    <td>{{item.black_list[0].mt4_account ? item.black_list[0].mt4_account.MT4_account:'--'}}</td>
                    <td>{{item.black_list[0].regular_project.name}}</td>
                    <td>{{item.black_list[0].unpaid_money}}</td>
                    <td :rowspan="item.black_list.length+1" class="operation-box">
                        <!--<span @click="showModal('remove',{id:item.id,name:item.name,price:item.total_unpaid_money})">解除黑名单</span>-->
                        <Button type="warning"  @click="showModal('remove',{id:item.id,name:item.name,price:item.total_unpaid_money})">解除黑名单</Button>
                    </td>
                </tr>
                <tr v-for="(value,index) in item.black_list" v-if="index!=0">
                    <td>{{value.created_at}}</td>
                    <td>{{value.mt4_account ? value.mt4_account.MT4_account:'--'}}</td>
                    <td>{{value.regular_project.name}}</td>
                    <td>{{value.unpaid_money}}</td>
                </tr>
            </table>
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>
        <!--暂无数据-->
        <!--v-if="!listModal.length && !loading"-->
        <div class="no_data" v-if="blackManageData==''&&!loading">暂无数据 ！</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>
<script>
import removeBlacklistModal from './removeBlacklistModal/index.vue'
    export default {
        components: {
//            projectDetailsModal,
//            refuseModal,
//            publishedModal,
            removeBlacklistModal,
        },
        data(){
            return {
                BlackListName:'',
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
                    remove: {
                        name: 'removeBlacklistModal',
                        width: ''
                    },
//                    published: {
//                     name: 'publishedModal',
//                     width: ''
//                  },
//                    refuse: {
//                        name: 'refuseModal',
//                        width: ''
//                    },
                },
                modalMsg: {},  //传给子组件的数据
                blackManageData:'',
                totalNum:'',
            }
        },
        computed: {

        },
        filters: {
            timeStamp(value){
                return new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss")
            },
        },
        beforeMount() {
          this.getBlackManage()
        },

        methods:{
            getBlackManage(page=1){
                var ajaxData={
                    page,
                    name:this.BlackListName,
                }
                this.loading=true
                this.$http.get('/admin/regular_project/blackList',{params: ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.totalNum=retData.total
                            var {current_page, last_page, per_page, total, data:list}=retData
                            var pageIndexMsg = {current_page, last_page, per_page, total}
                            if (current_page != '1' && !list.length) {
                                this.getBlackManage(--current_page)
                            }
                            Object.assign(this.pageIndex, pageIndexMsg)
                            this.blackManageData = list
                            this.loading=false
                        }
                            })
                    .catch((error)=>{

                })
            },

            search(){
                this.getBlackManage()
            },
            Refresh(){
                //刷新
                this.getBlackManage()
            },
            //分页
            changePage(page){
                this.getBlackManage(page)
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













