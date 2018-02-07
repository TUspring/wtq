<style lang="css" scoped>
    .current-events-container {
        background-color: #f5f5f5;
    }

    .current-events-content {
        width: 1200px;
        margin: 30px auto;
        display: flex;
        justify-content: space-between;
    }

    .left-exhibition-list {
        width: 880px;
    }

    .exhibition-list-ul li {
        width: 880px;
        height: 220px;
        padding: 30px;
        background-color: #fff;
        border-radius: 6px;
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
    }

    .exhibition-list-ul .list-pic {
        width: 210px;
        height: 160px;
        overflow: hidden;
    }

    .exhibition-list-ul .list-pic .pic {
        width: 100%;
        height: 100%;
        display: block;
    }
    .left-details-li .pic{
        transition: all 1s cubic-bezier(.23,1,.32,1);
        transform: scale(1);
    }
    .left-details-li:hover .pic{
        transition: all .8s cubic-bezier(.23,1,.32,1);
        transform: scale(1.3);
    }


    .exhibition-list-ul .cur-prompt {
        width: 580px;
        height: 160px;
    }

    .exhibition-list-ul .cur-prompt h5 {
        font-size: 18px;
        color: #333;
        line-height: 24px;
        height: 50px;
        cursor: pointer;
    }
    .exhibition-list-ul .cur-prompt h5:hover{
        color: #ffa114;
    }
    .exhibition-list-ul .prompt-txt {
        font-size: 14px;
        height: 70px;
        color: #999;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .exhibition-list-ul .update-time {
        margin-top: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
    }

    .update-time .time-icon {
        font-size: 16px;
        color: #999;
        margin-right: 6px;
    }
    /*.loading-more{*/
        /*width: 880px;*/
        /*line-height: 50px;*/
        /*background-color: #fff;*/
        /*border-radius: 6px;*/
        /*font-size: 16px;*/
        /*text-align: center;*/
        /*color: #666;*/
        /*cursor: pointer;*/
    /*}*/
    /*.loading-more:hover{*/
        /*color: #ffa114;*/
    /*}*/
    .cur-events-right-nav {
        width: 300px;
        height: 360px;
        padding:0px 30px;
        border-radius: 6px;
        background-color: #fff;
    }
   .cur-events-right-nav h5{
      line-height: 59px;
       font-size: 14px;
       color: #333;
       padding-left: 2px;
       border-bottom:1px solid rgb( 238, 238, 238 );
   }

   .right-nav-ul li{
       height: 57px;
       display: flex;
       align-items: center;
       cursor: pointer;
   }
    .right-nav-ul span{
        font-size: 14px;
        color: #333;
    }
 .right-nav-ul  .array-icon{
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        background-color: #ffa114;
        display: inline-block;
        font-size: 14px;
        margin-right: 18px;
        color: #FFFFFF;
    }
    .right-nav-ul  .sigle{
        background-color:rgb( 153, 153, 153 );
    }
.nav-prompt-tx{
    width: 200px;
    height: 30px;
    line-height: 37px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
}
    .nav-prompt-tx:hover{
        color: #ffa114;
    }

</style>

<style lang="css">
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .current-events-container .ivu-spin-fix{
        background-color: rgba(255,255,255,.0);
    }
    .loading_box{
        width: 1200px;
        height: 200px;
        margin: 100px auto;
        display: flex;
        justify-content: center;
    }
    .page-container{
        height: 50px;
        width: 880px;
        background-color: #fff;
        border-radius: 6px;
    }
    .page_box{
        height: 50px;
        display: flex;
        align-items: center;
        float: right;
        padding-right: 10px;
    }
