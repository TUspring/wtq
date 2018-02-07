<style lang="css" scoped src="./css/index.css">
</style>
<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    /*.list_box {*/
        /*overflow-x: scroll;*/
    /*}*/
    .eye{
        font-size: 36px;
        color: #999999;
        cursor: pointer;
    }
    .eye:hover{
        color: #ffa114;
    }
</style>
<template>
    <div class="layout-content-main">
        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg" @Refresh="Refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >账号管理</BreadcrumbItem>
                <BreadcrumbItem>模拟账号</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-top">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>

            <div class="importAccount_btn" @click="showModal('importAccount')">
                <span>导入新账号</span>
            </div>

            <div class="rightInfo">
                <div class="rightInfo-l">
                    <span>状态：</span>
                    <Select style="width:120px;margin-left: 20px" size="large" placeholder="全部" v-model="selectPort">
                        <Option :value="1">全部</Option>
                        <Option :value="2">已分配</Option>
                        <Option :value="3">未分配</Option>
                    </Select>
                </div>
                <div class="rightInfo-r">
                    <input type="text" placeholder="请输入MT4账号"  v-model.trim="search_field">
                    <span  @click="search">搜索</span>
                </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>昵称</th>
                    <th>平台</th>
                    <th>账号</th>
                    <th>密码</th>
                    <th>服务器名称</th>
                    <th>移除时间</th>
                    <th>状态</th>
                    <th>分配时间</th>
                    <th>到期时间</th>
                    <th>当前净值</th>
                    <th>总收益</th>
                    <th>正在跟随</th>
                    <th>交易详情</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(value,index) in listModel"  v-if="listModel.length&&showPage">
                    <td>
                        <span v-if="value.users">{{value.users.name}}</span>
                        <span v-else>-</span>
                    </td>
                    <td>{{value.platform.platform}}</td>
                    <td>{{value.MT4_account}}</td>
                    <td>{{value.MT4_password}}</td>
                    <td>{{value.platform.server_name}}</td>
                    <td>{{timeType(value.remove_time)}}</td>
                    <td>
                        <span v-if="value.status == 2">已分配</span>
                        <span v-if="value.status == 1">未分配</span>
                    </td>
                    <td>{{timeType(value.start_time)}}</td>
                    <td>{{timeType(value.deadline)}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <Icon type="eye" size="36" class="eye" @click.native="checkDetails(value.id)"></Icon>
                    </td>
                    <td>
                        <!--<span class="allot" @click="showModal('allot',{id:value,MT4_account:value,platform:value})" v-if="value.status == 1">分配</span>-->
                        <Button type="primary" @click="showModal('allot',{id:value,MT4_account:value,platform:value})" v-if="value.status == 1">分配</Button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="noList_box" v-if="!listModel.length">暂无数据</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>

</template>
<script>
    import importAccountModal from './component/importAccountModal/importAccountModal.vue'
    import allotModal from './component/allotModal/allotModal.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            allotModal,
            importAccountModal
        },
        data(){
            return {
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    allot: {
                        name: 'allotModal',
                        width: ''
                    },
                    importAccount: {
                        name: 'importAccountModal',
                        width: ''
                    }
                },
                modalMsg: {},  //传给子组件的数据

                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
                analogList:[],
                selectPort:1,
                alreadyAnalogList: '',  //已审核列表
                notAnalogList: '',      //未审核列表

                search_field: '',
                searchList:null,

                showPage: false
            }
        },
        computed:{
            listModel(){
                /**
                 *  status=1  未审核
                 *  status=2  已审核
                 *
                 * */
                //全部的列表
                if(this.selectPort==1){
                    return this.analogList
                }
                //搜索已分配
                if(this.selectPort==2){
                    var analog_arr=[]
                    var analog_list=this.analogList
                    for(let i in analog_list){
                        var analog_item=analog_list[i]
                        if(analog_item.status==2){
                            analog_arr.push(analog_item)
                        }
                    }
                    this.alreadyAnalogList=analog_arr

                    return this.alreadyAnalogList
                }
                //搜索未分配
                if(this.selectPort==3){
                    var analog_arr=[]
                    var analog_list=this.analogList
                    for(let i in analog_list){
                        var analog_item=analog_list[i]
                        if(analog_item.status==1){
                            analog_arr.push(analog_item)
                        }
                    }
                    this.notAnalogList=analog_arr
                    return this.notAnalogList
                }
            }
        },
        mounted(){
            this.changeLeftNav()
            const {page}=this.$router.currentRoute.query
            this.getAnalogList()
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

            //搜素
            search() {
                if(this.search_field == ''){
                    this.$Modal.error({title: `搜索失败`, content: '请先输入要搜索的MT4账号！'})
                }                  //后台未作处理（不能传空值）
                var ajaxData = {
                    search_field:this.search_field
                }
                this.$http.post('admin/MT4/demo_search',ajaxData)
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            this.pageIndex.total = 1
                            this.analogList =retData
                        }
                    })
            },

            Refresh() {
                this.getAnalogList(this.pageIndex.current_page)
            },

            //获取跟随列表
            getAnalogList(page=1){
                var getAnalogList=this.getAnalogListHttp(page)
                Promise.all([getAnalogList]).then(() => {
                    this.showPage=true
                }).catch(() => {

                });
            },

            getAnalogListHttp(page=1){
                const ajaxData={
                    page
                }
                return new Promise((resolve, reject) => {
                    this.showPage=false;
                    this.$http.get('admin/MT4/demo_MT4',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode == '0'){
                                var {current_page,last_page,per_page,total,data:list}=retData
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                    this.getAnalogList(--current_page)
                                }
                                Object.assign(this.pageIndex,pageIndexMsg)
                                this.analogList=list
                                resolve()
                            }else{
                                reject()
                            }
                        }).catch((error) =>{
                        reject()
                    });

                })
            },

            changePage(page){
                this.getAnalogList(page)
            },

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },

            //查看详情
            checkDetails (id) {
                var id =JSON.stringify(id)
                this.$router.push({
                    path: '/analogTrading',
                    query:{data:id}

                })
            },
            changeLeftNav(){
                var leftNav={
                    openName:'accountManage',
                    activeName:'analog'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>
