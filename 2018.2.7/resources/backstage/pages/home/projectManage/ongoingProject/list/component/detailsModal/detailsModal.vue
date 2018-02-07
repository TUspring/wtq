<style lang="css" scoped src="./css/detailsModal.css"></style>

<template>
    <div class="details_box">
        <!--<div class="top">-->
            <!--{{name}}详情-->
        <!--</div>-->
        <div class="top">
            <p>{{name}} 详情</p>
            <span class="close-icon" @click="close">
                <Icon type="close-round"></Icon>
            </span>
        </div>

        <!--============详情============-->
        <div class="details_content">
            <div class="content cl">
                <!--策略基本信息-->
                <div class="strategy_information cl">
                    <div class="header">项目基本资料</div>
                    <div class="strategy_content cl">
                        <div class="left_content cl">
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>项目名称:</span>
                                </div>
                                <div class="name">
                                    <span>{{detailList.name}}</span>
                                </div>
                            </div>
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>报名截止时间:</span>
                                </div>
                                <div class="name">
                                    <span>{{timeType(detailList.registration_deadline)}}</span>
                                </div>
                            </div>
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>项目开始时间:</span>
                                </div>
                                <div class="name">
                                    <span>{{timeType(detailList.start_time)}}</span>
                                </div>
                            </div>
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>项目周期:</span>
                                </div>
                                <div class="name">
                                    <span>{{detailList.period}}天</span>
                                </div>
                            </div>
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>预期收益率:</span>
                                </div>
                                <div class="name">
                                    <span>{{detailList.yield}}%</span>
                                </div>
                            </div>
                            <div class="name_content cl">
                                <div class="name_title">
                                    <span>利润提成比例:</span>
                                </div>
                                <div class="name">
                                    <span>{{detailList.trader_royalty_rate}}%</span>
                                </div>
                            </div>
                            <div class="describe_content cl">
                                <div class="describe_title">
                                    <span>项目简介:</span>
                                </div>
                                <div class="describe">
                                    <span>{{detailList.intro}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="right_content cl">
                            <div class="portrait_title">
                                <span>项目头像:</span>
                            </div>
                            <div class="img_content">
                                <img :src="detailList.path?detailList.path:''" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!--信号源信息-->
                <div class="signalSource_information cl" v-show="showSignalSource">
                    <div class="header cl">信号源信息
                        <!--<span  class="btnClass" @click="modifySignalSource">编辑</span>-->
                        <Button type="primary" class="btnClass" @click="modifySignalSource">编辑</Button>
                    </div>
                    <div class="signalSource_content cl">
                        <ul id="signal_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>交易商名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.trade_platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>观摩MT4账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>投资人密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.investor_password}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>服务器名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.trade_platform.server_name}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准平台账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号服务器:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.platform.server_name}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.MT4_password}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--编辑信号源信息-->
                <div class="signalSource_information cl" v-show="editSignalSource">
                    <div class="header cl">信号源信息
                        <!--<span class="btnClass" @click="saveSignalSource">保存</span>-->
                        <Button type="primary" class="btnClass" @click="saveSignalSource">保存</Button>
                    </div>
                    <div class="signalSource_content cl">
                        <ul id="signal_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>交易商名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.trade_platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>观摩MT4账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>投资人密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.investor_password}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>服务器名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.trade_platform.server_name}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准平台账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号服务器:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.standard_mt4_account.platform.server_name}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号密码:</span>
                                </div>
                                <div class="item_value">
                                    <input type="text" v-model="standard_investor_password">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


                <!--风控指标-->
                <div class="riskControl_information cl">
                    <div class="header cl">风控指标</div>
                    <div class="risk_content cl">
                        <ul id="risk_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>策略交易资金:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{detailList.deal_money}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>最小跟随资金:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{detailList.min_follow_money}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>杠杆比例:</span>
                                </div>
                                <div class="item_value">
                                    <span>1:{{detailList.lever_rate}}00</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔止损:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.per_stop_lose}}点</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>风控净值:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{detailList.risk_control}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>持单手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.own_max_limit}}手</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{detailList.per_deal_limit}}手</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <!--<div class="button_content cl">-->
                <!--<span class="close" @click="close">关闭</span>-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                showSignalSource: true,
                editSignalSource: false,
                detailList:{
                    images:{
                        path:''
                    },
                    trade_platform:{
                        platform:'',
                        server_name:''
                    },
                    standard_mt4_account:{
                        MT4_account:'',
                        MT4_password:'',
                        platform:{
                            platform:'',
                            server_name:''
                        }
                    }
                },
                name:'',

                id:'',                           //项目ID
                standard_investor_password:''    //标准投资人密码
            }

        },
        props: ["modalMsg"],
        beforeMount(){
            this.id = this.modalMsg.id.id
            this.name = this.modalMsg.id.users.name
            this.getDetailList()
        },
        methods: {
            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            //获取详情信息
            getDetailList(){
                this.$http.get('/admin/regular_project/info/'+this.id)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        this.detailList = retData
                        this.standard_investor_password = this.detailList.standard_mt4_account.MT4_password
                    }
                })
            },

            //编辑
            modifySignalSource(){
                this.showSignalSource = false
                this.editSignalSource = true
            },
            //保存
            saveSignalSource(){
                var httpName = "保存"
                var ajaxData = {
                    id:this.id,
                    standard_investor_password:this.standard_investor_password
                }
                this.$http.put('/admin/regular_project/info/signal',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `${httpName}成功`})
                        this.editSignalSource = false
                        this.showSignalSource = true
                        this.getDetailList()
                    }else{
                        this.$Modal.error({title:`${httpName}失败`,content:retMsg})
                    }
                }).catch((error) =>{
                     this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },

            close(){
                this.$emit('close')

            }

        }
    }
</script>