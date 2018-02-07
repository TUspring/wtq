<style lang="less" scoped src="./css/index.css"></style>

<style>
    #projectEnroll-details{
        width: 1200px;
        margin: 30px auto;
    }

    .project-detail{
        width: 1200px;
        border-radius: 6px;
        padding-bottom: 30px;
        background-color: #ffffff;
    }
    .top-ct1{
        height: 80px;
        width: 100%;
        display: flex;
        justify-content:space-between;
        align-items: center;
        padding: 0px 30px;
        border-bottom:1px solid rgb(238,238,238);
    }
    .ct1-left{
        display: flex;
        align-items: center;
    }
    .ct1-left .project-name{
        font-size: 16px;
        color: #161616;
        display: inline-block;
        margin: 0px 40px 0px 20px;
    }
    .ct1-left .project-end-time{
        font-size: 12px;
        color: #333;
    }
    
    .ct1-left img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: inline-block;
        background: url("../images/pic_bg_shadow.png") no-repeat;
        background-size: 100% 100%;
        box-shadow:0px 2px 10px 0px rgba( 212, 212, 212,.5 );
    }

    .ct1-right span{
        font-size: 12px;
        color: #999;
    }

    .top-ct2{
        width:100%;
        height: 110px;
        padding: 30px 60px;
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .ct2-ul li{
        height: 50px;
        width: 165px;
        float: left;
        border-right: 1px solid rgb(238,238,238);
        text-align: center;
    }
    .ct2-ul .txt-1{
        line-height: 20px;
        font-size: 18px;
        color: #161616;
        margin-bottom: 10px;
    }
    .top-ct2 .ct2-ul .cur{
        color: #09af48;
    }
    .ct2-ul .txt-2{
        line-height: 20px;
        font-size: 14px;
        color: #999;
    }




    .ct2-right-box span{
        font-size: 14px;
        color: #333;
    }

    .ct2-right-box .btn{
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        color: #ffa114;
        cursor: pointer;
        border:1px solid  #ffa114;
        border-radius: 6px;
        margin-right: 20px;
    }

    .ct2-right-box .btn:hover{
        background-color: #ffa114;
        color: #FFFFFF;
    }

    .top-ct3{
        width: 100%;
        padding:0px 60px;
    }
    .top-ct3 p{
      font-size:12px;
        color: #999;
        letter-spacing: 1px;
        line-height: 20px;
    }
    .ivu-notice-content-with-icon div{
        padding: 10px 0px 0px 20px;
    }
</style>
<template>
    <div id="projectEnroll-details">


        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
               :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <!--详情顶部内容-->
        <div class="project-detail">
            <div class="top-ct1">
               <div class="ct1-left">
                   <img :src="ProjectDetailData.picture ? ProjectDetailData.picture :''" alt="">
                   <span class="project-name">{{ProjectDetailData.name}}</span>
                   <span class="project-end-time">
                      项目封闭期：{{ProjectDetailData.start_time | timeStamp}} 至 {{ProjectDetailData.period | endTime(ProjectDetailData.start_time)}}
                   </span>
               </div>
               <div class="ct1-right">
                   <!--<span>更新时间：{{ProjectDetailData.updated_at}}</span>-->
               </div>
            </div>
            <div class="top-ct2">
                <ul class="ct2-ul">
                    <li>
                        <p class="txt-1 cur">{{ProjectDetailData.running_yield ? ProjectDetailData.running_yield +"%":'暂无数据'}}</p>
                        <p class="txt-2">当前收益率</p>
                    </li>
                    <li>
                        <p class="txt-1 cur">{{ProjectDetailData.yield ? ProjectDetailData.yield +"%":'暂无数据'}}</p>
                        <p class="txt-2">预期收益率</p>
                    </li>
                    <li>
                        <p class="txt-1">{{ProjectDetailData.trader_royalty_rate ? ProjectDetailData.trader_royalty_rate +"%" : '暂无数据'}}</p>
                        <p class="txt-2">利润提成比例</p>
                    </li>
                    <li>
                        <p class="txt-1">60%</p>
                        <p class="txt-2">最大回撤</p>
                    </li>
                </ul>
                <!--<div class="ct2-right-box">项目剩余时间：3天</div>-->
                <div class="ct2-right-box" v-if="ProjectDetailData.review_status==1">
                    <span class="btn" @click="enrollBtn">报名参与</span>
                    <span class="time">
                        {{curTime |surplusTime(ProjectDetailData.registration_deadline)}}</span>
                </div>
                <div class="ct2-right-box" v-if="ProjectDetailData.review_status==2">
                    <span class="time">项目剩余时间：{{ProjectDetailData.period | projectSurplusTime(ProjectDetailData.start_time)}}</span>
                </div>
                <div class="ct2-right-box" v-if="ProjectDetailData.review_status==3">
                    <span class="prompt">项目剩余时间： 已结束</span>
                </div>
            </div>
            <div class="top-ct3">
                <p>{{ProjectDetailData.intro}}</p>
            </div>
        </div>

        <div>
            <div class="storm_control_box cl">
                <!--独立风控内容-->
                <div class="independent_storm_control">
                    <div class="independent_storm_control_top">
                        <p>独立风控</p>
                    </div>
                    <div class="independent_storm_control_content">
                        <div class="details_content_list">
                            <ul>
                                <li>当前净值
                                    <Tooltip placement="right">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            <p>交易策略账号当前的净值</p>
                                        </div>
                                    </Tooltip>
                                </li>
                                <li class="worth"><span>{{ProjectDetailData? "$"+ProjectDetailData.net_worth:'--'}}</span></li>
                            </ul>
                        </div>
                        <div class="details_content_list">
                            <ul>
                                <li>风控净值
                                    <Tooltip placement="right">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            <p>当交易策略账号的净值低于风控净值时，将<br>
                                                启动独立风控，所有的跟随账号将平仓止损，<br>
                                                以保障跟随者的利益。</p>
                                        </div>
                                    </Tooltip>
                                </li>
                                <li class="worth"><span>{{ProjectDetailData.risk_control ? "$"+ProjectDetailData.risk_control:'--'}}</span></li>
                            </ul>
                        </div>
                        <div class="details_content_list">
                            <ul>
                                <li>单笔强制止损
                                    <Tooltip placement="right">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            <p>每一笔订单下单后，将设置订单的止损线。<br>
                                                达到止损的点位时，将强制平仓止损。</p>
                                        </div>
                                    </Tooltip>

                                </li>
                                <li class="worth"><span>{{ProjectDetailData.per_stop_lose ? ProjectDetailData.per_stop_lose +"点":'--'}}</span></li>
                            </ul>
                        </div>
                        <div class="details_content_list">
                            <ul>
                                <li>单笔手数限制
                                    <Tooltip placement="right">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            <p>该交易策略所下的单笔订单的手数限制，以<br>
                                                防止交易员非理性或者失误操作，导致重仓<br>
                                                交易，增加风险。</p>
                                        </div>
                                    </Tooltip>
                                </li>
                                <li class="worth"><span>{{ProjectDetailData.per_deal_limit ? ProjectDetailData.per_deal_limit +"手":'--'}}</span></li>
                            </ul>
                        </div>
                        <div class="details_content_list">
                            <ul>
                                <li>持单手数限制
                                    <Tooltip placement="right">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            <p>该交易策略正在进行中的订单的手数最大限<br>
                                                制。超过限制后，将无法跟随新订单。防止<br>
                                                交易员非理性或者失误操作，导致重仓交易，<br>
                                                增加风险。</p>
                                        </div>
                                    </Tooltip>
                                </li>
                                <li class="worth"><span>{{ProjectDetailData.own_max_limit ? ProjectDetailData.own_max_limit +"手":'--'}}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--交易数据内容-->
                <div class="transaction_data">
                    <div class="transaction_data_top">
                        <div>
                            <p class="transaction_data_title">项目详情</p>
                            <!--<p class="transaction_data_date">数据更新时间：{{timeType(ProjectDetailData.deal_time)}}</p>-->
                        </div>
                    </div>
                    <div class="transaction_data_container">
                        <div class="transaction_data_content">
                            <ul>
                                <li>
                                    <p>{{ProjectDetailData.min_follow_money ? "$"+ProjectDetailData .min_follow_money : '暂无数据'}}</p>
                                    <p>最少参与资金
                                        <Tooltip placement="bottom">
                                            <span class="iconfont">&#xe622;</span>
                                            <div slot="content">
                                                参与项目所需要的最小资金额，参与账号的<br>
                                                账户净值低于该资金时，无法参与项目。
                                            </div>
                                        </Tooltip>
                                    </p>
                                </li>
                                <li>
                                    <p><span>{{ProjectDetailData ? "$"+ ProjectDetailData.money_count :'暂无数据'}}</span>
                                    </p>
                                    <p>总参与资金
                                        <Tooltip placement="bottom">
                                            <span class="iconfont">&#xe622;</span>
                                            <div slot="content">
                                                参与项目所需要的最小资金额，参与账号的<br>
                                                账户净值低于该资金时，无法参与项目。
                                            </div>
                                        </Tooltip>
                                    </p>
                                </li>
                                <li>
                                    <p><span>{{ProjectDetailData.participation_count ? ProjectDetailData.participation_count :'暂无数据'}}</span>
                                    </p>
                                    <p>参与人数
                                        <Tooltip placement="bottom">
                                            <span class="iconfont">&#xe622;</span>
                                            <div slot="content">
                                                实际参与项目实际的总人数<br>
                                            </div>
                                        </Tooltip>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="transaction_data_content">
                            <ul>
                                <li>
                                    <p>{{ProjectDetailData.deal_money ? "$"+ ProjectDetailData.deal_money :'暂无数据'}}</p>
                                    <p>项目交易资金
                                        <Tooltip placement="bottom">
                                            <span class="iconfont">&#xe622;</span>
                                            <div slot="content">
                                                交易员承诺的，按照该资金进行策略交易。<br>
                                                一段时间后，交易员会将盈利的部分出金，<br>
                                                或者亏损的部分补齐，重新以该交易资金进<br>
                                                行做单。
                                            </div>
                                        </Tooltip>
                                    </p>
                                </li>
                                <li>
                                    <p><span>1:{{ProjectDetailData.lever_rate}}00</span></p>
                                    <p>杠杆比例
                                        <Tooltip placement="bottom">
                                            <span class="iconfont">&#xe622;</span>
                                            <div slot="content">
                                                杠杆是利用小额的资金来进行数倍于原始金<br>
                                                额的投资，以期望获取相对投资标的物波动<br>
                                                的数倍收益率，抑或亏损。参与时，请使用<br>
                                                不低于项目的杠杆比例，比如1:100杠杆的<br>
                                                项目，可以用1:100  1:200 进行参与
                                            </div>
                                        </Tooltip>
                                    </p>
                                </li>
                                <li>
                                    <p><span>{{ProjectDetailData.total_number ? ProjectDetailData.total_number:'暂无数据'}}</span></p>
                                    <p>交易总手数
                                        <Tooltip placement="bottom">
                                            <span class="iconfont">&#xe622;</span>
                                            <div slot="content">
                                                项目封闭期内所有交易订单的手数之和。<br>
                                            </div>
                                        </Tooltip>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--累计盈亏/收益表现/交易品种/手数变化    内容区域-->
            <div class="transaction_category cl">
                <div class="transaction_category_checkout">
                    <ul>
                        <li :class="{cur:(tabCategory==tabCategoryList[0])}" @click='TabCategory(0)'>累计盈亏</li>
                        <li :class="{cur:(tabCategory==tabCategoryList[1])}" @click='TabCategory(1)'>收益表现</li>
                        <li :class="{cur:(tabCategory==tabCategoryList[2])}" @click='TabCategory(2)'>交易品种</li>
                        <li :class="{cur:(tabCategory==tabCategoryList[3])}" @click='TabCategory(3)'>手数变化</li>
                    </ul>
                    <!--<p class="transaction_category_date">数据更新时间：{{timeType(ProjectDetailData.deal_time)}}</p>-->
                </div>

                <!--累计盈亏内容-->
                <div v-show='tabCategory==tabCategoryList[0]' class="cumulative_content">
                    <div class="cumulative_nav">
                        <ul>
                            <li :class="{cur:(AccProfitLoss==AccProfitLossList[0])}" @click='TabAccProfitLoss(0)'>收益</li>
                            <li :class="{cur:(AccProfitLoss==AccProfitLossList[1])}" @click='TabAccProfitLoss(1)'>点数</li>
                        </ul>
                    </div>
                    <div v-show='AccProfitLoss==AccProfitLossList[0]'>
                        <div class="cumulative_chart_information cl">
                            <p>盈亏累计</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div v-if="ProjectDetailData.profit_earnings!=''">
                                <div ref="profitLoss1" :style="{width:'1280px',height:'360px'}"></div>
                            </div>
                            <div v-if="ProjectDetailData.profit_earnings==''" class="no-data-show">暂无交易数据</div>
                        </div>
                    </div>
                    <div v-show='AccProfitLoss==AccProfitLossList[1]'>
                        <div class="cumulative_chart_information cl">
                            <p>盈亏点数累计</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div v-if="ProjectDetailData.profit_count!=''">
                                <div ref="profitLoss2" :style="{width:'1280px',height:'360px'}"></div>
                            </div>
                            <div v-if="ProjectDetailData.profit_count==''" class="no-data-show">暂无交易数据</div>
                        </div>
                    </div>
                </div>
                <!--收益表现内容-->
                <div v-show='tabCategory==tabCategoryList[1]' class="cumulative_content">
                    <div class="cumulative_nav">
                        <ul>
                            <li :class="{cur:(profit==profitList[0])}" @click='TabProfitList(0)'>每月</li>
                            <li :class="{cur:(profit==profitList[1])}" @click='TabProfitList(1)'>每笔</li>
                        </ul>
                    </div>
                    <div v-show='profit==profitList[0]'>
                        <div class="cumulative_chart_information cl">
                            <p>每月收益率变化</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div v-if="ProjectDetailData.month_result!=''">
                                <div ref="profit1" :style="{width:'1280px',height:'360px'}"></div>
                            </div>
                            <div v-if="ProjectDetailData.month_result==''" class="no-data-show">暂无交易数据</div>
                        </div>
                    </div>
                    <div v-show='profit==profitList[1]'>
                        <div class="cumulative_chart_information cl">
                            <p>单笔收益率变化</p>
                        </div>
                        <div v-if="ProjectDetailData.profit_stroke_count!=''">
                            <div ref="profit2" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="ProjectDetailData.profit_stroke_count==''" class="no-data-show">暂无交易数据</div>
                    </div>
                </div>
                <!--交易品种内容-->
                <div v-show='tabCategory==tabCategoryList[2]' class="cumulative_content">
                    <div class="cumulative_nav">
                        <ul>
                            <li :class="{cur:(performance==performanceList[0])}" @click='TabPerformance(0)'>收益</li>
                            <li :class="{cur:(performance==performanceList[1])}" @click='TabPerformance(1)'>笔数</li>
                        </ul>
                    </div>
                    <div v-show='performance==performanceList[0]'>
                        <div class="cumulative_chart_information cl">
                            <p>交易品种收益率</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div v-if="ProjectDetailData.category_earnings!=''">
                                <div ref="diversification1" :style="{width:'1280px',height:'360px'}"></div>
                            </div>
                            <div v-if="ProjectDetailData.category_earnings==''" class="no-data-show">暂无交易数据</div>
                        </div>
                    </div>
                    <div v-show='performance==performanceList[1]'>
                        <div class="cumulative_chart_information cl">
                            <p>交易品种单数</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div class="echarts-diversification2"><!--v-if="ProjectDetailData.category_stroke_count!=''"-->
                                <div ref="diversification2" :style="{width:'600px',height:'360px'}"></div>
                                <div class="echart-performance-right-container">
                                    <div class="echart-right-content">
                                        <p class="title">
                                            <span>交易品种</span>
                                            <span>比例</span>
                                        </p>
                                        <ul class="performance-details">
                                            <li v-for="value in categoryDetailsList">
                                                <span>{{value[0]}}</span>
                                                <span>{{value[1]}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!--<div v-if="ProjectDetailData.category_stroke_count==''" class="no-data-show">暂无交易数据</div>-->
                        </div>
                    </div>
                </div>
                <!--手数变化内容-->
                <div v-show='tabCategory==tabCategoryList[3]' class="cumulative_content">
                    <div class="cumulative_nav">
                        <ul>
                            <li :class="{cur:(variety== varietyList[0])}" @click='TabVariety(0)'>下单</li>
                            <!--<li :class="{cur:(variety== varietyList[1])}" @click='TabVariety(1)'>持单</li>-->
                        </ul>
                    </div>
                    <div v-show='variety==varietyList[0]'>
                        <div class="cumulative_chart_information cl">
                            <p>下单手数变化</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div v-if="ProjectDetailData.order_count!=''">
                                <div ref="varietyNumber1" :style="{width:'1280px',height:'360px'}"></div>
                            </div>
                            <div v-if="ProjectDetailData.order_count==''" class="no-data-show">暂无交易数据</div>
                        </div>
                    </div>
                    <div v-show='variety==varietyList[1]'>
                        <div class="cumulative_chart_information cl">
                            <p>持单手数变化</p>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div v-if="ProjectDetailData.position!=''">
                                <div ref="varietyNumber2" :style="{width:'1280px',height:'360px'}"></div>
                            </div>
                            <div v-if="ProjectDetailData.position==''" class="no-data-show">暂无交易数据</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--参与详情-->
            <div class="follow_details">
                <div class="transaction_data_top">
                    <div>
                        <p class="transaction_data_title">项目参与详情</p>
                        <!--<p class="transaction_data_date">数据更新时间：{{timeType(ProjectDetailData.updated_at)}}</p>-->
                    </div>
                </div>
                <div class="follow_details_container_top">
                    <div class=" container_top_l">
                        <ul>
                            <li>
                                <p>已参与资金:
                                    <span class="total_profit">{{ProjectDetailData ? "$"+ ProjectDetailData.money_count:'--'}}</span>
                                </p>
                            </li>
                            <li>
                                <p>已参与人数:
                                    <span class="total_fund">{{ProjectDetailData.participation_count ? ProjectDetailData.participation_count:'--'}}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="follow_details_list">
                    <!--正在跟随列表-->
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <td>账号昵称</td>
                                <td>参与时间</td>
                                <td>参与资金</td>
                            </tr>
                            </thead>
                            <tr v-if="ProjectDetailData.participation_project==''">
                                <td colspan="3" style="font-size: 18px;color: #CCCCCC;">暂无数据</td>
                            </tr>
                            <tr v-for="value in ProjectDetailData.participation_project">
                                <td class="partcipate-user">
                                    <img class="pic"  :src="value.users.avatar" alt="">
                                    {{value.users?value.users.name:'--'}}</td>
                                <td>{{value.created_at}}</td>
                                <td>${{ProjectDetailData.min_follow_money*value.multiple}}</td>
                            </tr>

                        </table>
                        <div class="page" style="margin-right: 5px">
                            <Page class-name="defaultPage" :total="10" :show-total="false"></Page>
                        </div>
                    </div>

                </div>

            </div>

            <!--交易订单-->
            <!--<div class="trading_order">-->
                <!--<div class="transaction_data_top">-->
                    <!--<div>-->
                        <!--<p class="transaction_data_title">交易明细</p>-->
                        <!--<p class="transaction_data_date">数据更新时间：{{ProjectDetailData.updated_at}}</p>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="trading_order_container_top">-->
                    <!--<div class=" container_top_l"></div>-->
                    <!--<div class="container_top_r">-->
                        <!--<button class="history_btn" :class="{ls_btn:!showHistoryOrderFormTable}" @click="orderFormTable">-->
                            <!--正在进行-->
                        <!--</button>-->
                        <!--<button class="history_btn" :class="{ls_btn:showHistoryOrderFormTable}"-->
                                <!--@click="historyOrderFormTable">历史记录-->
                        <!--</button>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="trading_order_list">-->
                    <!--<table v-if="showOrderFormTable">-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<td>开仓时间</td>-->
                            <!--<td>类型</td>-->
                            <!--<td>手数</td>-->
                            <!--<td>交易品种</td>-->
                            <!--<td>开仓价格</td>-->
                            <!--<td>平仓时间</td>-->
                            <!--<td>隔夜利息</td>-->
                            <!--<td>获利</td>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tr>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                        <!--</tr>-->
                        <!--<tr>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                        <!--</tr>-->
                        <!--<tr>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                        <!--</tr>-->
                    <!--</table>-->
                    <!--<table v-if="showHistoryOrderFormTable">-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<td>开仓时间</td>-->
                            <!--<td>类型</td>-->
                            <!--<td>手数</td>-->
                            <!--<td>交易品种</td>-->
                            <!--<td>开仓价格</td>-->
                            <!--<td>平仓时间</td>-->
                            <!--<td>隔夜利息</td>-->
                            <!--<td>获利</td>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tr>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                        <!--</tr>-->
                    <!--</table>-->
                <!--</div>-->
                <!--<div class="page">-->
                    <!--<Page class-name="defaultPage" :total="1" :show-total="false"></Page>-->
                <!--</div>-->
            <!--</div>-->

        </div>

    </div>
</template>
<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入图表
    require('echarts/lib/chart/pie');
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    //引入模拟数据
    //    import chartMsg from './js/Echart'
    import theme from './theme/echart-theme'
    import signUpModal from './signUpModal/index.vue'
    export default {
        components:{
            signUpModal,
        },

        theme,
        data () {
            return {
                curTime:new Date(),
                iviewModal: false,
                projectId:'',
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    enroll: {
                        name: 'signUpModal',
                        width: ''
                    },
                },
                ProjectDetailData:'',

// ------------------------------------------------------------
                //表单数据
//                showFollowDetailsTable: true,
//                showHistoryFollowDetailsTable: false,
                showOrderFormTable: true,
                showHistoryOrderFormTable: false,
                historyFollowDetailsDataList: '',
                followDetailsDataList: '',
                AccProfitLoss: '',
                //tab切换
                AccProfitLossList: ['profit', 'point'],
                profit: '',
                profitList: ['monthly', 'each'],
                performance: '',
                performanceList: ['profit', 'count'],
                variety: '',
                varietyList: ['profit', 'count'],
                tabCategory: '',
                tabCategoryList: ['Accumulated_profit_loss', 'Earnings_performance', 'transaction_category', 'count_change'],

                //图表数据列表
                categoryDetailsList: '',
                profitMosListX: '',
                profitMosListY: '',
                profitStrokeCountListX: '',
                profitStrokeCountListY: '',
                orderCountListX: '',
                orderCountListY: '',
                categoryEarningsListX: '',
                categoryEarningsListY: '',
                categoryStrokeCountEchart_Data: '',
// ------------------------------------------------------------------
            }
        },

        computed:{

        },
        beforeMount() {
            this.projectId = this.$router.currentRoute.params.id
            this.getProjectDetailData()

        },

        filters:{
            timeStamp(value){
                if(!value){
                    return '--'
                }else{
                    return new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss")
                }

            },
            endTime(value,end){
                if(!value||!end){
                  return '--'
                }else{
                   var totalTime=end + value*24*60*60
                return new Date(totalTime * 1000).format("yyyy-MM-dd hh:mm:ss")
                }
            },
            //剩余时间处理
            surplusTime(cur, value){
                var surplus_time = parseInt(value *1000 - cur)
                var d=Math.floor(surplus_time/86400000)
                var h=Math.floor(surplus_time/3600000)%24
                var m=Math.floor(surplus_time/60000)%60
                if(h<10)h="0"+h
                if(m<10)m="0"+m
                if((surplus_time/86400000)>1){
                    return  d+"天 "+h+"小时 "+m+"分后停止报名"
                }
                if((surplus_time/86400000)<1&&(surplus_time/86400000)>0){
                    return  h+"小时 "+m+"分后停止报名"
                }

                if(surplus_time<0){
                    return "报名已截止"
                }
            },
            projectSurplusTime(value,end){
                var totalTime=end + value*24*60*60
                var cur=new Date().getTime()
                var surplus_time = parseInt(totalTime *1000 - cur)
                var d=Math.floor(surplus_time/86400000)
                var h=Math.floor(surplus_time/3600000)%24
//                var m=Math.floor(surplus_time/60000)%60
                if(h<10)h="0"+h
                if((surplus_time/86400000)>1){
                    return  d+"天 "+h+"小时"
                }
                if((surplus_time/86400000)<1&&(surplus_time/86400000)>0){
                    return  h+"小时"
                }

                if(surplus_time<0){
                    return "项目已结束"
                }
//                return new Date(Surplus).format("dd hh:mm:ss")
            }

        },
        mounted(){
            var _this=this
            this.timer=setInterval(function () {
                _this.curTime=new Date().getTime()
            },60000)

            this.$nextTick(() => {
                window.addEventListener('scroll', this.handleScroll);
            })
        },
        beforeDestroy(){
            if(this.timer){
                clearInterval(this.timer)
            }
            this.$Notice.destroy()
        },
        methods: {
            //报名参与--验证
            enrollBtn(){
              this.$Notice.destroy()   //全局销毁 Notice组件
              this.$Loading.start();  //开始加载
              this.getUseInfo()
               },

          getUseInfo(){
            return new Promise((resolve, reject)=>{
                this.$http.get('/user')
                    .then((res) => {
                        const data = res.data
                        const {retCode,retData={}}=data
                        if(retCode=='0'){
                            var {ID_number,is_blackList} = retData
                           if(!ID_number){
                               this.$Loading.finish();
                               return  this.$Notice.warning({
                                   duration:0,
                                   title: '警告提示',
                                   desc: '',
                                   render: h => {
                                       return h('div', [
                                           '检测到你尚未实名认证，请您先去',
                                           h('a',{
                                               attrs:{
                                                   name: '实名认证',
                                                   href: '/#/periodicalProject/certification'
                                               },
                                           }, '实名认证！'),
                                       ])
                                   }
                               });
                           }
                           if(is_blackList==1){
                               this.$Loading.finish();
//                               return  this.$Notice.error({
//                                   duration:10,
//                                   title: '警告提示',
//                                   desc: '检测到你已被加入黑名单，暂时无法报名参与！'
//                               });
                               return this.$Modal.error({
                                   title: '警告提示',
                                   content: '检测到你已被加入黑名单，暂时无法报名参与！'
                               })
                           }
                          this.showModal('enroll',{id:this.ProjectDetailData.id,
                                                   MT4_name:this.ProjectDetailData.MT4_account,
                                                   serverName:this.ProjectDetailData.trade_platform,
                                                   min_follow_money:this.ProjectDetailData.min_follow_money,
                                                   net_worth:this.ProjectDetailData.net_worth
                                                   })
                            this.$Loading.finish();
                            resolve();
                        }else{
                            this.$Loading.error();
                            reject();
                        }
                    })
                    .catch((error) =>{
                        this.$Loading.error();
                        reject();
                    });
            })
        },
            getProjectDetailData(){
                this.$http.get('/regular_project/' + this.projectId)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData = {}}=data;
                        if (retCode == '0') {
                            this.ProjectDetailData = retData
                            //跟随详情数据
                            this.followDetailsDataList = this.ProjectDetailData.followinfo.data
                            //跟随历史详情数据
                            this.historyFollowDetailsDataList = this.ProjectDetailData.history_followinfo.data


                            //收益表现（每月）数据
                            var profitMos = this.ProjectDetailData.month_result
                            var profitMos_xAxis = []
                            var profitMos_yAxis = []
                            for (var i = 0; i < profitMos.length; i++) {
                                profitMos_xAxis[i] = profitMos[i][0],
                                    profitMos_yAxis[i] = profitMos[i][1]
                            }
                            this.profitMosListX = profitMos_xAxis
                            this.profitMosListY = profitMos_yAxis

                            //收益表现（每笔）数据
                            var profitStrokeCount = this.ProjectDetailData.profit_stroke_count
                            var profitStrokeCount_xAxis = []
                            var profitStrokeCount_yAxis = []
                            for (var i = 0; i < profitStrokeCount.length; i++) {
                                profitStrokeCount_xAxis[i] = profitStrokeCount[i][0],
                                    profitStrokeCount_yAxis[i] = profitStrokeCount[i][1]
                            }
                            this.profitStrokeCountListX = profitStrokeCount_xAxis
                            this.profitStrokeCountListY = profitStrokeCount_yAxis


                            //手数变化（下单）数据
                            var orderCount = this.ProjectDetailData.order_count
                            var orderCount_xAxis = []
                            var orderCount_yAxis = []
                            for (var i = 0; i < orderCount.length; i++) {
                                orderCount_xAxis[i] = orderCount[i][0],
                                    orderCount_yAxis[i] = orderCount[i][1]
                            }
                            this.orderCountListX = orderCount_xAxis
                            this.orderCountListY = orderCount_yAxis

                            //交易品种（收益）数据
                            var categoryEarnings = this.ProjectDetailData.category_earnings
                            var categoryEarnings_xAxis = []
                            var categoryEarnings_yAxis = []
                            for (var i = 0; i < categoryEarnings.length; i++) {
                                categoryEarnings_xAxis[i] = categoryEarnings[i][0],
                                    categoryEarnings_yAxis[i] = categoryEarnings[i][1]
                            }
                            this.categoryEarningsListX = categoryEarnings_xAxis
                            this.categoryEarningsListY = categoryEarnings_yAxis

                            //交易品种（笔数）数据
                            this.categoryDetailsList = this.ProjectDetailData.category_stroke_count
                            var categoryStrokeCount_xAxis = []
                            var categoryStrokeCount_yAxis = []
                            var categoryStrokeList = this.ProjectDetailData.category_stroke_count
                            for (var i = 0; i < categoryStrokeList.length; i++) {
                                categoryStrokeCount_xAxis[i] = categoryStrokeList[i][0],
                                    categoryStrokeCount_yAxis[i] = categoryStrokeList[i][1]
                            }
                            var categoryStrokeCountDataArr = []
                            var Arr_X = categoryStrokeCount_xAxis
                            var Arr_Y = categoryStrokeCount_yAxis
                            for (var i = 0; i < Arr_Y.length; i++) {
                                for (var i = 0; i < Arr_X.length; i++) {

                                    var categoryStrokeCountData = {value: Arr_Y[i], name: Arr_X[i]}
                                    categoryStrokeCountDataArr.push(categoryStrokeCountData)
                                }
                            }
                            this.categoryStrokeCountEchart_Data = categoryStrokeCountDataArr

                            this.showCharts()
                        } else {
                            console.log('请求数据失败');
                        }
                    }).catch((error) => {
                    console.log(error);
                });
            },


            //时间戳转时间格式
            timeType (dateString) {
               if(!dateString){
                   return '暂无更新'
               }
                //判断是否为文字
                if (/^[\u4e00-\u9fa5]+$/.test(dateString)) {
                    return dateString
                } else {
                    return new Date(dateString * 1000).format("yyyy-MM-dd hh:mm:ss")
                }
            },
            numberToFixed(data){
                return data.toFixed(2);
            },

