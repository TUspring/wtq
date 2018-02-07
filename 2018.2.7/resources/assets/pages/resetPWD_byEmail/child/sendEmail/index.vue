<style scoped src="./css/index.css">
</style>
<style scoped src="./css/send_email.css">
</style>
<template>
	<div id="e_retrieve_psw" v-if="pageStatus=='1'">
		<div class="reset_content">
			<p class="text1">请输入您的邮箱进行密码找回</p>
			<input type="text" v-model="email" placeholder="邮箱账号" name="邮箱账号" v-validate data-vv-rules="required||email">
			<button class="next_btn" @click="next">下一步</button>
		</div>
	</div>
	<div id="e_identifying" v-else>

		<div class="details">
			<p class="p1">密码找回邮件已发送到<span class="user_email">{{email}}</span>请查收邮件根据提示重置密码。</p>
			<p class="p2">没有收到邮件？<span @click="sendEmailAgain" :class="['sendEmailAgain',{disabled:codeDelay>0}]">{{codeDelay>0?codeDelay+'s后重新发送':'重新发送'}}</span></p>
			<a :href="url" target="_blank"><button @click="goEmailPage($event)">前往邮箱</button></a>
		</div>
	</div>
</template>
<script>
    export default {

    	data(){
    		return {
    			pageStatus:'1',
    			email:'',
    			codeDelay:0,
    			url:'',
    			sending:false
    		}
    	},

        methods:{
			next(){
                if(this.sending){
                	return
                }
                this.$validator.validateAll();
            	if (this.errors.any()) {
                	this.$Modal.error({title:`提交失败`,content:this.errors.items[0].msg})
                    return
                }
                this.sending=true
                var sendEmail=this.sendEmailHttp(this.email)
                sendEmail.then(()=>{
                    this.sending=false
                	this.$Message.success({content: '发送成功'})
                	this.setEmailPage(this.email)
                	this.pageStatus='2'
                }).catch((msg='发送失败')=>{
                    this.sending=false
                    this.$Message.error({content: msg})
                })

			},
			sendEmailAgain(){
                if(this.codeDelay>0){
                    return
                }
                if(this.sending){
                	return
                }
                this.sending=true
                var sendEmail=this.sendEmailHttp(this.email,true)
                sendEmail.then(()=>{
                    this.sending=false
                	this.$Message.success({content: '发送成功'})
                }).catch((msg='发送失败')=>{
                    this.sending=false
                	 this.$Message.error({content: msg})
                })
			},
			//发送验证码
            sendEmailHttp(email,again=false){
                var ajaxData =	{
                    email:email
                }
                return new Promise((resolve, reject)=>{
                	this.$http.post('/send_reset_link_to_email',ajaxData)
                	    .then((response) => {
                	        const data = response.data;
                	        const {retCode}=data;
                	        if(retCode=='0'){
                	        	if(again){
									this.codeDelay=60
                	            	this.countCodeDelay()
                	        	}
                	        	this.email=email
                	            resolve();
                	        }else{
                	            reject(data.retMsg);
                	        }
                	    })
                	    .catch((error) =>{
                	        reject();
                	    });
                })
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
			goEmailPage(e){
				if(!this.url){
					this.$Message.warning({content: '抱歉!未找到对应的邮箱登录地址，请自己登录邮箱查看邮件！！'})
					window.event? window.event.cancelBubble = true : e.stopPropagation();
				}
			},
            setEmailPage(email){
				var url = this.getEmailPage(email)
				this.url=url?"http://"+url:''
            },
			getEmailPage($mail){
               	var $t = $mail.split('@')[1];
                $t = $t.toLowerCase();
                if ($t == '163.com') {
                    return 'mail.163.com';
                } else if ($t == 'vip.163.com') {
                    return 'vip.163.com';
                } else if ($t == '126.com') {
                    return 'mail.126.com';
                } else if ($t == 'qq.com' || $t == 'vip.qq.com' || $t == 'foxmail.com') {
                    return 'mail.qq.com';
                } else if ($t == 'gmail.com') {
                    return 'mail.google.com';
                } else if ($t == 'sohu.com') {
                    return 'mail.sohu.com';
                } else if ($t == 'tom.com') {
                    return 'mail.tom.com';
                } else if ($t == 'vip.sina.com') {
                    return 'vip.sina.com';
                } else if ($t == 'sina.com.cn' || $t == 'sina.com') {
                    return 'mail.sina.com.cn';
                } else if ($t == 'tom.com') {
                    return 'mail.tom.com';
                } else if ($t == 'yahoo.com.cn' || $t == 'yahoo.cn') {
                    return 'mail.cn.yahoo.com';
                } else if ($t == 'tom.com') {
                    return 'mail.tom.com';
                } else if ($t == 'yeah.net') {
                    return 'www.yeah.net';
                } else if ($t == '21cn.com') {
                    return 'mail.21cn.com';
                } else if ($t == 'hotmail.com') {
                    return 'www.hotmail.com';
                } else if ($t == 'sogou.com') {
                    return 'mail.sogou.com';
                } else if ($t == '188.com') {
                    return 'www.188.com';
                } else if ($t == '139.com') {
                    return 'mail.10086.cn';
                } else if ($t == '189.cn') {
                    return 'webmail15.189.cn/webmail';
                } else if ($t == 'wo.com.cn') {
                    return 'mail.wo.com.cn/smsmail';
                } else if ($t == '139.com') {
                    return 'mail.10086.cn';
                } else {
                    return '';
                }

			}
        }
    }
</script>