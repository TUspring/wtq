<style lang="less" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .top_content {
        width:100%;
        margin-top:20px;
        margin-bottom:10px;
        padding:0 10px;
        font-size: 16px;
    }
    .leftInf {
        float:left;
    }
    .leftInf span {
        color:#ffa114;
    }
    .rightInf {
        float:right;
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
    .btnClass {
        border:1px solid #ffa114;
        color:#ffa114;
        padding:3px 8px;
        cursor:pointer;
        border-radius: 6px;
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
                <BreadcrumbItem href="/projectManage/completedProject">已结束项目</BreadcrumbItem>
                <BreadcrumbItem>参与详情</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="top_content cl">
            <div class="leftInf">
                <span>{{name}}</span>
                参与详情
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
                    <th>跟随状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="value in listModal"  v-if="listModal.length && !loading">
                    <td>{{value.users.real_name}}</td>
                    <td>{{value.users.phone}}</td>
                    <td>{{value.mt4_account.platform.platform}}</td>
                    <td>{{value.mt4_account.MT4_account}}</td>
                    <td>{{value.join_money}}</td>
                    <td>
                        <span v-if="value.status == 0">已解除</span>
                        <span v-if="value.status == 1">跟随中</span>
                        <span v-if="value.status == 2">暂停中</span>
                    </td>
                    <td>
                        <!--<span v-if="value.users.is_blackList == 0" class="btnClass" @click="showModal('addBlacklist',{id:value})">加入黑名单</span>-->
                        <!--<span  v-if="value.users.is_blackList == 1" class="btnClass" @click="showModal('addUnpaidBill',{id:value})">添加未支付账单</span>-->
                        <Button type="error" v-if="value.users.is_blackList == 0" @click="showModal('addBlacklist',{id:value})">加入黑名单</Button>
                        <Button type="warning" v-if="value.users.is_blackList == 1" @click="showModal('addUnpaidBill',{id:value})">添加未支付账单</Button>
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
    import addBlacklistModal from './component/addBlacklistModal/addBlacklistModal.vue'
    import addUnpaidBillModal from './component/addUnpaidBillModal/addUnpaidBillModal.vue'
    export default {
        components:{
            addBlacklistModal,
            addUnpaidBillModal
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
                    addBlacklist: {
                        name: addBlacklistModal,
                        width: ''
                    },
                    addUnpaidBill: {
                        name: addUnpaidBillModal,
                        width: ''
                    }
                },
                modalMsg: {},  //传给子组件的数据

                name:'',                  //姓名
                id:'',                   //项目ID
                detailList:''           //返回数据
            }
        },
        computed:{
            listModal(){
                return this.detailList
            }
        },
        beforeMount(){
            this.name = this.$route.query.name
            this.id = this.$route.query.id
            this.getDetailList()
        },
        methods:{
            //刷新
            Refresh(){
                this.getDetailList(this.pageIndex.current_page)
            },

            //获取参与详情数据
            getDetailList(page=1){
                this.loading = true
                var ajaxData = {
                    page
                }
                this.$http.get('/admin/regular_project/endJoinDetail/'+this.id,{parmas:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            var {current_page, last_page, per_page, total, data:list}=retData
                            var pageIndexMsg = {current_page, last_page, per_page, total}
                            if (current_page != '1' && !list.length) {
                                this.getDetailList(--current_page)
                            }
                            Object.assign(this.pageIndex, pageIndexMsg)
                            this.detailList = list
                            this.loading = false
                        }
                    })
            },
            //分页
            changePage(page){
                this.getDetailList(page)
            },

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            }

        }
    }
</script>