<style lang="css">
    .independentTrade_box {
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
    <div class="independentTrade_box">
        <div class="top_nav">
            <router-link to="/MT4Trading/independentTrade/positioning"><span :class="{current: (tabSwitch==tabSwitchList[0])}" >正在持仓</span></router-link>
            <router-link to="/MT4Trading/independentTrade/historyRecord"><span :class="{current: (tabSwitch==tabSwitchList[1])}" >历史记录</span></router-link>
        </div>
        <keep-alive>
            <router-view  @changeTab="changeTab"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabSwitch: '',
                tabSwitchList: ['positioning', 'historyRecord']
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
            this.$emit("changeCurLink",'independentTrade')
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