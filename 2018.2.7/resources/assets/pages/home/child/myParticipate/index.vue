<style lang="css" scoped>
    .content-right {
        margin-top:30px;
        width:970px;
        float:right;
    }
    .right-nav {
        width:970px;
        height:50px;
        line-height:50px;
        border-radius:5px;
        background:#fff;
        padding:0px 20px;
    }
    .right-nav span {
        color:#272822;
        font-size:16px;
        padding:16px 5px;
    }
    .right-nav span:nth-child(1) {
        margin:0px 70px 0 10px;
    }
    .right-nav .current {
        border-bottom:1px solid #FFA114;
        color:#FFA114;
    }
</style>
<template>
    <div class="content-right">


        <div class="right-nav">
            <router-link to="/home/myParticipate/participation"><span :class="{current: (tabSwitch==tabSwitchList[0])}">正在参与</span></router-link>
            <router-link to="/home/myParticipate/historyPartake"><span :class="{current: (tabSwitch==tabSwitchList[1])}">历史参与</span></router-link>
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
                tabSwitchList: ['participation', 'historyPartake']
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
            this.$emit("changeCurLink",'participate')
        },
        mounted(){

        },
        methods: {
            changeTab(index) {
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            }
        }

    }
</script>