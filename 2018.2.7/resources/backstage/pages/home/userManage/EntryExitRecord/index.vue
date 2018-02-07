

<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }


    .entryExit-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .entryExit-content .leftInfo {
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
        padding-right: 20px;
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
        width: 9%;
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
                <BreadcrumbItem>MT4账号列表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="entryExit-content">
            <div class="leftInfo">
                <p>共 <span class="number">20</span>条记录</p>
            </div>

            <div class="rightInfo">
                <div class="rightInfo-l">
                    <span>类型：</span>
                    <Select style="width:120px;margin-left: 20px" size="large" placeholder="全部">
                        <Option value="全部">全部</Option>
                        <Option value="出金">出金</Option>
                        <Option value="入金">入金</Option>
                    </Select>
                </div>
                <div class="rightInfo-r">
                    <input type="text" placeholder="请输入姓名/MT4账号">
                    <span>搜索</span>
                </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>时间</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>MT4账号</th>
                    <th>出入金类型</th>
                    <th>金额</th>
                    <th>总入金</th>
                    <th>总出金</th>
                    <th>账户余额</th>
                    <th>总收益</th>
                </tr>
                <tr>
                    <td>2017-5-16 14:00</td>
                    <td>阿</td>
                    <td>13812344321</td>
                    <td>EWG-2090019238</td>
                    <td>出金</td>
                    <td>$5000</td>
                    <td>$6000</td>
                    <td>$4000</td>
                    <td>$1000</td>
                    <td>$20030</td>
                </tr>
                <tr>
                    <td>2017-5-16 14:00</td>
                    <td>泉</td>
                    <td>13812344321</td>
                    <td>EWG-2090019238</td>
                    <td>入金</td>
                    <td>$5000</td>
                    <td>$6000</td>
                    <td>$4000</td>
                    <td>$1000</td>
                    <td>$20030</td>
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
                    activeName:'EntryExitRecord'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













