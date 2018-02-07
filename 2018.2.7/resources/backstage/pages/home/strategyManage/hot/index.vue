<style lang="css" scoped src="./css/index.css"></style>
<style scoped>
    .list_box{
        /*overflow-x:scroll;*/
    }
</style>
<template>
    <div class="layout-content-main">

        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg" @refresh="refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>策略管理</BreadcrumbItem>
                <BreadcrumbItem>热门策略</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-container">
            <div class="examine-top">
                <div class="leftInfo">
                    <p>共 <span class="number"> {{hotExamineNumber}} </span> 条记录</p>
                </div>
                <div class="rightInfo">
                    <!--<div class="rightInfo-l">-->
                    <!--<span>状态：</span>-->
                    <!--<Select style="width:120px;margin-left: 20px" size="large" placeholder="全部">-->
                    <!--<Option value="已审核">已审核</Option>-->
                    <!--<Option value="未审核">未审核</Option>-->
                    <!--</Select>-->
                    <!--</div>-->
                    <div class="rightInfo-r">
                        <input type="text" placeholder="请输入策略名称" v-model="search" @keyup.enter="Submit">
                        <span @click="searchTop">搜索</span>
                    </div>
                </div>
            </div>
            <div class="table-content hot list_box">
                <table border="1" width="100%">
                    <!--<thead>-->
                    <tr>
                        <th>昵称</th>
                        <th>手机号码</th>
                        <th>策略名称</th>
                        <th>标准账号平台</th>
                        <th>标准账号服务器</th>
                        <th>标准账号</th>
                        <th>标准账号密码</th>
                        <th>星级</th>
                        <th>策略详情</th>
                        <th>操作</th>
                    </tr>

                    <!--</thead>-->
                    <tr v-for="item in listModal">
                        <td>{{item.user.name}}</td>
                        <td>{{item.user.phone}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.standard_mt4_account ? item.standard_mt4_account.platform.platform : ''}}</td>
                        <td>{{item.standard_mt4_account ? item.standard_mt4_account.platform.server_name : ''}}</td>
                        <td>{{item.standard_mt4_account ? item.standard_mt4_account.MT4_account : ''}}</td>
                        <td>{{item.standard_mt4_account ? item.standard_mt4_account.MT4_password :''}}</td>
                        <td style="width: 15%">
                            <Rate v-model="item.recommend_level"></Rate>
                        </td>
                        <td>
                            <Icon type="eye" size="36" class="Eyeicon"  @click.native="showModal('details',{id:item,platformList})"></Icon></td>
                        <td>
                            <div class="abrogate">
                                <!--<span @click="showModal('abrogate',{id:item,name:item.name})">取消推荐</span>-->
                                <Button type="error"  @click="showModal('abrogate',{id:item,name:item.name})">取消推荐</Button>
                            </div>
                        </td>
                    </tr>

                </table>
                <v-tableSpin v-show="loading"></v-tableSpin>
                <div v-if="listModal.length==''&&!loading" style="text-align: center;font-size: 16px;padding-top: 30px">暂无数据</div>
            </div>
        </div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>
<script>
    import detailsModal from './components/detailsModal/detailsModal.vue'
    import abrogateModal from './components/abrogate/index.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            'detailsModal': detailsModal,
            'abrogateModal': abrogateModal
        },
        data(){
            return {
                loading:false,
                iviewModal:false,
                examineDataForm:'',
                examineForm:'',
                hotExamineList:'',
                hotExamineNumber:'',
                searchList:null,
                search:'',

                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    abrogate: {
                        name: 'abrogateModal',
                        width: '514'
                    },
                    details: {
                        name: 'detailsModal',
                        width: '514'
                    },
                },
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
            }
        },
        computed:{
            listModal(){
                return this.getPlatformList(this.hotExamineList)
            }
        },
        beforeMount(){
            this.getExamineInfo()
            this.platformCooperative()
        },
        mounted(){
            this.changeLeftNav()
        },
        methods: {
            //子组件监听到的事件
            Refresh() {
                this.getExamineInfo()
            },
            changePage(page){
                this.getAnalogList(page)
            },
            getAnalogList(page=1){
                var getAnalogList=this.getExamineInfo(page)
                Promise.all([getAnalogList]).then(() => {
                    this.showPage=true
            }).catch(() => {
                });
            },

            //回车事件
            Submit() {
                this.searchTop()
            },
            //搜索
            searchTop(){
                var ajaxData = {
                    search: this.search
                }
                this.loading=true
                this.$http.get('/admin/policy', {params:ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData={}}=data;
                        if (retCode == '0') {
                            this.searchList=retData.data
                            this.hotExamineList = this.searchList
                            this.loading=false
                        } else {
                            this.$Message.error({content: '搜索失败'})
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //交易商平台列表
            getPlatformList(data){
                var list=[]
                var platformList=this.platformList
                for(let i in data){
                    var item =data[i]
                    for(let i in platformList){
                        var platform=platformList[i]
                        if(item.trade_platform_id==platform.id){
                            item.platform = platform.platform
                            item.server_name = platform.server_name
                        }
                    }
                    list.push(item)
                }
                return list
            },
            getExamineInfo(page=1){
                const ajaxData={
                    page
                }
                //请求策略列表数据
                return new Promise((resolve, reject) => {
                    this.loading=true
                        this.$http.get('/admin/policy',{params:ajaxData})
                        .then((response) => {
                        const data = response.data;
                const {retCode, retData = {}}=data;
                if (retCode == '0') {
                    var {current_page,last_page,per_page,total,data:list}=retData
                    this.analogListLen = retData.total
                    var pageIndexMsg={current_page,last_page,per_page,total}
                    if(current_page!='1'&&!list.length){
                        this.getAnalogList(--current_page)
                    }
                    Object.assign(this.pageIndex,pageIndexMsg)
                    this.examineForm=retData
                    this.examineDataForm=retData.data
                    var examineDataForm= this.examineDataForm
                    var arr=[]
                    for(var i in examineDataForm){
                        var ExamineList=examineDataForm[i]
                        if (ExamineList.hot==1){
                            arr.push(ExamineList)
                        }
                    }
                    this.hotExamineList=arr;
                    this.hotExamineNumber=arr.length;
                    this.loading=false
                    resolve();
                } else {
                    reject();
                }
            }).catch((error) => {
                    reject();
                  });
                 })
            },
            platformCooperative(){
                return new Promise((resolve, reject) => {
                        this.$http.get('/platform/cooperative')
                        .then((response) => {
                        const data = response.data;
                const {retCode, retData = {}}=data;
                if (retCode == '0') {
                    this.platformList = retData
                    resolve();
                } else {
                    reject();
                }
            }).catch((error) => {
                    reject();
            });
            })
            },
            changeLeftNav(){
                var leftNav = {
                    openName: 'strategyManage',
                    activeName: 'hot'
                }
                this.$emit("changeLeftNav", leftNav)
            },
            publishing(){
                var data = {
                    publishing_strategy: {
                        show: true
                    }
                };
                this.changeCompontentStates(data)
            },
            showModal(name, data = {}){
                const modalList = this.modalList
                this.modalMsg = data
                this.curModal = modalList[name],
                    this.iviewModal = true
            },
            refresh(){
                this.getExamineInfo()
            },
        }
    }
</script>
