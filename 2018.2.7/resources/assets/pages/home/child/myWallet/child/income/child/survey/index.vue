<style lang="css" scoped>
    .c1{
        background: #fff;
        border-radius: 6px;
    }
    .c2,.c3,.c4 {
        background: #fff;
        border-radius: 6px;
        margin-top:20px;
    }
    .title_content {
        padding:0 30px;
        height:60px;
        line-height:60px;
        font-size: 14px;
        color: rgb( 51, 51, 51 );
        border-bottom:1px solid #F5F5F5;
    }
    .title_content .time {
        font-size: 12px;
        color: rgb( 153, 153, 153 );
        float:right;
    }
   .c1_chart,.c2_chart,.c3_chart,.c4_chart {
        padding-bottom:40px;
    }

</style>

<template>
    <div class="suvey_content">
        <!--1、收入变化情况-->
        <div class="c1">
            <div class="title_content">
                <span>收入变化情况</span>
                <span class="time">2017-04-01 至 2017-07-19</span>
            </div>
            <!--图表-->
            <div class="c1_chart"></div>
        </div>

        <!--2、收入构成-->
        <div class="c2">
            <div class="title_content">
                <span>收入构成</span>
            </div>
            <!--图表-->
            <div class="c2_chart"></div>
        </div>

        <!--3、直接收入构成-->
        <div class="c3">
            <div class="title_content">
                <span>直接收入构成</span>
            </div>
            <!--图表-->
            <div class="c3_chart"></div>
        </div>

        <!--4、间接收入构成-->
        <div class="c4">
            <div class="title_content">
                <span>间接收入构成</span>
            </div>
            <!--图表-->
            <div class="c4_chart"></div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        activated(){
            this.$emit("changeTab",0)//切换局部导航
        }
    }
</script>