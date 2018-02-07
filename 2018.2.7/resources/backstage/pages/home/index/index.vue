<style scoped>
    .layout-content-main{
        padding: 10px;
    }

</style>
<template>
    <div class="layout-content-main">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>首页</BreadcrumbItem>
            </Breadcrumb>
        </div>
    </div>

</template>
<script>
    export default {

        data(){
            return {

            }
        },
        mounted(){
            this.changeLeftNav()
        },
        methods:{
            changeLeftNav(){
			    var leftNav={
			        activeName:'home'
			    }
			    this.$emit("changeLeftNav",leftNav)
            }
        }
    }

</script>















