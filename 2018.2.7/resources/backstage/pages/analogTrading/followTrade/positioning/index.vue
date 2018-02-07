<style lang="css">
    .list_box {
        margin-left:20px;
        padding-right:30px;
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

    /*=============搜索start==========*/
    .search_content {
        width:100%;
        height:40px;
        line-height:40px;
        padding:0 20px;
        margin-bottom:20px;
    }
    .search_content span {
        color:#999999;
    }
    .search_content .dataSearch,  .search_content .orderSearch{
        display: inline-block;
        width:50px;
        height:32px;
        line-height:32px;
        text-align: center;
        color:#fff;
        background:#FFAD33;
        border-radius:6px;
        cursor:pointer;
    }
    .search_content .dataSearch {
        margin-right:30px;
    }
    .search_content  input {
        width:150px;
        height:32px;
        line-height:32px;
        border:1px solid #EEEEEE;
        border-radius:6px;
        padding-left:10px;
    }
    .search_content .number {
        color:#999999;
        float:right;
        margin-right:10px;
    }
    /*=============搜索end==========*/

</style>

<template>
    <div class="position_box">
        <div class="search_content">
            <span>开仓时间:</span>
            <DatePicker type="date"  format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期" v-model="startTime"  @on-change="startTime=$event" style="width: 150px"></DatePicker>
            <span>至</span>
            <DatePicker type="date"  format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期" v-model="endTime"   @on-change="endTime=$event" style="width: 150px"></DatePicker>
            <span class="dataSearch" @click="searchTime">确定</span>

            <span class="number">持仓手{{countLots}}，浮动盈亏{{countProfit}}</span>
        </div>

        <!--表格-->
        <div class="list_box" v-if="showPage">
            <table border="1" width="100%">
                <tr>
                    <th>订单号</th>
                    <th>策略名称</th>
                    <th>开仓时间</th>
                    <th>类型</th>
                    <th>手数</th>
                    <th>交易品种</th>
                    <th>开仓价格</th>
                    <!--<th>当前价格</th>-->
                    <th>浮动盈亏</th>
                </tr>
                <tr  v-for="(value,index) in listModel"  v-if="listModel.length">
                    <td>{{value.Ticket}}</td>
                    <td>{{value.policy.name}}</td>
                    <td>{{timeType(value.OpenTime)}}</td>
                    <td>{{value.Type}}</td>
                    <td>{{value.Lots}}</td>
                    <td>
                        <span v-if="value.Symbol==0">买入</span>
                        <span v-if="value.Symbol==1">卖出</span>
                    </td>
                    <td>{{value.OpenPrice}}</td>
                    <!--<td></td>-->
                    <td>{{value.Profit}}</td>
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

                //搜索时间
                startTime:'',     //开始时间格式
                endTime:'',       //结束时间格式

                countLots:'',     //总的平仓手数
                countProfit:'',   //总的浮动盈亏

                MT4List:[],
                showPage: false,
                dataId:''
            }
        },
        computed:{
            listModel(){
                return this.MT4List
            }
        },
        beforeMount(){
            this.dataId=JSON.parse(this.$route.query.data)
            this.getCountOptionList()

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

            //时间格式转时间戳
            changeTimeType(value){
                return Date.parse(new Date(value))/1000;

            },

            //根据开始结束时间搜素
            searchTime(){
                var ajaxData = {
                    start_time:this.changeTimeType(this.startTime),
                    end_time:this.changeTimeType(this.endTime)+(24*3600)
                }
                console.log(ajaxData.start_time)
                console.log(ajaxData.end_time)
                this.$http.get('admin/open_detail/'+this.dataId,{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData={}} = data
                        if (retCode == '0'){
                            this.MT4List = retData.data
                        }
                    })
            },

            //获取统计持仓记录数据列表
            getCountOptionList(){
                this.$http.get('admin/count_open/'+this.dataId)
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData={}} = data
                        if(retCode == '0'){
                            this.countLots = retData.lots
                            this.countProfit = retData.profit
                        }
                    })
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
                    this.$http.get('admin/open_detail/'+this.dataId,{params:ajaxData})
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
            }
        },
        activated(){
            this.$emit("changeTab",0)//切换局部导航
            this.getMT4List(this.pageIndex.current_page)
        }
    }
</script>