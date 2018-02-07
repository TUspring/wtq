<style lang="css" scoped src="./css/index.css"></style>

<template>
    <div class="newPublish_step3_content cl" @click="hideProportion">
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
                            <div id="publish" @click="publish">申请发布 <v-reqLoading v-if="reqLoading"></v-reqLoading></div>
                            <router-link to="/newPublish/step2"><div id="pre">上一步</div></router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
</div>
</template>

<script>
    import { mapState,mapActions} from 'vuex'
    export default {
        data () {
            return {
                reqLoading:false,
                proportionList: false,
                proportionLists: [
                    {proportion:'1'},
                    {proportion:'2'},
                    {proportion:'3'},
                    {proportion:'4'}

                ],
                form: {
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
            if(this.util.isEmpty(this.strategy.platform)){
                this.$router.replace({
                    path: '/newPublish/step2'
                })
            }
        },
        methods: {
            showProportion () {
                this.proportionList = !this.proportionList;
            },
            choiceProportion (value) {
                this.form.lever_rate = value;
            },
            hideProportion () {
                this.proportionList = false;
            },

            setStrategy (data) {
                this.$emit("setStrategy", data)
            },

            publish () {
                var step3_strategy = {
                    deal_money:this.form.deal_money,
                    lever_rate:this.form.lever_rate,
                    min_follow_money:this.form.min_follow_money,
                    risk_control:this.form.risk_control,
                    per_stop_lose:this.form.per_stop_lose,
                    per_deal_limit:this.form.per_deal_limit,
                    own_max_limit:this.form.own_max_limit
                }
                this.setStrategy(step3_strategy)
                var ajaxData=Object.assign({},this.strategy,step3_strategy)

                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.error({content:this.errors.items[0].msg})
                    return
                }
                this.reqLoading=true
                const httpName = "发布新策略"
                this.$http.post('/policy', ajaxData)
                        .then((response) => {
                            const data = response.data
                            const {retCode,retDate,retMsg} = data
                            console.log(retCode);
                            if (retCode == '0') {
                                this.reqLoading=false
                                this.$Message.success({content: `${httpName}成功`})
                                this.$router.push({
                                    path: '/home/mySrategy/examine'
                                })
                            }else{
                        this.$Modal.error({title: `${httpName}失败`, content: retMsg})
                            }
                        })
                        .catch((error) =>{
                            this.reqLoading=false
                            this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                        });

            }
        },
        props: ["strategy","src"]
    }
</script>