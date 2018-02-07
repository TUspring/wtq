<style lang="less" scoped src="./css/index.css">

</style>
<template>
    <div>
        <div class="cl dynamic_communication_box" style="text-align: center;width: 1200px;padding-top: 50px">
            功能开发中，好建议请邮件PM@zhongfx.cn
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        activated(){
            this.$emit("changeTab",0) //切换局部导航
        }
    }
</script>