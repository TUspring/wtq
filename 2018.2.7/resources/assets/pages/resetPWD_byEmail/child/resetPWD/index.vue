<style scoped src="./css/index.css">

</style>
<template>
    <div id="retrieve_set_content" v-if="page_status=='1'">
        <div class="detail">
            <p>请设置您的新密码</p>
            <div class="set_pw">
                <input type="password" placeholder="新密码" name="密码" maxlength="16" v-model="form.password" v-validate data-vv-rules="required||min:6||max:16">
                <span>6-16位字母、数字或特殊字符</span>
            </div>
            <input class="reset_pw" type="password" name="确认密码" placeholder="确认新密码" maxlength="16" v-model="form.password_confirmation" style="margin-bottom:10px">
            <p class="reset_text" style="margin:10px 0;" v-if="againPW">两次密码输入不一致</p>
            <button style="margin-top:30px;" @click="changePWD">下一步</button>
        </div>
    </div>
    <div id="retrieve_set_content" style="height:196px;" v-else="page_status=='1'">
        <div class="detail">
            <p class="success_text">恭喜您，密码已重置成功，{{codeDelay}}秒后将自动前往登录页面~</p>
            <button style="margin-top:30px;" @click="jump">立即登录</button>
        </div>
    </div>

</template>
<script>
import {mapState} from 'vuex'
    export default {

    	data(){
    		return {
    		    page_status:'1',
				form:{
    		      	token:'',
					password:'',
					password_confirmation:'',
                    email:''
				},
				httping:false,
				codeDelay:10
    		}
    	},
		computed:{
            againPW(){
                return this.form.password!=''&&(this.form.password!=this.form.password_confirmation)&&(!this.errors.has('密码'))
			}
		},
		created(){
		    this.initPage()
		},
        methods:{
		    initPage(){
                var tokenData=this.$router.currentRoute.params.token
                var tokenMsg=tokenData.split('gz_hds_cn')
                if(tokenMsg.length!=2){
                    this.$router.replace({
                        path: '/index',
                    })
                }else{
                    this.form.token=tokenMsg[0]
                    this.form.email=tokenMsg[1]
                }
            },
            changePWD(){
        		var form=this.form

        		this.$validator.validateAll();
        		var httpName="密码修改"
                if (this.errors.any()) {
                	this.$Modal.error({title:`提交失败`,content:this.errors.items[0].msg})
                    return
                }
                if(this.againPW){
                    this.$Modal.error({title: `${httpName}失败`, content: '两次输入的密码不一致'})
                    return
                }
				var ajaxData=form
				this.httping=true;
                this.$http.post('/password/reset',ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if(retCode=='0'){
                            this.$Message.success({content: `${httpName}成功`})
                            this.chanegeSuccess()
                        }else{
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
                        }
                        this.httping=false;
                    })
                    .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                        this.httping=false;
                    });
            },
            chanegeSuccess(){
                this.page_status=2
                this.countCodeDelay()
            },
			//验证码倒计时
            countCodeDelay(){
                if(!(this.codeDelay>0)){
                    return
                }
                const count = this.codeDelay
                this.util.interval(() => {
                    this.codeDelay--
                    if (this.codeDelay <= 0) {
                        this.jump();
                    }
                },1000,count)
            },
            jump(){
                //跳转到登录页面
                this.$router.replace({
                    path: '/index',
                })
                const state = {
                    loginModal: {
                        show: true
                    }
                }
                this.$store.dispatch('changeCompontentStates', state);

            },
        }
    }
</script>