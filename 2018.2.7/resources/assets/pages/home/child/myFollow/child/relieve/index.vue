<style lang="css" scoped src="./css/index.css"></style>

<style lang="less">
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
            <div class="followName-list cl">
                <ul>
                    <li>策略</li>
                    <li>MT4账号</li>
                    <li>跟随方式</li>
                    <li>解除时间</li>
                    <li>跟随天数</li>
                </ul>
            </div>
            <div class="followUser-list cl"  v-for="(value,key) in listModel" v-if="listModel.length">
                <ul>
                    <li>
                        <img :src="value.head?value.head:''" alt=""><br>
                        {{value.name}}
                    </li>
                    <li><span>{{value.mt4account.MT4_account}}</span></li>
                    <li>{{value.follow}}</li>
                    <li>{{timeType(value.suspend_time)}}</li>
                    <li>{{checkDay(value.created_time,value.suspend_time)}}</li>
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
                showPage: false,
                historyFollowList: null,
                pageIndex: {
                    current_page: '1',
                    last_page: null,
                    per_page: null,
                    total: null
                }
            }
        },
        computed:{
            listModel(){
                return this.historyFollowList
            }

        },
        mounted (){
            const {page}=this.$router.currentRoute.query
            this.getHistoryFollowList(page)
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
            //计算天数
            checkDay(start,end) {

//                var starttimestamp = Date.parse(new Date(start));
//                starttimestamp = starttimestamp / 1000;

                var differ_time = end - start;
                var day = parseInt(differ_time / (60*60*24));

                if (day < 1) {
                    return 0;
                }else {
                    return day;
                }

            },

            getHistoryFollowList(page=1){
                var getHistoryFollowList=this.getHistoryFollowListHttp(page)
                Promise.all([getHistoryFollowList]).then(()=>{
                    this.showPage=true
                    this.loading = false
                }).catch(()=>{
                });
            },

            getHistoryFollowListHttp(page=1){
                const ajaxData={
                    page,
                    suspend:3
                }
                return new Promise((resolve, reject)=>{
                    this.showPage=false
                    this.loading = true
                    this.$http.get('policyFollowing/user_list',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode=='0'){
                                var {current_page,last_page,per_page,total,data:list}=retData
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                    this.getHistoryFollowList(--current_page)
                                }
                                this.historyFollowList=list
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
                this.getHistoryFollowList(page)
            }
        },
        activated(){
            this.$emit("changeTab",2)//切换局部导航
            this.getHistoryFollowList(this.pageIndex.current_page)
        }
    }
</script>