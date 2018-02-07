<style lang="css" scoped src="./css/detailsModal.css"></style>
<style>
   .details_box .ivu-input{
        height: 24px;
    }
   .ivu-select-single .ivu-select-selection{
       height: 24px;
   }
   .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
       line-height: 24px;
       height: 24px;
   }
</style>
<template>
    <div class="details_box">
        <div class="top">{{detailsUserName}}详情</div>

        <!--============详情============-->
        <div class="details_content" v-show="details">
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
                                    <span>{{UserInfo.name}}</span>
                                </div>
                            </div>
                            <div class="describe_content cl">
                                <div class="describe_title">
                                    <span>策略简介:</span>
                                </div>
                                <div class="describe">
                                    <span>{{UserInfo.describe}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="right_content cl">
                            <div class="portrait_title">
                                <span>策略头像:</span>
                            </div>
                            <div class="img_content">
                                <img :src="UserInfo.picture" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!--信号源信息-->
                <div class="signalSource_information">
                    <div class="header">信号源信息</div>
                    <div class="signalSource_content cl">
                        <ul id="signal_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>交易商名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.trade_platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>观摩MT4账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>投资人密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.investor_password}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>服务器名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.trade_platform.server_name}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--风控指标-->
                <div class="riskControl_information">
                    <div class="header">风控指标</div>
                    <div class="risk_content cl">
                        <ul id="risk_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>策略交易资金:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{UserInfo.deal_money}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>最小跟随资金:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{UserInfo.min_follow_money}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>杠杆比例:</span>
                                </div>
                                <div class="item_value">
                                    <span>1:{{UserInfo.lever_rate}}00</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔止损:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.per_stop_lose}}点</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>风控净值:</span>
                                </div>
                                <div class="item_value">
                                    <span>${{UserInfo.risk_control}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>持单手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.own_max_limit}}手</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.per_deal_limit}}手</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="button_content cl">
                <!--<span class="edit" @click="edit">编辑</span>-->
                <!--<span class="close" @click="close">关闭</span>-->
                <Button class="close" @click="close">关闭</Button>
                <Button type="primary" class="edit" @click="edit">编辑</Button>
            </div>
        </div>

        <!--============编辑============-->
        <div class="details_edit_content" v-show="detailsEdit">
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
                                    <span>{{UserInfo.name}}</span>
                                </div>
                            </div>
                            <div class="describe_content cl">
                                <div class="describe_title">
                                    <span>策略简介:</span>
                                </div>
                                <div class="describe">
                                    <span>{{UserInfo.describe}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="right_content cl">
                            <div class="portrait_title">
                                <span>策略头像:</span>
                            </div>
                            <div class="img_content">
                                <img :src="UserInfo.picture" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!--信号源信息-->
                <div class="signalSource_information">
                    <div class="header">信号源信息</div>
                    <div class="signalSource_content cl">
                        <ul id="signal_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>交易商名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.trade_platform.platform}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>观摩MT4账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>投资人密码:</span>
                                </div>
                                <div class="item_value">
                                    <span v-model="investor_password">{{UserInfo.investor_password}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>服务器名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{UserInfo.trade_platform.server_name}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--风控指标-->
                <div class="riskControl_information">
                    <div class="header">风控指标</div>
                    <div class="risk_content cl">
                        <ul id="risk_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>策略交易资金:</span>
                                </div>
                                <div class="item_value">
                                    <Input  placeholder="" v-model="UserInfo.deal_money" style="width: 150px;"></Input>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>最小跟随资金:</span>
                                </div>
                                <div class="item_value">
                                    <Input  placeholder="" v-model="UserInfo.min_follow_money" style="width: 150px;"></Input>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>杠杆比例:</span>
                                </div>
                                <div class="item_value">
                                    <!--<select name="" id="" v-model="UserInfo.lever_rate">-->
                                        <!--<option value="1">1:100</option>-->
                                        <!--<option value="2">1:200</option>-->
                                        <!--<option value="3">1:300</option>-->
                                        <!--<option value="4">1:400</option>-->
                                    <!--</select>-->
                                    <Select v-model="UserInfo.lever_rate" style="width:150px" :transfer="true">
                                        <Option :value="1" :key="1">1:100</Option>
                                        <Option :value="2" :key="2">1:200</Option>
                                        <Option :value="3" :key="3">1:300</Option>
                                        <Option :value="4" :key="4">1:400</Option>
                                    </Select>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔止损:</span>
                                </div>
                                <div class="item_value">
                                    <Input  placeholder="" v-model="UserInfo.per_stop_lose" style="width: 150px;"></Input>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>风控净值:</span>
                                </div>
                                <div class="item_value">
                                    <Input  placeholder="" v-model="UserInfo.risk_control" style="width: 150px;"></Input>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>持单手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <Input  placeholder="" v-model="UserInfo.own_max_limit" style="width: 150px;"></Input>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <Input  placeholder="" v-model="UserInfo.per_deal_limit" style="width: 150px;"></Input>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="button_content cl">
                <Button class="close" @click="close">关闭</Button>
                <Button type="primary" class="save" @click="save">保存</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                details: true,
                detailsEdit: false,
                platformList:'',
                platformDataList:'',
                detailsName:'',
                investor_password:'',

                deal_money:'',
                lever_rate:'',
                min_follow_money:'',
                risk_control:'',
                per_stop_lose:'',
                per_deal_limit:'',
                own_max_limit:'',

            }
        },
        beforeMount(){
            this.UserInfo=this.modalMsg.id;
        },
        computed:{
            detailsUserName(){
                return this.detailsName=this.modalMsg.id.user.name
            }
        },
        props: ["modalMsg"],
        methods: {
            refresh(){
                this.$emit('refresh')
            },
            close() {
                this.$emit('close')
            },
            edit () {
                this.details = false
                this.detailsEdit = true
            },
            save () {
                var ajaxData={
                  id:this.modalMsg.id.id,
                    deal_money:this.UserInfo.deal_money,
                    lever_rate:this.UserInfo.lever_rate,
                    min_follow_money:this.UserInfo.min_follow_money,
                    risk_control:this.UserInfo.risk_control,
                    per_stop_lose:this.UserInfo.per_stop_lose,
                    per_deal_limit:this.UserInfo.per_deal_limit,
                    own_max_limit:this.UserInfo.own_max_limit,
                 }
                console.log(ajaxData);
                this.$http.put('/admin/policy/put_risk_control', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData}=data;
                        if (retCode == '0') {
                            this.$Message.success({content:`保存成功`})
                            this.refresh()
                            this.close()
                        } else {
                            console.log('修改失败');
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `修改失败`, content: this.util.getHttpText(error)})
                    });

            }
        }
    }
</script>