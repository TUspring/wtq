<style lang="less" scoped>
	.autoLoginText{
		text-align:center;
		font-size:25px;
		margin-top:25px;
	}
	#login {
		width: 450px;
		background-color: #fff;
		border-radius: 6px;
		overflow: hidden;
	}
	.modal_top{
		width: 450px;
		text-align: center;
		background-color: #ffa114;
		height: 50px;
		position: relative;
	}
	.modal_top span{
		color: #FFFFFF;
		line-height: 50px;
		display: inline-block;
		font-size: 16px;
	}
	#tab_content{
		width: 450px;
		background-color: #FFFFFF;
		border: 1px solid #CCCCCC;
		box-sizing: border-box;
		border-top: none;
		padding: 0 85px;
		margin-top: 30px;

	}
	#tab_content div button{
		width: 100%;
	}
	.loginIcon{
		top: 0px;
		right: 12px;
		position: absolute;
		cursor: pointer;
		i{
			font-size:20px;
			color: #FFFFFF;
			&:hover{
				color: grey;
			}
		}
	}
</style>
<template>
	<div class="register_login loginModal">
		<div id="login" class="login">
			<div class="modal_top">
				<span>修 改 密 码</span>
				<span @click="close" class="loginIcon"><Icon type="close-round"></Icon></span>
			</div>
			<div class="login_content">
				<div id="tab_content">
					<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
						<FormItem label="旧密码" prop="oldpasswd">
							<Input type="password" v-model="formCustom.oldpasswd"></Input>
						</FormItem>
						<FormItem label="新密码" prop="passwd">
							<Input type="password" v-model="formCustom.passwd"></Input>
						</FormItem>
						<FormItem label="确认密码" prop="passwdCheck">
							<Input type="password" v-model="formCustom.passwdCheck"></Input>
						</FormItem>
						<FormItem>
							<Button type="warning" @click="handleSubmit('formCustom')">提交</Button>
						</FormItem>
					</Form>
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateOldpasswd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                }else{
                	callback();
                }
            };
            return {
            	httping:false,
                formCustom: {
                	oldpasswd: '',
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    oldpasswd: [
                        { validator: validateOldpasswd, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
        	close(){
        		this.$emit('close')
        	},
            handleSubmit (name) {
                if(this.httping){
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.changePWD()
                    } else {
                        this.$Message.error('信息填写不正确!');
                    }
                })
            },
            changePWD(){
                var form=this.formCustom
        	    var ajaxData={
                   password_old:form.oldpasswd,
                   password:form.passwd,
                   password_confirmation:form.passwdCheck
				}
				var httpName='密码修改'
                return new Promise((resolve, reject) => {
                    this.httping=true;
                    this.$http.post('/admin/reset_Password',ajaxData)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.$Message.success({content: `${httpName}成功`})
                                this.close()
                            } else {
                                this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})

                            }
                            this.httping=false;
                        }).catch((error) => {
                             this.httping=false;
                            this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
                })
            },
        },

    }
</script>