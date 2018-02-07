<style scoped src="./css/register_fist_content.css">

</style>
<template>
    <div id="register_content">
        <!--弹窗-->
        <Modal v-model="agreementModal" width="890" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <agreementModal v-if="agreementModal" @close="agreementModal=false" @agree="agree"></agreementModal>
            <div slot="footer"></div>
        </Modal>
        <div class="register_top">
            <span class="register_line_left"></span>
            <span class="register_line_right"></span>
            <ul>
                <li>
                    <div class="current"><span></span></div>
                    <p class="current">填写基本资料</p>
                </li>
                <li>
                    <div><span></span></div>
                    <p>注册MT4账号</p>
                </li>
                <li>
                    <div><span></span></div>
                    <p>注册成功</p>
                </li>
            </ul>
        </div>
        <div class="register_bottom">
            <div class="register_bottom_c1">
                <p>填写基本资料</p>
                <span>信息填写与注册MT4账号是保持一致，有助于快速完成账号关联</span>
            </div>
            <div class="register_bottom_c6">

					<label>
						<div style="margin-top:0;">
							<input type="text" placeholder="昵称" name="昵称" maxlength="32" v-validate data-vv-rules="required|nickname|minChar:3|maxChar:32" v-model="form.name">
							<span>3-32位字母、数字或中文，不支持特殊符号</span>
						</div>
					</label>
					<p><span v-if="errors.has('昵称')">{{ errors.first('昵称') }}</span></p>

                <label>
                    <div>
                        <input type="text" placeholder="邮箱" name="邮箱" v-validate data-vv-rules="required||email"
                               v-model="form.email">
                        <span>用于找回密码及关联交易账号</span>
                    </div>
                </label>
                <p><span v-if="errors.has('邮箱')">{{ errors.first('邮箱') }}</span></p>

            </div>
            <div class="register_bottom_c3 cl">
                <label>
                    <div class="register_box">
                        <input type="text" placeholder="手机号码" name="手机号码" maxlength="11"   v-model="form.phone">
                        <!--v-validate-->
                        <!--data-vv-rules="required|phone"-->
                    </div>
                </label>
                <!--<p><span v-if="errors.has('手机号码')">{{ errors.first('手机号码') }}</span></p>-->
            </div>
            <div class="register_bottom_c5 cl">
                <div class="clearfix">
                    <input type="text" placeholder="短信验证码" name="短信验证码" maxlength="6" v-validate
                           data-vv-rules="required|msgCode" v-model="form.phone_verify">
                    <button :class="{disabled:codeDelay>0}" @click="sendCode">
                        {{codeDelay>0?codeDelay+'s后重新发送':'获取验证码'}}
                    </button>
                </div>
                <div><p><span v-if="errors.has('短信验证码')">{{ errors.first('短信验证码') }}</span></p></div>
            </div>
            <div class="register_bottom_c6">
                <label>
                    <div><input type="password" placeholder="设置密码" name="密码" maxlength="16" v-model="form.password"
                                v-validate data-vv-rules="required||min:6||max:16">
                        <span>6-16位字母和数字组合，支持特殊字符</span>
                    </div>
                </label>
                <p><span v-if="errors.has('密码')">{{ errors.first('密码') }}</span></p>
                <label>
                    <div><input type="password" placeholder="确认密码" maxlength="16" v-model="form.password_confirmation">
                    </div>
                </label>
                <p><span v-if="againPW">两次输入的密码不一致</span></p>
                <label>
                    <div>

                        <input type="text" placeholder="邀请码" name="邀请码" v-validate data-vv-rules="required"
                                v-model="form.invited_code" maxlength="50" v-if="!hasInvaCode">
                        <input type="text" placeholder="邀请码" name="邀请码"
                               v-model="form.invited_code" maxlength="50" disabled v-else>
                        <span>若无邀请码请咨询联系人或在线客服</span>
                    </div>
                </label>
                <p><span v-if="errors.has('邀请码')">{{ errors.first('邀请码') }}</span></p>
            </div>
            <div class="register_bottom_c7">
                <p>
                    <Checkbox v-model="agreementCheckbox">阅读并接受 <span @click.stop.prevent="showAgreement">《{{company_name}}用户注册协议》</span>
                    </Checkbox>
                </p>
                <button @click="register" :class="{polar:!agreementCheckbox,pitch:agreementCheckbox}">立即注册 <v-reqLoading v-if="reqLoading"></v-reqLoading></button>
            </div>
        </div>
    </div>
