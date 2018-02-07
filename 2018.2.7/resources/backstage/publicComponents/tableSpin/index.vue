<style scoped lang="less" src="./css/index.css">
</style>
<style lang="less" scoped>

</style>
<template>
	<div class="demo-spin-col" span="24">
	<Spin fix>
		<Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
		<slot name='text'><div>加载中...</div></slot>
	</Spin>
	</div>
</template>
<script>

    export default {
        data() {
            return {
            }
        }
    }
</script>