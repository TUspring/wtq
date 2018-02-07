<style scoped src="./css/register_success.css">

</style>
<template>
    <div id="register_success_content">
        <div class="register_top">
            <span class="register_line_left"></span>
            <span class="register_line_right"></span>
            <ul>
                <li>
                    <div><span></span></div>
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
        <div class="register_details">
            <ul>
                <li>
                    <div class="details">
                        <p>
                            <span>第1步</span>
                            <span>注册成功</span>
                        </p>
                        <span class="details_text">请您耐心等待交易商审核，审核成功后，交易商会将MT4账号和密码发送到您的邮箱，请您注意查收</span>
                        <span class="details_text">您也可以先使用模拟账号，体验一键跟随</span>
                        <div class="details_btn" @click="toExperience"><span>前往体验</span></div>
                    </div>
                </li>
                <li>
                    <div class="details">
                        <p>
                            <span>第2步</span>
                            <span>注册问题</span>
                        </p>
                        <span class="details_text">您在注册过程中，遇到任何问题，都可以随时咨询{{company_name}}在线客服，我们将竭诚为您服务</span>
                        <span class="details_text">您也可以点击页面右边的在线客服进行咨询</span>
                        <div class="details_btn"><span>在线客服</span></div>
                    </div>
                </li>
                <li>
                    <div class="details">
                        <p>
                            <span>第3步</span>
                            <span>重新选择</span>
                        </p>
                        <span class="details_text">您在注册过程中，出现任何问题，可以随时咨询{{company_name}}在线客服，我们将会为您进行解答</span>
                        <span class="details_text">如果您选择错误，可点击返回上一步重新进行选择</span>
                        <div class="details_btn" @click="backPrev"><span>返回上一步</span></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState,mapActions} from 'vuex'
    import { USER_SIGNIN } from 'store/user'
    import { COMPANY_NAME } from 'store/company'
    export default {
        data(){
            return {
                company_name:COMPANY_NAME,
            }
        },
        beforeMount(){
            console.log(5);
            console.log(this.user.phone);
            console.log(5);
            if(this.util.isEmpty(this.user.phone)){
				this.$router.push({
                	path: '/index'
                })
                return
        	}
        	if(this.util.isEmpty(this.userMsg.id)){
        	    this.userlogin()
        	}
        },
        computed:{

        	...mapState({
        		userMsg: state => state.user
        	}),
        },
        methods:{
            ...mapActions([USER_SIGNIN]),
            userlogin(){
                console.log("login")
                const msg = this.$Message.loading({
                    content: '自动登录中...',
                    duration: 0
                });
                var ajaxData=this.user
                const httpName="登录"
 				this.$http.post('/login_in',ajaxData)
				  .then((response) => {
					  	const data = response.data
					  	const {retCode}=data
					  	msg()
					  	if(retCode=='0'){
        				    this.USER_SIGNIN({
        				        id:ajaxData.phone
        				    })
        				    this.$Message.success({content: `${httpName}成功`})
					  	}else{
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
					  	}

				  })
				  .catch((error) =>{
				        msg()
				        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
				  });
            },
            backPrev(){
                this.$router.push({
                    path: '/register/step_2'
                })
            },
            toExperience(){
                this.$router.push({
                    path:'/home/mySetting/MT4_Account'
                })
            },
        },
        props:["user"]
    }
</script>
