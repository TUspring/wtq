<style lang="less" scoped src="./css/index.css"></style>

<style lang="css" >
    .checkBoxClass .ivu-checkbox-wrapper + span,
    .checkBoxClass .ivu-checkbox + span {
        display: none;
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
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData="modalData" @Refresh="Refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >返佣管理</BreadcrumbItem>
                <BreadcrumbItem>佣金结算表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-top">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>
            <div class="settlement_btn"  @click="showModal('batchSettlement',{idList:checkAllGroup,list:commisionSettlementList})" >
                <span>批量结算</span>
            </div>
            <div class="search_time_content">
                平仓时间：
                <DatePicker type="date" placeholder="选择平仓时间" style="width: 150px"  v-model="startTime"  @on-change="startTime=$event" @on-open-change="handleOk" ></DatePicker>
                </Col>
                至
                <DatePicker type="date" placeholder="选择平仓时间" style="width: 150px"  v-model="endTime"   @on-change="endTime=$event" @on-open-change="handleOk" ></DatePicker>
                </Col>
            </div>
            <div class="rightInfo cl">
                <div class="rightInfo-l">
                    <input type="text" placeholder="请输入姓名" v-model.trim="users_name" @keyup.enter="submit">
                    <span @click="searchUser">搜索</span>
                </div>
                <div class="rightInfo-2">
                    <span>状态：</span>
                    <Select style="width:100px;" size="large" placeholder="全部">
                        <Option value="全部"   @click.native="checkAllList">全部</Option>
                        <Option :value="item.type" :key="item.type" v-for="item in optinList" @click.native="searchTypeData(item.type)">{{item.value}}</Option>
                    </Select>
                </div>
            </div>
        </div>


        <!--列表内容-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>
                       <span>
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :value="checkAll"
                                    @click.prevent.native="handleCheckAll">全选
                        </Checkbox>
                       </span>
                    </th>
                    <th>姓名</th>
                    <th>订单号</th>
                    <th>平仓时间</th>
                    <th>订单所属用户</th>
                    <th>佣金类型</th>
                    <th>佣金金额</th>
                    <th>结算状态</th>
                    <th>结算时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="value in listModal" v-if="listModal.length && !loading">
                    <td class="checkBoxClass">
                       <span v-if="value.clearing_time == 0">
                            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" >
                            <Checkbox :label="value.id"></Checkbox>
                        </CheckboxGroup>
                       </span>
                    </td>
                    <td>{{value.users.real_name}}</td>
                    <td>{{value.Ticket}}</td>
                    <td>{{timeType(value.close_time)}}</td>
                    <td>{{value.belong_user.name}}</td>
                    <td>
                        <span v-if="value.brokerage_type==1">直接佣金</span>
                        <span v-if="value.brokerage_type==2">同级佣金</span>
                        <span v-if="value.brokerage_type==3">间接佣金</span>
                    </td>
                    <td>{{value.brokerage_money}}</td>
                    <td>
                        <span v-if="value.clearing_time == 0">未结算</span>
                        <span  v-if="value.clearing_time > 0">已结算</span>
                    </td>
                    <td>{{timeType(value.clearing_time)}}</td>
                    <td>
                        <!--<span v-if="value.clearing_time == 0" class="settlement"  @click="showModal('settlement',{id:value})">结算</span>-->
                        <Button type="primary" v-if="value.clearing_time == 0" @click="showModal('settlement',{id:value})">结算</Button>
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
    import batchSettlementModal from './component/batchSettlementModal/batchSettlementModal.vue'
    import settlementModal from './component/settlementModal/settlementModal.vue'
    export default {
        components:{
            batchSettlementModal,
            settlementModal
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

                //搜索
                startTime:'',     //开始时间格式
                endTime:'',       //结束时间格式
                searchTimeData:{
                    close_time_start:'',     //开始时间格式
                    close_time_end:''       //结束时间格式
                },
                users_name:'',    //用户名
                searchName:{
                    users_name:''
                },
                clearing_type:'',   //类型
                searchType:{
                    clearing_type:''
                },
                optinList:[
                    {value:'已结算',type:2},
                    {value:'未结算',type:1}
                ],


                //全选
                indeterminate: false,
                checkAll: false,
                checkAllGroup:[],      //传给后台的id 数组


                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    batchSettlement: {
                        name: 'batchSettlementModal',   //批量结算
                        width: ''
                    },
                    settlement: {
                        name: 'settlementModal',        //结算
                        width: ''
                    }
                },
                modalData:{},                      //传给子组件的数据
                commisionSettlementList:''         //返回数据
            }
        },
        computed:{
            listModal(){
                return this.commisionSettlementList
            }
        },
        beforeMount(){
            this.getCommisionSettlementList()

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

            //时间格式转时间戳
            changeTimeType(value){
                return Date.parse(new Date(value))/1000;

            },

            handleOk(){
                if(this.startTime&&this.endTime){
                    this.searchTime()
                }else {
                    return
                }
            },
            //根据开始结束时间搜索
            searchTime(){
                this.searchType = null
                this.searchName = null
                this.searchTimeData = {
                    close_time_start:this.changeTimeType(this.startTime)-(8*3600),
                    close_time_end:this.changeTimeType(this.endTime)+(24*3600)-(8*3600)
                }
                this.getCommisionSettlementList(1)
            },
            //搜索全部
            checkAllList(){
                this.searchTimeData = null
                this.searchType = null
                this.searchName = null
                this.getCommisionSettlementList(1)
            },
            //键盘事件
            submit(){
                this.searchUser()
            },
            //搜索用户
            searchUser(){
                this.searchTimeData = null
                this.searchType = null

                this.searchName = {
                    users_name:this.users_name
                }
                this.getCommisionSettlementList(1)
            },
            //搜索结算类型
            searchTypeData(value){
                this.searchTimeData = null
                this.searchName = null

                this.clearing_type = value
                this.searchType = {
                    clearing_type:this.clearing_type
                }
                this.getCommisionSettlementList(1)
            },

            //刷新
            Refresh(){
                this.getCommisionSettlementList(this.pageIndex.current_page)
            },

            //获取佣金结算数据
            getCommisionSettlementList(page=1){
                this.checkAll = false;
                this.checkAllGroup = [];
                this.loading = true
                var ajaxData = {
                    page
                }
                ajaxData=Object.assign(ajaxData,this.searchTimeData,this.searchName,this.searchType)
                this.$http.get('/admin/brokerage',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        var {current_page,last_page,per_page,total,data:list}=retData
                        var pageIndexMsg={current_page,last_page,per_page,total}
                        if(current_page!='1'&&!list.length){
                            this.getCommisionSettlementList(--current_page)
                        }
                        Object.assign(this.pageIndex,pageIndexMsg)
                        this.commisionSettlementList = list
                        this.loading = false
                    }
                })
            },
            //分页
            changePage(page){
                this.getCommisionSettlementList(page)
            },

            //获取所有的订单，放到数组里面
            getArry(){
                var list = this.commisionSettlementList
                var arr = []
                for (let i in list){
                    var item = list[i].id
                    var clearing_time = list[i].clearing_time
                    if(clearing_time==0){
                        arr.push(item)
                    }
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
                var length = this.commisionSettlementList.length
                if (data.length === length) {
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
            },

            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'rebateManage',
                    activeName:'commissionSettlement'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>