<style lang="css" scoped src="./css/changeModal.css">
</style>
<style>
    #progress_content {
        text-align:center;
    }
    #progress_content p {
        color:#FFA113;
        font-size:16px;
        margin:40px 0;
    }
    #progress_content .ivu-progress-bg {
        background-color:#FFA113
    }
</style>
<template>
    <div class="box">
        <div class="mpdify_box" @click="close">
            <div class="modifyModal cl" @click.stop="keepModify">
                <!--修改弹窗-->
                <div class="midify">
                    <div class="modal-top">
                        <span>修改跟随</span>
                        <span @click="close" class="iconfont" v-show="closeBtn">&#xe63c;</span>
                    </div>
                    <div class="modal-content" v-show="showModifyModal">
                        <div class="number-list cl">
                            <ul>
                                <li class="account-number">
                                    当前MT4账号：
                                    <span>{{modalDataList.mt4account.MT4_account}}</span>
                                </li>
                                <li class="net-account">
                                    账户净值：
                                    <span>${{netWorth.net_worth}}</span>
                                </li>
                            </ul>
                        </div>


                        <!--选择跟随策略-->
                        <div class="select_content">
                        <span>请选择跟随策略</span>
                        <Select v-model="policyName" :transfer="true" style="width: 150px">
                        <Option v-for="value in policyNameList" :value="value" :key="value" @click.native="choosePolicyName(value)">{{value}}</Option>
                        </Select>
                        </div>

                        <div class="warning-content">
                            <P>风险提示</P>
                            <span>更换策略过程中可能会出现当前持仓订单漏平的问题，请在空仓状态下更换策略！</span>
                        </div>
                        <div class="btn-content">
                            <button id="modify"  @click="change">提交更换</button>
                            <button id="cancel" @click="close">取消</button>
                        </div>
                    </div>

                    <!--提交更改进度-->
                    <div class="progress_content" id="progress_content"  v-show="show_changeProgress">
                        <p>正在更换策略，请耐心等候...</p>
                        <Progress :percent="val" status="active" ></Progress>
                    </div>

                </div>
            </div>

            <!--智能同比详情-->
            <div class="intelligence_details-box" v-show="showIntelligence" >
                <div class="details-box" @click.stop="keepIntelligence">
                    <div class="triangle"></div>
                    <div class="details-content">
                        <p>
                            每次下单，都将自动按照双方净值计算下单手数比例。比如，策略方1万美金下单0.1手，
                            下单时跟随方净值5千美金，则自动计算得出下单0.05手。
                        </p>
                    </div>
                </div>
            </div>

            <!--手数比例详情-->
            <div class="proportion_details-box" v-show="showProportion">
                <div class="details-box"  @click.stop="keepProportion">
                    <div class="triangle"></div>
                    <div class="details-content">
                        <p>
                            始终按照设置的手数比例进行下单，比如设置按手数比例50%。
                            则不管什么时候，跟随访下单手数都是策略方的50%。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    export default{
        data () {
            return {
                closeBtn:true,
                showModifyModal:true,
                show_changeProgress:false,
                val:0,
                netWorth:'',
                showIntelligence: false,
                showProportion: false,
                followingMsg: {
                    id: '',
                    policy_id: ''
                },

                policyName:'',
                policyList:'',
                policyNameList:''
            }
        },
        beforeMount() {
            this.modalDataList=this.modalData.id
            this.followingMsg.id = this.modalData.id.id
            this.policyName = this.modalData.id.name
            this.getNetWorth()
            this.getPolicyList()
        },
        methods: {

            //获取策略列表
            getPolicyList() {
                var ajaxData = {
                    review_status:1
                }
                this.$http.get('/policy/no_page_list',{params:ajaxData})
                    .then((response) => {
                        const data = response.data
                        const {retCode,retData={}} = data
                        if(retCode == '0'){
                            this.policyList = retData

                            //提取策略名字列表
                            var list = this.policyList
                            var policyNameList = []
                            for( let i in list ){
                                var list_item = list[i].name
                                policyNameList.push(list_item)
                            }
                            this.policyNameList = policyNameList

                            console.log(this.policyNameList)
                        }
                    })

            },

            //选择策略名称获取对应ID
            choosePolicyName(value) {
                console.log(value);
                var id = ''
                var arr = this.policyList
                for (let i in arr) {
                    var item = arr[i]
                    if(item["name"]===value){
                        id = item.id
                        console.log(id);
                    }
                }
                this.followingMsg.policy_id = id
            },

            //净值和余额
            getNetWorth(){
                var ajaxData={
                    server_name:this.modalDataList.mt4account.platform.server_name,
                    MT4_account:this.modalDataList.mt4account.MT4_account,
                }
                this.$http.get('/follow_system/getAccountInfo',{params:ajaxData})
                    .then((response) => {
                        const data = response.data
                        const {retCode,retData}=data
                        if (retCode == '0') {
                            this.netWorth=retData
                        }
                    })
                    .catch((error) => {

                    });
            },

            setFollowingForm (data) {
                this.$emit("followingForm",data)
            },

            change () {
                var ajaxData = {
                    id:this.followingMsg.id,
                    policy_id:this.followingMsg.policy_id
                }
                const httpName = "更改策略"
                this.$http.put('policyFollowing/put_follow_policy',ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode,sucCode} = data
                        if (retCode == '0') {
                            this.showModifyModal = false
                            this.closeBtn = false
                            this.scrollTime()

                            var followingMsg = {
                                id:this.followingMsg.id
                            }
                            this.setFollowingForm(followingMsg)
                        }
                    }).catch((error) =>{
                    this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },

            //加载进度
            scrollTime(){
                const httpName = "更改策略"
                this.show_changeProgress = true
                let step = Math.floor(Math.random() * 10 + 1);
                let timer = setInterval(() => {
                    this.val = this.val + step;
                    if (this.val >= 100) {
                        this.val = 100;
                        clearInterval(timer);
                        this.$Message.success({content: `${httpName}成功`})
                        this.show_changeProgress = false
                        this.Modify()
                        return
                    }
                }, 200)
            },


            Modify(){
                this.close()
                this.$emit("Modify")
            },
            close(){
                this.$emit('close')
            },
            Intelligence() {
                this.showIntelligence = !this.showIntelligence;
                if(this.showProportion) {
                    this.showProportion = false;
                }

            },
            Proportion() {
                this.showProportion = !this.showProportion;
                if(this.showIntelligence) {
                    this.showIntelligence = false;
                }
            },
            keepModify() {

            },
            keepIntelligence() {

            },
            keepProportion() {

            }

        },
        props: ['id','modalData']
    }
</script>