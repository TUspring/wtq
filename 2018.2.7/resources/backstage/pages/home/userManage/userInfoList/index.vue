

<style lang="css" scoped>
    .layout-content-main{
        padding: 10px;
    }
    .list_box{
        /*overflow-x:scroll;*/
    }


    .userInfoList-content {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        margin-left:10px;
    }

    .userInfoList-content .leftInfo {
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
    .page_box{
        height: 42px;
        line-height: 40px;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        margin-top: 20px;
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
                <BreadcrumbItem>用户列表</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="userInfoList-content">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>

            <div class="rightInfo">

                <div class="rightInfo-r">
                    <Select style="width:120px;margin-right: 8px" placeholder="请选择搜索类型" v-model="search_key">
                        <Option v-for="item in optionList":value="item.type" :key="item.type">{{item.name}}</Option>
                    </Select>
                    <input type="text" placeholder="请输入昵称/姓名/手机号码" v-model="search_val" @keyup.enter="submit">
                    <span @click="searchTop">搜索</span>
                </div>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table border="1" width="100%">
                <tr>
                    <th>账号ID</th>
                    <th>昵称</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>邮箱</th>
                    <th>性别</th>
                    <th>生日</th>
                    <th>城市</th>
                    <th>总收入</th>
                    <th>已提现</th>
                    <th>钱包余额</th>
                </tr>
                <tr v-for="value in listModal"  v-if="listModal.length && !loading">
                    <td>{{value.id}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.real_name?value.real_name:'暂无'}}</td>
                    <td>{{value.phone}}</td>
                    <td>{{value.email}}</td>
                    <td>
                        <span v-if="value.sex=='1'">男</span>
                        <span v-else-if="value.sex=='2'">女</span>
                        <span v-else>暂无</span>
                    </td>
                    <td>
                        <span v-if="value.birthday!=null">{{value.birthday}}</span>
                        <span v-else>暂无</span>
                    </td>
                    <td>
                        <span v-if="value.city!=null">{{value.city.name}}</span>
                        <span v-else>暂无</span>
                    </td>
                    <td>{{value.income}}</td>
                    <td>{{value.Have_withdrawal}}</td>
                    <td>{{value.balance}}</td>
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
                search_key:'',
                search_val:'',
                searchKey:{
                    search_key:'',
                    search_val:''
                },
                optionList:[
                    {name:'昵称',type:'name'},
                    {name:'姓名',type:'real_name'},
                    {name:'手机号码',type:'phone'}
                ],
                User_ListData:''

            }
        },
        computed: {
            listModal(){
                return this.User_ListData
            }
        },
        beforeMount() {
            this.getUserList()
        },

        methods:{
            //鼠标事件
            submit(){
                this.searchTop()
            },
            //搜索
            searchTop(){
                this.searchKey = {
                    search_key:this.search_key,
                    search_val:this.search_val
                }
                this.getUserList(1)
            },
            //获取用户列表
            getUserList(page=1){
                this.loading=true
                var ajaxData = {
                    page
                }
                ajaxData = Object.assign(ajaxData,this.searchKey)
                this.$http.get('/admin/user',{params: ajaxData})
                    .then((response) => {
                    const data = response.data;
                    const {retCode, retData, retMsg}=data;
                    if (retCode == '0') {
                        var {current_page, last_page, per_page, total, data:list}=retData
                        var pageIndexMsg = {current_page, last_page, per_page, total}
                        if (current_page != '1' && !list.length) {
                            this.getUserList(--current_page)
                        }
                        Object.assign(this.pageIndex, pageIndexMsg)
                        this.User_ListData = list
                        this.loading=false
                    }
                })
            },
            //分页
            changePage(page){
                this.getUserList(page)
            },

            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'userManage',
                    activeName:'userInfoList'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>













