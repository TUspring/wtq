<style lang="less" scoped>

</style>
<template>
	<div class="protocol_container" style="width:600px">
		<div class="protocol_top" style="width:600px">
			<span>测试弹窗3</span>
			<span class="iconfont" @click="close">&#xe63c;</span>
		</div>
		<div class="protocol_text" style="width:600px">
			<div>测试弹窗3</div>
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