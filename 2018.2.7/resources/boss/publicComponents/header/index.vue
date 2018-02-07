<style scoped src="./css/header.css">
</style>
<style lang="less">
	#header{
		.nav_right_ul{
			li{
				.nickName{
					font-size: 16px;
				}
				button{
					margin-left:12px;
					&:nth-child(2){
						margin-left:20px;
					}
				}
			}
		}
	}
</style>
<template>
	<header id="header">
		<div class="nav_content">
			<div class="nav_left">
				<router-link to='/index'><img :src="logo"></router-link>
				<!--普通头部-->
				<ul style="height:100%"></ul>

			</div>
			<div class="nav_right">
				<!--<span class="help">帮助中心</span>-->
				<ul class="nav_right_ul">
					<!--<li id="nav_s2" v-if="user.id">-->
					<li id="nav_s2" v-if="user.id">
						<!--<span class="nav_right_inline nickName">{{user.user_info.name}}</span>-->
						<!--<Button type="warning" @click="showChangePWDModal">修改密码</Button>-->
						<Button @click="user_signout">退出</Button>
					</li>

					<li id="nav_s3" v-else>
						<!--<span class="nav_right_inline nickName">已有账号？</span>-->
						<Button @click="goLoginPage">登录</Button>
					</li>
				</ul>
			</div>
		</div>
	</header>

</template>
<script>
	import './css/header.css'
	import logo from './images/zhongfx_logo.png'
	import { mapState,mapActions} from 'vuex'
	import { USER_SIGNOUT,USER_SETSTATE,USER_SETINFO } from 'store/user'
    export default {
    	data() {
			return {
				header_type:1,
				userAutoLoginKey:'userAutoLogin',
				userLoginFormKey:'userLoginForm',
				logo
			}
		},
        computed: {
        	...mapState({
        		user: state => state.user,
        		headerState: state => state.components.header,
        		auth:state => state.components.auth
        	}),
        	isDefaultContent(){
        		return this.headerState.contentType=='default'
        	},
        	isTitleContent(){
        		return this.headerState.contentType=='title'
        	},
        	isDefautRightContent(){
        		return this.headerState.rightContentType=='default'
        	},
        	isRegisterRightContent(){
        		return this.headerState.rightContentType=='register'
        	},
        	curRoute(){
        		return this.$route
        	}
        },
        beforeMount(){
    	    console.log(this.auth)
        	if(this.auth){
				this.checkLoginStates()
        	}

			//监听用户id变化
			this.$store.watch(this.$store.getters.getUserId, () => {
                console.log(24)
      			this.checkLoginStates()
    		})
            console.log(22)
        },
        methods:{
            ...mapActions({changeCompontentStates:'changeCompontentStates'}),
            ...mapActions([USER_SIGNOUT,USER_SETSTATE,USER_SETINFO]),
            goLoginPage(){
            	this.$router.replace({
            	    path: '/login',
            	    query: {redirect: this.$router.currentRoute.fullPath}
            	})
            },
            //修改密码弹窗
        	showChangePWDModal(){
        	    var data={
        	        changePWDModal:{
        	            show:true
        	        }
        	    }
        	    this.changeCompontentStates(data)
        	},
        	//注销
        	user_signout(){
				this.$http.get('/boss/logout')
				  .then((response) => {
					  	const data = response.data
					  	const {retCode,retData}=data
                      console.log(retCode);
                      if(retCode=='0'){
        					this.util.removeData(this.userAutoLoginKey)
        					this.util.removeData(this.userLoginFormKey)
        				    this.USER_SIGNOUT()
        				    if(this.auth){
                         		this.$router.replace({
                         		   path: '/login'
                         		})
        				    }
					  	}else{
					  	}

				  })
				  .catch((error) =>{
				  });
        	},
        	//检测是否登录状态
        	checkLoginStates(){
        		var id=this.user.id
      			if(!this.util.isEmpty(id)){
					this.getUserInfo()
      			}else{
      				this.USER_SIGNOUT()
      			}
        	},
        	//获取用户信息
            getUserInfo(){
					this.$http.get('/boss/user_info')
					  .then((response) => {
					  	const data = response.data
					  	const {retCode,retData}=data
					  	if(retCode=='0'){
        				    this.USER_SETINFO(retData)
					  	}else{
					  	}
					  })
					  .catch((error) =>{
					  });
        	},
        	routechange(){
        		this.curtRoute=this.$route
        	}
        }
    }
</script>