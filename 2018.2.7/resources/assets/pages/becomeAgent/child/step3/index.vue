<style lang="css" scoped src="./css/index.css"></style>

<template>
    <div class="becomeTrader_step3_content cl">
        <Modal v-model="iviewModal" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div class="success_content">
                <div class="success_top">
                    <span>签约成功</span>
                </div>
                <div class="success_middle">
                    <p>恭喜，您已经成为签约经纪人！</p>
                    <span>使用专属邀请码或者邀请链接邀请用户注册，并使用符合要求的账户进行交易，您将获得丰厚佣金。</span>
                </div>
                <div class="button" @click="know">我知道了</div>
            </div>
        </Modal>

        <div class="content_top">请仔细阅读协议中的条款</div>
        <div class="content cl">
            <div class="top cl">
                <span>经纪人入驻协议</span>
                <i class="iconfont"  @click="hideAgreement">&#xe63c;</i>
            </div>
            <div class="text_content" v-show="agreement">
                <p>甲方：汇大师</p>
                <p>乙方：{{form.real_name}}</p>
                <p>本着平等互利的原则，甲、乙双方就合作开展汇大师软件的推广应用，特订立本合同，并共同遵守下列条款：</p>
                <p>
                    一、 定义
                </p>
                除非本合同的条款或者内容中另有规定，下列名词具有如下意义：<br>
                1.	软件产品：指已进行公开发表过的、且甲方作为权利人能够进行授权销售并可提供技术支持和服务的软件。<br>
                2.	代理销售：指软件权利受让者被许可行使展示、销售软件产品的权利。<br>
                3.	知识产权：指依据有关法律和国际条约规定权利人所享有的专利权、版权（著作权）、商标权、商业信誉和商业秘密权。<br>
                4.	技术支持：应软件用户的要求，为用户解决软件应用过程中产生的各种技术问题；应乙方要求，为乙方培训销售、技术人员，使上述人员掌握技术支持、销售等服务中所需要的技术知识。<br>
                5.	售后服务：指为乙方及乙方用户提供售后服务和软件维护、升级等其它服务。
                <p>
                    二、 授权销售代理的产品
                </p>
                本合同有效期间，甲方作为权利人合法授权乙方代理销售的软件产品为：<br>
                汇大师跟随交易系统V1.0<br>
                汇大师社区后台管理系统V1.0<br>
                汇大师经纪人CRM系统V1.0<br>
                <p>
                    三、 授权销售地区
                </p>
                甲方授权乙方为上述产品的销售方，销售区域为全国。
                <p>
                    四、 关于甲方
                </p>
                甲方是独立法人，拥有汇大师软件的完全知识产权。
                <p>
                    五、 关于乙方
                </p>
                1.	乙方是具有独立民事能力的公司，乙方向甲方提供营业执照等文件资料。<br>

                2.  乙方具有完成日常业务所需的计算机知识、网络知识及基本的实施维护能力，从应用技术角度了解和熟悉汇大师软件的安装、使用以及常见问题的解决。<br>
                <p>
                    六、 双方的权利和义务权利和责任
                </p>
                1. 甲方的权利和义务<br>

                1)	甲方向乙方提供具有良好市场前景和市场竞争力、性能可靠的软件产品。<br>

                2)	甲方支持乙方开展汇大师软件产品的市场宣传和销售工作。<br>

                3)	甲方提供乙方所需的技术支持工作以及乙方在产品销售中所需的支持工作。<br>

                4)	经与乙方协商一致，甲方有权对汇大师软件产品的产品策略、市场策略作必要的调整。<br>

                5)	甲方有权要求乙方共同维护市场秩序。若乙方确实违反合同规定，破坏秩序，甲方有权做出直接取消乙方的授权销售代理商权利的处罚决定。

                6)	甲方保证软件产品知识产权状况的真实性，并对客户软件使用中遇到的故障，进行完善的售后服务和维护。<br>

                7)	甲方应为客户提供产品维护、升级和在线疑难解答服务。<br>
                <br>
                2.	乙方的权利和义务<br>
                1)	乙方在合同签订时应向甲方提供工商部门年检过的乙方营业执照副本、税务登记证副本及法人代表、总经理身份证的复印件。如有变更，请随时提交书面变更说明及变更后的相关证件。<br>
                2)	乙方在取得甲方的软件产品销售授权后，即可在授权指定的时间和地区范围内作为甲方的软件销售代理商开展业务工作及渠道开发。乙方有权在广告和信函上表明其为甲方的代理商。<br>
                3)	乙方为甲方销售的计算机软件系统的知识产权等始终为甲方所有。乙方不得独自或与任何第三方对软件系统进行翻制、复制、解密、反编译、反汇编和其他反向工程，否则甲方有权追究乙方法律责任和要求经济损失赔偿。<br>
                4)	乙方可以免费得到甲方软件的宣传资料、销售及技术服务资料。<br>
                5)	乙方未经甲方同意不得将甲方产品提供给任何想利用甲方产品牟利或进行分发的单位或个人。不得采取其他任何方法违法销售或分发甲方产品，给甲方造成损失。乙方亦不能生产或销售与甲方产品具有竞争性的软件产品。<br>
                6)	乙方在销售及推广甲方产品过程中，应严格遵守知识产权的法律规定，维护甲方的利益和形象。乙方负责软件的销售推广、软件安装和调试工作，以诚恳热情的态度对待客户，注意维护甲乙双方的利益和形象，及时处理客户提出的产品使用问题和意见，其中属于技术程序原因的应及时与甲方联系，由甲方提供技术支持和咨询。<br>
                7)	乙方需向甲方提交完整的最终客户资料（包括最终客户的名称、联系方式、联系人、使用日期等内容）。否则，甲方不负责其售后服务、系统升级或技术支持工作。<br>
                8)	乙方应诚信守法经营，对自己的经营活动独立承担法律责任。

                <p>
                    七、 保密原则
                </p>
                甲乙双方应对履行协议过程中所涉及的销售、市场、代理规则等信息严格保密，不得泄露给第三方。本保密义务为永久，直至相关信息被合法披露为止。

                <p>
                    八、 价格
                </p>
                软件目前属于推广阶段，免费给客户使用。但软件对接了很多的商户，如果乙方的用户与商户
                产生交易，用户需与商户单独签订协议，与甲方、乙方签订协议都可视为有效。商户会根据乙方用户的使用量给予乙方一
                定的服务费。

                <p>
                    九、 合同的解除与终止
                </p>
                双方协商一致可以解除本合同。另外，本合同在下列情形下也可以解除，但提出解除的一方应提前一个月
                以书面形式通知对方：<br>
                1.	因合同一方经营状况出现重大困难，濒临破产进入法定整顿期间或被清算，另一方可以解除本协议。<br>
                2.	因合同一方未履行合同义务或违约，另一方经书面告知给予一定期限仍不履行或不予采取补救措施，致使另一方合同预期利益无法实现或无继续履行必要，另一方有权解除本合同。

                <p>
                    十、 争议解决
                </p>
                甲、乙双方之间因履行本合同或因本合同任何条款的解释与适用而发生任何争议，
                甲、乙双方应通过友好协商解决。如协商不能解决，任何一方有权向有原告所在地有管辖权的人民法院起诉。

                <p>
                    十一、附则
                </p>
                本协议中有约定不明或未涉及的事宜，由甲乙双方签订书面补充协议确定。
                本协议即日起生效。


            </div>

            <div class="phone_input_content cl">
                <input type="text" placeholder="请输入手机验证码" name="手机验证码" v-model="form.verify_phone" maxlength="6" v-validate data-vv-rules="required|msgCode" >
                <span :class="{disabled:codeDelay>0}"  @click="sendCode">{{codeDelay>0?codeDelay+'s后重新发送':'发送验证码'}}</span>
                <p id="verify_phone_warning" v-if="errors.has('手机验证码')">{{ errors.first('手机验证码') }}</p>
            </div>
            <div class="checkBox_content">
                <Checkbox v-model="agreementCheckbox"></Checkbox>
                我已阅读并接受
                <span @click="showAgreement">《经纪人入驻协议》</span>
            </div>
            <div id="btn_content">
                <div class="btn" :class="{polar:!agreementCheckbox,pitch:agreementCheckbox}"  @click="sign">点击签署</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                agreement: true,
                agreementCheckbox: false,
                iviewModal: false,
                form: {
                    reserved_phone: '',
                    verify_phone: '',
                    real_name: ''
                },
                codeDelay:0
            }
        },
        props: ["userMsg"],
        beforeMount () {
            this.form.real_name = this.userMsg.real_name
            if(this.util.isEmpty(this.userMsg.hasBankNumber)){
                this.$router.replace({
                    path: '/becomeAgent/step1'
                })
                return
            }
            this.form.reserved_phone = this.userMsg.reserved_phone

            //倒计时
            const agentSignUpCodeRecode = this.util.getData('agentSignUpCodeRecode', 60)
            if (!this.util.isEmpty(agentSignUpCodeRecode)) {
                this.codeDelay = 60 - parseInt((new Date().getTime() - agentSignUpCodeRecode) / 1000)
                this.countCodeDelay()
            }
        },
        methods: {
            hideAgreement () {
                this.agreement = false;
            },
            showAgreement () {
                this.agreement = true;
            },
            //获取验证码
            sendCode() {
                if(this.codeDelay>0){
                    return
                }

                const httpName = "验证码发送"
                this.$http.get('/get_phone_code/for_register_trader')
                    .then((response) => {
                         const data = response.data
                         const {retCode,sucCode} = data
                        if(retCode == '0'){
                                this.codeDelay = 60
                                this.util.setData('agentSignUpCodeRecode', new Date().getTime())
                                this.countCodeDelay()
                            this.$Message.success({content: `${httpName}成功`})
                         }else {
                            console.log(8989)
                             this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                         }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    })
            },

            //点击签署
            sign () {
                if(!this.agreementCheckbox){ return }
                var ajaxData = {
                    verify_phone:this.form.verify_phone
                }
                const httpName = "签署成为交易员"
                this.$http.post('/broker/sign_broker',ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode,retData}=data
                        if (retCode == '0') {
                            this.iviewModal = true
                        }else {
                            this.$Modal.error({title: `${httpName}失败+`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败-`, content: this.util.getHttpText(error)})
                    })
            },

            know () {
                this.iviewModal = false;
                this.$router.push({
                    path: '/home'
                })
            },
            //验证码倒计时
            countCodeDelay(){
                if (!(this.codeDelay > 0)) {
                    return
                }
                const count = this.codeDelay;
                this.util.interval(() => {
                    this.codeDelay--
                }, 1000, count)
            }
        }
    }
</script>