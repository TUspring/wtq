<style lang="less" scoped src="./css/index.css">
</style>
<template>
    <!--策略数据-->
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
                            <li class="worth">$<span>{{followDataList.net_worth}}</span></li>
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
                            <li class="worth">$<span>{{followDataList.risk_control}}</span></li>
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
                            <li class="worth"><span>{{followDataList.per_stop_lose}}</span>点</li>
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
                            <li class="worth"><span>{{followDataList.per_deal_limit}}</span>手</li>
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
                            <li class="worth"><span>{{followDataList.own_max_limit}}</span>手</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--交易数据内容-->
            <div class="transaction_data">
                <div class="transaction_data_top">
                    <div>
                        <p class="transaction_data_title">交易数据</p>
                        <p class="transaction_data_date">数据更新时间：{{timeType(followDataList.deal_time)}}</p>
                    </div>
                </div>
                <div class="transaction_data_container">
                    <div class="transaction_data_content">
                        <ul>
                            <li>
                                <p>{{timeType(followDataList.deal_time)}}</p>
                                <p>最近交易时间
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            该交易策略最近一次交易，距离现在有多久
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                            <li>
                                <p><span>{{followDataList.order_number}}</span>天/ <span>{{followDataList.statistics_number}}</span>天
                                </p>
                                <p>开单天数/统计天数
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            开单天数，有多少天老师开单交易。统计天<br>
                                            数，最早一笔订单开单到最后一笔订单经历<br>
                                            的天数（其中不包括周六周日）
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                            <li>
                                <p>$<span>{{followDataList.total_earnings}}</span>/ <span>{{numberToFixed(followDataList.total_earnings*100)}}</span>%
                                </p>
                                <p>总净盈利
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            该策略从最早一笔订单到现在，全部已平仓<br>
                                            的订单的净盈亏金额和盈亏比例
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                            <li>
                                <p><span>{{followDataList.total_number}}</span>手</p>
                                <p>交易总手数
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            全部已平仓的订单的手数总和
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="transaction_data_content">
                        <ul>
                            <li>
                                <p>1:{{followDataList.lever_rate}}00</p>
                                <p>杠杆比例
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            杠杆是利用小额的资金来进行数倍于原始金<br>
                                            额的投资，以期望获取相对投资标的物波动<br>
                                            的数倍收益率，抑或亏损。跟随时，请使用<br>
                                            不低于交易策略的杠杆比例，比如1:100杠杆<br>
                                            的策略，可以用1:100 1:200 进行跟随
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                            <li>
                                <p>$<span>{{followDataList.deal_money}}</span></p>
                                <p>策略交易资金
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            交易员承诺的，按照该资金进行策略交易。<br>
                                            一段时间后，交易员会将盈利的部分出金，<br>
                                            或者亏损的部分补齐，重新以该交易资金进<br>
                                            行做单
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                            <li>
                                <p>$<span>{{followDataList.min_follow_money}}</span></p>
                                <p>最低跟随资金
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            跟随该策略时，交易员老师建议的最低资金<br>
                                            量要求。账户净值低于该资金时，无法使用<br>智能同比。低于该资金进行跟随时，会有较大风险，请慎重考量。
                                        </div>
                                    </Tooltip>
                                </p>
                            </li>
                            <li>
                                <p><span>{{followDataList.average_holding_time}}</span></p>
                                <p>平均持单时间
                                    <Tooltip placement="bottom">
                                        <span class="iconfont">&#xe622;</span>
                                        <div slot="content">
                                            该交易策略最近一次交易，距离现在有多久
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
                <p class="transaction_category_date">数据更新时间：{{timeType(followDataList.deal_time)}}</p>
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
                        <div v-if="followDataList.profit_earnings!=''">
                            <div ref="profitLoss1" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="followDataList.profit_earnings==''" class="no-data-show">暂无交易数据</div>
                    </div>
                </div>
                <div v-show='AccProfitLoss==AccProfitLossList[1]'>
                    <div class="cumulative_chart_information cl">
                        <p>盈亏点数累计</p>
                    </div>
                    <!--图表-->
                    <div class="cumulative_echarts">
                        <div v-if="followDataList.profit_count!=''">
                            <div ref="profitLoss2" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="followDataList.profit_count==''" class="no-data-show">暂无交易数据</div>
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
                        <div v-if="followDataList.month_result!=''">
                            <div ref="profit1" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="followDataList.month_result==''" class="no-data-show">暂无交易数据</div>
                    </div>
                </div>
                <div v-show='profit==profitList[1]'>
                    <div class="cumulative_chart_information cl">
                        <p>单笔收益率变化</p>
                    </div>
                    <div v-if="followDataList.profit_stroke_count!=''">
                        <div ref="profit2" :style="{width:'1280px',height:'360px'}"></div>
                    </div>
                    <div v-if="followDataList.profit_stroke_count==''" class="no-data-show">暂无交易数据</div>
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
                        <div v-if="followDataList.category_earnings!=''">
                            <div ref="diversification1" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="followDataList.category_earnings==''" class="no-data-show">暂无交易数据</div>
                    </div>
                </div>
                <div v-show='performance==performanceList[1]'>
                    <div class="cumulative_chart_information cl">
                        <p>交易品种单数</p>
                    </div>
                    <!--图表-->
                    <div class="cumulative_echarts">
                        <div class="echarts-diversification2"><!--v-if="followDataList.category_stroke_count!=''"-->
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
                        <!--<div v-if="followDataList.category_stroke_count==''" class="no-data-show">暂无交易数据</div>-->
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
                        <div v-if="followDataList.order_count!=''">
                            <div ref="varietyNumber1" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="followDataList.order_count==''" class="no-data-show">暂无交易数据</div>
                    </div>
                </div>
                <div v-show='variety==varietyList[1]'>
                    <div class="cumulative_chart_information cl">
                        <p>持单手数变化</p>
                    </div>
                    <!--图表-->
                    <div class="cumulative_echarts">
                        <div v-if="followDataList.position!=''">
                            <div ref="varietyNumber2" :style="{width:'1280px',height:'360px'}"></div>
                        </div>
                        <div v-if="followDataList.position==''" class="no-data-show">暂无交易数据</div>
                    </div>
                </div>
            </div>
        </div>

        <!--跟随详情-->
        <div class="follow_details">
            <div class="transaction_data_top">
                <div>
                    <p class="transaction_data_title">跟随详情</p>
                    <p class="transaction_data_date">数据更新时间：{{timeType(followDataList.deal_time)}}
                    </p>
                </div>
            </div>
            <div class="follow_details_container_top">
                <div class=" container_top_l">
                    <ul v-if="showFollowDetailsTable">
                        <li>
                            <p>跟随总获利:
                                <span class="total_profit">${{followDataList.sum_Profit ?  followDataList.sum_Profit:'--'}}</span>
                            </p>
                        </li>
                        <li>
                            <p>跟随总资金:
                                <span class="total_fund">${{followDataList.sum_fund ? followDataList.sum_fund:'--'}}</span>
                            </p>
                        </li>
                    </ul>

                    <ul v-if="showHistoryFollowDetailsTable">
                        <li>
                            <p>历史跟随总获利:
                                <span class="total_profit">${{followDataList.sum_history_Profit ? followDataList.sum_history_Profit:'--'}}</span>
                            </p>
                        </li>
                        <li>
                            <p>历史跟随总资金:
                                <span class="total_fund">${{followDataList.sum_history_fund ? followDataList.sum_history_fund : '--'}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="container_top_r">
                    <button class="history_btn" :class="{ls_btn:!showHistoryFollowDetailsTable}"
                            @click="FollowingTable">正在跟随
                    </button>
                    <button class="history_btn" :class="{ls_btn:showHistoryFollowDetailsTable}"
                            @click="historyFollowTable">历史跟随
                    </button>
                </div>
            </div>
            <div class="follow_details_list">
                <!--正在跟随列表-->
                <div v-if="showFollowDetailsTable">
                    <table>
                        <thead>
                        <tr>
                            <td>账号昵称</td>
                            <td>跟随方式</td>
                            <td>开始时间</td>
                            <td>跟随金额</td>
                            <td>跟随天数</td>
                            <td>跟随总手数</td>
                            <td>跟随盈亏</td>
                        </tr>
                        </thead>
                        <tr v-if="followDetailsDataList==''">
                            <td colspan="7" style="font-size: 18px;color: #CCCCCC;">暂无数据</td>
                        </tr>
                        <tr v-for="value in followDetailsDataList">
                            <td class="follow_details_td">
                                <div class="follow_details_tr">
                                    <img :src="value.user.avatar" alt="">
                                    <div>
                                        <p>{{value.user.name}}</p>
                                        <!--<p>EWG</p>-->
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span v-if="value.follow_form==1">智能同比</span>
                                <span v-if="value.follow_form==2">手数比例</span>
                            </td>
                            <td>{{value.created_at}}</td>
                            <td>${{followDataList.deal_money}}</td>
                            <td>{{value.change_policy_time}}天</td>
                            <td>{{value.count_Lots}}</td>
                            <td>${{value.count_Profit}}</td>
                        </tr>

                    </table>
                    <div class="page" style="margin-right: 5px">
                        <Page class-name="defaultPage" :total="10" :show-total="false"></Page>
                    </div>
                </div>

                <!--历史跟随列表-->
                <div v-if="showHistoryFollowDetailsTable">
                    <table>
                        <thead>
                        <tr>
                            <td>账号昵称</td>
                            <td>跟随方式</td>
                            <td>开始时间</td>
                            <td>跟随金额</td>
                            <td>跟随天数</td>
                            <td>跟随总手数</td>
                            <td>跟随盈亏</td>
                        </tr>
                        </thead>
                        <tr v-if="historyFollowDetailsDataList==''">
                            <td colspan="7" style="font-size: 18px;color: #CCCCCC;">暂无数据</td>
                        </tr>
                        <tr v-for="value in historyFollowDetailsDataList">
                            <td class="follow_details_td">
                                <div class="follow_details_tr">
                                    <img :src="value.user.avatar" alt="">
                                    <div>
                                        <p>{{value.user.name}}</p>
                                        <!--<p>EWG</p>-->
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span v-if="value.follow_form==1">智能同比</span>
                                <span v-if="value.follow_form==2">手数比例</span>
                            </td>
                            <td>{{value.created_at}}</td>
                            <td>$20</td>
                            <td>1天</td>
                            <td>2</td>
                            <td>$4</td>
                        </tr>

                    </table>
                    <div class="page" style="margin-right: 5px">
                        <Page class-name="defaultPage" :total="20" :show-total="false"></Page>
                    </div>
                </div>
            </div>

        </div>

        <!--交易订单-->
        <div class="trading_order">
            <div class="transaction_data_top">
                <div>
                    <p class="transaction_data_title">交易订单</p>
                    <p class="transaction_data_date">数据更新时间：{{timeType(followDataList.deal_time)}}
                        <!--<span>2017</span>年 <span>6</span>月 <span>8</span>日-->
                        <!--<span>17</span>:<span>36</span>-->
                    </p>
                </div>
            </div>
            <div class="trading_order_container_top">
                <div class=" container_top_l"></div>
                <div class="container_top_r">
                    <button class="history_btn" :class="{ls_btn:!showHistoryOrderFormTable}" @click="orderFormTable">
                        正在进行
                    </button>
                    <button class="history_btn" :class="{ls_btn:showHistoryOrderFormTable}"
                            @click="historyOrderFormTable">历史记录
                    </button>
                </div>
            </div>
            <div class="trading_order_list">
                <table v-if="showOrderFormTable">
                    <thead>
                    <tr>
                        <td>账号昵称</td>
                        <td>跟随方式</td>
                        <td>开始时间</td>
                        <td>跟随金额</td>
                        <td>跟随天数</td>
                        <td>跟随总手数</td>
                        <td>跟随盈亏</td>
                    </tr>
                    </thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <table v-if="showHistoryOrderFormTable">
                    <thead>
                    <tr>
                        <td>账号昵称</td>
                        <td>跟随方式</td>
                        <td>开始时间</td>
                        <td>跟随金额</td>
                        <td>跟随天数</td>
                        <td>跟随总手数</td>
                        <td>跟随盈亏</td>
                    </tr>
                    </thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="page">
                <Page class-name="defaultPage" :total="1" :show-total="false"></Page>
            </div>
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
    import image from './images/follow.png'
    import theme from './theme/echart-theme'
    export default {
        data(){
            return {
                theme,
                image,

                //表单数据
                showFollowDetailsTable: true,
                showHistoryFollowDetailsTable: false,
                showOrderFormTable: true,
                showHistoryOrderFormTable: false,
                historyFollowDetailsDataList: '',
                followDetailsDataList: '',
                followDataList: '',
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
            }
        },
        beforeMount() {
            this.followId = this.$router.currentRoute.params.id
            this.getFollowUserData()
        },
        methods: {
            getFollowUserData(){
                this.$http.get('/policy/' + this.followId)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData = {}}=data;
                        if (retCode == '0') {
                            this.followDataList = retData
                            console.log(this.followDataList);
                            //跟随详情数据
                            this.followDetailsDataList = this.followDataList.followinfo.data
                            //跟随历史详情数据
                            this.historyFollowDetailsDataList = this.followDataList.history_followinfo.data


                            //收益表现（每月）数据
                            var profitMos = this.followDataList.month_result
                            var profitMos_xAxis = []
                            var profitMos_yAxis = []
                            for (var i = 0; i < profitMos.length; i++) {
                                profitMos_xAxis[i] = profitMos[i][0],
                                    profitMos_yAxis[i] = profitMos[i][1]
                            }
                            this.profitMosListX = profitMos_xAxis
                            this.profitMosListY = profitMos_yAxis

                            //收益表现（每笔）数据
                            var profitStrokeCount = this.followDataList.profit_stroke_count
                            var profitStrokeCount_xAxis = []
                            var profitStrokeCount_yAxis = []
                            for (var i = 0; i < profitStrokeCount.length; i++) {
                                profitStrokeCount_xAxis[i] = profitStrokeCount[i][0],
                                    profitStrokeCount_yAxis[i] = profitStrokeCount[i][1]
                            }
                            this.profitStrokeCountListX = profitStrokeCount_xAxis
                            this.profitStrokeCountListY = profitStrokeCount_yAxis


                            //手数变化（下单）数据
                            var orderCount = this.followDataList.order_count
                            var orderCount_xAxis = []
                            var orderCount_yAxis = []
                            for (var i = 0; i < orderCount.length; i++) {
                                orderCount_xAxis[i] = orderCount[i][0],
                                    orderCount_yAxis[i] = orderCount[i][1]
                            }
                            this.orderCountListX = orderCount_xAxis
                            this.orderCountListY = orderCount_yAxis

                            //交易品种（收益）数据
                            var categoryEarnings = this.followDataList.category_earnings
                            var categoryEarnings_xAxis = []
                            var categoryEarnings_yAxis = []
                            for (var i = 0; i < categoryEarnings.length; i++) {
                                categoryEarnings_xAxis[i] = categoryEarnings[i][0],
                                    categoryEarnings_yAxis[i] = categoryEarnings[i][1]
                            }
                            this.categoryEarningsListX = categoryEarnings_xAxis
                            this.categoryEarningsListY = categoryEarnings_yAxis

                            //交易品种（笔数）数据
                            this.categoryDetailsList = this.followDataList.category_stroke_count
                            var categoryStrokeCount_xAxis = []
                            var categoryStrokeCount_yAxis = []
                            var categoryStrokeList = this.followDataList.category_stroke_count
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

            //跟随表格（正在跟随和历史跟随）切换
            FollowingTable(){
                this.showFollowDetailsTable = true
                this.showHistoryFollowDetailsTable = false
            },
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
//            --------- tab切换----end------
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
                            data: new Array(this.followDataList.profit_earnings.length + 1)
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
                            data: this.followDataList.profit_earnings,
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
                            data: new Array(this.followDataList.profit_count.length + 1)
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
                            data: this.followDataList.profit_count,
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
//                            data : new Array(this.followDataList.order_count.length),
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
                            data: this.followDataList.position,
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
        },
        created(){
            this.tabCategory = this.tabCategoryList[0]
            this.AccProfitLoss = this.AccProfitLossList[0]
            this.profit = this.profitList[0]
            this.performance = this.performanceList[0]
            this.variety = this.varietyList[0]
        },
        activated(){
            this.$emit("changeTab", 1)//切换局部导航
        }
    }
</script>