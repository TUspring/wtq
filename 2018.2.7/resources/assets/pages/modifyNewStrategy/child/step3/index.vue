<style lang="css" scoped src="./css/index.css"></style>

<template>
    <div class="modify_strategy_step3 cl"  @click="hideProportion">
        <div class="content_top">请设置您的风控指标</div>
        <form>
            <div class="content_box">
                <ul>
                    <li>
                        <div class="deal_money_content">
                            <small>策略交易资金</small>
                            <input type="text" placeholder="请输入策略交易金" name="策略交易金"  v-model="form.deal_money"  v-validate data-vv-rules="required|decimal:2|between:0.01,10000000">
                            <b>该策略进行交易的资金金额（美元）</b>
                        </div>
                        <p v-if="errors.has('策略交易金')">{{ errors.first('策略交易金') }}</p>
                    </li>
                    <li>
                        <div class="lever_rate_content">
                            <small>杠杠比例</small>
                            <div class="lever_rate_value" @click.stop="showProportion" >
                                <b v-model="form.lever_rate">{{'1:'+form.lever_rate+'00'}}</b>
                                <i class="iconfont">&#xe628;</i>
                            </div>

                            <div id="lever_rate_choiceList" v-show="proportionList">
                                <ul>
                                    <li v-for="(value,key) in proportionLists" @click="choiceProportion(value.proportion)">1:{{value.proportion}}00</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="min_follow_money_content">
                            <small>最小跟随资金</small>
                            <input type="text" placeholder="请输入最小跟随资金" name="最小跟随资金"  v-model="form.min_follow_money"   v-validate data-vv-rules="required|decimal:2|max_value:10000000">
                            <b>建议跟随的最低资金金额要求（美元）</b>
                        </div>
                        <p v-if="errors.has('最小跟随资金')">{{ errors.first('最小跟随资金') }}</p>
                    </li>
                    <li>
                        <div class="risk_control_content">
                            <small>风控净值</small>
                            <input type="text" placeholder="请输入风控净值" name="风控净值"  v-model="form.risk_control"   v-validate data-vv-rules="required|decimal:2|max_value:10000000">
                            <b>低于该净值时，跟随账号将平仓止损（美元）</b>
                        </div>
                        <p v-if="errors.has('风控净值')">{{ errors.first('风控净值') }}</p>
                    </li>
                    <li>
                        <div class="per_stop_lose_content">
                            <small>单笔止损</small>
                            <input type="text" placeholder="请输入单笔止损" name="单笔止损" v-model="form.per_stop_lose"   v-validate data-vv-rules="required|decimal:2|max_value:9999.99">
                            <b>单笔交易设置的止损位（点）</b>
                        </div>
                        <p v-if="errors.has('单笔止损')">{{ errors.first('单笔止损') }}</p>
                    </li>
                    <li>
                        <div class="per_deal_limit">
                            <small>单笔手数限制</small>
                            <input type="text" placeholder="请输入单笔手数限制" name="单笔手数限制" v-model="form.per_deal_limit"  v-validate data-vv-rules="required|decimal:2|max_value:99.99">
                            <b>单笔交易的手数限制（手）</b>
                        </div>
                        <p v-if="errors.has('单笔手数限制')">{{ errors.first('单笔手数限制') }}</p>
                    </li>
                    <li>
                        <div class="own_max_limit_content">
                            <small>持单手数限制</small>
                            <input type="text" placeholder="请输入持单手数限制" name="持单手数限制" v-model="form.own_max_limit"  v-validate data-vv-rules="required|decimal:2|max_value:9999.99">
                            <b>持单的最大手数限制</b>
                        </div>
                        <p v-if="errors.has('持单手数限制')">{{ errors.first('持单手数限制') }}</p>
                    </li>
                    <li>
                        <div class="btn_content cl">
                        <div id="publish" @click="publish">申请发布</div>
                        <div id="pre" @click="pre">上一步</div>
                    </div>
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                proportionList: false,
                proportionLists: [
                    {proportion: '1'},
                    {proportion: '2'},
                    {proportion: '3'},
                    {proportion: '4'}

                ],
                form: {
                    id: '',
                    deal_money: '',
                    lever_rate: '1',
                    min_follow_money: '',
                    risk_control: '',
                    per_stop_lose: '',
                    per_deal_limit: '',
                    own_max_limit: ''
                }


            }
        },
        beforeMount(){
            if(this.util.isEmpty(this.policyList.trade_platform.platform)){
                this.$router.replace({
                    path: '/modifyNewStrategy/step2'
                })
            }
            this.token = document.getElementById("csrf-token").getAttribute("content")
            this.policyList.id = this.$router.currentRoute.params.id
            this.setForm(this.policyList)
        },
        watch: {
            policyList(value){
                this.setForm(value)
            }
        },
        methods: {
            showProportion () {
                this.proportionList = !this.proportionList;
            },
            hideProportion () {
                this.proportionList = false;
            },
            choiceProportion (value) {
                this.form.lever_rate = value
            },

            setForm(data){
                var {id, deal_money, lever_rate, min_follow_money, risk_control, per_stop_lose, per_deal_limit, own_max_limit}= data
                Object.assign(this.form, {id, deal_money, lever_rate, min_follow_money, risk_control, per_stop_lose, per_deal_limit, own_max_limit})
            },

            setPolicy (data) {
                this.$emit("setPolicy",data)
            },
            //发布
            publish () {
                var step3Form = {
                    deal_money:this.form.deal_money,
                    lever_rate:this.form.lever_rate,
                    min_follow_money:this.form.min_follow_money,
                    risk_control:this.form.risk_control,
                    per_stop_lose:this.form.per_stop_lose,
                    per_deal_limit:this.form.per_deal_limit,
                    own_max_limit:this.form.own_max_limit
                }
                this.setPolicy(step3Form)
                this.$validator.validateAll();

                if(this.policyList.imgPath == ''){
                    this.policyList.old_picture = ''
                    var ajaxData=Object.assign({},this.policyList,step3Form)
                }else {
                    this.policyList.old_picture = this.policyList.picture
                    this.policyList.picture = this.policyList.imgPath
                    var ajaxData=Object.assign({},this.policyList,step3Form)
                }
                const httpName = "修改策略"
                this.$http.put('/policy', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode, retDate} = data
                        if (retCode == '0') {
                            this.$Message.success({content: `${httpName}成功`})
                            this.$router.push({
                                path: '/home/mySrategy/examine'
                            })
                        }
                    })
                    .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
            },
            pre () {
                this.setPolicy()
                this.$router.push({
                    path:'/modifyNewStrategy/'+this.policyList.id+'/step2'
                })
            }
        },
        props: ['policyList']
    }
</script>