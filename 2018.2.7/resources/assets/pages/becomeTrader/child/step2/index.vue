

<style lang="css" scoped src="./css/index.css"></style>
<style>
    #bankCheck .ivu-progress-bg {
        background-color:#FFA113;
    }
</style>

<template>
    <div  class="becomeTrader_step2_content cl">
        <Modal v-model="iviewModal" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <!--个人身份验证进度-->
            <div id="bankCheck" class="progress_content" v-show="progress_content">
                <div class="progress_top">
                    <span>银行卡验证</span>
                </div>
                <div class="progress_middle">
                    <p>正在验证银行卡信息，请稍等！</p>
                </div>
                <div class="progress">
                    <Progress  :percent="val" status="active"></Progress>
                </div>
            </div>

            <!--验证成功-->
            <div class="success_content" v-show="success_content">
                <div class="success_top">
                    <span>银行卡验证</span>
                </div>
                <div class="success_middle">
                    <p>恭喜，您的银行卡验证成功！</p>
                    <span>{{delay}}秒后即将自动前往签署协议</span>
                </div>
                <div class="button" @click="go">立即前往</div>
            </div>

            <!--验证失败-->
            <div class="fail_content" v-show="fail_content">
                <div class="fail_top">
                    <span>银行卡验证</span>
                </div>
                <div class="fail_middle">
                    <p>抱歉，您的个银行卡验证失败！</p>
                    <span>无相关银行卡信息，请检查银行卡号</span>
                </div>
                <div class="button"  @click="modify">立即修改</div>
            </div>
        </Modal>

        <div class="content_top">请绑定您的银行卡</div>
        <div class="content">
            <ul>
                <li>
                    <div class="person_name_content cl">
                        <span>户主姓名</span>
                        <small>{{form.real_name}}</small>
                    </div>
                </li>
                <li>
                    <div class="bank_cardNumber_content cl">
                        <span>银行卡号</span>
                        <input type="text" placeholder="请输入银行卡号" name="银行卡号" v-model="form.bank_number"  v-validate data-vv-rules="required|numeric|max:19|min:16">
                    </div>
                    <p v-if="errors.has('银行卡号')">{{ errors.first('银行卡号') }}</p>
                </li>
                <li>
                    <div class="bank_name_content cl">
                        <span>银行名称</span>
                        <input type="text" placeholder="请输入银行名称" name="银行名称" v-model="form.bank_name"  v-validate data-vv-rules="required">
                    </div>
                    <p v-if="errors.has('银行名称')">{{ errors.first('银行名称') }}</p>
                </li>
                <li>
                    <div class="bank_cardNumber_content cl">
                        <span>支行名称</span>
                        <input type="text" placeholder="请输入支行名称" name="支行名称" v-model="form.sub_branch"  v-validate data-vv-rules="required">
                    </div>
                    <p v-if="errors.has('支行名称')">{{ errors.first('支行名称') }}</p>
                </li>
                <li>
                    <div class="phone_number_content cl">
                        <span>预留手机号码</span>
                        <input type="text" placeholder="请输入预留手机号码" name="预留手机号码" v-model="form.reserved_phone"  v-validate data-vv-rules="required|numeric">
                    </div>
                    <p v-if="errors.has('预留手机号码')">{{ errors.first('预留手机号码') }}</p>
                </li>
                <li>
                    <div class="warning_content cl">
                        <span>温馨提示：</span>
                        <div id="warning">
                            <p>
                                1.只能绑定本人的银行卡
                            </p>
                            <p>
                                2.若不知道支行名称，请联系银行客服查找
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="btn_content cl">
                        <div id="next" @click="next">下一步</div>
                        <!--<div id="pre" @click="pre">上一步</div>-->
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    export default {
        data () {
            return {
                iviewModal: false,
                progress_content: false,
                success_content: false,
                fail_content: false,
                form: {
                    real_name: '',
                    bank_number: '',
                    bank_name: '',
                    sub_branch: '',
                    reserved_phone: '',
                    ID_number: ''

                },
                val: 0,
                codeDelay: 0,
                delay: 3
            }
        },
        props: ["userMsg"],
        created() {
            //获取用户信息
            this.$http.get('/user')
                .then((response) => {
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == 0 ) {
                        this.form.ID_number = retData.ID_number
                        this.form.real_name = retData.real_name
                        if(this.util.isEmpty(retData.real_name)){
                            this.$router.replace({
                                path: '/becomeTrader/step1'
                            })
                        }

                    }
                })
        },
        beforeMount () {

        },
        methods: {
            //加载进度
            scrollTime(){
                this.fail_content = false
                this.progress_content = true
                let step = Math.floor(Math.random() * 10 + 1);
                let timer = setInterval(() => {
                    this.val = this.val + step;
                    if (this.val >= 100) {
                        this.val = 100;
                        clearInterval(timer);
                        this.progress_content = false
                        this.fail_content = false
                        this.success_content = true
                        this.countDelay()
                        return
                    }
                }, 200)
            },
            //3秒倒计时
            countDelay(){
                const count = this.delay;
                this.util.interval(() => {
                    this.delay--
                    if (this.delay <= 0) {
                        this.go()
                    }
                },1000,count)
            },

            setUserMsg (data) {
                this.$emit("setUserMsg", data)
            },
            next () {
                    this.$validator.validateAll();
                    if (this.errors.any()) {
                        this.$Modal.error({content:this.errors.items[0].msg})
                        return
                    }
                    var form = this.form
                    var ajaxData = form
                    const httpName = "银行卡验证"
                    //正则匹配银行卡名字/支行名称
                    var checkName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                    if(!checkName.test(ajaxData.bank_name)) {
                        this.$Modal.warning({title: `银行卡验证失败`, content: '银行卡名称必须是中文和字母组成！'})
                        return
                    }
                    if(!checkName.test(ajaxData.sub_branch)) {
                        this.$Modal.warning({title: `银行卡验证失败`, content: '支行名称必须是中文和字母组成！'})
                        return
                    }

                    this.iviewModal = true
                    this.fail_content = false
                    this.progress_content = true

                    this.$http.post('/user/check_bank_card',ajaxData)
                        .then((response) => {
                            const data = response.data
                            const {retCode,retData} = data
                            if(retCode == '0') {
                                var step2_check = {
                                    reserved_phone:this.form.reserved_phone,
                                    hasBankNumber:'6228481538135629999'
                                }
                                this.setUserMsg(step2_check)
                                this.scrollTime()
                            }else {
                                this.success_content = false
                                this.progress_content = false
                                this.fail_content = true
                            }
                        })
                        .catch((error) =>{
                            this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                            this.iviewModal = false
                        });

            },
//            pre () {
//                this.$router.push({
//                    path: '/becomeTrader/step1'
//                })
//            },
            go() {
                console.log(222)
                this.$router.push({
                    path: '/becomeTrader/step3'
                })
                console.log(222333)
            },
            modify () {
                this.iviewModal = false;
            }
        }
    }
</script>