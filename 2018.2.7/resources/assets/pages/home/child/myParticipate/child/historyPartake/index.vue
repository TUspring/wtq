
<style lang="less" scoped>

    .loading_box {
        width:300px;
        height: 200px;
        position: absolute;
        top:-50%;
        left: 50%;
        margin-left: -150px;
        /*margin-top: 100px;*/
        display: flex;
        justify-content: center;
    .ivu-spin-fix {
        font-size:14px;
        background-color:rgba(0,0,0,.0);
    }
    div{
        margin-top: 20px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border:none;

    }
    }
    .container{
        position: relative;
    }
</style>
<style lang="css" scoped>
    .container .ct-list-box {
        margin-top: 20px;
    }

    .container .list-ul {

    }

    .container .list-ul .list-li {
        width: 970px;
        /*height: 240px;*/
        border-radius: 6px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
        position: relative;
    }

    .flag-container{
        top: -1px;
        right: -1px;
        width: 150px;
        height: 100px;
        position: absolute;
        overflow: hidden;
    }
    .flag-box{
        top: 0px;
        right: -20px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        padding-left: 40px;
        border-radius: 6px;
        transform: rotate(30deg);
        position: absolute;
        box-shadow: 1px 1px 0px 0px #ffa114;
        background-color: #ffa114;

    }

    .container .top-box {
        width: 970px;
        height: 120px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px;
        border-bottom: 1px solid rgb(238, 238, 238);
    }

    .container .top-left-content div {
        float: left;
    }

    .container .top-left-content .pic-box {
        width: 90px;
        height: 90px;
    }

    .container .top-left-content .tx-box {
        padding: 20px 0px;
        margin-left: 30px;

    }

    .container .top-left-content .tx-box p {
        line-height: 30px;
    }

    .container .top-left-content .tx-box p:nth-child(1) {
        font-size: 16px;
        color: #ffa114;
    }

    .container .top-left-content .tx-box p:nth-child(2) {
        font-size: 14px;
        color: #999;
    }

    .container .top-left-content .pic-box img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        display: block;
        /*background: url("../images/pic_bg_shadow.png") no-repeat;*/
        background-size: 100% 100%;
        background-color: #EEEEEE;
        box-shadow: 0px 3px 10px 0px rgba(212, 212, 212, 0.3)
    }
    .container .below-box-left{
        width: 170px;
        text-align: center;
    }
    .top-right-content{
        width: 120px;
        text-align: left;
    }

    .top-right-content .prompt {
        font-size: 18px;
        color: #ffa114;
    }

    .below-box {
        height: 120px;
        width: 970px;
        padding: 30px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .below-box-ul {
        display: flex;
    }

    .below-box-ul li {
        height: 80px;
        flex: 1;
        text-align: center;
        border-left: 1px solid rgb(238, 238, 238);
    }
    .below-box-ul li:nth-child(1){
        border-left: none;
    }

    .below-box-ul .num {
        font-size: 16px;
        color: #333;
    }

    .below-box-ul .data-name {
        font-size: 14px;
        color: #999;
        margin-top: 20px;
    }
    .txt-box{
        width: 100%;
        padding-left: 10px 0px 10px 150px;
        border-top: 1px solid rgb(238, 238, 238);
    }
    .prompt-icon {
        cursor: pointer;
    }
    .stop-box{
        border-top: 1px solid rgb(238, 238, 238);
        padding:10px 10px 10px 150px;
    }
    .stop-box p{
        color: red;
        font-size: 14px;
        line-height: 24px;
    }
</style>
<template>
    <div class="container">
        <!--加载中-->
        <div class="loading_box cl" v-if="loading">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
                <Icon type="load-c" size=60 class="demo-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>
            </Col>
        </div>
        <div class="min cl" v-if="showPage">
            <div class="ct-list-box cl">
                <ul class="list-ul cl">
                    <li class="list-li" v-for="item in  listModel">
                        <div class="flag-container">
                            <div class="flag-box">
                                <span v-if="item.regular_project.project_type==1">保本保息型</span>
                                <span v-if="item.regular_project.project_type==2">保本型</span>
                                <span v-if="item.regular_project.project_type==3">普通型</span>
                            </div>
                        </div>
                        <div class="top-box">
                            <div class="top-left-content cl">
                                <div class="pic-box">
                                    <router-link :to="{path:'/periodicalProject/projectDetail/'+item.regular_project.id}">
                                    <img :src="item.regular_project.picture?item.regular_project.picture:''" alt="">
                                    </router-link>
                                </div>
                                <div class="tx-box">
                                    <router-link :to="{path:'/periodicalProject/projectDetail/'+item.regular_project.id}">
                                    <p>{{item.regular_project.name}}</p>
                                    </router-link>
                                    <p>项目封闭期：2018-12-21 至 2019-2-1</p>
                                </div>
                            </div>
                            <div class="top-right-content">
                                <span v-if="item.suspend_time>0" class="prompt">暂停中</span>
                            </div>
                        </div>
                        <div class="below-box">
                            <div class="below-box-left">
                                <p>{{item.mt4_account?item.mt4_account.platform.platform:''}}-{{item.mt4_account?item.mt4_account.MT4_account:''}}</p>
                            </div>
                            <ul class="below-box-ul" style="width: 820px;">
                                <li>
                                    <p class="num">{{item.regular_project? "$"+item.regular_project.min_follow_money:'--'}}</p>
                                    <p class="data-name">
                                        <span>参与资金</span>
                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.running_yield=='' ? item.running_yield+"%":'--'}}</p>
                                    <p class="data-name">
                                        <span>当前收益率</span>
                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.getAccountInfo? "$"+item.getAccountInfo.net_worth:'--'}}</p>
                                    <p class="data-name">
                                        <span>账户净值</span>
                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.getAccountInfo? "$"+item.getAccountInfo.balance:'--'}}</p>
                                    <p class="data-name">
                                        <span>账户余额</span>
                                    </p>
                                </li>
                            </ul>
                            <v-tableSpin v-show="loading"></v-tableSpin>
                        </div>
                        <div class="stop-box" v-if="item.suspend_time>0">
                            <!--<p>暂停原因：余额不足,请充值使用！</p>-->
                        </div>
                    </li>
                </ul>
            </div>
            <div class="noList_box" v-if="!listModel.length">暂无数据</div>
            <div class="pageIndex_box">
                <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                loading: false,
                showPage:false,
                participateList:null,
                pageIndex:{
                    current_page:'1',
                    last_page:null,
                    per_page:null,
                    total:null

                },
            }
        },
        computed:{
            listModel(){
                return this.participateList
            }
        },
        mounted (){
            const {page}=this.$router.currentRoute.query
            this.getPolicyList(page)
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

            getPolicyList(page=1){
                var getPolicyList=this.getPolicyListHttp(page)
                Promise.all([getPolicyList]).then(()=>{
                    this.showPage=true
                    this.loading = false
                }).catch(()=>{
                });
            },
            getPolicyListHttp(page=1){
                const ajaxData={
                    page,
                    suspend:2
                }
                return new Promise((resolve, reject)=>{
                    this.showPage=false
                    this.loading = true
                    this.$http.get('participation_project',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode=='0'){
                                var {current_page,last_page,per_page,total,data:list}=retData
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                    this.getPolicyList(--current_page)
                                }
                                this.participateList=list
                                Object.assign(this.pageIndex,pageIndexMsg)
                                resolve();
                            }else{
                                reject();
                            }
                        })
                        .catch((error) =>{
                            reject();
                        });

                })
            },
            changePage(page){
                this.getPolicyList(page)
            }
        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
        }
    }
</script>