<style lang="less" scoped>
    .examine-top {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        padding:0 10px;
    }

    .examine-top .leftInfo {
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
        float:right;
    }
    .rightInfo span {
        display: inline-block;
        width:80px;
        height:34px;
        line-height:34px;
        text-align: center;
        background:#ffa114;
        color:#fff;
        border-radius: 6px;
        cursor:pointer;
        margin-left:20px;
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
    .refuse {
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
<style lang="css" >
    .checkBoxClass .ivu-checkbox-wrapper + span,
    .checkBoxClass .ivu-checkbox + span {
        display: none;
    }

</style>

<template>
    <div class="apply_container">
        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData="modalData" @Refresh="Refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="examine-top">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>
            <div class="rightInfo">
                <!--<span   @click="showModal('batchAgreement',{idList:checkAllGroup,list:applyList})">批量同意</span>-->
                <!--<span   @click="showModal('batchRefuse',{idList:checkAllGroup,list:applyList})">批量拒绝</span>-->
                <Button type="warning" @click="showModal('batchAgreement',{idList:checkAllGroup,list:applyList})">批量同意</Button>
                <Button type="error" @click="showModal('batchRefuse',{idList:checkAllGroup,list:applyList})">批量拒绝</Button>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table  border="1" width="100%">
                <tr>
                    <th>
                        <Checkbox
                                :indeterminate="indeterminate"
                                :value="checkAll"
                                @click.prevent.native="handleCheckAll">全选
                        </Checkbox>
                    </th>
                    <th>申请时间</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>提现金额($)</th>
                    <th>银行卡号</th>
                    <th>银行名称</th>
                    <th>支行名称</th>
                    <th>操作</th>
                </tr>
                <tr v-for="value in listModal" v-if="listModal.length && !loading">
                    <td class="checkBoxClass">
                        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                            <Checkbox :label="value.id"></Checkbox>
                        </CheckboxGroup>
                    </td>
                    <td>{{value.created_at}}</td>
                    <td>{{value.bank.real_name}}</td>
                    <td>{{value.bank.reserved_phone}}</td>
                    <td>{{value.money}}</td>
                    <td>{{value.bank.bank_number}}</td>
                    <td>{{value.bank.bank_name}}</td>
                    <td>{{value.bank.sub_branch}}</td>
                    <td>
                        <!--<span class="btnClass agree"   @click="showModal('agree',{id:value})">同意</span>-->
                        <!--<span class="btnClass refuse"  @click="showModal('refuse',{id:value})">拒绝</span>-->
                        <Button type="warning" @click="showModal('agree',{id:value})">同意</Button>
                        <Button type="error" @click="showModal('refuse',{id:value})">拒绝</Button>
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
    import batchAgreementModal from './component/batchAgreementModal/batchAgreementModal.vue'
    import batchRefuseModal from './component/batchRefuseModal/batchRefuseModal.vue'
    import agreeModal from './component/agreeModal/agreeModal.vue'
    import refuseModal from './component/refuseModal/refuseModal.vue'
    export default {
        components:{
            batchAgreementModal,
            batchRefuseModal,
            agreeModal,
            refuseModal
        },
        data(){
            return{
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                //全选
                indeterminate: false,
                checkAll: false,
                checkAllGroup:[],

                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    batchAgreement: {
                        name: 'batchAgreementModal',   //批量同意
                        width: ''
                    },
                    batchRefuse: {
                        name: 'batchRefuseModal',   //批量拒绝
                        width: ''
                    },
                    agree: {
                        name: 'agreeModal',   //同意
                        width: ''
                    },
                    refuse: {
                        name: 'refuseModal',   //拒绝
                        width: ''
                    }
                },
                modalData:{},        //传给子组件的数据
                applyList:''          //返回数据
            }
        },
        computed:{
           listModal(){
               return this.applyList
           }
        },
        beforeMount(){
            this.getApplyList()
        },
        methods:{

            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            //刷新
            Refresh(){
                if(this.applyList.length == 1 && this.pageIndex.current_page!=1){
                    this.getApplyList(this.pageIndex.current_page-1)
                }else{
                    this.getApplyList(this.pageIndex.current_page)
                }

            },

            //获取申请列表数据
            getApplyList(page=1){
                this.indeterminate = false
                this.checkAll = false;
                this.checkAllGroup = [];
                this.loading = true
                var ajaxData = {
                    page,
                    type:0
                }
                this.$http.get('/admin/extract/list',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                    var {current_page,last_page,per_page,total,data:list}=retData
                    var pageIndexMsg={current_page,last_page,per_page,total}
                    if(current_page!='1'&&!list.length){
                        this.getApplyList(--current_page)
                    }
                    Object.assign(this.pageIndex,pageIndexMsg)
                    this.applyList = list
                    this.loading = false
                    }
                })
            },
            //分页
            changePage(page){
                this.getApplyList(page)
            },

            //获取所有的订单，放到数组里面
            getArry(){
                var list = this.applyList
                var arr = []
                for (let i in list){
                    var item = list[i].id
                    arr.push(item)
                }
                this.checkAllGroup = arr
                return this.checkAllGroup
            },
            //全选
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.getArry()
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalData,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            }
        },
        activated(){
            this.$emit("changeTab",0)//切换局部导航
        }
    }
</script>