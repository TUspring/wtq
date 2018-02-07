<style scoped src="./css/register_MT4_content.css">

</style>
<template>
	<div id="register_MT4_content">
		<div class="register_top">
			<span class="register_line_left"></span>
			<span class="register_line_right"></span>
			<ul>
				<li>
					<div class="current"><span></span></div>
					<p class="current">填写基本资料</p>
				</li>
				<li>
					<div class="current"><span></span></div>
					<p class="current">注册MT4账号</p>
				</li>
				<li>
					<div><span></span></div>
					<p>注册成功</p>
				</li>
			</ul>
		</div>
		<div class="information cl">
			<ul>
				<li>

					<img :class="{cur:imgCur==1}" @click="changeImgCur(1)" :src="register_MT4_account" alt="">

					<span>该平台受美国全国期货协会（NFA）监管，其监管牌照号（NFA）为：0506688</span>
					<p>ARTASCOPE</p>
				</li>
				<li class="registerMT4-btn">
					<a href="http://www.paratrade.cn/public/register" target="_blank"><button class="cur" >去开立账户</button></a>
					<button @click="experience_follow">体验模拟跟随交易</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
    import register_MT4_account from './images/register_step2.jpg'
    import { mapState,mapActions} from 'vuex'
    import { USER_SIGNIN } from 'store/user'
    export default {
        data(){
            return {
                register_MT4_account,
            	imgCur:null,
				imgActive: null,
                propsData:''
            }
        },
       props:["user"],
        beforeMount(){
            if(this.util.isEmpty(this.$route.query.data)){
                this.$router.replace({
                    path: '/'
                })
            }
            this.propsData=JSON.parse(this.$route.query.data)
            this.autoLogin()  //注册成功来到这个页面自动登录
        },

        methods:{
            ...mapActions([USER_SIGNIN]),
            autoLogin(){
                var ajaxData=this.propsData
                const httpName="登录"
                this.$http.post('/login_in',ajaxData)
                    .then((response) => {
                    const data = response.data
                    const {retCode}=data
                    if(retCode=='0'){
                        this.USER_SIGNIN({
                            id:ajaxData.phone
                        })
//                        if(this.propsData.phone == ''){
//                            this.$router.push({
//                                path: '/index'
//                            })
//                        }
                    } else{
                        this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
                    }

                })
            .catch((error) =>{
                this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },


            changeImgCur(num){
                this.imgCur=num
            },
            experience_follow(){
                this.$router.push({
                    path:'/home/myFollow/following'
				})
			},
//            success(){
//                this.$router.push({
//                    path: '/register/step_3'
//                })
//            },
        },


    }
</script>