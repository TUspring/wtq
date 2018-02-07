

<style lang="css" scoped>
    .layout-content-main{
        padding: 20px;
    }


    .ec-container  .add_ec {
        width:100px;
        height:30px;
        line-height:30px;
        text-align:center;
        color:#fff;
        font-size:14px;
        border-radius:4px;
        background: #ffa114;
        margin-top: 20px;
        cursor:pointer;
        display: inline-block;
        margin-right: 20px;
    }
    .template{
        cursor: pointer;
    }
    .template:hover{
        color: #ffa114;
    }
    .ec-container  .add_ec:hover{
        background-color: rgba(255,161,20,.8);
    }
    .ec_tb_content{
        margin-top: 20px;
        background-color: #fff;
    }
    .ec_list{
        width:100%;
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .ec_list th {
        height:50px;
        font-size:14px;
        color:#666666;
        background:#F5F7F9;
        border:1px solid #D4D4D4;
        border-collapse: collapse;
    }
    .ec_list td {
        height:70px;
        font-size:14px;
        color:#666666;
        text-align:center;
        background-color: #fff;
        border: 1px solid #D4D4D4;
        border-collapse: collapse;
    }

    .info-btn span:nth-child(1){
        margin-right: 20px;
    }

    .ec-btn  .remove{
        color: #666666;
        border:1px solid #d4d4d4;
    }
    .ec-btn span{
        width:50px;
        height:30px;
        line-height:30px;
        text-align:center;
        border:1px solid  #ffa114;
        color:#ffa114;
        border-radius:4px;
        cursor:pointer;
        display:inline-block;
    }


</style>
<template>
    <div class="layout-content-main">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >资讯管理</BreadcrumbItem>
                <BreadcrumbItem>财经日历</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="ec-container">
                <div class="add_ec" @click="showModal('importEc')">导入财经日历</div>
                <span class="template">下载导入模板</span>
            <div class="ec_tb_content">
                <table class="ec_list" width="100%">
                    <tr>
                        <th>日期</th>
                        <th>时间</th>
                        <th>重要性</th>
                        <th>国家</th>
                        <th>指标内容</th>
                        <th>前值</th>
                        <th>预测值</th>
                        <th>公布值</th>
                        <th>影响</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>2017-11-11</td>
                        <td>12:00</td>
                        <td>低</td>
                        <td>中国</td>
                        <td>美国10月政府预算（亿美元）</td>
                        <td>80</td>
                        <td>-500</td>
                        <td>-630</td>
                        <td>
                            利多，金银，原油
                        </td>
                        <td class="ec-btn">
                            <span @click="showModal('modify')">修改</span>
                           <span class="remove" @click="showModal('remove')">删除</span>
                        </td>
                    </tr>
                </table>

                <!--<div class="no_data_content">暂无数据！</div>-->
            </div>
        </div>

    </div>
</template>
<script>
    import importModal from './components/importModal/index.vue'
    import removeModal from './components/removeModal/index.vue'
    import modifyModal from './components/modifyModal/index.vue'
    export default {
        components: {
            importModal,
            removeModal,
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
                    importEc: {
                        name: 'importModal',
                        width: ''
                    },
                    remove: {
                        name: 'removeModal',
                        width: ''
                    },
                    modify: {
                        name: 'modifyModal',
                        width: ''
                    },
                },
                modalMsg: {},  //传给子组件的数据
            }
        },
        computed: {

        },
        beforeMount() {

        },

        methods:{

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
                    openName:'articleManage',
                    activeName:'Economic_Calendar'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>