
<style lang="less" scoped>
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
    .right-nav .addProject {
        float:right;
        font-size: 14px;
        padding:0;
        cursor:pointer;
        color: rgb( 255, 161, 20 );
    }

</style>
<template>
    <div class="content-right">
        <div class="right-nav cl">
            <router-link to="/home/myProject/ongoing"><span :class="{current: (tabSwitch==tabSwitchList[0])}">进行中</span></router-link>
            <router-link to="/home/myProject/enrol"><span :class="{current: (tabSwitch==tabSwitchList[1])}">报名中</span></router-link>
            <router-link to="/home/myProject/audit"><span :class="{current: (tabSwitch==tabSwitchList[2])}">审核中</span></router-link>
            <router-link to="/home/myProject/finished"><span :class="{current: (tabSwitch==tabSwitchList[3])}">已结束</span></router-link>
            <span class="addProject" @click="addNewProject">发布新项目</span>
        </div>

        <keep-alive>
            <router-view @changeTab="changeTab"></router-view>
        </keep-alive>

    </div>
</template>
<script>
    import { mapState} from 'vuex'
    export default {
        data(){
            return {
                tabSwitch: '',
                tabSwitchList: ['ongoing', 'enrol','audit','finished']
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
            this.$emit("changeCurLink",'project')
        },
        methods: {
            addNewProject(){
                this.$router.push({
                    path:'/publishNewProject'
                })
            },
            changeTab(index ) {
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            }
        }
    }
</script>