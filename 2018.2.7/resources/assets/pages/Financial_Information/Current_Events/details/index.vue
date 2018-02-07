<style lang="css" scoped>
    .current-events-container {
        background-color: #f5f5f5;
    }

    #details_content .current-events-content .details-ct img{
        max-width:1080px !important;
        display: block;
    }

    .current-events-content {
        width: 1200px;
        margin: 30px auto;
        border-radius: 6px;
    }

    .left-exhibition-list {
        width: 100%;
    }
    .details-ct{
        width: 100%;
        margin-bottom: 20px;
        padding: 60px;
        border-radius: 6px;
        background-color: #fff;
    }
    .details-ct h5{
        font-size: 30px;
        line-height: 50px;
        margin-bottom: 20px;
        color: #161616;
    }
  .details-top{
      width: 100%;
      padding-bottom: 30px;
      border-bottom: 1px solid  rgb( 238, 238, 238 );
   }

    .details-time{
        font-size: 14px;
        color: #999;
    }
    .details-time .time-icon{
        /*margin-right: 10px;*/
    }

    .details-ready{
        width: 100%;
        padding: 20px;
        margin-top: 30px;
        margin-bottom: 60px;
        border-left:3px solid rgb( 212, 212, 212 );
        background-color: rgb( 245, 245, 245 );
    }
.details-ready p{
    line-height: 24px;
    font-size: 14px;
    color: #666;
}


    /*.loading-more{*/
        /*width: 100%;*/
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
    /*.cur-events-right-nav {*/
        /*width: 300px;*/
        /*height: 360px;*/
        /*padding:0px 30px;*/
        /*border-radius: 6px;*/
        /*background-color: #fff;*/
    /*}*/
    /*.cur-events-right-nav h5{*/
        /*line-height: 59px;*/
        /*font-size: 14px;*/
        /*color: #333;*/
        /*padding-left: 2px;*/
        /*border-bottom:1px solid rgb( 238, 238, 238 );*/
    /*}*/

    /*.right-nav-ul li{*/
        /*line-height: 57px;*/
        /*cursor: pointer;*/
    /*}*/
    /*.right-nav-ul span{*/
        /*font-size: 14px;*/
        /*color: #333;*/
    /*}*/
    /*.right-nav-ul  .array-icon{*/
        /*width: 16px;*/
        /*height: 16px;*/
        /*line-height: 16px;*/
        /*text-align: center;*/
        /*background-color: #ffa114;*/
        /*display: inline-block;*/
        /*font-size: 14px;*/
        /*margin-right: 18px;*/
        /*color: #FFFFFF;*/
    /*}*/
    /*.right-nav-ul  .sigle{*/
        /*background-color:rgb( 153, 153, 153 );*/
    /*}*/
</style>
<style>
    /*重置样式*/
    #details_content .current-events-content .details-ct img{
        max-width:1080px !important;
        display: block;
    }
    #details_content .current-events-content .details-ct p{
        line-height: 24px;
        font-size: 14px;
        margin:10px 0px;
    }
    #details_content .current-events-content .details-ct strong{
        line-height: 50px;
        font-size: 16px;
    }
    #details_content .current-events-content .details-ct hr{
        margin:10px 0px;
    }
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
</style>

<template>
    <div class="current-events-container" id="details_content">
        <div class="current-events-content">
            <div class="left-exhibition-list">
                <div class="details-ct" v-if="!loading">
                   <div class="details-top">
                       <h5>{{detailData.title}}</h5>
                       <p class="details-time">
                           <span style="font-size: 24px;"><Icon type="fireball"></Icon></span>
                           <span style="margin-right: 20px">{{detailData.hits_humans}}</span>
                           <span class="time-icon"><Icon type="android-time"></Icon></span>
                           <span>{{detailData.time_show}}</span>
                       </p>
                   </div>
                    <div class="details-ready">
                        <p>{{detailData.desc}}</p>
                    </div>
                    <div v-html="detailData.text"></div>
                </div>
                <!--<div class="loading-more">查看更多</div>-->
            </div>
        </div>
        <div class="loading_box cl" v-show="loading">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
                <Icon type="load-c" size=60 class="demo-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>
            </Col>
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                loading:false,
                detail_Id:'',
                detailData:'',
            }
        },
        mounted(){

        },
        beforeMount(){
            this.detail_Id=this.$route.params.id;
            this.getDetailsData()
        },
        methods: {
            getDetailsData(){
                return new Promise((resolve, reject) => {
                    this.loading=true
                    this.$http.get('/detail/'+this.detail_Id)
                        .then((response) => {
                            this.detailData=response.data
                            this.loading=false
                            resolve()
                        }).catch((error) => {
                        console.log(error);
                        reject();
                    });
                })
            },
        }
    }
</script>
