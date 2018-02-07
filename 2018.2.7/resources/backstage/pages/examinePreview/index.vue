<style lang="css" scoped src="./css/index.css"></style>
<style scoped>
    .analysis-files {
        width: 100%;
        background-color: #fff;
        padding: 30px;
    }
    .checkout-content {
        display: inline-block;
        margin-left: 30px;
        margin-bottom: 20px;
    }
</style>
<template>
    <div class="layout-content-main">

        <div id="trading_strategy_follow">
            <!--顶部信息-->
            <div class="follow_container_top cl" id="followContainerTop">
                <div class="top_content_left">
                    <img :src="UserFormList.picture" alt="" class="avatar">
                    <!--<p>画江湖不良人</p>-->
                    <!--<button class="follow_btn"><span class="iconfont">&#xe629;</span><span class="typeface">关注</span>-->
                    <!--</button>-->
                </div>
                <div class="top_content_center">
                    <p class="describe">{{UserFormList.describe}}</p>
                    <div>
                        <ul>
                            <li>
                                <p class="monthly_average_income"><span>158</span>%</p>
                                <p class="prompt_text">月均收益</p>
                            </li>
                            <li>
                                <p><span>15.7</span>%</p>
                                <p class="prompt_text">最大回撤</p>
                            </li>
                            <li>
                                <p>1.34</p>
                                <p class="prompt_text">夏普比例</p>
                            </li>
                            <li>
                                <p>5.74</p>
                                <p class="prompt_text">获利系数</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="top_content_right">
                    <!--<button>一键跟随</button>-->
                </div>
            </div>


            <!--切换tab-->
            <div class="follow_checkout">
                <div>
                    <ul>
                        <!--<router-link to="/policyFollowing/4/dynamicComm">-->
                        <li>动态交流</li>
                        <!--</router-link>-->
                        <!--<router-link to="/policyFollowing/4/policyData">-->
                        <li>策略数据</li>
                        <!--</router-link>-->
                    </ul>
                </div>
            </div>
            <!--<keep-alive>-->
            <!--<router-view @changeTab="changeTab"></router-view>-->
            <!--</keep-alive>-->

            <!--<div>-->
            <!--<div class="cl dynamic_communication_box" style="text-align: center;width: 1200px;padding-top: 50px">-->
            <!--功能开发中，好建议请邮件PM@zhongfx.cn-->
            <!--</div>-->
            <!--</div>-->
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
                                            <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                            <div slot="content">
                                                <p>交易策略账号当前的净值</p>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    <li class="worth">$<span>9765.3</span></li>
                                </ul>
                            </div>
                            <div class="details_content_list">
                                <ul>
                                    <li>风控净值
                                        <Tooltip placement="right">
                                            <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                            <div slot="content">
                                                <p>当交易策略账号的净值低于风控净值时，将<br>
                                                    启动独立风控，所有的跟随账号将平仓止损，<br>
                                                    以保障跟随者的利益。</p>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    <li class="worth">$<span>8000</span></li>
                                </ul>
                            </div>
                            <div class="details_content_list">
                                <ul>
                                    <li>单笔强制止损
                                        <Tooltip placement="right">
                                            <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                            <div slot="content">
                                                <p>每一笔订单下单后，将设置订单的止损线。<br>
                                                    达到止损的点位时，将强制平仓止损。</p>
                                            </div>
                                        </Tooltip>

                                    </li>
                                    <li class="worth"><span>300</span>点</li>
                                </ul>
                            </div>
                            <div class="details_content_list">
                                <ul>
                                    <li>单笔手数限制
                                        <Tooltip placement="right">
                                            <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                            <div slot="content">
                                                <p>该交易策略所下的单笔订单的手数限制，以<br>
                                                    防止交易员非理性或者失误操作，导致重仓<br>
                                                    交易，增加风险。</p>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    <li class="worth"><span>0.5</span>手</li>
                                </ul>
                            </div>
                            <div class="details_content_list">
                                <ul>
                                    <li>持单手数限制
                                        <Tooltip placement="right">
                                            <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                            <div slot="content">
                                                <p>该交易策略正在进行中的订单的手数最大限<br>
                                                    制。超过限制后，将无法跟随新订单。防止<br>
                                                    交易员非理性或者失误操作，导致重仓交易，<br>
                                                    增加风险。</p>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    <li class="worth"><span>5</span>手</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--交易数据内容-->
                    <div class="transaction_data">
                        <div class="transaction_data_top">
                            <div>
                                <p class="transaction_data_title">交易数据</p>
                                <p class="transaction_data_date">数据更新时间：<span>2017</span>年 <span>6</span>月
                                    <span>8</span>日
                                    <span>17</span>:<span>36</span>:<span>31</span></p>
                            </div>
                        </div>
                        <div class="transaction_data_container">
                            <div class="transaction_data_content">
                                <ul>
                                    <li>
                                        <p><span>24</span>小时前</p>
                                        <p>最近交易时间
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                                <div slot="content">
                                                    该交易策略最近一次交易，距离现在有多久
                                                </div>
                                            </Tooltip>
                                        </p>
                                    </li>
                                    <li>
                                        <p><span>134</span>天/ <span>350</span>天</p>
                                        <p>开单天数/统计天数
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                                <div slot="content">
                                                    开单天数，有多少天老师开单交易。统计天<br>
                                                    数，最早一笔订单开单到最后一笔订单经历<br>
                                                    的天数（其中不包括周六周日）
                                                </div>
                                            </Tooltip>
                                        </p>
                                    </li>
                                    <li>
                                        <p>$<span>7834.39</span>/ <span>78.34</span>%</p>
                                        <p>总净盈利
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                                <div slot="content">
                                                    该策略从最早一笔订单到现在，全部已平仓<br>
                                                    的订单的净盈亏金额和盈亏比例
                                                </div>
                                            </Tooltip>
                                        </p>
                                    </li>
                                    <li>
                                        <p><span>134</span>手</p>
                                        <p>交易总手数
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
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
                                        <p>1:200</p>
                                        <p>杠杆比例
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
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
                                        <p>$<span>10000</span></p>
                                        <p>策略交易资金
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
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
                                        <p>$<span>5000</span></p>
                                        <p>最低跟随资金
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
                                                <div slot="content">
                                                    跟随该策略时，交易员老师建议的最低资金<br>
                                                    量要求。账户净值低于该资金时，无法使用<br>智能同比。低于该资金进行跟随时，会有较大风险，请慎重考量。
                                                </div>
                                            </Tooltip>
                                        </p>
                                    </li>
                                    <li>
                                        <p><span>1</span>天 <span>07</span>小时</p>
                                        <p>平均持单时间
                                            <Tooltip placement="bottom">
                                                <Icon type="help-circled" style="margin-left: 8px"></Icon>
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
                            <li>累计盈亏</li>
                            <li>收益表现</li>
                            <li>交易品种</li>
                            <li>手数变化</li>
                        </ul>
                        <p class="transaction_category_date">数据更新时间：<span>2017</span>年 <span>6</span>月 <span>8</span>日
                            <span>17</span>:<span>30</span></p>
                    </div>

                    <!--累计盈亏内容-->
                    <div class="cumulative_content">
                        <div class="cumulative_nav">
                            <ul>
                                <li class="cur">收益</li>
                                <li>点数</li>
                            </ul>
                        </div>
                        <div>
                            <div class="cumulative_chart_information cl">
                                <p>盈亏累计</p>
                            </div>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div>
                                <div ref="profitLoss" :style="{width:'1100px',height:'360px'}"></div>
                            </div>
                        </div>
                        <!--<div>内容预留</div>-->
                    </div>

                    <!--收益表现内容-->
                    <div class="cumulative_content" v-if="hidden">
                        <div class="cumulative_nav">
                            <ul>
                                <li class="cur">每月</li>
                                <li>每笔</li>
                            </ul>
                        </div>
                        <div>
                            <div class="cumulative_chart_information cl">
                                <p>每月收益率变化</p>
                            </div>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div>
                                <div ref="profit" :style="{width:'1100px',height:'360px'}"></div>
                            </div>
                        </div>
                    </div>

                    <!--交易品种内容-->
                    <div class="cumulative_content" v-if="hidden">
                        <div class="cumulative_nav">
                            <ul>
                                <li>收益</li>
                                <li>笔数</li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <div class="cumulative_chart_information cl">
                                    <p>交易品种收益率</p>
                                </div>
                            </div>
                            <!--图表-->
                            <div class="cumulative_echarts">
                                <div>
                                    <div ref="diversification1" :style="{width:'1100px',height:'360px'}"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div class="cumulative_chart_information cl">
                                    <p>交易品种单数</p>
                                </div>
                            </div>
                            <!--图表-->
                            <div class="cumulative_echarts">
                                <div>
                                    <div ref="diversification2" :style="{width:'1100px',height:'360px'}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--手数变化内容-->
                    <div class="cumulative_content" v-if="hidden">
                        <div class="cumulative_nav">
                            <ul>
                                <li class="cur">收益</li>
                                <li>点数</li>
                            </ul>
                        </div>
                        <div>
                            <div class="cumulative_chart_information cl">
                                <p>手数变化</p>
                            </div>
                        </div>
                        <!--图表-->
                        <div class="cumulative_echarts">
                            <div style="text-align: center;font-size: 24px;padding: 30px;">
                                暂无数据
                            </div>
                        </div>
                    </div>
                </div>

                <!--跟随详情-->
                <div class="follow_details">
                    <div class="transaction_data_top">
                        <div>
                            <p class="transaction_data_title">跟随详情</p>
                            <p class="transaction_data_date">数据更新时间：<span>2017</span>年 <span>6</span>月 <span>8</span>日
                                <span>17</span>:<span>36</span></p>
                        </div>
                    </div>
                    <div class="follow_details_container_top">
                        <div class=" container_top_l">
                            <ul>
                                <li><p>跟随总获利:<span class="total_profit">$21950.34</span></p></li>
                                <li><p>跟随总资金:<span class="total_fund">$283766.43</span></p></li>
                            </ul>
                        </div>
                        <div class="container_top_r">
                            <button class="ls_btn">正在跟随</button>
                            <button class="history_btn">历史跟随</button>
                        </div>
                    </div>
                    <div class="follow_details_list">
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
                            <tr>
                                <td class="follow_details_td">
                                    <div class="follow_details_tr">
                                        <img src="images/follow.png" alt="">
                                        <div>
                                            <p>Kyyyi</p>
                                            <p>EWG</p>
                                        </div>
                                    </div>
                                </td>
                                <td>比例70%</td>
                                <td>2017-6-9</td>
                                <td>$6000</td>
                                <td>87天</td>
                                <td>6</td>
                                <td>$2734.4</td>
                            </tr>
                            <tr>
                                <td class="follow_details_td">
                                    <div class="follow_details_tr">
                                        <img src="images/follow.png" alt="">
                                        <div>
                                            <p>tuspring</p>
                                            <p>KVT</p>
                                        </div>
                                    </div>
                                </td>
                                <td>比例82%</td>
                                <td>2017-8-1</td>
                                <td>$8000</td>
                                <td>57天</td>
                                <td>14</td>
                                <td>$1485.98</td>
                            </tr>
                            <tr>
                                <td class="follow_details_td">
                                    <div class="follow_details_tr">
                                        <img src="images/follow.png" alt="">
                                        <div>
                                            <p>鸿达小子</p>
                                            <p>TERA</p>
                                        </div>
                                    </div>
                                </td>
                                <td>比例79%</td>
                                <td>2017-9-1</td>
                                <td>$8907</td>
                                <td>4天</td>
                                <td>10</td>
                                <td>$285.4</td>
                            </tr>
                        </table>
                    </div>
                    <div class="page">
                        <Page class-name="defaultPage" :total="100" :show-total="false"></Page>
                    </div>
                </div>

                <!--交易订单-->
                <div class="trading_order">
                    <div class="transaction_data_top">
                        <div>
                            <p class="transaction_data_title">交易订单</p>
                            <p class="transaction_data_date">数据更新时间：<span>2017</span>年 <span>6</span>月 <span>8</span>日
                                <span>17</span>:<span>36</span></p>
                        </div>
                    </div>
                    <div class="trading_order_container_top">
                        <div class=" container_top_l"></div>
                        <div class="container_top_r">
                            <button class="ls_btn">正在进行</button>
                            <button class="history_btn">历史记录</button>
                        </div>
                    </div>
                    <div class="trading_order_list">
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
                    </div>
                    <div class="page">
                        <Page class-name="defaultPage" :total="100" :show-total="false"></Page>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                hidden: false,
                UserFormList:'',
            }
        },
        beforeMount(){
            this.getUserData()
        },
        methods:{
            getUserData(){
                this.UserId = this.$router.currentRoute.params.id
                return new Promise((resolve, reject) => {
                    this.$http.get('admin/policy/'+this.UserId)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.UserFormList = retData
                                console.log(this.UserFormList);
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            }
        },
    }
</script>