<style lang="css" scoped></style>

<template>
    <div>新增客户</div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
        }
    }
</script>