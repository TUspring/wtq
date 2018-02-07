<style lang="css" scoped src="./css/modifyModal.css">
</style>

<template>
    <div class="box">
        <div class="mpdify_box" @click="close">
            <div class="modifyModal cl" @click.stop="keepModify">
                <!--修改弹窗-->
                <div class="midify">
                    <div class="modal-top">
                        <span>修改跟随</span>
                        <span @click="close" class="iconfont">&#xe63c;</span>
                    </div>
                    <div class="modal-content">
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


                        <div class="radio-content cl">
                            <p>请选择您的跟随方式</p>
                            <Radio-group v-model="historyFollowMsg.follow_form">
                                <ul id="choiceList">
                                    <li>
                                        <Radio label="1">
                                            <span>智能同比</span>
                                        </Radio>
                                        <i class="iconfont" @click.stop="Intelligence">&#xe622;</i>
                                    </li>
                                    <li>
                                        <Radio label="2">
                                            <span>按手数比例</span>
                                            <input type="text" v-model="historyFollowMsg.follow_lot_ratio">
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
                            <button id="modify"  @click="modify">提交修改</button>
                            <button id="cancel" @click="close">取消</button>
                        </div>
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
            picked:'js',
            netWorth:'',
            showIntelligence: false,
            showProportion: false,
            historyFollowMsg: {
                id: '',
                follow_form: '',
                follow_lot_ratio : ''
            },

        }
    },
    beforeMount() {
        this.modalDataList=this.modalData.id
        this.historyFollowMsg.id = this.modalDataList.id
        this.historyFollowMsg.follow_lot_ratio =this.modalDataList.follow_lot.follow_lot_ratio
        this.historyFollowMsg.follow_form=this.modalDataList.follow_form
        this.getNetWorth()
    },

    methods: {
        setHistoryFollowForm (data) {
            this.$emit("historyFollowForm",data)
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
                    console.log(retCode);
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

        modify () {
            if(this.historyFollowMsg.follow_form == '1'){
                this.historyFollowMsg.follow_lot_ratio = 0
            }
            var ajaxData = {
                id:this.modalData.id.id,
                follow_form:this.historyFollowMsg.follow_form,
                follow_lot_ratio:this.historyFollowMsg.follow_lot_ratio
            }

            if (this.historyFollowMsg.follow_lot_ratio!= ''&& this.historyFollowMsg.follow_lot_ratio <  1) {
                this.$Modal.error({title: `修改失败`, content: '手数比例不能小于1！'})
                return
            }
            const httpName = "修改跟随"
            this.$http.put('/policyFollowing',ajaxData)
                .then((response) => {
                    const data = response.data
                    const {retCode,sucCode} = data
                    if (retCode == '0') {
                        this.$Message.success({content: `${httpName}成功`})
                        var historyFollowMsg = {
                            id:this.historyFollowMsg.id,
                            follow_form:this.historyFollowMsg.follow_form,
                            follow_lot_ratio:this.historyFollowMsg.follow_lot_ratio
                        }
                        this.setHistoryFollowForm(historyFollowMsg)
                        this.Modify()
                    }
                }).catch((error) =>{
                    this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
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