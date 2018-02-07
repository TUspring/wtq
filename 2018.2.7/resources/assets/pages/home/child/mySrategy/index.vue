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
    .right-nav .addStrategy a{
        color:#FFA114;
        font-size:14px;
        float:right;
        cursor:pointer;
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
            <router-link to="/home/mySrategy/publish"><span :class="{current: (tabSwitch==tabSwitchList[0])}">已发布</span></router-link>
            <router-link to="/home/mySrategy/examine"><span :class="{current: (tabSwitch==tabSwitchList[1])}">审核中</span></router-link>
            <router-link to="/home/mySrategy/off"><span :class="{current: (tabSwitch==tabSwitchList[2])}">已下架</span></router-link>
            <small class="addStrategy"><router-link to="/newPublish">发布新策略</router-link></small>
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
                tabSwitchList: ['publish', 'examine','off']
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
            this.$emit("changeCurLink",'strategy')
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