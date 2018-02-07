<style lang="css"></style>
<style>
    #personal_set_content {
        width: 970px;
        margin-top: 30px;
        float: right;
    }

    .set_title_tab {
        width: 970px;
        height: 50px;
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 20px;
    }

    .set_title_tab ul li {
        width: 70px;
        height: 50px;
        line-height: 50px;
        text-decoration: none;
        float: left;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        color: #272822;
    }

    .set_title_tab ul li.current {
        border-bottom: 1px solid #FFA114;
        color: #FFA114;
    }

    .set_title_tab ul li:nth-child(1) {
        margin: 0px 70px 0 30px;
    }


</style>
<template>
    <div id="personal_set_content">
        <!--我的设置 顶部切换-->
        <div class="set_title_tab">
            <ul>
                <router-link to="/home/mySetting/personalData">
                    <li :class="{current:(tabSwitch==tabSwitchList[0])}">个人资料</li>
                </router-link>
                <router-link to="/home/mySetting/MT4_Account">
                    <li :class="{current:(tabSwitch==tabSwitchList[1])}">MT4账号</li>
                </router-link>
            </ul>
        </div>
        <keep-alive>
            <router-view @changeTab="changeTab"></router-view>
        </keep-alive>
    </div>

</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import {USER_SETINFO} from 'store/user'
    export default {

        data(){
            return {
                imgName: String,
                visible: false,
                uploadList: [],
                tabSwitch: 'personalData',
                tabSwitchList: ['personalData', 'mt4Account'],
                titleActive: false,
                modalMsg: {},
            }
        },

        created(){
            this.$emit("changeCurLink", 'setting')
            this.tabSwitch = this.tabSwitchList[0]
        },

        methods: {
            changeTab(index){
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            },
        }
    }
</script>