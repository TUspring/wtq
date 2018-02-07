<style lang="less" scoped>
    .layout-content-main {
        padding:10px;
    }
    .addGrade {
        width:140px;
        height:34px;
        line-height: 34px;
        text-align: center;
        color:#fff;
        background:#ffa114;
        border-radius: 6px;
        margin-left:10px;
        margin-top:20px;
        margin-bottom:10px;
        cursor:pointer;
        font-size: 14px;
    }
    /*========列表========*/
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
    .btnClass {
        border:1px solid #ffa114;
        color:#ffa114;
        padding:3px 8px;
        border-radius:6px;
        cursor:pointer;
    }
    .delete {
        background:#EEEEEE;
        border:none;
        color:#999999;
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
        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData="modalData" @nomalRefresh="nomalRefresh" @deleteRefresh="deleteRefresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >返佣管理</BreadcrumbItem>
                <BreadcrumbItem>经纪人等级及佣金管理</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="addGrade" @click="showModal('addGrade')">新增等级</div>

        <!--列表-->
        <div class="list_box">
            <table  border="1" width="100%">
                <tr>
                    <th>等级排序</th>
                    <th>等级名称</th>
                    <th>直接佣金($)</th>
                    <th>间接佣金($)</th>
                    <th>同级奖励</th>
                    <th>操作</th>
                </tr>
                <tr v-for="value in listModal"  v-if="listModal.length && !loading">
                    <td>{{value.level}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.direct_commission}}</td>
                    <td>{{value.indirect_commission}}</td>
                    <td>{{value.peer_reward}}%</td>
                    <td>
                        <!--<span class="btnClass set"  @click="showModal('set',value)">设置</span>-->
                        <Button type="success"  @click="showModal('set',value)">设置</Button>
                        <!--<span class="btnClass delete" @click="showModal('delete',value)">删除</span>-->
                    </td>
                </tr>
            </table>
            <!--=======加载中=====-->
            <v-tableSpin v-show="loading"></v-tableSpin>
        </div>
        <!--暂无数据-->
        <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>
        <div class="pageIndex_box" v-show="pageBtn">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>

    </div>
</template>

<script>
    import addGradeModal from './component/addGradeModal/addGradeModal.vue'
    import setModal from './component/setModal/setModal.vue'
    import deleteModal from './component/deleteModal/deleteModal.vue'
    export default {
        components:{
            addGradeModal,
            setModal,
            deleteModal
        },
        data(){
            return{
                pageBtn:false,
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    addGrade: {
                        name: 'addGradeModal',   //新增等级
                        width: ''
                    },
                    set: {
                        name: 'setModal',   //设置
                        width: ''
                    },
                    delete: {
                        name: 'deleteModal',   //同意
                        width: ''
                    }
                },
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                modalData:{},        //传给子组件的数据
                agentGradeList:''     //返回数据
            }
        },
        computed:{
            listModal(){
                return this.agentGradeList
            }
        },
        beforeMount(){
            this.getAgentGradeList()
        },
        methods:{
            //刷新 新增/删除
            nomalRefresh(){
                this.getAgentGradeList()
            },
            deleteRefresh(){
                this.getAgentGradeList()
            },

            //获取经纪人等级及佣金管理列表
            getAgentGradeList(page=1){
                this.loading = true
                var ajaxData = {
                    page
                }
                this.$http.get('/admin/level',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        var {current_page,last_page,per_page,total,data:list}=retData
                        var pageIndexMsg={current_page,last_page,per_page,total}
                        if(current_page!='1'&&!list.length){
                            this.agentGradeList(--current_page)
                        }
                        Object.assign(this.pageIndex,pageIndexMsg)
                        this.agentGradeList = list
                        this.loading = false
                    }
                })
            },
            //分页
            changePage(page){
                this.getAgentGradeList(page)
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
                    openName:'rebateManage',
                    activeName:'agentGradeAndCommissionManage'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>