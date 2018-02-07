<style lang="css" scoped  src="./css/index.css"></style>
<style>
    #details_content{
        width: 1000px;
        margin: 30px auto;
        padding:30px 0px;
    }
    #details_content h1{
        font-size:200%;
        margin:10px 0px;
        max-width:100%;
    }
    #details_content h2{
        font-size:150%;
        margin:10px 0px;
        max-width:100%;
    }
    #details_content h3{
        font-size:120%;
        margin:10px 0px;
        max-width:100%;
    }
    #details_content p{
        font-size: 14px;
        line-height: 24px;
        margin:10px 0px;
        max-width:100%;
    }
    #details_content span{
        font-size: 14px;
        /*margin:10px 0px;*/
        max-width:100%;
    }
    #details_content img{
        max-width:100%;
        display: block;
        margin:auto;
    }


    .ai_details_content pre{
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }
</style>
<template>
    <div class="detail-container">
        <div class="details-banner-pic-box">
            <img :src="details_bannerPic" alt="">
        </div>
        <div class="details-content">
            <div class="details-top-prompt">
                <div class="top-prompt-box1">
                    <div>
                        <span class="details-title-name">{{EA_detailsData.name}}</span>
                        <span class="price">{{EA_detailsData.price}}</span>
                        <span>元/套</span>
                    </div>
                    <div>
                        <span class="purchase-btn">立即购买</span>
                    </div>
                </div>
                <div class="top-prompt-box2">
                    <p>{{EA_detailsData.introduction}}</p>
                </div>
            </div>
            <div v-html="detailsContent" id="details_content" class="ai_details_content"></div>
            <!--<div class="detail-introduce">-->
                <!--<p class="big-title">大标题</p>-->
                <!--<p class="small-title">小标题</p>-->
                <!--<div class="introduce-ct">-->
                    <!--<p>-->
                        <!--50%的年回报率，属于资管的操盘方式，600%属于暴利+复利滚动模式，建议大家前期不要用本金去拼，当赚取一定利润之后，取出赚的50%的年回报率，属于资管的操盘方式，600%属于暴利+复利滚动模式，</p>-->
                    <!--<p>自由之神我作为原则。我可以肯定的说：外汇市场是绝对能赚到钱的！</p>-->
                    <!--<p>下图是2017年12月1日到2017年12月16日到,6个多月时间，从1万到1亿，回报率高达1923%</p>-->
                <!--</div>-->
                <!--<div class="introduce-pic-box">-->
                    <!--<img src="./images/details_introduce_pic1.jpg" alt="">-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="detail-introduce">-->
                <!--<p class="big-title">大标题</p>-->
                <!--<p class="small-title">小标题</p>-->
                <!--<div class="introduce-ct">-->
                    <!--<p>-->
                        <!--50%的年回报率，属于资管的操盘方式，600%属于暴利+复利滚动模式，建议大家前期不要用本金去拼，当赚取一定利润之后，取出赚的50%的年回报率，属于资管的操盘方式，600%属于暴利+复利滚动模式，</p>-->
                    <!--<p>自由之神我作为原则。我可以肯定的说：外汇市场是绝对能赚到钱的！</p>-->
                    <!--<p>下图是2017年12月1日到2017年12月16日到,6个多月时间，从1万到1亿，回报率高达1923%</p>-->
                <!--</div>-->
                <!--<div class="introduce-pic-box">-->
                    <!--<img src="./images/details_introduce_pic2.jpg" alt="">-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                loading:false,
                EA_details:'',
                EA_detailsData:'',
                details_bannerPic:'',
                detailsContent:'',
            }
        },
        mounted(){

        },
        beforeMount(){
            this.EA_details=this.$route.params.id
           this.getSingleData()
        },
        methods: {
            getSingleData(){
                return new Promise((resolve, reject) => {
                    this.loading=true
                    this.$http.get('/ea_list/'+this.EA_details)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.EA_detailsData = retData
                                this.details_bannerPic=this.EA_detailsData.images.path;
                                this.detailsContent=retData.detail.replace(/((.|\n)*<body>\n*|\n*<\/body>(.|\n)*)/ig,'')
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
        }
    }


</script>