</template>
<script>
	import agreement from 'components/agreementModal/index.vue'
	import { mapState,mapActions} from 'vuex'
    import { COMPANY_NAME } from 'store/company'
    export default {
        components: {
            'agreementModal': agreement
        },
        data(){
            return {
                reqLoading:false,
                company_name:COMPANY_NAME,
                form: {
                    name: '',
                    password: '',
                    password_confirmation: '',
                    phone: '',
                    email: '',
                    phone_verify: '',
                    invited_code: ''

                },
                agreementModal: false,
                agreementCheckbox: false,
                userAutoLogin: null,
                codeDelay: 0,
                hasInvaCode:false
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
            againPW(){
                return this.form.password != '' && (this.form.password != this.form.password_confirmation) && (!this.errors.has('密码'))
            }
        },
        watch:{
            '$route'(){
                this.init()
            }
        },
        beforeMount(){
            this.init()
        },
        methods: {
            init(){
                this.checkLoginStates()
                //监听用户id变化
//            this.$store.watch(this.$store.getters.getUserId, () => {
//                this.checkLoginStates()
//            })
                const phoneLoginCodeRecode = this.util.getData('phoneRegisterCodeRecode', 60)
                if (!this.util.isEmpty(phoneLoginCodeRecode)) {
                    this.codeDelay = 60 - parseInt((new Date().getTime() - phoneLoginCodeRecode) / 1000)
                    this.countCodeDelay()
                }
                var invitationCode=this.$route.query.invitationCode
                if(invitationCode){
                    this.hasInvaCode=true
                    this.form.invited_code=invitationCode
                }
            },
            showAgreement(){
                this.agreementModal = true
            },


            //注册
            register(){
                if (!this.agreementCheckbox) {
                    return
                }
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.error({title: `注册失败`, content: this.errors.items[0].msg})
                    return
                }
                var phoneWord=/^1[345678][0-9]{9}$/;
                if(!phoneWord.test(this.form.phone)){
                    this.$Message.warning({content: '请输入正确的手机号码！'})
                    return
                }
                if (this.againPW) {
                    this.$Modal.error({title: `注册失败`, content: '两次输入的密码不一致'})
                    return
                }
                var passWord =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/;
//                var passWord =/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,16}$/;
                if (!passWord.test(this.form.password)) {
                    this.$Message.error({content: '密码为6-16位字母和数字组合，支持特殊字符！'})
                    return
                }
                var ajaxData = {
                    name:this.form.name,
                    password:this.form.password,
                    password_confirmation:this.form.password_confirmation,
                    email:this.form.email,
                    invited_code:this.form.invited_code,
                    phone:this.form.phone,
                    phone_verify:this.form.phone_verify,
                }
                this.reqLoading=true
                const httpName = "注册"
                this.$http.post('/register', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`})
                            var user = {phone: this.form.phone, password: this.form.password}
                            this.setUser(user)
                            var userData=JSON.stringify(user)
                            this.$router.push({
                                path: '/register/step_2',
                                query: { data: userData }
                            })
                        }else {
                            this.reqLoading=false
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                         }

                    })
                    .catch((error) => {
                       this.reqLoading=false
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    });
            },

            setUser(data){
                this.$emit("setUser", data)
            },

            //发送验证码
            sendCode(){
                if (this.codeDelay > 0) {
                    return
                }
                var ajaxData = {
                    phone: this.form.phone
                }
                var phoneReg = /^1[345678][0-9]{9}$/;
                if (!phoneReg.test(ajaxData.phone)) {
                    this.$Message.warning({content: '请输入有效的手机号码！'})
                    return
                }
                const httpName = "验证码发送"
                this.$http.post('/get_phone_code/for_register', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.codeDelay = 60
                            this.util.setData('phoneRegisterCodeRecode', new Date().getTime())
                            this.countCodeDelay()
                            this.$Message.success({content: `${httpName}成功`})
                        } else {
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    });
            },

            //验证码倒计时
            countCodeDelay(){
                if (!(this.codeDelay > 0)) {
                    return
                }
                const count = this.codeDelay
                this.util.interval(() => {
                    this.codeDelay--
                }, 1000, count)
            },
            agree(){
                this.agreementCheckbox = true
            },
            //检测是否登录状态
            checkLoginStates(){
                var id = this.user.id
                if (!this.util.isEmpty(id)) {
                    this.$router.push({
                        path: '/'
                    })
                }
            },
        }
    }
</script>