//            //监听屏幕滚动
//            handleScroll() {
//                var doc = document.documentElement || document.body
//                var scrollTop = doc.scrollTop;
//                if (scrollTop > 240) {
//                    this.pullDown = true;
//                } else {
//                    this.pullDown = false
//                }
//            },
            showModal(name, data = {}){
                const modalList = this.modalList
                this.modalMsg = data
                this.curModal = modalList[name],
                    this.iviewModal = true
            },


            //跟随表格（正在跟随和历史跟随）切换
//            FollowingTable(){
//                this.showFollowDetailsTable = true
//                this.showHistoryFollowDetailsTable = false
//            },
            historyFollowTable(){
                this.showFollowDetailsTable = false
                this.showHistoryFollowDetailsTable = true
            },

            orderFormTable(){
                this.showOrderFormTable = true,
                    this.showHistoryOrderFormTable = false
            },
            historyOrderFormTable(){
                this.showOrderFormTable = false,
                    this.showHistoryOrderFormTable = true
            },
//            --------- tab切换------
            //（累计盈亏、收益表现、交易品种、手数变化）切换
            TabCategory(index){
                if (this.tabCategory != this.tabCategoryList[index]) {
                    this.tabCategory = this.tabCategoryList[index]
                }
            },
            //（累计盈亏中的收益和点数）切换
            TabAccProfitLoss(index){
                if (this.AccProfitLoss != this.AccProfitLossList[index]) {
                    this.AccProfitLoss = this.AccProfitLossList[index]
                }
            },
            //（收益表现中的每月和每笔）切换
            TabProfitList(index){
                if (this.profit != this.profitList[index]) {
                    this.profit = this.profitList[index]
                }
            },
            //（交易品种中的收益和笔数）切换
            TabPerformance(index){
                if (this.performance != this.performanceList[index]) {
                    this.performance = this.performanceList[index]
                }
            },
            //（手数变化中的收益和点数）切换
            TabVariety(index){
                if (this.variety != this.varietyList[index]) {
                    this.variety = this.varietyList[index]
                }
            },
            //Echart  图表
            showCharts(){
                /*ECharts图表*/
                //累计盈亏
                var profitLoss_Chart1 = echarts.init(this.$refs.profitLoss1);
                var profitLoss_Chart2 = echarts.init(this.$refs.profitLoss2);
                //收益表现
                var Earnings_performance_Chart1 = echarts.init(this.$refs.profit1);
                var Earnings_performance_Chart2 = echarts.init(this.$refs.profit2);
                //交易品种
                var transaction_variety_Chart1 = echarts.init(this.$refs.diversification1);
                var transaction_variety_Chart2 = echarts.init(this.$refs.diversification2, theme);
                //手数变化
                var variety_number_Chart1 = echarts.init(this.$refs.varietyNumber1);
                var variety_number_Chart2 = echarts.init(this.$refs.varietyNumber2);
                //累计盈亏（收益和点数）
                var option_profitLoss1 = {
                    title: {},
                    tooltip: {
                        trigger: 'item',
                        formatter: function (value) {
                            return '截止当前的收益$' + value.value
                        }
                    },
                    calculable: false,
                    xAxis: [
                        {
                            show: false,
                            number: 10,
                            type: 'category',
                            boundaryGap: false,
                            //   data: ['','','','','','','','','','','']
                            data: new Array(this.ProjectDetailData.profit_earnings.length + 1)
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    //系列（表示哪种图表）
                    series: [
                        {
                            type: 'line',
                            data: this.ProjectDetailData.profit_earnings,
                            clickable: false,
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                        }
                    ]
                };
                var option_profitLoss2 = {
                    title: {},
                    tooltip: {
                        trigger: 'item',
                        formatter: function (value) {
                            return '截止当前的累计点数$' + value.value
                        }
                    },
                    calculable: false,
                    xAxis: [
                        {
                            show: false,
                            number: 10,
                            type: 'category',
                            boundaryGap: false,
                            data: new Array(this.ProjectDetailData.profit_count.length + 1)
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    //系列（表示哪种图表）
                    series: [
                        {
                            type: 'line',
                            data: this.ProjectDetailData.profit_count,
                            clickable: false,
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                        }
                    ]
                };
                //收益表现（每月和每笔）
                var optionProfit1 = {
                    tooltip: {
                        formatter: '{b}:\n{c}%'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            //  data:this.profitMosListX,
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} ',
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc',
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitNumber: 2,
                            scale: true,
                            show: true,
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %',
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc',
                                },
                            },
                        }
                    ],
                    series: [
                        {
                            name: '收益率',
                            type: 'bar',
                            data: this.profitMosListY,
                            markPoint: {
//                                data: [
//                                    {type: 'max', name: '最大值'},
//                                    {type: 'min', name: '最小值'}
//                                ]
                            },
                            itemStyle: {
                                normal: {
                                    borderRadius: 1,
                                    //    color :'#35aa47',  //柱状颜色
                                    color: function (data) {
                                        var index_color = data.value;
                                        if (index_color >= 0) {
                                            return '#38aa49'
                                        } else {
                                            return '#e00d0d'
                                        }
                                    }
                                }
                            },
                            formatter: function (params) {
                                return '<img src="'
                                    + params.data.symbol.replace('image://', '')
                                    + '"/>';
                            },
                        },
                    ]
                };
                var optionProfit2 = {
                    tooltip: {
                        formatter: '{b}:\n{c}%'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: this.profitStrokeCountListX,
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value}',
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc',
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitNumber: 2,
                            scale: true,
                            show: true,
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %',
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc',
                                },
                            },
                        }
                    ],
                    series: [
                        {
                            name: '收益率',
                            type: 'bar',
                            data: this.profitStrokeCountListY,
                            markPoint: {
//                                data: [
//                                    {type: 'max', name: '最大值'},
//                                    {type: 'min', name: '最小值'}
//                                ]
                            },
                            itemStyle: {
                                normal: {
                                    borderRadius: 1,
                                    //    color :'#35aa47',  //柱状颜色
                                    color: function (data) {
                                        var index_color = data.value;
                                        if (index_color >= 0) {
                                            return '#38aa49'
                                        } else {
                                            return '#e00d0d'
                                        }
                                    }
                                }
                            },
                            formatter: function (params) {
                                return '<img src="'
                                    + params.data.symbol.replace('image://', '')
                                    + '"/>';
                            },
                        },
                    ]
                };
                //交易品种图表1--图表2
                var optionDiversification1 = {
                    tooltip: {
                        show: true,
                        trigger: 'item'
                    },

                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: this.categoryEarningsListX,
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc',
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitNumber: 2,
                            scale: true,
                            show: true,
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %',
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc',
                                },
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: 60,                   // 系列级个性化，柱形宽度
                            itemStyle: {
                                normal: {
                                    color: function (data) {
                                        var index_color = data.value;
                                        if (index_color >= 0) {
                                            return '#38aa49'
                                        } else {
                                            return '#e00d0d'
                                        }
                                    }
                                }
                            },
                            data: this.categoryEarningsListY,
                        }
                    ]
                };
                var optionDiversification2 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {d}%"
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'center',
                                        //   max: 1548
                                    }
                                }
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['60%', '80%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '20',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            },
                            data: this.categoryStrokeCountEchart_Data,
//                                {value:5, name:'GBPJPY2'},
//                                {value:4, name:'GBPJPY3'},
//                                {value:3, name:'GBPJPY4'},
//                                {value:1, name:'GBPJPY5'}]
                        }
                    ]
                };
                // 手数变化 表1
                var optionVarietyNumber1 = {
                    tooltip: {
                        show: true,
                        trigger: 'item'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            show: true,
                            data: this.orderCountListX,
//                            data : new Array(this.ProjectDetailData.order_count.length),
                            splitLine: {
                                show: false,
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {
                                show: false,
                            },
                        }
                    ],
                    series: [
                        {
                            name: '手数',
                            type: 'bar',
                            barWidth: 10,                   // 系列级个性化，柱形宽度
                            itemStyle: {
                                normal: {                   // 系列级个性化，横向渐变填充
                                    borderRadius: 1,
                                    color: '#11a5ff',
                                }
                            },
                            data: this.orderCountListY,
                        }
                    ]
                };
                var optionVarietyNumber2 = {
                    tooltip: {
                        show: true,
                        trigger: 'item'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            show: true,
                            data: ['2017.7.23', '2017.8.23', '2017.9.23', '2017.10.23', '2017.11.23', '2017.12.23', '2018.1.23'
                            ],
                            splitLine: {
                                show: false,
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {
                                show: false,
                            },
                        }
                    ],
                    series: [
                        {
                            name: '手数',
                            type: 'bar',
                            barWidth: 10,                   // 系列级个性化，柱形宽度
                            itemStyle: {
                                normal: {                   // 系列级个性化，横向渐变填充
                                    borderRadius: 1,
                                    color: '#11a5ff',
                                }
                            },
                            data: this.ProjectDetailData.position,
                        }
                    ]
                };
                profitLoss_Chart1.setOption(option_profitLoss1)
                profitLoss_Chart2.setOption(option_profitLoss2)
                Earnings_performance_Chart1.setOption(optionProfit1)
                Earnings_performance_Chart2.setOption(optionProfit2)
                transaction_variety_Chart1.setOption(optionDiversification1)
                transaction_variety_Chart2.setOption(optionDiversification2)
                variety_number_Chart1.setOption(optionVarietyNumber1)
                variety_number_Chart2.setOption(optionVarietyNumber2)
            }

//            changeTab(index){
//                if (this.tabSwitch != this.tabSwitchList[index]) {
//                    this.tabSwitch = this.tabSwitchList[index]
//                }
//            },
            //跟随Btn
//            dropDown(){
//                this.dropDownBtn = !this.dropDownBtn
//                this.dropShow = !this.dropShow
//            },
//            buttonShow(){
//                this.followBtnShow = this.ProjectDetailData.is_follow
//            },

            //跟随管理
//            followManage(){
//                this.$router.push({
//                    path:'/home/myFollow/following'
//                })
//            },
        },
        created(){
            this.tabCategory = this.tabCategoryList[0]
            this.AccProfitLoss = this.AccProfitLossList[0]
            this.profit = this.profitList[0]
            this.performance = this.performanceList[0]
            this.variety = this.varietyList[0]
        },

    }
</script>
