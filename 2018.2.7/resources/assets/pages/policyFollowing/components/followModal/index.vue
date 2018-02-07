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
        <!--跟单账户-->
        <div class="box" v-if="followAccountModal">
            <div class="mpdify_box" @click="close">
                <div class="modifyModal cl" @click.stop="keepModify">
                    <div class="midify">
                        <div class="modal-top">
                            <span>跟随账户</span>
                            <span @click="close" class="iconfont">&#xe63c;</span>
                        </div>
                        <div class="modal-content">
                            <div class="number-list cl follow_account_checkout">
                                <ul>
                                    <li class="account-number">跟随账户</li>
                                    <li>跟随方式</li>
                                </ul>
                            </div>
                            <div class="radio-content cl">
                                <div class="select_follow">
                                    <p>请选择您的跟随账号</p>
                                    <p>账户净值: <span>{{netWorthInfo.net_worth ? '$'+netWorthInfo.net_worth :'--'}}</span></p>
                                </div>
                                <div>
                                    <Select v-model="followingMsg.trader_account" size="large" style="width:480px"
                                            placeholder="请选择交易账号">
                                        <Option v-for="item in listModal" :value="item.id" :key="item.id" @click.native="platformSelection(item.demo_MT4)">{{item.platform.platform }}-{{item.MT4_account}}
                                        </Option>
                                    </Select>
                                </div>
                            </div>

                            <div class="warning-content" v-if="warningContent">
                                <P>风险提示</P>
                                <span>净值低于最低跟随资金要求，存在无法下单的情况，请注意！</span>
                            </div>
                            <div class="warning-content">
                                <P>您是否找不到想跟随的MT4账号？</P>
                                <span>一个MT4账号只能跟随一个策略，已经出现的策略将不会出现。您可以先 <span class="MT4_count" @click="pauseFollow">暂停账号跟随</span>或者 <span
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

        <!--跟随方式-->
        <div class="box" v-if="followModeModal">
            <div class="mpdify_box" @click="close">
                <div class="modifyModal cl" @click.stop="keepModify">
                    <!--修改弹窗-->
                    <div class="midify">
                        <div class="modal-top">
                            <span>跟随设置</span>
                            <span @click="close" class="iconfont">&#xe63c;</span>
                        </div>
                        <div class="modal-content">
                            <div class="number-list cl">
                                <ul>
                                    <li>跟随账户</li>
                                    <li class="net-account">跟随方式</li>
                                </ul>
                            </div>
                            <div class="radio-content cl">
                                <p>请选择您的跟随方式</p>
                                <Radio-group v-model="followingMsg.follow_form">
                                    <ul class="choiceList">
                                        <li>
                                            <Radio label="1" value="1">
                                                <span>智能同比</span>
                                            </Radio>
                                            <i class="iconfont" @click.stop="Intelligence">&#xe622;</i>
                                        </li>
                                        <li>
                                            <Radio label="2" value="2">
                                                <span>按手数比例</span>
                                                <input type="text" v-model="followingMsg.follow_lot_ratio">
                                                <span>%</span>
                                            </Radio>
                                            <i class="iconfont" @click.stop="Proportion">&#xe622;</i>
                                        </li>
                                    </ul>
                                </Radio-group>
                            </div>

                            <div class="warning-content">
                                <P>风险提示</P>
                                <span>净值低于最低跟随资金要求，存在无法下单的情况，请注意！</span>
                            </div>
                            <div class="btn-content">
                                <button class="modify" @click="submitModify">提交跟随 <v-reqLoading v-if="reqLoading"></v-reqLoading></button>
                                <button class="cancel" @click="previousStep">上一步</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--智能同比详情-->
                <div class="intelligence_details-box" v-show="showIntelligence">
                    <div class="details-box" @click.stop="keepIntelligence">
                        <div class="triangle"></div>
                        <div class="details-content">
                            <p>
                                每次下单，都将自动按照双方净值计算下单手数比例。比如，策略方1万美金下单0.1手，
                                下单时跟随方净值5千美金，则自动计算得出下单0.05手。
                            </p>
                            <div>
                                <div ref="chart1" :style="{width: '380px', height: '240px'}"></div>
                            </div>
                        </div>

                    </div>
                </div>

                <!--手数比例详情-->
                <div class="proportion_details-box" v-show="showProportion">
                    <div class="details-box" @click.stop="keepProportion">
                        <div class="triangle"></div>
                        <div class="details-content">
                            <p>
                                始终按照设置的手数比例进行下单，比如设置按手数比例50%。
                                则不管什么时候，跟随访下单手数都是策略方的50%。
                            </p>
                            <div>
                                <div ref="chart2" :style="{width: '380px', height: '240px'}"></div>
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
                <p class="follow_progress_title"><span class="iconfont number_icon">&#xe684;</span>跟随设置完成</p>
                <p class="iconfont bottle_icon">&#xe623;</p>
                <p class="follow_prompt_information">您的MT4账号已成功跟随交易策略</p>
                <p class="prompt_information">稍后，交易员老师开单时，您即可以在MT4手机app中实时查看到记录。</p>
                <div class="follow_success_btn">
                    <button class="follow_btn" @click="finish">我知道了</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/candlestick');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
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
                demo:'',
                demoData:'',
                warningContent: true,
                agreementCheckbox: false,
                agreementModal: false,
                delay: 10,
                riskModalShow: true,
                followAccountModal: false,
                followModeModal: false,
                showIntelligence: false,
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
                MT4List:'',
                demoMT4List:'',
                trade_platform_id:'',
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
            this.getMT4_demo()
        },

        mounted(){
             //  请求MT4信息
            this.$http.get('/MT4')
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
//                console.log(error);
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
            platformSelection(demoData){
             this.demoData=demoData
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
//                        console.log(error);
                });
            },

            agree(){
               this.agreementCheckbox=true
            },
            //跟随
            submitModify(){
                  if(this.followingMsg.follow_form==2){
                      if(this.followingMsg.follow_lot_ratio<1||this.followingMsg.follow_lot_ratio>10000){
                          this.$Modal.warning({title: `提示`, content: '手数比例为1-10000'})
                          return
                      }
                  }
                var ajaxData = {
                    demo_MT4:this.demoData,
                    MT4_account_id:this.followingMsg.trader_account,
                    follow_form: this.followingMsg.follow_form,
                    policy_id: this.policy_id,
                    follow_lot_ratio: this.followingMsg.follow_lot_ratio,
                }
                this.reqLoading=true
                var httpName = '跟随'
                this.$http.post('/policyFollowing', ajaxData)
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

            Intelligence() {
                this.drawLine();
                this.showIntelligence = !this.showIntelligence;
                if (this.showProportion) {
                    this.showProportion = false;
                }

            },
            Proportion() {
                this.drawLine();
                this.showProportion = !this.showProportion;
                if (this.showIntelligence) {
                    this.showIntelligence = false;
                }
            },
            finish(){
                this.$emit('close')
                this.$emit('buttonShow')
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

            pauseFollow(){
                    this.$router.push({
                        path: '/home/myFollow/following'
                    })
            },
            addMT4(){
                this.$router.push({
                    path:'/home/mySetting/MT4_Account'
                })
            },
            keepModify() {

            },
            keepIntelligence() {

            },
            keepProportion() {

            },
            drawLine(){

                // 基于准备好的dom，初始化echarts实例
                let Chart1 = echarts.init(this.$refs.chart1)
                let Chart2 = echarts.init(this.$refs.chart2)

                // 绘制图表
                var option = {
                    title : {
                        //左上角标题
                        text: ''
                    },
                    //工具提示
                    tooltip : {
                        //触发‘’轴
                        trigger: 'axis',
                        //程序格式化
                        formatter: function (params) {
                            var res = params[0].seriesName + ' ' + params[0].name;
                            res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
                            res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
                            return res;
                        }
                    },
                    legend: {
                        //顶部标题
                        data:['']
                    },
                    dataZoom : {
                        show : false,
                        realtime: true,
                        start :1,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            show:false,
                            axisTick: {onGap:false},
                            splitLine: {show:false},
                            data : [
                                "","","","","","","","","","","","",""
                            ]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitNumber: 2,
                            scale: true,
                            show:false,
                            splitLine:{
                                show:false
                            }
                        }
                    ],
                    //hover展示数据
                    series : [
                        {
                            name:'交易指数',
                            type:'candlestick',
                            data:[ // 开盘，收盘，最低，最高
                                [1,2,1,2],
                                [2,4,3,5],
                                [2,9,3,2],
                                [3,2,7,2],
                                [5,2,1,8],
                                [4,2,5,3],
                                [6,3,2,8],
                                [6,1,2,6],
                                [1,2,1,2],
                                [1,4,9,2],
                                [1,2,5,10]
                            ],
                        }
                    ]
                };
                Chart1.setOption(option);
                Chart2.setOption(option);
            }
      }
    }
</script>