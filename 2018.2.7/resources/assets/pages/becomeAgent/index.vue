<style lang="css" >
    #content {
        width:1200px;
        margin:0 auto;
        margin-top:20px;
        background:#fff;
        padding:50px 50px 50px 50px;
        border-radius:5px;
    }
</style>

<template>
    <div class="cl" id="content">
        <router-view @setUserMsg="setUserMsg" :userMsg ="userMsg"></router-view>
    </div>
</template>
<script>
    export default {
        components:{

        },
        data () {
            return {
                userMsg: {
                    real_name: '',
                    ID_number: '',
                    reserved_phone: '',
                    hasBankNumber: ''
                }

            }
        },
        beforeMount() {
            //获取用户信息
            this.$http.get('/user')
                .then((response) => {
                    const data = response.data
                    const {retCode,retData} = data
                if(retCode == 0 ) {
                    this.userMsg.ID_number = retData.ID_number
                    this.userMsg.real_name = retData.real_name
                }
             })
        },
        methods: {
            setUserMsg (data) {
                Object.assign(this.userMsg,data)
            }
        }
    }
</script>