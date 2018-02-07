<style scoped src="./css/index.css">
</style>
<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .no_data {
        text-align: center;
        margin-top:30px;
        font-size:20px;
        color:#999999;
    }
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
                <BreadcrumbItem>MT4账号列表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-top">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>
            <div class="rightInfo">
                <div class="rightInfo-l">
                </div>
                <div class="rightInfo-r">
                    <input type="text" placeholder="请输入MT4账号"  v-model.trim="search_field">
                    <span @click="search">搜索</span>
                </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>昵称</th>
                    <th>平台名称</th>
                    <th>服务器名称</th>
                    <th>MT4账号</th>
                    <th>MT4关联时间</th>
                    <!--<th>总入金</th>-->
                    <th>余额</th>
                    <th>净值</th>
                    <th>总收益</th>
                    <th>正在跟随</th>
                    <th>交易详情</th>
                    <th>是否需要返佣</th>
                </tr>
                <tr  v-for="(value,index) in listModal" v-if="listModal.length && !loading">
                    <td>{{value.users?value.users.name:''}}</td>
                    <td>{{value.platform.platform}}</td>
                    <td>{{value.platform.server_name}}</td>
                    <td>{{value.MT4_account}}</td>
                    <td>{{timeType(value.time)}}</td>
                    <!--<td></td>-->
                    <td>{{value.balance}}</td>
                    <td>{{value.net_worth}}</td>
                    <td></td>
                    <td>
                        <span v-if="value.policy == null || !value.policy">-</span>
                        <span v-if="value.policy">{{value.policy.name}}</span>
                    </td>
                    <td>
                        <Icon type="eye" size="36" class="eye" @click.native="checkDetails(value.id)" ></Icon>
                    </td>
                    <td>
                        <span v-if="value.is_rebate==1">是</span>
                        <span v-if="value.is_rebate==2">否</span>
                        <!--<span class="modify" @click="showModal('modify',{id:value})">修改</span>-->
                        <Button type="success" @click="showModal('modify',{id:value})">修改</Button>
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
    import modifyModal from './component/modifyModal/modifyModal.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            modifyModal
        },
        data(){
            return {
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    modify: {
                        name: 'modifyModal',
                        width: ''
                    }
                },
                modalMsg:{},    //传给子组件的数据

                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                search_field: '',
                searchList:null,

                MT4List:[]
            }
        },
        computed:{
            listModal(){
                return this.MT4List
            }
        },
        mounted(){
            this.changeLeftNav()
            const {page}=this.$router.currentRoute.query
            this.getMT4List()
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
                }           //后台未作处理（不能传空值）
                var ajaxData = {
                    search_field:this.search_field
                }
                this.$http.post('/admin/MT4/search',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        this.searchList = retData
                        this.MT4List = this.searchList
                    }
                })
            },

            //刷新
            Refresh(){
                this.getMT4List(this.pageIndex.current_page)
            },

            //获取跟随列表
            getMT4List(page=1){
                var getMT4List=this.getMT4ListHttp(page)
                Promise.all([getMT4List]).then(() => {

                }).catch(() => {

                });
            },

            getMT4ListHttp(page=1){
                const ajaxData={
                    page
                }
                return new Promise((resolve, reject) => {
                    this.loading = true
                    this.$http.get('/admin/MT4',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode == '0'){
                                var {current_page,last_page,per_page,total,data:list}=retData
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                    this.getMT4List(--current_page)
                                }
                                Object.assign(this.pageIndex,pageIndexMsg)
                                this.MT4List=list
                                this.loading = false
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
                this.getMT4List(page)
            },

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },

            //查看详情
            checkDetails (id,data={}) {
                var id =JSON.stringify(id)
                Object.assign(this.modalMsg,data)
                this.$router.push({
                    path: '/MT4Trading',
                    query:{data:id}

                })
            },

            changeLeftNav(){
                var leftNav={
                    openName:'accountManage',
                    activeName:'MT4'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }

</script>