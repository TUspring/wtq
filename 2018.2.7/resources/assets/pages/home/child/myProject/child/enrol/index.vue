<style lang="less" scoped>
    .container{
        position: relative;
    }
    .item_content {
        width:100%;
        background:#fff;
        border-radius: 4px;
        padding:0 30px 30px 30px;
        margin-top:20px;
    }
    .top_content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
        height:80px;
        border-bottom:1px solid #EDEDED;
    }
    .top_content .left_content {
        height:51px;
        display: flex;
        align-items: center;
    }
    .top_content .left_content span {
        font-size: 14px;
        color: rgb( 51, 51, 51 );
    }
    .top_content .publicTime {
        font-size: 12px;
        color: rgb( 51, 51, 51 );
    }
    /*==列表==*/
    .list_box{
        width:100%;
        margin-top:30px;
    }
    .list_header {
        display: flex;
        border-radius: 6px;
        height: 41px;
        line-height:41px;
        background-color: rgb( 245, 245, 245 );
    }
    .list_header li {
        flex:1;
        font-size: 14px;
        color: rgb( 102, 102, 102 );
        text-align: center;
        float:left;
    }
    .list_detail {
        display: flex;
        height: 81px;
        line-height:81px;
    }
    .list_detail li {
        flex:1;
        font-size: 14px;
        color: rgb( 51, 51, 51 );
        text-align: center;
        float:left;
    }
    .list_detail .platform_box {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
    }
    .list_detail .platform_content {
        height:100%;
        max-width:150px;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .list_detail .pic_content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .list_detail .pic_content .pic {
        width:51px;
        height:51px;
        border-radius:50%;
        margin-right:20px;
        background:rgb( 238, 238, 238 );
    }
    .list_detail .pic_content .pic img {
        width:51px;
        height:51px;
        border-radius:50%;
        background:#EDEDED;
    }
    .no_data {
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        padding: 13px 0;
        background-color: #fff;
        border-radius: 6px;
    }

    /*==列表==*/
</style>

<template>
    <div class="container">
        <div class="item_content" v-for="value in listModal" v-if="listModal.length && !loading">
            <div class="top_content">
                <div class="left_content cl">
                   <span>距项目开始时间：{{checkDay(dateString,value.start_time)}}</span>
                </div>
                <div> <span class="publicTime">项目开始时间：{{timeType(value.start_time)}}</span></div>
            </div>
            <div class="list_box">
                <ul class="list_header">
                    <li>项目名称</li>
                    <li>信号源账号</li>
                    <li>交易员提成比例</li>
                    <li>参与人数</li>
                    <li>参与资金</li>
                </ul>
                <ul class="list_detail">
                    <li>
                        <div class="pic_content">
                            <div class="pic">
                                <router-link :to="{path:'/periodicalProject/projectDetail/'+value.id}">
                                <img :src="value.picture?value.picture:''" alt="">
                                </router-link>
                            </div>
                           <div>
                               <router-link tag="span" :to="{path:'/periodicalProject/projectDetail/'+value.id}">
                               <span style="cursor: pointer">{{value.name}}</span>
                               </router-link>
                           </div>
                        </div>
                    </li>
                    <li  class="platform_box">
                        <p class="platform_content" :title="titleCt(value.trade_platform.platform,value.MT4_account)"> {{value.trade_platform.platform}}-{{value.MT4_account}}</p>
                    </li>
                    <li>{{value.trader_royalty_rate}}%</li>
                    <li>{{value.participation_count}}</li>
                    <li>${{value.money_count}}</li>
                </ul>
            </div>
        </div>


        <!--=======加载中=====-->
        <v-tableSpin v-show="loading" style="margin-top:20px;"></v-tableSpin>

        <!--暂无数据-->
        <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>

        <!--分页-->
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

                dateString:'',      //当天时间的时间戳
                enrolList:''       //返回数据
            }
        },
        computed:{
            listModal(){
                return this.enrolList
            }
        },
        beforeMount(){
            this.getEnrolList()
            this.getDateString()
        },
        mounted(){
            this.timer=setInterval( () =>{
                this.getDateString()
            },1000)
        },
        beforeDestroy(){
            if(this.timer){
                clearInterval(this.timer)
            }
        },
        methods:{
            titleCt(val1,val2){
                return val1+'-'+val2
            },

            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },
            //获取当前时间
            getDateString(){
                var timestamp=parseInt(new Date().getTime()/1000);
                this.dateString = timestamp
            },
            //计算天数
            checkDay(start,end) {
                var differ_time = end - start;
                var day = parseInt(differ_time/(3600*24));

                var hourRest = differ_time-(day*24*3600);
                var hours = parseInt(hourRest/3600);

                var minuteRest = hourRest-(hours*3600);
                var minute = parseInt(minuteRest/60);
                if (day < 1) {
                    return hours+'小时'+minute+'分';
                }else {
                    return day+'天'+hours+'小时'+minute+'分';
                }
            },

            //获取报名中列表
            getEnrolList(page=1){
                this.loading = true
                var ajaxData = {
                    review_status:1,
                    page
                }
                this.$http.get('regular_project/user_list',{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0') {
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.getEnrolList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.enrolList = list
                            this.loading = false
                        }
                    })
            },
            //分页
            changePage(page){
                this.getEnrolList(page)
            }
        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
        }
    }
</script>