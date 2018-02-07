<style lang="less" scoped>

</style>
<template>
	<div class="protocol_container clearfix" style="width:405px;text-align:center;">
		<div style="display:inline-block">
		<div class="protocol_top" style="width:200px">
			<span>测试弹窗1</span>
			<span class="iconfont" @click="close">&#xe63c;</span>
		</div>
		<div class="protocol_text" style="width:200px">
			<div>测试弹窗1</div>
		</div>
		</div>
		<div style="display:inline-block">
			<div class="protocol_top" style="width:200px">
				<span>测试弹窗1</span>
				<span class="iconfont" @click="close">&#xe63c;</span>
			</div>
			<div class="protocol_text" style="width:200px">
				<div>测试弹窗1</div>
			</div>
		</div>
	</div>

</template>
<script>
	import './css/register_protocol.css'
    export default {
        data() {
            return {
            }
        },
        methods:{
        	close(){
        	 	this.$emit('close')
        	}
        }
    }
</script>