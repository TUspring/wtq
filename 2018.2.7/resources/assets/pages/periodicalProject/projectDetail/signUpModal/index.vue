<style lang="less" scoped src="./css/index.css"></style>

<style>
    .radio-content .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder,.radio-content .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
        line-height: 50px;
        height: 50px;
    }

    .radio-content .ivu-select-large.ivu-select-single .ivu-select-selection{
        height: 50px;
    }
    .follow_progress_content .progress_gif .ivu-progress-bg{
        background-color: #FFA114 !important;
    }
</style>

<template>
    <div id="followModal">

        <Modal v-model="agreementModal" width="890" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <agreementModal v-if="agreementModal" @close="agreementModal=false" @agree="agree"></agreementModal>
            <div slot="footer"></div>
        </Modal>

        <div class="protocol_container" v-if="riskModalShow">

            <!--风险提示-->
            <div class="protocol_top">
                <span>风险提示</span>
                <span class="iconfont" @click="close">&#xe63c;</span>
            </div>
            <div class="protocol_text">
                <p>一、您正在使用汇大师的自动跟随服务，其功能主要包括:自动执行、开启和关闭交易（无须手动操作）</p>
                <p>二、您清楚知晓过往表现和风险评分并不能作为未来业绩的预测指标</p>
                <p>三、您在此授权汇大师根据持续适宜性评估限制和/或停用自动跟随服务</p>
                <p>四、您承认我们根据您提供的信息来评估您使用自动跟随服务的情况</p>
                <p>五、您承认汇大师在此过程中仅提供信息咨询、信息交流、系统支持、软件使用的服务，不对交易的结果负责</p>
                <p>六、您清楚知晓由于网络延迟、交易商服务器、云服务、通信光纤等不可抗因素，可能会导致跟随遗漏或者操作延时。我们将尽力做好防患并且及时响应处理，但我们不对造成的交易结果负责</p>
                <p>七、自动跟随服务的提供并不等同于投资建议，您必须承担使用自动跟随服务所带来的风险</p>
            </div>
            <div class="protocol_checked">
                <p>
                    <Checkbox v-model="agreementCheckbox">我已知晓自动跟随存在风险，并遵守</Checkbox>
                    <span @click="showAgreement">《汇大师(fxmaster)用户注册协议》</span>

                </p>
            </div>
            <div class="btn">
                <button :class="{cur:!agreementCheckbox}" @click="next">下一步
                    <span v-model="delay" v-if="!agreementCheckbox">( {{ delay }}秒）</span>
                </button>
            </div>

        </div>
        <!--参与设置-->
        <div class="box" v-if="followAccountModal">
            <div class="mpdify_box" @click="close">
                <div class="modifyModal cl" @click.stop="keepModify">
                    <div class="midify">
                        <div class="modal-top">
                            <span>参与设置</span>
                            <span @click="close" class="iconfont">&#xe63c;</span>
                        </div>
                        <div class="modal-content">
                            <div class="number-list cl follow_account_checkout">
                                <ul>
                                    <li class="account-number">参与账户</li>
                                    <li>参与资金</li>
                                </ul>
                            </div>
                            <div class="radio-content cl">
                                <div class="select_follow">
                                    <p>请选择您的跟随账号</p>
                                    <p>账户净值: <span>{{netWorth?"$"+netWorth.net_worth:'--'}}</span></p>
                                </div>
                                <div>
                                    <Select v-model="followingMsg.trader_account" size="large" style="width:480px"
                                            placeholder="请选择交易账号">
                                        <Option v-for="item in listModal" :value="item.id" :key="item.id" @click.native="platformSelection(item.demo_MT4,item.platform.server_name,item.MT4_account)">{{item.platform.platform }}-{{item.MT4_account}}
                                        </Option>
                                    </Select>
                                </div>
                            </div>

                            <div class="warning-content" v-if="warningContent">
                                <P>温馨提示</P>
                                <span>1.账户请保持空仓状态</span>
                            </div>
                            <div class="warning-content">
                                <P>您是否找不到想跟随的MT4账号？</P>
                                <span> 一个账户仅能参与一个项目，您可以选择<span
                                        class="MT4_count" @click="addMT4">添加关联账号</span></span>
                            </div>
                            <div class="btn-content">
                                <button class="modify" @click="nextStep">下一步</button>
                                <button class="cancel" @click="close">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--参与资金-->
        <div class="box" v-if="followModeModal">
            <div class="mpdify_box" @click="close">
                <div class="modifyModal cl" @click.stop="keepModify">
                    <!--修改弹窗-->
                    <div class="midify">
                        <div class="modal-top">
                            <span>参与设置</span>
                            <span @click="close" class="iconfont">&#xe63c;</span>
                        </div>
                        <div class="modal-content">
                            <div class="number-list cl">
                                <ul>
                                    <li>参与账户</li>
                                    <li class="net-account">参与资金</li>
                                </ul>
                            </div>
                            <div class="radio-content cl">
                                <p>请设置您的参与资金</p>
                                    <div class="choiceList">
                                        <div>
                                        <span>最小参与资金</span>
                                        <span>${{netWorthInfo.min_follow_money}}</span>
                                        </div>
                                        <div>
                                           <span>项目最小的参与资金的</span>
                                            <input type="text" v-model="multiple">
                                            <span>倍</span>
                                        </div>
                                    </div>
                            </div>

                            <div class="btn-content">
                                <button class="modify" @click="submitModify">提交参与  <v-reqLoading v-if="reqLoading"></v-reqLoading></button>
                                <button class="cancel" @click="previousStep">上一步</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 跟随检测进度-->
        <div v-if="follow_progress" class="protocol_container">
            <div class="follow_modal_top">
                <span>提交进度</span>
            </div>

            <div class="follow_progress_content" v-if="follow==1">
                <p class="follow_progress_title"><span class="iconfont number_icon">&#xe681;</span>检验客户体系</p>
                <p class="iconfont bottle_icon">&#xe929;</p>
                <!--进度条-->
                <p class="progress_gif" v-if="follow_gif==1">
                    <Progress :percent="val" status="active"></Progress>
                </p>
                <!--<p class="prompt_information">您的MT4账号没有注册在SOCIAL TRADING的客户体系内，请联系 <span>在线客服</span>，协助您更改客户归属。-->
                <!--</p>-->
            </div>

            <!--跟随进度2-->
            <div class="follow_progress_content" v-if="follow==2">
                <p class="follow_progress_title"><span class="iconfont number_icon">&#xe682;</span>检验邮箱一致性</p>
                <p class="iconfont bottle_icon">&#xe92b;</p>
                <!--进度条-->
                <p class="progress_gif" v-if="follow_gif==2">
                    <Progress :percent="val2" status="active"></Progress>
                </p>
                <!--<p class="prompt_information" >您的账号绑定邮箱，与MT4账号绑定邮箱不一致请先前往 <span>修改绑定邮箱</span></p>-->
            </div>

            <!--跟随进度3-->
            <div class="follow_progress_content" v-if="follow==3">
                <p class="follow_progress_title"><span class="iconfont number_icon">&#xe683;</span>检验交易密码</p>
                <p class="iconfont bottle_icon">&#xe928;</p>
                <!--进度条-->
                <p class="progress_gif" v-if="follow_gif==3">
                    <Progress :percent="val3" status="active"></Progress>
                </p>
                <!--<div class="psw_error_information">-->
                <!--<p>交易密码错误，请重新输入</p>-->
                <!--<div><input type="password" placeholder="请输入交易密码"></div>-->
                <!--<div><input type="password" placeholder="再次确认密码"></div>-->
                <!--<button class="follow_btn">重新关联</button>-->
                <!--</div>-->
            </div>


            <!--跟随进度4-->
            <div class="follow_progress_content" v-if="follow==4">
                <p class="follow_progress_title"><span class="iconfont number_icon">&#xe684;</span>参与完成</p>
                <p class="iconfont bottle_icon">&#xe623;</p>
                <!--<p class="follow_prompt_information">已完成参与项目</p>-->
                <p class="prompt_information">为项目正常运行，在项目期内请别对交易账户进行任何操作，直至项目期结束。</p>
                <div class="follow_success_btn">
                    <button class="follow_btn" @click="finish">我知道了</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import agreement from 'components/agreementModal/index.vue'
    import { mapState,mapActions} from 'vuex'
    export default {
        components: {
            'agreementModal': agreement
        },
        data() {
            return {
                reqLoading:false,
                net_worth:'',
                netWorth:'',
                demo:'',
                demoData:'',
                warningContent: true,
                agreementCheckbox: false,
                agreementModal: false,
                delay: 10,
                riskModalShow: true,
                followAccountModal: false,
                followModeModal: false,
//                showIntelligence: false,
                showProportion: false,
                select_model: '',
                follow_progress: false,
                follow: '',
                follow_gif: '',
                val: 0,
                val2: 0,
                val3: 0,
                followingMsg: {
                    trader_account: '',
                    follow_form: '',
                    policy_id: '',
                    follow_lot_ratio: ''
                },
                multiple:'',
                MT4List:'',
                demoMT4List:'',
                trade_platform_id:'',
                serverName:'',
                MT4Name:'',
            }
        },
        props: ["modalMsg"],
        computed: {
            listModal(){
                return this.getListModal(this.demoMT4List)
            }
        },

        beforeMount() {
            this.netWorthInfo=this.modalMsg
            this.policy_id=this.$route.params.id;
//            this.getNetWorth()
            this.getMT4_demo()
        },

        mounted(){
             //  请求MT4信息
//            this.$http.get('/MT4')
//                .then((response) => {
//                    const data = response.data;
//                    const {retCode, retData = {}}=data;
//                    if (retCode == '0') {
//                        this.MT4List=retData
//                        var MT4List=this.MT4List
//                        for (let i in MT4List){
//                           MT4List[i].demo_MT4=0
//                        }
//                    } else {
//                        console.log('请求数据失败');
//                    }
//                }).catch((error) => {
//                console.log(error);
//            });
            this.$http.get('/MT4/list_without_related')
                .then((response) => {
                    const data = response.data;
                    const {retCode, retData = {}}=data;
                    if (retCode == '0') {
                        this.MT4List=retData
                        var MT4List=this.MT4List
                        for (let i in MT4List){
                            MT4List[i].demo_MT4=0
                        }
                    } else {
                        console.log('请求数据失败');
                    }
                }).catch((error) => {
                console.log(error);
            });
            

            const count = this.delay;
            this.util.interval(() => {
                this.delay--
                if (this.delay <= 0) {
                    this.agreementCheckbox = true
                }
            }, 1000, count)
        },
        methods: {
            platformSelection(demoData,serverName,MT4Name){
                this.serverName=serverName
               this.MT4Name=MT4Name
               this.demoData=demoData
                this.getNetWorth()
            },
            getListModal(data){
                var arr=this.MT4List
                for(let i in data){
                    var demoData=data[i]
                    demoData.demo_MT4=1
                    arr.push(demoData)
                }
                return arr
            },
            //获取MT4模拟账号
            getMT4_demo(){
                //请求MT4demo账号数据
//                this.$http.get('/MT4/demo_MT4')
//                    .then((response) => {
//                        const data = response.data;
//                        const {retCode, retData = {}}=data;
//                        if (retCode == '0') {
//                            this.demoMT4List=retData;
//                        } else {
//                            console.log('请求数据失败');
//                        }
//                    }).catch((error) => {
//                    console.log(error);
//                });
                    this.$http.get('/MT4/demo_list_without_related')
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData = {}}=data;
                        if (retCode == '0') {
                            this.demoMT4List=retData;
                        } else {
                            console.log('请求数据失败');
                        }
                    }).catch((error) => {
                        console.log(error);
                });
            },

            agree(){
               this.agreementCheckbox=true
            },
            //跟随
            submitModify(){
                  if(this.multiple==''){
                     this.$Modal.warning({title: `提示`, content: '项目最小参与资金的倍数不能为空！'})
                     return
                  }
                if(isNaN(this.multiple)){
                    this.$Modal.warning({title: `提示`, content: '倍数只能为数字！'})
                    return
                }
                  if(this.multiple < 1 || this.multiple >100){
                      this.$Modal.warning({title: `提示`, content: '项目最小参与资金的倍数为 1-100 倍！'})
                      return
                  }
                var ajaxData = {
                    regular_project_id: this.policy_id,                //定期项目id
                    MT4_account_id:this.followingMsg.trader_account,    //MT4账号id
                    multiple:this.multiple,                            //倍数

                }
               this.reqLoading=true
                var httpName = '跟随'
                this.$http.post('/participation_project', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.followModeModal = false
                            this.follow_progress = true
                            this.follow = 1
                            this.follow_gif = 1
                            this.scrollTime()
                        } else {
                            this.reqLoading=false
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                        }

                    })
                    .catch((error) => {
                        this.reqLoading=false
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    });
            },
            //净值和余额
            getNetWorth(){
                var ajaxData={
                    server_name:this.serverName, //服务器名称
                    MT4_account:this.MT4Name,   //MT4账号
                }
                console.log(ajaxData);
                this.$http.get('/follow_system/getAccountInfo',{params:ajaxData})
                    .then((response) => {
                        const data = response.data
                        const {retCode,retData}=data
                        if (retCode == '0') {
                            this.netWorth=retData
                        } else {
                            console.log('请求错误');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            showAgreement(){
                this.agreementModal = true
            },

            scrollTime(){
                let timer = setInterval(() => {
                    let step = Math.floor(Math.random() * 10 + 1);
                    this.val = this.val + step;
                    if (this.val >= 100) {
                        this.val = 100;
                        clearInterval(timer);
                        this.follow = 2;
                        this.follow_gif = 2;
                        this.scrollTime2()
                        return
                    }
                }, 300)
            },
            scrollTime2(){
                let timer = setInterval(() => {
                    let step = Math.floor(Math.random() * 10 + 1);
                    this.val2 = this.val2 + step;
                    if (this.val2 >= 100) {
                        this.val2 = 100;
                        clearInterval(timer);
                        this.follow = 3;
                        this.follow_gif = 3;
                        this.scrollTime3()
                        return
                    }
                }, 350)
            },
            scrollTime3(){
                var httpName = '参与'
                let timer = setInterval(() => {
                    let step = Math.floor(Math.random() * 10 + 1);
                    this.val3 = this.val3 + step;
                    if (this.val3 >= 100) {
                        this.val3 = 100;
                        clearInterval(timer);
                        this.follow = 4;
                        this.$Message.success({content: `${httpName}成功`})
                        return
                    }
                }, 500)
            },
            setFollowingForm (data) {
                this.$emit("followingForm", data)
            },

            finish(){
                this.$emit('close')
            },
            close(){
                this.$emit('close')
            },
            nextStep () {
                if(this.followingMsg.trader_account==''){
                    this.$Message.warning({content: `请选择交易账号`})
                    return
                }
                this.followAccountModal = false;
                this.followModeModal = true;
            },
            previousStep(){
                this.followAccountModal = true
                this.followModeModal = false;

            },
            next(){
                if (this.agreementCheckbox == false) {
                    return
                }
                this.riskModalShow = false
                this.followAccountModal = true
            },
            keepModify(){},
            addMT4(){
                this.$router.push({
                    path:'/home/mySetting/MT4_Account'
                })
            },
       }
    }
</script>