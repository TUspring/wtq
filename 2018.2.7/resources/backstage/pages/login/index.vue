<style lang="less" scoped>
    .loginBox{
        width: 320px;
        margin: 0 auto;
        margin-top: 40px;
        background-color: #ffffff;
        border-radius: 4px;
        padding-bottom: 25px;
        .loginBox_title{
            width: 100%;
            background-color: #ffa71a;
            color: #fff;
            height: 48px;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
            text-align: center;
            font-size: 18px;
            line-height: 48px;
        }
        .loginBox_content{
            padding:0 35px;
            margin-top: 25px;
            padding-bottom: 0px;
        }
    }

</style>
<template>
    <div class="loginBox" v-if="showPage">
        <div class="loginBox_title">请登录</div>
        <div class="loginBox_content">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="username">
                    <Input type="text" v-model="formInline.username" placeholder="请输入账号">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码"   @keyup.enter.native="Sumbit('formInline')">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom:0">
                    <Button type="primary" @click="handleSubmit('formInline')" style="width:100%">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
	import { mapState,mapActions} from 'vuex'
	import { USER_SIGNIN } from 'store/user'
    export default {
        data () {
            return {
                showPage:false,
                httping:false,
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
        	...mapState({
        		user: state => state.user
        	})
        },
        created(){
            if(this.checkHasLoginStates()){
                this.$router.replace({
                    path: '/index'
                })
                return
            }else{
                this.showPage=true
            }
        },
        methods: {
            ...mapActions([USER_SIGNIN]),
        	//检测是否登录状态
        	checkHasLoginStates(){
        		var id=this.user.id
      			if(!this.util.isEmpty(id)){
					return true
      			}else{
      				return false
      			}
        	},

            //回车事件
            Sumbit(name){
                if(this.httping){
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.backstageLogin()
                    } else {
                        this.$Message.error('用户名/密码格式有误!');
                    }
                })
            },

            handleSubmit(name) {
                if(this.httping){
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.backstageLogin()
                    } else {
                        this.$Message.error('用户名/密码格式有误!');
                    }
                })
            },

            //后台登录
            backstageLogin(){
                var form=this.formInline
        	    var ajaxData={
                   name:form.username,
                   password:form.password,
				}
				var httpName='登录'
                return new Promise((resolve, reject) => {
                    this.httping=true;
                this.$http.post('/admin/login',ajaxData)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                       if (retCode == '0') {
        				        this.USER_SIGNIN({
        				            id:ajaxData.name
        				        })
                                this.$Message.success({content: `${httpName}成功`})
                                let redirect = decodeURIComponent(this.$route.query.redirect || '');
							    if(redirect){
                                	this.$router.replace({
                                	    path: redirect
                                	})
							    }else{
                                	this.$router.replace({
                                	    path: '/index'
                                	})
							    }
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
        }
    }
</script>














