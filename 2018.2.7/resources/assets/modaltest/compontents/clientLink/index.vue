<style lang="less" scoped>
    .clientLink {
        background: #fff;
        font-size: 0;
        width: 100%;
        line-height: 1.5;
        .link-tail{
            position: absolute;
            left: 10px;
            top: 0;
            height: 100%;
            width: 1px;
            padding: 28px 0 4px 0;
            .ivu-icon{
                font-size: 22px;
                color: #ccc;
            }
        }
        .link-item{
            width: 100%;
            display: block;
            position: relative;
            vertical-align: top;
            .link-head{
                float: left;
                background-color: #fff;
                position: relative;
                display: inline-block;
                vertical-align: top;
                .link-head-inner{
                    width: inherit;
                    height: inherit;
                    line-height: inherit;
                    border-radius: 0;
                    border: 0;
                    background: none;
                    margin-right: 10px;
                    text-align: center;
                    display: block;
                    transition: background-color 0.2s ease-in-out;
                    font-size: 14px;
                    .ivu-icon{
                        font-size: 24px;
                        top: 2px;
                        width: 20px;
                        height: 20px;
                        color: #ccc;
                        left: 4px;
                        line-height: 1;
                        position: relative;
                    }
                }
            }
            .link-main{
                min-height: 47px;
                overflow: hidden;
                display: block;
                margin-top: 2.5px;
                position: relative;
                vertical-align: top;
                .link-title{
                    line-height: 26px;
                    margin-top: 2.5px;
                    display: inline-block;
                    margin-bottom: 4px;
                    padding-right: 10px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #999;
                    background: #fff;
                    text-overflow: ellipsis;
                    height: 26px;
                    overflow: hidden;
                    white-space: nowrap;
                    max-width: 100%;
                    &:hover{
                        color: #555;
                        cursor: pointer;
                     }
                }
            }
            &.cur{
                .link-head{
                    .ivu-icon{
                        color: #ffa71a;
                    }
                }
                .link-main{
                    .link-title{
                        color: #555;
                    }
                }
            }
            &:last-child{
                .link-tail{
                    display: none;
                }
             }
        }
    }

</style>
<template>
    <div class="clientLink">
        <div class="link-item" style="width: 100%;">
            <div class="link-tail"><Icon type="ios-arrow-thin-down"></Icon></div>
            <div class="link-head">
                <div class="link-head-inner">
                    <Icon class="ivu-icon ivu-icon-person"></Icon>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title">用户1</div>
            </div>
        </div>
        <div class="link-item cur" style="width: 100%;">
            <div class="link-tail"><Icon type="ios-arrow-thin-down"></Icon></div>
            <div class="link-head">
                <div class="link-head-inner">
                    <Icon type="person"></Icon>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title" title="用大声道撒多都是用大声道撒多都是">用大声道撒多都是用大声道撒多都是</div>
            </div>
        </div>
        <div class="link-item" style="width: 100%;">
            <div class="link-tail"><Icon type="ios-arrow-thin-down"></Icon></div>
            <div class="link-head">
                <div class="link-head-inner">
                    <Icon class="ivu-icon ivu-icon-person"></Icon>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title" title="rkdkfuriejwoqpslrkdkfuriejwoqpsl">rkdkfuriejwoqpslrkdkfuriejwoqpsl</div>
            </div>
        </div>
        <div class="link-item" style="width: 100%;">
            <div class="link-tail"><Icon type="ios-arrow-thin-down"></Icon></div>
            <div class="link-head">
                <div class="link-head-inner">
                    <Icon class="ivu-icon ivu-icon-person"></Icon>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title">用dsadsad户1</div>
            </div>
        </div>
        <div class="link-item" style="width: 100%;">
            <div class="link-tail"><Icon type="ios-arrow-thin-down"></Icon></div>
            <div class="link-head">
                <div class="link-head-inner">
                    <Icon class="ivu-icon ivu-icon-person"></Icon>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title">用户1asdasd</div>
            </div>
        </div>
        <div class="link-item" style="width: 100%;">
            <div class="link-tail"><Icon type="ios-arrow-thin-down"></Icon></div>
            <div class="link-head">
                <div class="link-head-inner">
                    <Icon class="ivu-icon ivu-icon-person"></Icon>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title">用户1</div>
            </div>
        </div>
        <!--<div class="userStepBox">-->
        <!--<Steps :current="3" direction="vertical">-->
        <!--<Step icon="person" status="wait" title="用户2" @click="stepclick()"></Step>-->
        <!--<Step icon="person" status="wait" title="用户2"></Step>-->
        <!--<Step icon="person" status="process" title="用户3"></Step>-->
        <!--<Step icon="person" status="wait" title="用户4"></Step>-->
        <!--<Step icon="person" status="wait" title="用户5"></Step>-->
        <!--<Step icon="person" status="wait" title="用户6"></Step>-->
        <!--<Step icon="person" status="wait" title="用户4"></Step>-->
        <!--<Step icon="person" status="wait" title="用户5"></Step>-->
        <!--<Step icon="person" status="wait" title="用户6"></Step>-->
        <!--</Steps>-->
        <!--</div>-->
    </div>
</template>
<script>
    export default {
        data(){
            return {
                showimg: false,
                ivewModal: false
            }
        },
        computed: {},

        beforeMount(){

        },
        methods: {
            stepclick(){
                console.log(11)
            }
        }
    }
</script>