<style lang="less" scoped>
    .examine-top {
        width: 100%;
        height: 34px;
        margin-top:20px;
        margin-bottom: 10px;
        padding:0 10px;
    }

    .examine-top .leftInfo {
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

    /*========列表========*/
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
    <div class="refused_container">

        <div class="examine-top">
            <div class="leftInfo">
                <p>共 <span class="number">{{pageIndex.total}}</span>条记录</p>
            </div>
        </div>

        <!--表格-->
        <div class="list_box">
            <table  border="1" width="100%">
                <tr>
                    <th>申请时间</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>提现金额($)</th>
                    <th>银行卡号</th>
                    <th>银行名称</th>
                    <th>支行名称</th>
                    <th>操作时间</th>
                    <th>拒绝原因</th>
                </tr>
                <tr v-for="value in listModal" v-if="listModal.length && !loading" >
                    <td>{{value.created_at}}</td>
                    <td>{{value.real_name}}</td>
                    <td>{{value.bank.reserved_phone}}</td>
                    <td>{{value.money}}</td>
                    <td>{{value.bank.bank_number}}</td>
                    <td>{{value.bank.bank_name}}</td>
                    <td>{{value.bank.sub_branch}}</td>
                    <td>{{timeType(value.operation_time)}}</td>
                    <td>{{value.refused.content}}</td>
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
            return{
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                alreadyRefusedList:''        //返回数据
            }
        },
        computed:{
            listModal(){
                return this.alreadyRefusedList
            }
        },
        beforeMount(){
            this.getAlreadyRefusedList()
        },
        methods:{
            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            //获取已拒绝列表
            getAlreadyRefusedList(page=1){
                this.loading = true
                var ajaxData = {
                    page,
                    type:2
                }
                this.$http.get('/admin/extract/list',{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.alreadyRefusedList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.alreadyRefusedList = list
                            this.loading = false
                        }
                    })
            },
            //分页
            changePage(page){
                this.getAlreadyRefusedList(page)
            },
        },
        activated(){
            this.$emit("changeTab",2)//切换局部导航
        }
    }
</script>