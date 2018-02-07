<style lang="less" scoped>

</style>
<template>
	<div class="protocol_container" style="width:400px">
		<div class="protocol_top" style="width:400px">
			<span>测试弹窗2</span>
			<span class="iconfont" @click="close">&#xe63c;</span>
		</div>
		<div class="protocol_text" style="width:400px">
			<div>测试弹窗2</div>
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