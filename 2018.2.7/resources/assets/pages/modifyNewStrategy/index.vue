<style lang="css">
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
    <div class="clearfix" id="content">
        <router-view @setPolicy="setPolicy" :policyList="policyList"  v-if="showPage"></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                showPage:false,
                policyList: {
                    id: '',
                    name: '',
                    describe: '',
                    trade_platform:{
                        id:'',
                        platform:'',
                        server_name:''
                    },
                    trade_platform_id: '',
                    platform: '',
                    server_name: '',
                    MT4_account: '',
                    investor_password: '',
                    deal_money: '',
                    lever_rate: '',
                    min_follow_money: '',
                    risk_control: '',
                    per_stop_lose: '',
                    per_deal_limit: '',
                    own_max_limit: '',
                    picture: '',
                    old_picture: '',
                    imgUrl:'',
                    imgPath:''
                },
            }
        },
        mounted () {
            this.policyList.id= this.$router.currentRoute.params.id

            var httpName = "获取修改政策列表信息"
            this.$http.get('/policy/info_simple/'+this.policyList.id)
                .then((response) => {
                    const data = response.data
                    const {retCode,retData} = data
                    if (retCode == '0') {
                        Object.assign(this.policyList,retData)
                        this.policyList.imgUrl=this.policyList.picture
                        this.showPage=true
                    }
                })
                .catch((error) =>{
                    this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                })

        },
        methods: {
            setPolicy(data) {
                Object.assign(this.policyList,data)
            }
        }
    }
</script>