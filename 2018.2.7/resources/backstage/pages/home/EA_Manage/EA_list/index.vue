<style lang="css" scoped>
    .layout-content-main {
        padding: 20px;
    }

    .top_content .addEA {
        margin-top: 20px;

    }

    .EA_list_content {
        margin-top: 20px;
        background-color: #fff;
    }

    .EA_list {
        width: 100%;
        border: 1px solid #D4D4D4;
        border-collapse: collapse;
    }

    .EA_list th {
        height: 50px;
        font-size: 14px;
        color: #666666;
        background: #F5F7F9;
        border: 1px solid #D4D4D4;
        border-collapse: collapse;
    }

    .EA_list td {
        height: 70px;
        font-size: 14px;
        color: #666666;
        text-align: center;
        background-color: #fff;
        border: 1px solid #D4D4D4;
        border-collapse: collapse;
    }

    .del-btn {
        margin-left: 10px;
    }

    .page_box {
        height: 42px;
        line-height: 40px;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        margin-top: 20px;
    }

    .no_data_content {
        font-size: 18px;
        color: #999;
        text-align: center;
        margin-top: 30px;
    }
</style>
<template>
    <div class="layout-content-main">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
               :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg"
                       @Refresh="Refresh">
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>EA管理</BreadcrumbItem>
                <BreadcrumbItem>EA列表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="top_content">
            <router-link to="/EA_Manage/EA_list/addEA">
                <div class="addEA">
                    <Button type="primary">新增EA</Button>
                </div>
            </router-link>

            <div class="EA_list_content">
                <table class="EA_list" width="100%">
                    <tr>
                        <th>名称</th>
                        <th>封面图片</th>
                        <th>EA简介</th>
                        <th>价格（元/套）</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="value in EA_ListData">
                        <td>{{value.name}}</td>
                        <td>
                            <img :src="value.images.path" alt="" style="width: 80px;height: 50px;display: inline-block">
                        </td>
                        <td style="width: 40%">{{value.introduction}}</td>
                        <td>{{value.price}}</td>
                        <td>
                            <router-link :to="{path:'/EA_Manage/EA_list/modifyEA/'+value.id}">
                                <Button>修改</Button>
                            </router-link>
                            <Button class="del-btn" type="error" @click="showModal('delete',{id:value.id,name:value.name})">
                                删除
                            </Button>
                        </td>
                    </tr>
                </table>
                <v-tableSpin v-show="loading"></v-tableSpin>
                <div v-if="EA_ListData==''&&!loading" class="no_data_content">暂无数据！</div>
                <div class="page_box">
                    <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage"
                          :total="pageIndex.total" :show-total="false"></Page>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
    import  deleteModal from './components/deleteModal/index.vue'
    export default {
        components: {
            'deleteModal': deleteModal,
        },
        data(){
            return {
                loading: false,
                iviewModal: false,
                EA_ListData: '',
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    delete: {
                        name: 'deleteModal',
                        width: ''
                    },
                },
                modalMsg: {},  //传给子组件的数据
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
            }
        },
        computed: {},
        beforeMount() {
            this.getEAList()
        },

        methods: {

            getEAList(page = 1){
                const ajaxData = {
                    page
                }
                return new Promise((resolve, reject) => {
                    this.loading = true
                    this.$http.get('/admin/ea_manage/ea_list', {params: ajaxData})
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData, retMsg}=data;
                            if (retCode == '0') {
                                var {current_page, last_page, per_page, total, data:list}=retData
                                var pageIndexMsg = {current_page, last_page, per_page, total}
                                if (current_page != '1' && !list.length) {
                                    this.getEAList(--current_page)
                                }
                                Object.assign(this.pageIndex, pageIndexMsg)
                                this.EA_ListData = list
                                this.loading = false
                                resolve();
                            } else {
                                resolve();
//                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                            }
                        })
                        .catch((error) => {
//                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                            reject()
                        });
                })
            },

            Refresh(){
                this.getEAList()
            },

            changePage(page){
                this.getEAList(page)
            },

            //弹窗
            showModal(name, data = {}){
                const modalList = this.modalList
                Object.assign(this.modalMsg, data)
                this.curModal = modalList[name],
                    this.iviewModal = true
            },

            //切换导航
            changeLeftNav(){
                var leftNav = {
                    openName: 'EA_Manage',
                    activeName: 'EA_list'
                }
                this.$emit("changeLeftNav", leftNav)
            }
        }
    }
</script>













