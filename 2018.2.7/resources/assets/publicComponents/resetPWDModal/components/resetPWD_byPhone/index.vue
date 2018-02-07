<style lang="less" scoped src="./css/index.css">

</style>
<template>
    <div class="password_retrieval_modal custom_modal forgetPassword_Modal">
        <div class="modal_top">
            <span>找回密码</span>
            <span @click="close" class="iconfont">&#xe63c;</span>
        </div>
        <div class="password_retrieval_content">

            <!--验证身份-->
            <div class="verification_identity" v-if="pageStatus=='verification'">
                <p class="detail_title">验证身份</p>
                <div>
                    <input class="verification_input" type="text" maxlength="11" placeholder="手机号码" v-model="tel" style="width:100%;">
                </div>
                <p class="prompt" v-if="phoneHint">请输入手机号码</p>
                <div class="email-box">
                    <input type="text" placeholder="验证码" class="verification_input" v-model="phone_verify" maxlength="6">
                    <button class="verification_btn" :class="{disabled:codeDelay>0}"@click="sendCode">{{codeDelay>0?codeDelay+'s后重新发送':'发送验证码'}}</button>
                </div>
                <p class="prompt" v-if="identifyingCodeHint">请输入短信验证码</p>
                <button class="next" @click="verificationId_next">下一步</button>
            </div>

            <!--设置密码-->
            <div class="verification_identity" v-if="pageStatus=='setPsw'">
                <p class="detail_title">设置密码</p>
                <div class="new_psw same">
                    <input type="password" placeholder="新的密码" v-model="password" name="密码" v-validate data-vv-rules="required||min:6||max:16">
                    <span>6-16位字母、数字或特殊字符</span>
                </div>
                <div class="confirm_psw same">
                    <input type="password" placeholder="确认密码" v-model="password_confirmation">
                </div>
                <p class="againPsw"><span v-if="againPW">两次输入的密码不一致</span></p>
                <button class="next" @click="setPassword_next">下一步</button>
            </div>

            <!--设置成功-->
            <div class="verification_identity" v-if="pageStatus=='setSuccess'">
                <p class="detail_title">设置成功</p>
                <p class="success_text"><span v-model="delay">{{delay}}</span>秒后自动前往登录页面</p>
                <button class="next" @click="know">我知道了</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                pageStatus:'verification',
                choice: '',
                showModify: false,
                phone_verify:'',
                password:'',
                password_confirmation:'',
                codeDelay:0,
                delay:9,
                tel:'',
                sending:false,
                phoneHint:false,
                identifyingCodeHint:false,
            }
        },
        props:["modalMsg"],
        computed:{
            againPW(){
                return this.password!=''&&(this.password!=this.password_confirmation)&&(!this.errors.has('密码'))
            },

        },
        beforeMount(){
			//获取验证码判断，验证码倒计时
        	const resetPWDCode= this.util.getData('resetPWDCode',60)
        	if(!this.util.isEmpty(resetPWDCode)){
        		this.codeDelay=60-parseInt((new Date().getTime()-resetPWDCode)/1000)
        		this.countCodeDelay()
        	}
        },
        methods: {
            //发送验证码
            sendCode(){
                if(this.sending){
                    return
                }
                if (this.codeDelay > 0) {
                    return
                }
                var ajaxData = {
                    phone: this.tel
                };
                var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!phoneReg.test(ajaxData.phone)) {
                    this.$Message.error({content: '请输入有效的手机号码！'})
                    return
                }
                const httpName = "验证码发送";
                this.sending=true;
                this.$http.post('/get_phone_code/for_reset_password', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.codeDelay = 60
                            this.util.setData('resetPWDCode', new Date().getTime())
                            this.countCodeDelay()
                            this.$Message.success({content: `${httpName}成功`})
                        } else {
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})

                        }
                         this.sending=false;
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                         this.sending=false;
                    });
            },
            close(){
                this.$emit('close')
            },
            know(){
                this.jump();
            },
            agree(){
                this.close()
                this.$emit('agree')
            },
            countDelay(){
                const count = this.delay;
                this.util.interval(() => {
                    this.delay--
                    if (this.delay <= 0) {
                        this.jump();
                    }
                },1000,count)
            },
            jump(){
                //跳转到登录页面
                this.close()
                this.$router.replace({
                    path: '/index',
                    query: {redirect: this.$router.currentRoute.fullPath}
                })
                const state = {
                    loginModal: {
                        show: true
                    }
                }
                this.$store.dispatch('changeCompontentStates', state);

            },
            verificationId_next(){

                if(this.tel==''){
                    this.phoneHint=true;
                    return
                }else {
                    this.phoneHint=false;
                }
                if(this.phone_verify==''){
                    this.identifyingCodeHint=true;
                    return
                }else {
                    this.identifyingCodeHint=false;
                }

				var ajaxData =	{
					phone:this.tel,
					phone_verify:this.phone_verify
				}
				var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if(!phoneReg.test(ajaxData.phone)){
					this.$Message.error({content: '请输入有效的手机号码！'})
					return
				}
				var codeReg = /^[a-zA-Z\d]{6}$/
				if(!codeReg.test(ajaxData.phone_verify)){
					this.$Message.error({content: '短信验证码格式不正确！'})
					return
				}
                var httpName='验证'
                this.$http.post('/check_phone_code',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.pageStatus='setPsw'
                        } else {
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})

                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})

                    });
            },
            setPassword_next(){
                this.$validator.validateAll();
                var httpName = '修改'
                if (this.errors.any()) {
                	this.$Modal.error({title:`提交失败`,content:this.errors.items[0].msg})
                    return
                }
                if(this.againPW){
                    this.$Modal.error({title: `${httpName}失败`, content: '两次输入的密码不一致'})
                    return
                }

                var ajaxData={
                	phone:this.tel,
					phone_verify:this.phone_verify,
                    password:this.password,
                    password_confirmation:this.password_confirmation,
                }
                this.$http.post('/reset_password_by_phone', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.pageStatus='setSuccess'
                            this.countDelay()
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
                const count = this.codeDelay;
                this.util.interval(() => {
                    this.codeDelay--;
                }, 1000, count)
            },
        }
    }
</script>