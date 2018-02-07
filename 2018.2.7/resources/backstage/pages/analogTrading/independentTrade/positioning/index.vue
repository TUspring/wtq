<style lang="css">
    .list_box {
        margin-left:20px;
    }
    .list_box table {
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
    .page_content {
        margin-top:20px;
        margin-left:20px;
    }
</style>

<template>
    <div class="position_box">
        <!--表格-->
        <div class="list_box">
            <table border="1" width="1000px" v-if="showPage">
                <tr>
                    <th>订单号</th>
                    <th>开仓时间</th>
                    <th>类型</th>
                    <th>手数</th>
                    <th>交易品种</th>
                    <th>开仓价格</th>
                    <th>当前价格</th>
                    <th>浮动盈亏</th>
                </tr>
                <tr v-for="(value,index) in listModel" v-if="listModel.length">
                    <td>{{value.order_num}}</td>
                    <td>{{timeType(value.open_time)}}</td>
                    <td>{{value.type}}</td>
                    <td>{{value.trading_volume}}</td>
                    <td>{{value.variety}}</td>
                    <td>{{value.open_price}}</td>
                    <td></td>
                    <td>{{value.profit_loss}}</td>
                </tr>
            </table>
        </div>

        <div class="noList_box" v-if="!listModel.length">暂无数据</div>
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
                MT4List:[],
                showPage: false
            }
        },
        computed:{
            listModel(){
                return this.MT4List
            }
        },
        mounted(){
            const {page}=this.$router.currentRoute.query
            this.getMT4List()
        },
        methods: {
            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            //获取跟随列表
            getMT4List(page=1){
                var getMT4List=this.getMT4ListHttp(page)
                Promise.all([getMT4List]).then(() => {
                    this.showPage=true
                }).catch(() => {

                });
            },

            getMT4ListHttp(page=1){
                const ajaxData={
                    page
                }
                return new Promise((resolve, reject) => {
                    this.showPage=false;
                    this.$http.get('admin/trading_record',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode == '0'){
                                var {current_page,last_page,per_page,total,data:list}=retData
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                    this.getMT4List(--current_page)
                                }
                                this.MT4List=list
                                Object.assign(this.pageIndex,pageIndexMsg)
                                resolve()
                            }else{
                                reject()
                            }
                        }).catch((error) =>{
                        reject()
                    });

                })
            },

            changePage(page){
                this.getMT4List(page)
            },
        }
    }
</script>