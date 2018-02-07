<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }
    .brokerList-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .brokerList-content .leftInfo {
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
        height:40px;
        color:#666666;
        font-size:14px;
        background:#F5F7F9;
    }
    .list_box  td {
        width: 10%;
        height:50px;
        text-align:center;
    }
    .trader-pic{
        width: 100px;
        height: 50px;
        margin-top: 3px;
        cursor: pointer;
        display: inline-block;
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
                <BreadcrumbItem >用户管理</BreadcrumbItem>
                <BreadcrumbItem>经纪人列表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="brokerList-content">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>

        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>账号ID</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>身份证号</th>
                    <th>申请时间</th>
                    <th>身份证正面照</th>
                    <th>身份证背面照</th>
                </tr>
                <tr v-for="value in listModal"  v-if="listModal.length && !loading">
                    <td>{{value.id}}</td>
                    <td>{{value.real_name}}</td>
                    <td>{{value.phone}}</td>
                    <td>{{value.ID_number}}</td>
                    <td>{{value.created_at}}</td>
                    <td>
                        <img class="trader-pic" :src="value.users_face.path" alt="" @click="showModal('scalePic',{picPath:value.users_face.path})">
                    </td>
                    <td>
                        <img class="trader-pic" :src="value.users_back.path" alt="" @click="showModal('scalePic',{picPath:value.users_back.path})">
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
    import scalePicModal from './showPicModal/index.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            scalePicModal,
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
                    scalePic: {
                        name: 'scalePicModal',
                        width: ''
                    },
                },
                modalMsg: {},

                agentList:''         //经纪人列表数据
            }
        },
        computed: {
            listModal(){
                return this.agentList
            }
        },
        beforeMount() {
            this.getAgentList()
        },
        methods:{
            //获取经纪人列表
            getAgentList (page=1){
                this.loading = true
                var ajaxData = {
                    page
                }
                this.$http.get('/admin/broker',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        var {current_page,last_page,per_page,total,data:list}=retData
                        var pageIndexMsg={current_page,last_page,per_page,total}
                        if(current_page!='1'&&!list.length){
                            this.getAgentList(--current_page)
                        }
                        Object.assign(this.pageIndex,pageIndexMsg)
                        this.agentList = list
                        this.loading = false
                    }
                })
            },
            //分页
            changePage(page){
                this.getAgentList(page)
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
                    openName:'userManage',
                    activeName:'BrokerList'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













