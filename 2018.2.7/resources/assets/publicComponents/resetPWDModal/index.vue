<style scoped lang="less" src="./css/retrieve_pw.css">
</style>
<style lang="less" scoped>

</style>
<template>
	<div id="Retrieve_psw" v-if="pageStatus=='chooseType'">
		<div class="method">
			<div class="modal_top">
				<span>找回密码</span>
				<span class="iconfont" @click="close">&#xe63c;</span>
			</div>
			<div class="modal_content">
				<p>选择找回方式</p>
				<div class="method_r" @click="resetPWD_byPhone">
					<div class="box_l"> <span class="iconfont">&#xe61b;</span></div>
					<div class="box_r">
						<p>手机找回</p>
						<span>通过注册时填写的手机号找回</span>
					</div>
				</div>
				<div class="method_r" @click="resetPWD_byEmail">
					<div class="box_l"> <span class="iconfont icon">&#xe600;</span></div>
					<div class="box_r">
						<p>邮箱找回</p>
						<span>通过注册时填写的邮箱找回</span>
					</div>
				</div>
			</div>

		</div>
	</div>
	<resetPWDByPhone v-else @close="close"></resetPWDByPhone>
</template>
<script>
	import resetPWDByPhone from './components/resetPWD_byPhone'
	import { mapState,mapActions} from 'vuex'
	import { USER_SIGNIN } from 'store/user'
    export default {
        data() {
            return {
            	pageStatus:'chooseType'
            }
        },
        components:{
        	resetPWDByPhone
        },

        methods:{
           	close(){
                this.$emit('close')
            },
        	resetPWD_byPhone(){
        		this.pageStatus='resetPWDByPhone'
        	},
        	resetPWD_byEmail(){
        		this.$emit('close')
				this.$router.push({
                	path: '/resetPWD_byEmail/sendEmail'
                })
        	}

        }
    }
</script>