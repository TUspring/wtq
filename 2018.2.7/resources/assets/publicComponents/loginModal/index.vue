<style scoped src="./css/loginModal.css">
</style>
<style lang="less" scoped>
	.autoLoginText{
		text-align:center;
		font-size:25px;
		margin-top:25px;
	}
	#tab_content .change_btn_color{
		background-color: #FFA114;
		color: #fff;
	}
</style>
<template>
	<div class="register_login loginModal custom_modal">
		<div id="login" class="login">
			<div class="modal_top">
				<span>用户登录</span>
				<span v-if="!logining" @click="close" class="iconfont">&#xe63c;</span>
			</div>
			<div class="login_content" v-if="logining">
				<div class="autoLoginText">正在登录中...</div>
			</div>
			<div class="login_content" v-else>
				<div id="tab">
					<ul>
						<li><span :class="{current:(loginWay==loginWayList[0])}" @click='changeLoginWay(0)'>账号密码登录</span></li>
						<li><span :class="{current:(loginWay==loginWayList[1])}" @click='changeLoginWay(1)'>动态码登录</span></li>
					</ul>
				</div>
				<div id="tab_content">
					<div class="dom" v-if='loginWay==loginWayList[0]'>
						<div class="tab_account input_row">
							<input type="text" maxlength="11" placeholder="账号" v-model="loginForm.username">
						</div>
						<p>请输入登录账号</p>
						<div class="tab_account input_row">
							<input type="password" maxlength="16" placeholder="密码" v-model="loginForm.password" v-on:input="inputFunc"  v-on:keyup.enter="Sumbit">
						</div>
						<p>请填写密码</p>
						<!--<div class="pulg_in"></div>-->
						<!--<p>请滑动验证码</p>-->
						<div class="tab_bottom">
							<button class="tab_btn" @click="passwordLogin" :class="{change_btn_color:login1}">登录</button>
							<div class="tab_bottom_contains">
								<ul>
									<li>
										<Checkbox v-model="userAutoLogin"><span class="p1">自动登录</span></Checkbox>
									</li>

									<li>
										<span class="p2" @click="forgetPWD">忘记密码</span>
										<span>|</span>
										<span class="p3" @click="toRegister">新用户注册</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="dom" v-if='loginWay==loginWayList[1]'>
						<div class="tab_account input_row">
							<input type="text" maxlength="11" placeholder="手机号码" v-model="loginForm.phone">
						</div>
						<p>请输入手机号</p>
						<div class="input_row">
							<div class="tab_identifying">
								<input type="text" maxlength="6" placeholder="请输入短信验证码" v-model="loginForm.msgCode" v-on:input="inputFunc2"   v-on:keyup.enter="Sumbit">
								<button :class="{disabled:codeDelay>0}" @click="sendCode">{{codeDelay>0?codeDelay+'s后重新发送':'发送验证码'}}</button>
							</div>
						</div>
						<p>请填写验证码</p>
						<button class="tab_btn" @click="msgCodeLogin" :class="{change_btn_color:login2}">登录</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import { mapState,mapActions} from 'vuex'
	import { USER_SIGNIN } from 'store/user'
    export default {
        data() {
            return {
            	loginForm:{
            		username:'',
            		password:'',
            		phone:'',
            		msgCode:''
            	},
            	userAutoLogin:false,
                loginWay:'',
                loginWayList:['password','messagecode'],
                userAutoLoginKey:'userAutoLogin',
                userLoginFormKey:'userLoginForm',
                logining:false,
                codeDelay:0,
                login1:false,
                login2:false
            }
        },
        computed: {

        },
        created(){
        	this.loginWay=this.loginWayList[0]
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        },
        beforeMount(){
			//获取验证码判断，验证码倒计时
        	const phoneLoginCodeRecode= this.util.getData('phoneLoginCodeRecode',60)
        	if(!this.util.isEmpty(phoneLoginCodeRecode)){
        		this.codeDelay=60-parseInt((new Date().getTime()-phoneLoginCodeRecode)/1000)
        		this.countCodeDelay()
        	}
        	//this.userAutoLogin=this.util.getData(this.userAutoLoginKey,60*60*24*7)||false
			//this.checkUserAutoLogin()
        },
        methods:{
        	...mapActions([USER_SIGNIN]),
        	//登录方式
        	changeLoginWay(index){
        		if(this.loginWay!=this.loginWayList[index]){
        			this.loginWay=this.loginWayList[index]
        		}
        	},
        	close(){
        		this.$emit('close')
        	},

            //监听input事件
            inputFunc(){
                this.login1=true
            },
            inputFunc2(){
                this.login2=true
            },


			//回车键登录
            Sumbit () {
                this.passwordLogin()
			},
        	//密码方式
        	passwordLogin(){
        	    if(this.logining){
        			return
        		}
        		var loginForm=this.loginForm
				var ajaxData={
					phone:loginForm.username,
					password:loginForm.password,
					remember:this.userAutoLogin
				}

                if(this.util.isEmpty(ajaxData.phone)){
        			this.$Message.error({
                    	content: '用户名不能为空'
                	});
        			return
        		}
        		if(this.util.isEmpty(ajaxData.password)){
        			this.$Message.error({
                    	content: '密码不能为空'
                	});
        			return
        		}

                this.passwordLoginHttp(ajaxData)
        	},
        	passwordLoginHttp(ajaxData){
        		this.logining=true
                const msg = this.$Message.loading({
                    content: '正在登录中...',
                    duration: 0
                });
                const httpName="登录"
				this.$http.post('/login_in',ajaxData)
				  .then((response) => {
					  	const data = response.data
					  	const {retCode}=data
					  	msg()
					  	if(retCode=='0'){
					  		//if(this.userAutoLogin){
					  		//	this.util.setData(this.userAutoLoginKey,true)
					  		//	this.util.setData(this.userLoginFormKey,ajaxData)
					  		//	}else{
					  		//	this.util.removeData(this.userAutoLoginKey)
					  		//}
        				    this.USER_SIGNIN({
        				        id:ajaxData.phone
        				    })
        				    this.$Message.success({content: `${httpName}成功`})
        				    this.close()
                            let redirect = decodeURIComponent(this.$route.query.redirect || '');
							if(redirect){
                            	this.$router.push({
                            	    path: redirect
                            	})
							}
					  	} else{
					  		this.logining=false
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
					  	}

				  })
				  .catch((error) =>{
				        msg()
				        this.logining=false
				        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
				  });
        	},
        	//检测自动登录
        	checkUserAutoLogin(){
        		if(this.userAutoLogin){
        			this.logining=true
        	        var ajaxData=this.util.getData(this.userLoginFormKey)
        	        this.passwordLoginHttp(ajaxData)
        		}else{
        			this.util.removeData(this.userAutoLoginKey)
        			this.util.removeData(this.userLoginFormKey)
        		}
        	},
			//发送验证码
        	sendCode(){
        		if(this.codeDelay>0){
        			return
        		}
				var ajaxData =	{
					phone:this.loginForm.phone
				}
				var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if(!phoneReg.test(ajaxData.phone)){
					this.$Message.error({content: '请输入有效的手机号码！'})
					return
				}
				const httpName="验证码发送"
				this.$http.post('/get_phone_code/for_login',ajaxData)
				  .then((response) => {
					  	const data = response.data
					  	const {retCode}=data
					  	if(retCode=='0'){
					  	    this.codeDelay=60
        					this.util.setData('phoneLoginCodeRecode',new Date().getTime())
        					this.countCodeDelay()
        				    this.$Message.success({content: `${httpName}成功`})

					  	}else{
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
					  	}

				  })
				  .catch((error) =>{
				  		 this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
				  });
        	},
        	//短信登录
        	msgCodeLogin(){
        		if(this.logining){
        			return
        		}
				var ajaxData =	{
					phone:this.loginForm.phone,
					phone_verify:this.loginForm.msgCode
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
				this.msgCodeLoginHttp(ajaxData)

        	},
        	msgCodeLoginHttp(ajaxData){
        		this.logining=true
                const msg = this.$Message.loading({
                    content: '正在登录中...',
                    duration: 0
                });
                const httpName="登录"
				this.$http.post('/login_by_phone',ajaxData)
				  .then((response) => {
					  	const data = response.data
					  	const {retCode}=data
					  	msg()
					  	if(retCode=='0'){
        				    this.USER_SIGNIN({
        				        id:ajaxData.phone
        				    })
        				    this.$Message.success({content: `${httpName}成功`})
        				    this.close()
                            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({
                                path: redirect
                            })
					  	}else{
					  		this.logining=false
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
					  	}

				  })
				  .catch((error) =>{
				        msg()
				        this.logining=false
				        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
				  });
        	},
        	//验证码倒计时
        	countCodeDelay(){
        		if(!(this.codeDelay>0)){
        			return
        		}
        		const count = this.codeDelay
        		this.util.interval(() => {
        			this.codeDelay--
        		},1000,count)
        	},
        	toRegister(){
        		this.close()
            	this.$router.push({
                	path: '/register'
                })
        	},
        	forgetPWD(){
        		this.$emit('forgetPWD')
        	}
        }
    }
</script>