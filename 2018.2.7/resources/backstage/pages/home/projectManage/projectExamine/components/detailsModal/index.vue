<style lang="css" scoped src="./css/detailsModal.css"></style>
<style>
    .date-box{
        width: 50px;
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

        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :message="message" @refresh="refresh">
            </component>
            <div slot="footer"></div>
        </Modal>

        <!--============详情============-->
        <div class="details_content">
            <div class="content cl">
                <!--项目基本信息-->
                <div class="strategy_information cl">
                  <div v-if="showProjectContent">
                      <div class="header cl">项目基本资料
                          <Button type="primary" class="btnClass" @click="editProjectContent">编辑</Button>
                      </div>
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
                    <div v-if="!showProjectContent">
                        <div class="header cl">项目基本资料
                            <Button type="primary" class="btnClass" @click="saveProjectContent">保存</Button>
                        </div>
                        <div class="strategy_content cl">
                            <div class="left_content cl">
                                <div class="name_content edit-ct">
                                    <div class="name_title">
                                        <span>项目名称:</span>
                                    </div>
                                    <div class="name">
                                        <span>{{projectDetailsData.name}}</span>
                                    </div>
                                </div>
                                <div class="name_content edit-ct">
                                    <div class="name_title">
                                        <span>报名截止时间:</span>
                                    </div>
                                    <div class="name">
                                        <!--<DatePicker type="datetime"  placeholder="请选择时间" style="width: 150px" v-model="endTime" @on-change="endTime=$event"></DatePicker>-->
                                        <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd 00:00:00" style="width: 200px" v-model="endTime" @on-change="endTime=$event"></DatePicker>
                                    </div>
                                </div>
                                <div class="name_content edit-ct">
                                    <div class="name_title">
                                        <span>项目开始时间:</span>
                                    </div>
                                    <div class="name">
                                        <!--<DatePicker type="datetime" placeholder="请选择时间" style="width: 150px" v-model="startTime" @on-change="startTime=$event"></DatePicker>-->
                                        <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd 00:00:00" style="width: 200px" v-model="startTime" @on-change="startTime=$event"></DatePicker>
                                    </div>
                                </div>
                                <div class="name_content edit-ct">
                                    <div class="name_title">
                                        <span>项目周期:</span>
                                    </div>
                                    <div class="name">
                                        <Input placeholder="" class="date-box" v-model="period"></Input>天
                                    </div>
                                </div>
                                <div class="name_content edit-ct">
                                    <div class="name_title">
                                        <span>预期收益率:</span>
                                    </div>
                                    <div class="name">
                                        <Input placeholder="" class="date-box" v-model="yield"></Input>%
                                    </div>
                                </div>
                                <div class="name_content edit-ct">
                                    <div class="name_title" style="width: 120px;">
                                        <span>交易员盈利提成比例:</span>
                                    </div>
                                    <div class="name">
                                        <Input placeholder="" class="date-box" v-model="trader_royalty_rate"></Input>%
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
                        <Button type="primary" v-if="modify &&projectDetailsData.review_status==6"  class="btnClass" @click="modifyPsw">修改密码</Button>
                        <Button type="primary" v-if="!modify" class="btnClass" @click="savePsw">保存</Button>
                        <Button type="primary" v-if="modify &&projectDetailsData.review_status==6" class="btnClass" @click="showModal('modifyAccount',{id:projectDetailsData.id,name:projectDetailsData.name})">修改标准账号</Button>

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
                                    <span>{{projectDetailsData.trade_platform ? projectDetailsData.trade_platform.server_name : ''}}</span>
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
                    <div v-if="show_control_modify">
                        <div class="header cl">风控指标
                            <Button type="primary" class="btnClass" @click="modifyControl">编辑</Button>
                        </div>
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
                    <div v-if="!show_control_modify">
                        <div class="header cl">风控指标
                            <Button type="primary" class="btnClass" @click="saveModifyControl">保存</Button>
                        </div>
                        <div class="risk_content cl">
                            <ul  class="details-ul-ct control-modify">
                                <li>
                                    <div class="item_title">
                                        <span>策略交易资金:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon">$</span>
                                        <Input placeholder="" class="date-box" v-model="control_modify.deal_money"></Input>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>最小跟随资金:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon">$</span>
                                        <Input placeholder="" class="date-box" v-model="control_modify.min_follow_money"></Input>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>杠杆比例:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon"></span>
                                       <!--<Input placeholder="" class="date-box" v-model="control_modify.lever_rate"></Input>-->
                                        <Select  v-model="control_modify.lever_rate" style="width:100px" :transfer="true">
                                            <Option  :value="1" :key="1">1:100</Option>
                                            <Option  :value="2" :key="2">1:200</Option>
                                            <Option  :value="3" :key="3">1:300</Option>
                                            <Option  :value="4" :key="4">1:400</Option>
                                        </Select>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>单笔止损:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon"></span>
                                        <Input placeholder="" class="date-box" v-model="control_modify.per_stop_lose"></Input>点
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>风控净值:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon">$</span>
                                        <Input placeholder="" class="date-box" v-model="control_modify.risk_control"></Input>
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>持单手数限制:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon"></span>
                                        <Input placeholder="" class="date-box" v-model="control_modify.own_max_limit"></Input>手
                                    </div>
                                </li>
                                <li>
                                    <div class="item_title">
                                        <span>单笔手数限制:</span>
                                    </div>
                                    <div class="item_value">
                                        <span class="left-icon"></span>
                                        <Input placeholder="" class="date-box" v-model="control_modify.per_deal_limit"></Input>手
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
    import modifyModal from './modifyModal/index.vue'
    export default {
        components:{
            modifyModal,
        },
        data () {
            return {
                iviewModal: false,
                modify:true,
                password_eye:true,
                show_control_modify:true,
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
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                   modifyAccount: {
                        name: 'modifyModal',
                        width: ''
                    },
                },
                message: {},  //传给子组件的数据
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
        props:['modalMsg'],
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

        methods: {
            getDetailsData(){
                this.$http.get('/admin/regular_project/info/'+this.detailsId)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.projectDetailsData=retData
                            this.yield=this.projectDetailsData.yield
                            this.period=this.projectDetailsData.period
                            this.trader_royalty_rate=this.projectDetailsData.trader_royalty_rate
                            this.control_modify.deal_money=this.projectDetailsData.deal_money
                            this.control_modify.min_follow_money=this.projectDetailsData.min_follow_money
                            this.control_modify.lever_rate=this.projectDetailsData.lever_rate
                            this.control_modify.risk_control=this.projectDetailsData.risk_control
                            this.control_modify.per_stop_lose=this.projectDetailsData.per_stop_lose
                            this.control_modify.per_deal_limit=this.projectDetailsData.per_deal_limit
                            this.control_modify.own_max_limit=this.projectDetailsData.own_max_limit
                            this.endTime=new Date(this.projectDetailsData.registration_deadline * 1000).format("yyyy-MM-dd hh:mm:ss")
                            this.startTime=new Date(this.projectDetailsData.start_time * 1000).format("yyyy-MM-dd hh:mm:ss")
                        }else{}
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
            },
            changeTimeType(value){
                return Date.parse(new Date(value))/1000;
            },

            saveProjectContent(){
                if(this.changeTimeType(this.endTime)>this.changeTimeType(this.startTime)){
                    this.$Modal.error({title: `提示`, content: `报名截止时间不能大于项目开始时间！`})
                    return
                }
                var ajaxData={
                    id:this.projectDetailsData.id,                             //项目ID
                    registration_deadline:this.changeTimeType(this.endTime),  //报名截止时间
                    start_time:this.changeTimeType(this.startTime),          //项目开始时间
                    period:this.period,                                      //项目周期
                    yield:this.yield,                                        //预期收益率
                    trader_royalty_rate:this.trader_royalty_rate,            //交易员盈利提成比例
                }
                this.$http.put('/admin/regular_project/info/base',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: `修改成功`})
                            this.showProjectContent=!this.showProjectContent
                            this.getDetailsData()
                        }else{
                            this.$Modal.error({title: `修改失败`, content: retMsg})
                        }
                    })
                    .catch((error)=>{
              this.$Modal.error({title: `修改失败`, content: this.util.getHttpText(error)})
                    })
            },
            savePsw(){
                if(this.accountPsw==''){
                    return   this.$Modal.error({title: `修改失败`, content: `标准投资人密码不能为空！`})
                }
                var ajaxData={
                    id:this.projectDetailsData.id,                   //项目ID
                    standard_investor_password:this.accountPsw,       //标准投资人密码
                }
                console.log(ajaxData);
                this.$http.put('/admin/regular_project/info/signal',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData, retMsg}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: `修改成功`})
                            this.modify=!this.modify
                            this.getDetailsData()
                        }else{
                            this.$Modal.error({title: `修改失败`, content: retMsg})
                        }
                    })
                    .catch((error)=>{
                        this.$Modal.error({title: `修改失败`, content: this.util.getHttpText(error)})
                    })
            },


            //切换项目编辑内容
            editProjectContent(){
                this.showProjectContent=!this.showProjectContent
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
            //分控内容修改
            modifyControl(){
                  this.show_control_modify=!this.show_control_modify
            },
            //保存修改的分控内容
            saveModifyControl(){
                var ajaData={
                    id:this.projectDetailsData.id,                             //项目ID
                    deal_money:this.control_modify.deal_money,                 //交易资金
                    min_follow_money:this.control_modify.min_follow_money,     //最低跟随资金
                    lever_rate:this.control_modify.lever_rate,                 //杠杆比例
                   risk_control:this.control_modify.risk_control,              //风控净值
                    per_stop_lose:this.control_modify.per_stop_lose,           //单笔止损
                    per_deal_limit:this.control_modify.per_deal_limit,         //单笔交易限制
                    own_max_limit:this.control_modify.own_max_limit,           //持仓最大限制
                }
                this.$http.put('/admin/regular_project/info/target',ajaData)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData, retMsg}=data;
                            if (retCode == '0') {
                                this.$Message.success({content: `保存成功`})
                                this.show_control_modify=!this.show_control_modify
                                this.getDetailsData()

                            }else{
                          this.$Modal.error({title: `保存失败`, content: retMsg})
                            }
                        })
                        .catch((error)=>{
                            this.$Modal.error({title: `保存失败`, content: this.util.getHttpText(error)})
                        })
              },
            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.message,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },
            refresh(){
                this.getDetailsData()
            },

            close(){
                this.$emit('close')
            }

        }
    }
</script>