<style lang="css" scoped src="./css/detailsModal.css"></style>

<template>
    <div class="details_box">
        <div class="top">
            {{name}}详情
        </div>

        <!--============详情============-->
        <div class="details_content">
            <div class="content cl">
                <!--策略基本信息-->
                <div class="strategy_information cl">
                    <div class="header">策略基本信息</div>
                    <div class="strategy_content cl">
                        <div class="left_content cl">
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>策略名称:</span>
                                </div>
                                <div class="name">
                                    <span>{{detailsForm.name}}</span>
                                </div>
                            </div>
                            <div class="describe_content cl">
                                <div class="describe_title">
                                    <span>策略简介:</span>
                                </div>
                                <div class="describe">
                                    <span>{{detailsForm.describe}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="right_content cl">
                            <div class="portrait_title">
                                <span>策略头像:</span>
                            </div>
                            <div class="img_content">
                                <img :src="detailsForm.picture" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!--信号源信息-->
                <div class="signalSource_information cl">
                    <div class="header cl">信号源信息</div>
                    <div class="signalSource_content cl">
                        <ul id="signal_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>交易商名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.trade_platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>观摩MT4账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>投资人密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.investor_password}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>服务器名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.trade_platform.server_name}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准平台账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.standard_mt4_account.platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.standard_mt4_account.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号服务器:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.standard_mt4_account.platform.server_name}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.standard_mt4_account.MT4_password}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--风控指标-->
                <div class="riskControl_information cl" >
                    <div class="header cl">风控指标</div>
                    <div class="risk_content cl">
                        <ul id="risk_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>策略交易资金:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{detailsForm.deal_money}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>最小跟随资金:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{detailsForm.min_follow_money}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>杠杆比例:</span>
                                </div>
                                <div class="item_value">
                                    <span>1:{{detailsForm.lever_rate}}00</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔止损:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.per_stop_lose}}点</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>风控净值:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{detailsForm.risk_control}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>持单手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.own_max_limit}}手</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailsForm.per_deal_limit}}手</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div class="button_content cl">
                <span class="close" @click="close">关闭</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {

                detailsForm: {
                    investor_password: '',
                    standard_mt4_account: {
                        MT4_account:'',
                        MT4_password:'',
                        platform:{
                            platform: '',
                            server_name: ''
                        }
                    },
                    trade_platform: {
                        platform: '',
                        server_name: '',
                        id: ''
                    },

                    deal_money: '',
                    lever_rate: '',
                    min_follow_money: '',
                    risk_control: '',
                    per_stop_lose: '',
                    per_deal_limit: '',
                    own_max_limit: ''
                },
                name:'',
                id:'',

                type: ''   //显示后台返回的杠杆比例
            }
        },
        props: ["modalMsg"],
        beforeMount(){
            this.name = this.modalMsg.id.name
            this.id=this.modalMsg.id.id
            this.getPublishDetailsInfo()
        },
        methods: {
            //请求策略详情列表数据
            getPublishDetailsInfo(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/admin/policy/'+this.id)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.detailsForm = retData
                                this.detailsForm.lever_rate = retData.lever_rate
                                //转成字符串
                                this.type=this.detailsForm.lever_rate.toString()
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })

            },


            close() {
                this.$emit('close')
            }
        }
    }
</script>