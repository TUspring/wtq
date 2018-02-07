<style lang="css" scoped src="./css/detailsModal.css"></style>

<template>
    <div class="details_box">

        <div class="top">
            <p>{{detailsUserName}} 详情</p>
            <span class="close-icon" @click="close">
                <Icon type="close-round"></Icon>
            </span>
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
                    <div class="header cl">信号源信息
                        <!--<span  class="btnClass" @click="modifySignalSource">修改</span>-->
                        <Button v-show="showSignalSource" type="primary" class="btnClass" @click="modifySignalSource">修改</Button>
                        <Button v-show="editSignalSource" type="primary" class="btnClass" @click="saveSignalSource">保存 <v-reqLoading v-if="reqLoading"></v-reqLoading></Button>
                    </div>
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
                                <div class="item_value" v-show="showSignalSource">
                                    <span>{{detailsForm.standard_mt4_account.MT4_password}}</span>
                                </div>
                                <div class="item_value" v-show="editSignalSource">
                                    <input type="text" v-model="detailsForm.standard_mt4_account.MT4_password">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


                <!--风控指标-->
                <div class="riskControl_information cl" v-show="showRiskControl">
                    <div class="header cl">风控指标
                        <!--<span  class="btnClass" @click="modifyRiskControl">编辑</span>-->
                        <Button type="primary" class="btnClass" @click="modifyRiskControl">编辑</Button>
                    </div>
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

                <!--编辑风控指标-->
                <div class="riskControl_information cl" v-show="editRiskControl">
                    <div class="header cl">风控指标
                        <!--<span class="btnClass" @click="saveRiskControl">保存</span>-->
                        <Button type="primary" class="btnClass" @click="saveRiskControl">保存<v-reqLoading v-if="reqLoading"></v-reqLoading></Button>
                    </div>
                    <div class="risk_content cl">
                        <ul id="risk_list" class="cl">
                            <li>
                                <div class="item_title">
                                    <span>策略交易资金:</span>
                                </div>
                                <div class="item_value">
                                    $ <input type="text" v-model="detailsForm.deal_money">
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>最小跟随资金:</span>
                                </div>
                                <div class="item_value">
                                    $ <input type="text" v-model="detailsForm.min_follow_money">
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>杠杆比例:</span>
                                </div>
                                <div class="item_value">
                                    <Select v-model="model" style="width:150px;" :transfer="true">
                                        <Option  v-for="item in choiceList" :value="item.value" :key="item.value"  @click.native="chooseLeverRate(item.value)">1:{{item.value}}00</Option>
                                    </Select>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔止损:</span>
                                </div>
                                <div class="item_value">
                                    <input type="text" v-model="detailsForm.per_stop_lose">（手）
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>风控净值:</span>
                                </div>
                                <div class="item_value">
                                    $ <input type="text" v-model="detailsForm.risk_control">
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>持单手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <input type="text" v-model="detailsForm.own_max_limit">（手）
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>单笔手数限制:</span>
                                </div>
                                <div class="item_value">
                                    <input type="text" v-model="detailsForm.per_deal_limit">（手）
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                showSignalSource:true,
                editSignalSource:false,
                showRiskControl:true,
                editRiskControl:false,

                reqLoading:false,
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

                model: '',   //显示后台返回的杠杆比例
                //杠杆比例下拉
                choiceList: [
                    {value: '1'},
                    {value: '2'},
                    {value: '3'},
                    {value: '4'}
                ]
            }
        },
        beforeMount(){
            this.UserId=this.modalMsg.id
            this.getPublishDetailsInfo()
        },
        computed:{
            detailsUserName(){
                return this.detailsName=this.modalMsg.id.name
            }
        },
        props: ["modalMsg"],
        methods: {
            //请求策略详情列表数据
            getPublishDetailsInfo(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/admin/policy/'+this.UserId.id)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.detailsForm = retData
                                this.detailsForm.lever_rate = retData.lever_rate
                                //转成字符串
                                console.log(222)
                                this.model=this.detailsForm.lever_rate.toString()
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })

            },

            //选中比例值
            chooseLeverRate (value) {
                this.detailsForm.lever_rate = value
            },

            //修改成功刷新页面
            Refresh() {
                this.$emit('Refresh')
            },

            modifySignalSource(){
                this.showSignalSource = false
                this.editSignalSource = true
            },
            modifyRiskControl(){
                this.showRiskControl = false
                this.editRiskControl = true
            },

            //修改标准账号密码
            saveSignalSource(){
                var ajaxData = {
                    id: this.modalMsg.id.id,
                    standard_server_name: this.detailsForm.standard_mt4_account.platform.server_name,
                    standard_MT4_account: this.detailsForm.standard_mt4_account.MT4_account,
                    standard_investor_password: this.detailsForm.standard_mt4_account.MT4_password
                }
                    this.reqLoading=true
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retMsg} = data
                        if(retCode == '0'){
                            this.reqLoading=false
                            this.editSignalSource = false
                            this.showSignalSource = true
                            this.$Message.success({content:`保存成功`})
                            this.getPublishDetailsInfo()
                            this.Refresh()
                        }else {
                            this.reqLoading=false
                            this.$Modal.error({title: `保存成功`, content: retMsg})
                        }
                    }) .catch((error) =>{
                    this.reqLoading=false
                    this.$Modal.error({title:`保存失败`,content:this.util.getHttpText(error)})
                });
            },

            //编辑风控指标 保存
            saveRiskControl () {
                var ajaxData={
                    id:this.modalMsg.id.id,
                    deal_money:this.detailsForm.deal_money,
                    lever_rate:this.detailsForm.lever_rate,
                    min_follow_money:this.detailsForm.min_follow_money,
                    risk_control:this.detailsForm.risk_control,
                    per_stop_lose:this.detailsForm.per_stop_lose,
                    per_deal_limit:this.detailsForm.per_deal_limit,
                    own_max_limit:this.detailsForm.own_max_limit
                }
                this.reqLoading=true
                this.$http.put('/admin/policy/put_risk_control', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retMsg}=data;
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.editRiskControl = false
                            this.showRiskControl = true
                            this.$Message.success({content:`保存成功`})
                            this.getPublishDetailsInfo()
                            this.Refresh()
                        }else {
                            this.reqLoading=false
                            this.$Modal.error({title: `保存成功`, content: retMsg})
                        }
                    }) .catch((error) =>{
                       this.reqLoading=false
                        this.$Modal.error({title:`保存失败`,content:this.util.getHttpText(error)})
                    });

            },
            close() {
                this.$emit('close')
            },
            edit () {
                this.details = false
                this.detailsEdit = true
            }
        }
    }
</script>