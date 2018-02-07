<style lang="css" scoped src="./css/index.css"></style>

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
</style>
<template>
    <div class="layout-content-main">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg" @nomalRefresh="nomalRefresh" @offRefresh="offRefresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >策略管理</BreadcrumbItem>
                <BreadcrumbItem>已发布策略</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="examine-top">
            <div class="leftInfo">
                <p>共 <span class="number"> {{pageIndex.total}}</span>条记录</p>
            </div>
            <div class="rightInfo">
                <div class="rightInfo-l">
                    <span>状态：</span>
                    <Select style="width:120px;margin-left: 20px" size="large" placeholder="全部" v-model="hot" @on-change="checkStatus">
                        <Option value="" @click="getAll">全部</Option>
                        <Option :value="1" :key="1">已推荐</Option>
                        <Option :value="0" :key="0">未推荐</Option>
                    </Select>
                </div>
                <div class="rightInfo-r">
                    <input type="text" placeholder="请输入策略名称" v-model="search" @keyup.enter="Submit">
                    <span @click="Search">搜索</span>
                </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>昵称</th>
                    <th>手机号码</th>
                    <th>策略名称</th>
                    <th>标准账号平台</th>
                    <th>标准服务器</th>
                    <th>标准账号</th>
                    <th>标准账号密码</th>
                    <th>星级</th>
                    <th>策略详情</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="value in listModal" v-if="listModal.length&&!loading">
                    <td>{{value.user.name}}</td>
                    <td>{{value.user.phone}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.standard_mt4_account ? value.standard_mt4_account.platform.platform : ''}}</td>
                    <td>{{value.standard_mt4_account ? value.standard_mt4_account.platform.server_name : ''}}</td>
                    <td>{{value.standard_mt4_account ? value.standard_mt4_account.MT4_account : ''}}</td>
                    <td>{{value.standard_mt4_account ? value.standard_mt4_account.MT4_password :''}}</td>
                    <td>
                        <Rate v-model="value.recommend_level"></Rate>
                    </td>
                    <td>
                        <Icon type="eye" size="36" class="eye" @click.native="showModal('details',{id:value,publishList})"></Icon>
                    </td>
                    <td>
                        <span v-if="value.hot==1">已推荐</span>
                        <span v-if="value.hot==0">未推荐</span>
                    </td>
                    <td class="btn_content">
                        <!--<span class="modify" @click="showModal('modify',{id:value})">修改</span>-->
                        <!--<span class="recommend" @click="showModal('recommend',{id:value})"  v-if="value.hot==0">推荐</span>-->
                        <!--<span class="off" @click="showModal('off',{id:value})">下架</span>-->
                        <Button type="success"  @click="showModal('modify',{id:value})">修改</Button>
                        <Button type="warning" @click="showModal('recommend',{id:value})"  v-if="value.hot==0">推荐</Button>
                        <Button type="error"  @click="showModal('off',{id:value})">下架</Button>
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
    import modifyModal from './component/modifyModal/modifyModal.vue'
    import recommendModal from './component/recommendModal/recommendModal.vue'
    import offModal from './component/offModal/offModal.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            detailsModal,
            modifyModal,
            recommendModal,
            offModal
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

                publishList:'',  //返回数据

                hot:'',            //已推荐1 未推荐0
                searchStatus:{
                    hot:''
                },
                search:'',
                searchKey:{
                    search:''
                },

                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    details: {
                        name: 'detailsModal',
                        width: ''
                    },
                    modify: {
                        name: 'modifyModal',
                        width: ''
                    },
                    recommend: {
                        name: 'recommendModal',
                        width: ''
                    },
                    off: {
                        name: 'offModal',
                        width: ''
                    }
                },
                modalMsg: {}   //传给子组件的数据


            }
        },
        computed: {
            listModal(){
                return this.publishList

            }
        },
        beforeMount() {
            this.getPublishList()
        },
        mounted(){
            this.changeLeftNav()
            const {page}=this.$router.currentRoute.query
        },
        methods:{
            //子组件监听到的事件
            nomalRefresh() {
                this.getPublishList(this.pageIndex.current_page)
            },
            offRefresh(){
                if(this.publishList.length == 1 && this.pageIndex.current_page!=1) {
                    this.getPublishList(this.pageIndex.current_page-1)
                }else{
                    this.getPublishList(this.pageIndex.current_page)
                }
            },

            //回车事件
            Submit() {
                this.Search()
            },
            getAll(){
                this.getPublishList(1)
            },
            //搜索状态
            checkStatus(){
                this.searchStatus = {
                    hot:this.hot
                }
                this.getPublishList(1)
            },
            //搜索策略名称
            Search() {
                this.searchKey = {
                    search:this.search
                }
                this.getPublishList(1)
            },

            //获取发布列表
            getPublishList(page=1){
                this.loading = true
                var ajaxData = {
                    review_status:1,
                    page
                }
                ajaxData = Object.assign(ajaxData,this.searchKey,this.searchStatus)
                this.$http.get('/admin/policy',{params:ajaxData})
                    .then((response) => {
                        const data = response.data
                        const {retCode, retData = {}}=data
                        if (retCode == '0') {
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.getPublishList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.publishList=list
                            this.loading = false
                        }
                    })
            },

            //分页
            changePage(page){
                this.getPublishList(page)
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
                    openName:'strategyManage',
                    activeName:'published'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













