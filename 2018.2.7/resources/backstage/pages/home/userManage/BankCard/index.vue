

<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }

    .bankCard-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .bankCard-content .leftInfo {
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
        height:50px;
        width: 10%;
        text-align:center;
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

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >用户管理</BreadcrumbItem>
                <BreadcrumbItem>银行卡</BreadcrumbItem>
            </Breadcrumb>
        </div>


        <div class="bankCard-content">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>

            <div class="rightInfo">

                <div class="rightInfo-r">
                    <input type="text" placeholder="请输入姓名" v-model.trim="real_name" @keyup.enter="submit">
                    <span @click="search">搜索</span>
                </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>姓名</th>
                    <th>银行名称</th>
                    <th>银行卡号</th>
                    <th>支行名称</th>
                    <th>预留手机号码</th>
                </tr>
                <tr v-for="value in listModal" v-if="listModal.length && !loading">
                    <td>{{value.real_name}}</td>
                    <td>{{value.bank_name}}</td>
                    <td>{{value.bank_number}}</td>
                    <td>{{value.sub_branch}}</td>
                    <td>{{value.reserved_phone}}</td>
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
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                //搜索
                real_name:'',
               searchKey:{
                    real_name:''
                },

                bankCardList:''        //银行卡列表信息
            }
        },
        computed: {
            listModal(){
                return this.bankCardList
            }
        },
        beforeMount() {
            this.getBankCardList()
        },

        methods:{
            //搜索
            submit(){
                this.search()
            },
            search(){
                this.searchKey = {
                    real_name:this.real_name
                }
                this.getBankCardList()
            },

            //获取银行卡列表信息
            getBankCardList (page=1){
                this.loading = true
                let ajaxData = {
                    page
                }
                ajaxData=Object.assign(ajaxData,this.searchKey)
                this.$http.get('/admin/bank/',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        var {current_page,last_page,per_page,total,data:list}=retData
                        var pageIndexMsg={current_page,last_page,per_page,total}
                        if(current_page!='1'&&!list.length){
                            this.getBankCardList(--current_page)
                        }
                        Object.assign(this.pageIndex,pageIndexMsg)
                        this.bankCardList = list
                        this.loading = false
                    }
                })
            },
            //分页
            changePage(page){
                this.getBankCardList(page)
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
                    openName:'userManage',
                    activeName:'BankCard'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













