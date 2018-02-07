<style lang="css" scoped>
    .artificial-intelligence-container {
        background-color: #f5f5f5;
    }


    .ai-banner-container {
        width: 100%;
        height: 540px;
        margin: auto;
        min-width: 1200px;
        text-align: center;
    }
    .ai-banner-container img{
        width: 100%;
        height: 540px;
        display: inline-block;
    }

    .ai-middle-content {
        width: 1200px;
        text-align: center;
        padding: 30px 0px 0px;
        margin: auto;
    }

    .ai-middle-ul {

    }

    .ai-middle-ul li {
        width: 270px;
        height: 530px;
        border-radius: 6px;
        margin-right: 40px;
        margin-bottom: 30px;
        float: left;
        padding: 30px;
        background-color: #fff;
    }

    .ai-middle-ul .dateils-h5-title {
        font-size: 16px;
        line-height: 54px;
        text-align: center;
        color: #333;
    }
    .ai-middle-ul .ai-middle-li .li-pic{
        transition: all 1s cubic-bezier(.23,1,.32,1);
        transform: scale(1);
    }
    .ai-middle-ul .ai-middle-li:hover .li-pic{
        transition: all .8s cubic-bezier(.23,1,.32,1);
        transform: scale(1.3);
    }
    .ai-middle-ul li:nth-child(4n+4) {
        margin-right: 0px;
    }

    .pic-box{
        overflow: hidden;
    }
    .pic-box img {
        width: 210px;
        height: 140px;
        border:1px solid #EEEEEE;
        display: block;
    }

    .ai-li-prompt {
        height: 150px;
        padding:15px 0px;
        border-top:1px solid  rgb( 238, 238, 238 );
        border-bottom:1px solid  rgb( 238, 238, 238 );
         }


    .ai-middle-ul .ai-li-prompt p{
        line-height: 24px;
        font-size: 14px;
        height: 120px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        color: #999;
        text-align: left;
    }
    .ai-middle-ul .ai-Price{
        padding: 30px 0px;
        text-align: center;
        font-size: 16px;
        color: #333;
    }
    .ai-middle-ul .ai-Price span{
        color: #ffa114;
        font-size: 20px;
    }
    .ai-purchase-box{
        padding-left: 20px;
    }
    .purchase-btn{
        width: 100px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
        text-align: center;
        font-size: 16px;
        border-radius: 6px;
        color: #ffa114;
        cursor: pointer;
        margin-right: 20px;
        border:1px solid #ffa114;
    }
    .purchase-btn:hover{
        background-color: #ffa114;
        color: #FFFFFF;
    }
    .ai-purchase-box .details{
        font-size: 14px;
        color: #999;
        cursor: pointer;
    }
    .ai-purchase-box .details:hover{
        color: #ffa114;
    }


    .ai-page{
        width: 1200px;
        background-color: #fff;
        height: 50px;
        margin: auto;
        line-height: 50px;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        margin-bottom: 30px;
        border-radius: 6px;
    }
    .no_data_content {
        font-size:18px;
        color: #999;
        text-align: center;
    }



    .replace-box{
        width:100%;
        height: 540px;
    }
    .replace-box img{
        width: 100%;
        height: 540px;
        display: block;
    }
</style>
<style>
    .ivu-carousel-dots li button{
        background-color: #ffa114;
    }
    .spin-box .ivu-spin-fix{
        background-color: rgba(255,255,255,0);
    }
</style>
<template>
    <div class="artificial-intelligence-container">
        <div class="ai-banner-container" v-if="Banner_picList.length!=0">
            <Carousel autoplay loop  :autoplay-speed="3000" v-model="banner">
                <ul>
                    <li v-for="value in Banner_picList">
                        <CarouselItem>
                            <div class="demo-carousel">
                                <img :src="value.path" alt="">
                            </div>
                        </CarouselItem>
                    </li>
                </ul>
            </Carousel>
        </div>

        <!--没数据时显示-->
        <div class="replace-box" v-if="Bitmap">
            <img src="./images/ai_banner_pic.jpg" alt="">
        </div>

        <div class="ai-middle-content cl">
            <v-tableSpin v-show="loading" class="spin-box"></v-tableSpin>
            <ul class="ai-middle-ul">
                <li v-for="value in EA_List" class="ai-middle-li">
                    <div class="pic-box">
                        <img class="li-pic" :src="value.images.path" alt="">
                    </div>
                    <h5 class="dateils-h5-title">{{value.name}}</h5>
                    <div class="ai-li-prompt">
                        <p>{{value.introduction}}</p>
                    </div>
                    <div class="ai-Price">
                       <p><span>{{value.price}}</span> 元/套</p>
                    </div>
                    <div class="ai-purchase-box">
                        <span class="purchase-btn">立即购买</span>
                        <router-link :to="{path:'/Artificial_Intelligence/ai_details/'+value.id}">
                        <span class="details">查看详情</span>
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
        <!--<div v-if="EA_List==''" class="no_data_content">暂无数据！</div>-->
        <div class="ai-page cl" v-if="EA_List!=''">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                Bitmap:false,   //占位图
                banner:0,
                loading:false,
                EA_List:'',
                Banner_picList:'',
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
                bannerIndex:0
            }
        },
        mounted(){

        },
        beforeMount(){
            this.getEAListData()
            this.getBanner_picList()
        },
        methods: {
            getEAListData(page=1){
                const ajaxData = {
                    page
                }
                return new Promise((resolve, reject) => {
                    this.loading=true
                    this.$http.get('/ea_list',{params: ajaxData})
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                var {current_page, last_page, per_page, total, data:list}=retData
                                var pageIndexMsg = {current_page, last_page, per_page, total}
                                if (current_page != '1' && !list.length) {
                                    this.getEAListData(--current_page)
                                }
                                Object.assign(this.pageIndex, pageIndexMsg)
                                this.EA_List = list
                                this.loading=false
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        console.log(error);
                        reject();
                    });
                })
            },
            getBanner_picList(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/banner_list')
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                           this.Banner_picList=retData
                                if(this.Banner_picList.length==0){
                                  this.Bitmap=true
                                }
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            getBannerPic(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/banner_list')
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.banner_picList=retData
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            changePage(page){
                this.getEAListData(page)
            },

        }
    }


</script>
