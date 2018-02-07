

<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }


    .newUserList-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .newUserList-content .leftInfo {
        float: left;
        width: 140px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        box-shadow: 0px 0px 3px 0px #CCCCCC;
        background-color: #fff;
    }

    .leftInfo .number {
        color: #ffa114;
    }

    .rightInfo {
        float: right;
        height: 34px;
        padding-right: 50px;
        display: flex;
        justify-content: space-between;
    }

    .rightInfo-r {
        margin-left: 50px;
    }

    .rightInfo-r input {
        width: 174px;
        height: 34px;
        border: 1px solid #CCCCCC;
        box-sizing: border-box;
        vertical-align: top;
        padding-left: 10px;
    }

    .rightInfo-r span {
        width: 70px;
        height: 34px;
        background-color: #ffa114;
        color: #FFFFFF;
        font-size: 14px;
        display: inline-block;
        line-height: 34px;
        text-align: center;
        margin-left: 5px;
        cursor: pointer;
    }



    .list_box {
        margin-left:10px;
        margin-right:10px;
    }
    table {
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .list_box  th {
        height:40px;
        color:#666666;
        font-size:14px;
        background:#F5F7F9;
    }
    .list_box  td {
        width: 10%;
        height:50px;
        text-align:center;
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
                <BreadcrumbItem >用户管理</BreadcrumbItem>
                <BreadcrumbItem>新增用户列表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="newUserList-content">
            <div class="leftInfo">
                <p>共 <span class="number">10</span>条记录</p>
            </div>

            <!--<div class="rightInfo">-->
                <!--<div class="rightInfo-r">-->
                    <!--<input type="text" placeholder="请输入昵称/姓名/手机号码">-->
                    <!--<span>搜索</span>-->
                <!--</div>-->
            <!--</div>-->
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>账号ID</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>邮箱</th>
                    <th>MT4账号</th>
                    <th>MT4注册时间</th>
                    <th>推荐人</th>
                    <th>推荐人手机号码</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
//                    details: {
//                        name: '',
//                        width: ''
//                    },
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
                    openName:'userManage',
                    activeName:'newAddUserList'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













