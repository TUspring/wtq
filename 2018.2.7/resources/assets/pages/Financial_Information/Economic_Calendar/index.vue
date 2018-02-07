<style lang="css" scoped>

    /*.ec-date-details{*/
        /*width: 1200px;*/
        /*height: 200px;*/
        /*background-color: #fff;*/
        /*border-radius: 6px;*/
        /*padding:0px 30px;*/
    /*}*/
    /*.ec-date-top{*/
        /*height: 80px;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
        /*border-bottom: 1px solid rgb( 238, 238, 238 );*/
    /*}*/

    /*.ec-date-left{*/
        /*height: 80px;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*font-size: 14px;*/
        /*color: #333;*/
    /*}*/
  /*.date-icon{*/
      /*font-size: 30px;*/
      /*color: #999999;*/
      /*margin-right: 6px;*/
  /*}*/
   /*.ec-date-left .to{*/
    /*margin: 0px 6px;*/
       /*color: #999;*/
  /*}*/
    /*.back-today{*/
        /*width: 100px;*/
        /*height: 36px;*/
        /*line-height: 36px;*/
        /*border:1px solid rgb( 238, 238, 238 );*/
        /*border-radius: 6px;*/
        /*text-align: center;*/
        /*font-size: 14px;*/
        /*cursor: pointer;*/
        /*display: inline-block;*/
        /*color: #999;*/
    /*}*/
    /*.date-slider{*/
        /*width: 100%;*/
        /*height: 120px;*/
        /*background-color: pink;*/

    /*}*/


    /*.ec-list-container{*/
        /*padding: 30px;*/
        /*background-color: #fff;*/
    /*}*/
/*.ec-list-header-ul{*/
    /*width: 1140px;*/
    /*height: 40px;*/
    /*background-color: #f5f5f5;*/
    /*border-radius: 6px;*/
    /*display: flex;*/
/*}*/
  /*.ec-list-header-ul li{*/
      /*flex: 1;*/
      /*line-height: 40px;*/
      /*text-align: center;*/
      /*font-size: 14px;*/
      /*color: #666;*/
  /*}*/
    /*.ec-list-content-ul{*/
        /*width: 1140px;*/
        /*background-color: #f5f5f5;*/
        /*border-radius: 6px;*/
        /*display: flex;*/
    /*}*/
  /*.ec-list-content-ul li{*/
      /*flex: 1;*/
      /*height: 80px;*/
     /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      /*font-size: 14px;*/
      /*color: #333;*/
      /*background-color: #fff;*/
      /*border-bottom: 1px solid rgb( 238, 238, 238 );*/
  /*}*/

</style>

<style lang="css">
    .economic-calendar-box{
        background-color: #f5f5f5;
    }
    .economic-calendar-content{
        width: 1200px;
        background-color: #fff;
        padding: 30px 30px 0px;
        border-radius: 4px;
        margin:30px auto;
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
   .economic-calendar-box .ivu-spin-fix{
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
    <div class="economic-calendar-box" id="Ec_detailsData">
        <div class="loading_box cl" v-show="loading">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
                <Icon type="load-c" size=60 class="demo-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>
            </Col>
        </div>
      <div  class="economic-calendar-content" id="iframe_data" v-show="!loading">
          <iframe id="iframe"  ref="iframe" height="3500px"  width="100%"  frameborder="0"  scrolling="no"  src="http://rili-d.jin10.com/open.php"></iframe>
             <!--<div class="ec-date-details">-->
                 <!--<div class="ec-date-top">-->
                     <!--<div class="ec-date-left">-->
                         <!--<span class="date-icon"><Icon type="ios-calendar-outline"></Icon></span>-->
                         <!--<span>本周：2017年11月19日</span>-->
                         <!--<span class="to">>></span>-->
                         <!--<span>2017年11月25日</span>-->
                     <!--</div>-->
                     <!--<div>-->
                         <!--<span class="back-today">回到今天</span>-->
                     <!--</div>-->
                 <!--</div>-->
                 <!--<div class="date-slider"></div>-->
             <!--</div>-->
             <!--<div class="ec-list-container">-->
                 <!--<ul class="ec-list-header-ul">-->
                     <!--<li>时间</li>-->
                     <!--<li>国家</li>-->
                     <!--<li>重要性</li>-->
                     <!--<li>指标内容</li>-->
                     <!--<li>前值</li>-->
                     <!--<li>预测值</li>-->
                     <!--<li>公布值</li>-->
                     <!--<li>影响</li>-->
                 <!--</ul>-->
                 <!--<ul class="ec-list-content-ul">-->
                     <!--<li>12:30</li>-->
                     <!--<li>美国</li>-->
                     <!--<li><Button type="info">低</Button></li>-->
                     <!--<li>美国10月政府预算（亿美元）</li>-->
                     <!--<li>80</li>-->
                     <!--<li>-500</li>-->
                     <!--<li>-630</li>-->
                     <!--<li>-->
                         <!--<span>利多</span>-->
                         <!--<span>金银</span>-->
                         <!--<span>原油</span>-->
                     <!--</li>-->
                 <!--</ul>-->
                 <!--<ul class="ec-list-content-ul">-->
                     <!--<li>12:30</li>-->
                     <!--<li>美国</li>-->
                     <!--<li> <Button type="warning">中</Button></li>-->
                     <!--<li>美国10月政府预算（亿美元）</li>-->
                     <!--<li>80</li>-->
                     <!--<li>-500</li>-->
                     <!--<li>-630</li>-->
                     <!--<li>-->
                         <!--<span>利多</span>-->
                         <!--<span>金银</span>-->
                         <!--<span>原油</span>-->
                     <!--</li>-->
                 <!--</ul>-->
                 <!--<ul class="ec-list-content-ul">-->
                     <!--<li>12:30</li>-->
                     <!--<li>美国</li>-->
                     <!--<li><Button type="error">高</Button></li>-->
                     <!--<li>美国10月政府预算（亿美元）</li>-->
                     <!--<li>80</li>-->
                     <!--<li>-500</li>-->
                     <!--<li>-630</li>-->
                     <!--<li>-->
                         <!--<span>利多</span>-->
                         <!--<span>金银</span>-->
                         <!--<span>原油</span>-->
                     <!--</li>-->
                 <!--</ul>-->
             <!--</div>-->


      </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
//                iframeTag:'',
                loading:true,
                loadingStatus:'',
            }
        },
        mounted(){
            var oFrm = this.$refs.iframe
            oFrm.onload = oFrm.onreadystatechange = ()=> {
                if (this.readyState && this.readyState != 'complete') return;
                else {
                     this.loading=false
                }
            }


        },
        beforeMount(){


        },
        methods: {
//            iframeStyle(){
//             var body=this.iframeTag.contentWindow.document.body
//                body.style.backgroundColor='red'
//                var af=document.getElementsByClassName('jin-table-head_item')
//                console.log(af);
//            },
        }
    }
</script>
