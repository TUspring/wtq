<style lang="less" scoped>
    .layout-content-main {
        padding:10px;
    }
    .right-nav {
        padding:0 10px;
        margin-top:30px;
    }
    .right-nav span {
        display: inline-block;
        width:100px;
        height:40px;
        line-height:40px;
        text-align: center;
        background:#fff;
        color:#FFA114;
        border:1px solid #FFA114;
        border-radius: 6px;
        font-size:14px;
        margin-right:10px;
    }
    .right-nav .current {
        background:#FFA114;
        color:#fff;
    }
</style>

<template>
    <div class="layout-content-main">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >返佣管理</BreadcrumbItem>
                <BreadcrumbItem>提现管理</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <!--切换导航-->
        <div class="right-nav">
            <router-link to="/rebateManage/presentManagement/apply"><span :class="{current: (tabSwitch==tabSwitchList[0])}">申请中</span></router-link>
            <router-link to="/rebateManage/presentManagement/alreadyPresented"><span :class="{current: (tabSwitch==tabSwitchList[1])}">已提现</span></router-link>
            <router-link to="/rebateManage/presentManagement/alreadyRefused"><span :class="{current: (tabSwitch==tabSwitchList[2])}">已拒绝</span></router-link>
        </div>


        <keep-alive>
            <router-view @changeTab="changeTab"></router-view>
        </keep-alive>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                tabSwitch: '',
                tabSwitchList: ['apply', 'alreadyPresented','alreadyRefused']
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
        },
        methods:{

            changeTab(index ) {
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            },

            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'rebateManage',
                    activeName:'presentManagement'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>