</style>
<template>
    <div class="current-events-container">
        <div class="loading_box cl" v-show="loading">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
                <Icon type="load-c" size=60 class="demo-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>
            </Col>
        </div>
        <div class="current-events-content">
            <div class="left-exhibition-list" v-if="!loading">
                <ul class="exhibition-list-ul">
                    <li v-for="value in CurrentData" class="left-details-li">
                        <div class="list-pic">
                            <img class="pic" :src="value.thumb" alt="">
                        </div>
                        <div class="cur-prompt">
                            <!--<a :href="newLink" target="_blank">    </a>-->
                            <router-link :to="{path:'/Financial_Information/Current_Events/details/'+value.id}" target="_blank">
                                <h5>{{value.title}}</h5>
                            </router-link>
                            <p class="prompt-txt">{{value.desc}}</p>
                            <div class="update-time">
                                <span class="time-icon"><Icon type="android-time"></Icon></span>
                                <span>{{value.time_show}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="page-container">
                    <div class="page_box">
                        <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false" :page-size="21"></Page>
                    </div>
                </div>

            </div>
            <div class="cur-events-right-nav" v-if="!loading">
                  <h5>热门推荐</h5>
                 <ul class="right-nav-ul">
                    <li>
                        <span class="array-icon">1</span>
                        <router-link :to="{path:'/Financial_Information/Current_Events/details/'+hotData[0].id}" target="_blank">
                        <span class="nav-prompt-tx">{{hotData[0].title}}</span>
                        </router-link>
                    </li>
                     <li>
                         <span class="array-icon">2</span>
                         <router-link :to="{path:'/Financial_Information/Current_Events/details/'+hotData[1].id}" target="_blank">
                         <span class="nav-prompt-tx">{{hotData[1].title}}</span>
                         </router-link>
                     </li>
                     <li>
                         <span class="array-icon">3</span>
                         <router-link :to="{path:'/Financial_Information/Current_Events/details/'+hotData[2].id}" target="_blank">
                         <span class="nav-prompt-tx">{{hotData[2].title}}</span>
                         </router-link>
                     </li>
                     <li>
                         <span class="array-icon sigle">4</span>
                         <router-link :to="{path:'/Financial_Information/Current_Events/details/'+hotData[3].id}" target="_blank">
                         <span class="nav-prompt-tx">{{hotData[3].title}}</span>
                         </router-link>
                     </li>
                     <li>
                         <span class="array-icon sigle">5</span>
                         <router-link :to="{path:'/Financial_Information/Current_Events/details/'+hotData[4].id}" target="_blank">
                         <span class="nav-prompt-tx">{{hotData[4].title}}</span>
                         </router-link>
                     </li>
                 </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loading:false,
                page:'',
                CurrentData:'',
                hotData:'',
                curPage:'',
                pageIndex: {
                    pre: null,
                    total:'1',
                    totalPage: 1,
                    current_page:1,
                },
            }
        },
        mounted(){

        },
        computed:{
        },
        beforeMount(){
            this.getCurrentPage()
            this.getCurrentHot()
            this.getCurrentEvents()
//            this.newLink=window.location.origin+window.location.pathname+"#/help"
        },
        methods: {

            //请求页码
            getCurrentPage(){
                    return new Promise((resolve, reject) => {
                        this.loading=true
                        this.$http.get('/page')
                            .then((response) => {
                                const data = response.data;
                                console.log(data);
                                this.curPage=data.totalPage
//                                this.getCurrentEvents(data.totalPage)
                                var {pre,total, totalPage}=response.data

                                var pageIndexMsg = {pre, total, totalPage}
                                Object.assign(this.pageIndex, pageIndexMsg)
                                 reject();
                            }).catch((error) => {
                            reject();
                        });
                    })
                },

            //请求热门推荐数据
            getCurrentHot(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/recommend')
                        .then((response) => {
                            this.hotData = response.data;
                            reject();
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            //根据页码请求数据
            getCurrentEvents(page=1){
                return new Promise((resolve, reject) => {
                    this.$http.get('page/'+page)
                        .then((response) => {
                            this.CurrentData=response.data
                            this.loading=false
                            resolve();
                        }).catch((error) => {
                        reject();
                    });
                })
            },
            changePage(page){
                this.getCurrentEvents(page)
            },
          }
    }
</script>
