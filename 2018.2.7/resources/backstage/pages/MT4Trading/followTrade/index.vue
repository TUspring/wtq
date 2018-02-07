<style lang="css">
.followTrade_box {
    overflow:hidden;
}
.top_nav {
    margin-top:10px;
    padding:20px 20px;
}
.top_nav span {
    padding:10px 20px;
    border:1px solid #FFAD33;
    border-radius:6px;
    color:#FFAD33;
    cursor:pointer;
    margin-right:30px;
}
.top_nav .current {
    background:#FFAD33;
    color:#fff;
}
</style>

<template>
    <div class="followTrade_box">
        <div class="top_nav">
            <router-link :to="{path:'/MT4Trading/followTrade/positioning',query:{data:dataId}}">
                <span :class="{current: (tabSwitch==tabSwitchList[0])}" >正在持仓</span>
            </router-link>

            <router-link :to="{path:'/MT4Trading/followTrade/historyRecord',query:{data:dataId}}">
                <span :class="{current: (tabSwitch==tabSwitchList[1])}">历史记录</span>
            </router-link>
        </div>

        <keep-alive>
            <router-view @changeTab="changeTab"></router-view>
        </keep-alive>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabSwitch: '',
                tabSwitchList: ['positioning', 'historyRecord'],
                dataId:''
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
            this.$emit("changeCurLink",'followTrade')
        },
        beforeMount(){
            this.dataId=JSON.parse(this.$route.query.data)
            console.log('跟随交易id=='+this.dataId);

        },
        methods: {
            changeTab(index ) {
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            }
        }
    }
</script>