

<style lang="css" scoped>
    .layout-content-main{
        padding: 20px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }

    .top_content .addEA {
        margin-top: 20px;
        cursor:pointer;
    }

    .EA_list_content{
        margin-top: 20px;
        background-color: #fff;
    }

    .EA_list{
        width:100%;
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .EA_list th {
        width: 10%;
        height:50px;
        font-size:14px;
        color:#666666;
        background:#F5F7F9;
        border:1px solid #D4D4D4;
        border-collapse: collapse;
    }
    .EA_list td {
        height:70px;
        font-size:14px;
        color:#666666;
        text-align:center;
        background-color: #fff;
        border: 1px solid #D4D4D4;
        border-collapse: collapse;
    }
    .btnClass {
        display:inline-block;
        width:70px;
        height:30px;
        line-height:30px;
        text-align:center;
        border-radius:4px;
        cursor:pointer;
        border:1px solid  #CCCCCC;
        color:#999;
    }
    .btnClass:hover{
        color: #ffa114;
        border:1px solid #ffa114;
    }
    .EA_list td .modify{
        margin:0px 20px;
    }
    .page_box{
        height: 42px;
        line-height: 40px;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        margin-top: 20px;
    }
    .no_data_content {
        font-size:18px;
        color: #999;
        text-align: center;
        margin-top: 30px;
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
                <BreadcrumbItem>EA管理</BreadcrumbItem>
                <BreadcrumbItem>EA横幅图片</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="top_content">
            <div class="addEA" @click="showModal('addEA_pic')">
                <Button type="primary">新增图片</Button></div>

            <div class="EA_list_content">
                <table class="EA_list" width="100%">
                    <tr>
                        <th>图片位置</th>
                        <th>图片</th>
                        <th>添加时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="value in EA_ListData">
                        <td>{{value.position}}</td>
                        <td>
                            <img :src="value.path" alt="" style="width: 80px;height: 50px;display: inline-block">
                        </td>
                        <td>{{value.updated_at}}</td>
                        <td>
                            <span v-if="value.position==0">停用</span>
                            <span v-if="value.position!=0" style="color: #19be6b;">启用中</span>
                        </td>
                        <td style="width: 20%;">
                            <!--<span v-if="value.position ==0" class="btnClass" @click="showModal('startUsing',{id:value,enable_num:bannerNum})">启用</span>-->
                            <!--<span  v-if="value.position!=0" class="btnClass" @click="showModal('stopUse',{id:value})">停用</span>-->
                            <!--<span  v-if="value.position!=0" class="btnClass modify" @click="showModal('modify',{id:value,enable_num:bannerNum})">修改</span>-->
                            <!--<span class="btnClass delete" @click="showModal('remove',{id:value})">删除</span>-->
                            <Button v-if="value.position ==0"  @click="showModal('startUsing',{id:value,enable_num:bannerNum})" type="success">启用</Button>

                            <Button  v-if="value.position!=0" @click="showModal('stopUse',{id:value})">停用</Button>
                            <Button  v-if="value.position!=0"  @click="showModal('modify',{id:value,enable_num:bannerNum})">修改</Button>

                            <Button @click="showModal('remove',{id:value})" type="error">删除</Button>

                        </td>
                    </tr>
                </table>
                <v-tableSpin v-show="loading"></v-tableSpin>
                <div v-if="EA_ListData==''&&!loading" class="no_data_content">暂无数据！</div>
                <div class="page_box">
                    <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
    import addEA_picModal from './components/addEA_pic/index.vue'
    import stopUseModal from './components/stopUse/index.vue'
    import modifyModal from './components/modifyModal/index.vue'
    import  deleteModal from './components/deleteModal/index.vue'
    import startModal from './components/startUse/index.vue'
    import {mapState} from 'vuex'
    export default {
        components: {
            addEA_picModal,
            stopUseModal,
            modifyModal,
            deleteModal,
            startModal
        },
        data(){
            return {
                loading:false,
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    addEA_pic: {
                        name: 'addEA_picModal',
                        width: ''
                    },
                  stopUse: {
                    name: 'stopUseModal',
                    width: ''
                   },
                    modify: {
                        name: 'modifyModal',
                        width: ''
                    },
                    remove: {
                        name: 'deleteModal',
                        width: ''
                    },
                    startUsing: {
                        name: 'startModal',
                        width: ''
                    },
                },
                EA_ListData:'',
                bannerNum:'',
                modalMsg: {},  //传给子组件的数据
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
            }
        },
        computed: {

        },
        beforeMount() {
             this.getEA_BannerList()
        },

        methods:{
            //获取banner列表数据
            getEA_BannerList(page = 1){
                const ajaxData = {
                    page
                }
                return new Promise((resolve, reject) => {
                    this.loading=true
                    this.$http.get('/admin/upload/uploadform',{params: ajaxData})
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData, retMsg}=data;
                            if (retCode == '0') {
                                this.loading=false
                                var {current_page, last_page, per_page, total, data:list}=retData
                                var pageIndexMsg = {current_page, last_page, per_page, total}
                                if (current_page != '1' && !list.length) {
                                    this.getEA_BannerList(--current_page)
                                }
                                Object.assign(this.pageIndex, pageIndexMsg)
                                this.EA_ListData = list
                                this.bannerNum=this.EA_ListData[0].enable_num

                                resolve();
                            } else {
 //                            this.$Modal.error({title: `获取数据失败`, content: data.retMsg})
                                resolve();
                            }
                        }).catch((error) => {

//                        this.$Modal.error({title: `获取数据失败`, content: this.util.getHttpText(error)})
                            reject()
                        });
                })
            },
            changePage(page){
                this.getEA_BannerList(page)
            },
            Refresh(){
             this.getEA_BannerList()
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
                    openName:'EA_Manage',
                    activeName:'EA_banner'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













