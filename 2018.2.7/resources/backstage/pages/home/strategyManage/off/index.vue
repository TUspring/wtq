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
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg" >
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >策略管理</BreadcrumbItem>
                <BreadcrumbItem>已下架</BreadcrumbItem>
            </Breadcrumb>
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
                        <Icon type="eye" size="36" class="eye" @click.native="showModal('details',{id:value,offList})"></Icon>
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
    import {mapState} from 'vuex'
    export default {
        components: {
            detailsModal
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
                offList:'',  //返回数据

                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    details: {
                        name: 'detailsModal',
                        width: ''
                    }
                },
                modalMsg: {}   //传给子组件的数据

            }
        },
        computed: {
            listModal(){
                return this.offList

            }
        },
        beforeMount() {
            this.getOffList()
        },
        mounted(){
            this.changeLeftNav()
            const {page}=this.$router.currentRoute.query
        },
        methods:{
            //获取发布列表
            getOffList(page=1){
                this.loading = true
                var ajaxData = {
                    review_status:3,
                    page
                }
                this.$http.get('/admin/policy',{params:ajaxData})
                    .then((response) => {
                        const data = response.data
                        const {retCode, retData = {}}=data
                        if (retCode == '0') {
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.getOffList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.offList=list
                            this.loading = false
                        }
                    })
            },

            //分页
            changePage(page){
                this.getOffList(page)
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
                    activeName:'off'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>
