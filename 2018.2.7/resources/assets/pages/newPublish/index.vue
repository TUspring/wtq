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
        <div class="cl" id="content">
            <keep-alive>
                <router-view @setStrategy="setStrategy" :strategy="strategy"></router-view>
            </keep-alive>
        </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                strategy: {
                    name: '',
                    describe: '',
                    platform: '',
                    trade_platform_id: '',
                    MT4_account: '',
                    investor_password: '',
                    server_name: '',
                    deal_money: '',
                    lever_rate: '',
                    min_follow_money: '',
                    risk_control: '',
                    per_stop_lose: '',
                    per_deal_limit: '',
                    own_max_limit: '',
                    picture: '',
                    url:''
                }
            }
        },
        methods: {
            setStrategy (data) {
                Object.assign(this.strategy,data)
            }
        }
    }
</script>