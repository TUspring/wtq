<style lang="less" scoped>

</style>
<template>
	<router-view @setUser="setUser" :user="user"></router-view>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                user: {
                    phone:'',
                    password:''
                }
            }
        },
        beforeMount(){

        },
        methods:{
            setUser(data){
                this.user=data
            }
        }
    }
</script>