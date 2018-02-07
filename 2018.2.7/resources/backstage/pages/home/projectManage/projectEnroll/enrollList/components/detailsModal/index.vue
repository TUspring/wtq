<style lang="css" scoped src="./css/detailsModal.css"></style>
<style>
    .date-box{
        width: 40px;
        margin-right: 6px;
    }
  .date-box .ivu-input{
      text-align: center;
  }
  .ivu-input{
      height: 28px;
      line-height: 28px;
  }
   .details_box .ivu-input-icon{
        height: 28px;
        line-height: 28px;
    }

</style>
<template>
    <div class="details_box">
        <div class="top">
            <p>{{projectDetailsData.name}} 详情</p>
            <span class="close-icon" @click="close">
                <Icon type="close-round"></Icon>
            </span>
        </div>

        <!--============详情============-->
        <div class="details_content">
            <div class="content cl">
                <!--项目基本信息-->
                <div class="strategy_information cl">
                  <div>
                      <div class="header cl">项目基本资料</div>
                      <div class="strategy_content cl">
                          <div class="left_content cl">
                              <div class="name_content cl">
                                  <div class="name_title">
                                      <span>项目名称:</span>
                                  </div>
                                  <div class="name">
                                      <span>{{projectDetailsData.name}}</span>
                                  </div>
                              </div>
                              <div class="name_content cl">
                                  <div class="name_title">
                                      <span>报名截止时间:</span>
                                  </div>
                                  <div class="name">
                                      <span>{{projectDetailsData.registration_deadline | timeStamp}}</span>
                                  </div>
                              </div>
                              <div class="name_content cl">
                                  <div class="name_title">
                                      <span>项目开始时间:</span>
                                  </div>
                                  <div class="name">
                                      <span>{{projectDetailsData.start_time | timeStamp}}</span>
                                  </div>
                              </div>
                              <div class="name_content cl">
                                  <div class="name_title">
                                      <span>项目周期:</span>
                                  </div>
                                  <div class="name">
                                      <span>{{projectDetailsData.period | projectPeriod}}</span>
                                  </div>
                              </div>
                              <div class="name_content cl">
                                  <div class="name_title">
                                      <span>预期收益率:</span>
                                  </div>
                                  <div class="name">
                                      <span>{{projectDetailsData.yield | FormatProcessing}}</span>
                                  </div>
                              </div>
                              <div class="name_content cl">
                                  <div class="name_title">
                                      <span>交易员盈利提成比例:</span>
                                  </div>
                                  <div class="name">
                                      <span>{{projectDetailsData.trader_royalty_rate | FormatProcessing}}</span>
                                  </div>
                              </div>
                              <div class="describe_content cl">
                                  <div class="describe_title">
                                      <span>项目简介:</span>
                                  </div>
                                  <div class="describe">
                                      <span>{{projectDetailsData.intro}}</span>
                                  </div>
                              </div>
                          </div>
                          <div class="right_content cl">
                              <div class="portrait_title">
                                  <span>项目头像:</span>
                              </div>
                              <div class="img_content">
                                  <img :src="projectDetailsData ? projectDetailsData.path:''" alt="">
                              </div>
                          </div>
                      </div>
                  </div>
                </div>

                <!--信号源信息-->
                <div class="signalSource_information cl">
                    <div class="header cl">信号源信息
                        <!--v-if="projectDetailsData.review_status==1"-->
                          <!--状态为发布才显示按钮-->
                        <!--<span v-if="modify"  class="btnClass" @click="modifyPsw">修改密码</span>-->
                        <!--<span v-if="!modify" class="btnClass" @click="savePsw">保存</span>-->
                        <Button type="primary" v-if="modify"  class="btnClass" @click="modifyPsw">修改密码</Button>
                        <Button type="primary" v-if="!modify" class="btnClass" @click="savePsw">保存
                         <v-reqLoading v-if="reqLoading"></v-reqLoading>
                         </Button>
                    </div>
                    <div class="signalSource_content cl">
                        <ul class="details-ul-ct">
                            <li>
                                <div class="item_title">
                                    <span>交易商名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.trade_platform ? projectDetailsData.trade_platform.platform : ''}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>观摩MT4账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.MT4_account}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>投资人密码:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.investor_password}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>服务器名称:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.standard_mt4_account ? projectDetailsData.trade_platform.server_name : ''}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准平台账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.standard_mt4_account ? projectDetailsData.standard_mt4_account.platform.platform : ''}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.standard_mt4_account ? projectDetailsData.standard_mt4_account.MT4_account:''}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="item_title">
                                    <span>标准账号服务器:</span>
                                </div>
                                <div class="item_value">
                                    <span>{{projectDetailsData.standard_mt4_account ? projectDetailsData.standard_mt4_account.platform.server_name : ''}}</span>
                                </div>
                            </li>
                            <li class="account-psw">
                                <div class="item_title">
                                    <span>标准账号密码:</span>
                                </div>
                                <div class="item_value" >
                                    <span v-if="modify">{{projectDetailsData.standard_mt4_account?projectDetailsData.standard_mt4_account.MT4_password :''}}</span>
                                 <div class="show-eye">
                                     <input v-if="!modify" ref="pswContent" style="width: 150px;" placeholder="" class="modify-box" type="password" v-model="accountPsw">
                                     <span @click="checkoutPswShow">
                                         <Icon v-if="password_eye"  type="eye" class="eye-psw"></Icon></span>
                                     <span @click="checkoutPswShow">
                                           <Icon v-if="!password_eye" type="eye-disabled" class="eye-psw"></Icon>
                                     </span>
                                 </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


                <!--风控指标-->
                <div class="riskControl_information cl">
                    <div >
                        <div class="header cl">风控指标</div>
                        <div class="risk_content cl">
                            <ul  class="details-ul-ct ">
                                <li>
                                    <div class="item_title">
                                        <span>策略交易资金:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>${{projectDetailsData.deal_money}}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>最小跟随资金:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>${{projectDetailsData.min_follow_money}}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>杠杆比例:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>1:{{projectDetailsData.lever_rate}}00</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>单笔止损:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>{{projectDetailsData.per_stop_lose}}点</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>风控净值:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>${{projectDetailsData.risk_control}}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>持单手数限制:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>{{projectDetailsData.own_max_limit}}手</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>单笔手数限制:</span>
                                    </div>
                                    <div class="item_value">
                                        <span>{{projectDetailsData.per_deal_limit}}手</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
                reqLoading:false,
                modify:true,
                password_eye:true,
                showProjectContent:true,
                editSignalSource: false,
                detailsId:'',
                projectDetailsData:'',
                endTime:'',
                startTime:'',
                period:'',
                yield:'',
                trader_royalty_rate:'',
                accountPsw:'',

                //风控修改
                control_modify:{
                    deal_money: '',                //交易资金
                    min_follow_money: '',          //最低跟随资金
                    lever_rate:'',                 //杠杆比例
                    risk_control:'',                //风控净值
                    per_stop_lose: '',             //单笔止损
                    per_deal_limit :'',             //单笔交易限制
                    own_max_limit :'',               //持仓最大限制
                },
            }

        },
        beforeMount(){
            this.detailsId=this.modalMsg.id
            this.getDetailsData()
        },
        computed:{

        },
        filters:{
            timeStamp(value){
                return new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss")
            },
            //项目周期
            projectPeriod(value){
                return value ? value +"天":'暂无数据'
            },
            FormatProcessing(value){
                return value ? value +"%":'暂无数据'
            },

        },

        props: ["modalMsg"],
        methods: {

            getDetailsData(){
                this.$http.get('/admin/regular_project/info/'+this.detailsId)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.projectDetailsData=retData

                        }else{}
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
            },

            savePsw(){
                if(this.accountPsw==''){
                    return  this.$Modal.error({title: `修改失败`, content: `标准投资人密码不能为空！`})
                }
                var ajaxData={
                    id:this.projectDetailsData.id,                   //项目ID
                    standard_investor_password:this.accountPsw,       //标准投资人密码
                }
                this.reqLoading=true
                this.$http.put('/admin/regular_project/info/signal',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `修改成功`})
                            this.modify=!this.modify
                            this.getDetailsData()
                        }else{
                            this.reqLoading=false
                            this.$Modal.error({title: `修改失败`, content: retMsg})
                        }
                    })
                    .catch((error)=>{
                        this.reqLoading=false
                        this.$Modal.error({title: `修改失败`, content: this.util.getHttpText(error)})
                    })
            },

            modifyPsw(){
             this.modify=!this.modify
            },
              //密码切换可见
            checkoutPswShow(){
                this.password_eye=!this.password_eye
                if(this.password_eye){
                    this.$refs.pswContent.setAttribute('type','password')
                }else{
                    this.$refs.pswContent.setAttribute('type','text')
                }

            },



            close(){
                this.$emit('close')
            }

        }
    }
</script>