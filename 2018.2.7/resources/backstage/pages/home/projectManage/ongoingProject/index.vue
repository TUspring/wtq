<style lang="css" scoped>


</style>

<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'ongoingProject',
                    activeName:'projectManage'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>
