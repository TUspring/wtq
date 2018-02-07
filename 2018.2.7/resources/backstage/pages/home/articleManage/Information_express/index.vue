

<style lang="css" scoped>
    .layout-content-main{
        padding: 20px;
    }


    .info_Exp_content  .addInfo_Exp {
        width:80px;
        height:30px;
        line-height:30px;
        text-align:center;
        color:#fff;
        font-size:14px;
        border-radius:4px;
        background: #ffa114;
        margin-top: 20px;
        cursor:pointer;
    }
    .info_Exp_content  .addInfo_Exp:hover{
        background-color: rgba(255,161,20,.8);
    }
    .information_content{
        margin-top: 20px;
        background-color: #fff;
    }
    .EA_list{
        width:100%;
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .EA_list th {
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
    .info-btn span{
        display:inline-block;
        width:70px;
        height:30px;
        line-height:30px;
        text-align:center;
        border:1px solid  #ffa114;
        color:#ffa114;
        border-radius:4px;
        cursor:pointer;
    }
    .info-btn span:nth-child(1){
        margin-right: 20px;
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
                <BreadcrumbItem>资讯速递</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="info_Exp_content">
            <div class="addInfo_Exp" @click="showModal('addInfoExp')">新增资讯</div>
            <div class="information_content">
                <table class="EA_list" width="100%">
                    <tr>
                        <th>时间</th>
                        <th>标题</th>
                        <th>资讯内容</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>19:09:34</td>
                        <td>快讯</td>
                        <td style="width: 50%;">这是一段话。一段话！这是一段话。一段话！这是一段话。一段话！这是一段话。一段话！这是一段话。一段话！这是一段话。一段话！这是一段话。一段话！这是一段话。一段话！</td>
                         <td class="info-btn">
                             <span @click="showModal('modify')">修改</span>
                             <span @click="showModal('remove')">删除</span>
                         </td>
                    </tr>
                </table>

                <!--<div class="no_data_content">暂无数据！</div>-->
            </div>
        </div>

    </div>
</template>
<script>
  import  addInfoExpModal from './components/addInfo_exp/index.vue'
  import modifyModal from './components/modifyModal/index.vue'
  import removeModal from './components/removeModal/index.vue'
    export default {
        components: {
            addInfoExpModal,
            modifyModal,
            removeModal
        },
        data(){
            return {
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    addInfoExp: {
                        name: 'addInfoExpModal',
                        width: ''
                    },
                    modify: {
                        name: 'modifyModal',
                        width: ''
                    },
                    remove: {
                        name: 'removeModal',
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
                    activeName:'Information_express'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>