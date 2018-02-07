
<style>
    .news-flash-box {
        background-color: #f5f5f5;
        padding-top: 30px;
    }

    .news-flash-content {
        margin: auto;
        width: 1200px;
        background-color: #FFFFFF;
        padding: 0px 20px 100px;
        border-radius: 6px;
        position: relative;
        }


    .hidden-jin10{
        top: 10px;
        left: 0px;
        width: 1200px;
        height: 50px;
        line-height: 50px;
        position: absolute;
        z-index: 900;
        color: #ffa114;
        font-size: 20px;
        text-align: center;
        border-bottom: 1px solid #ffa114;
        background-color: #fff;
    }
</style>
<template>
    <div class="news-flash-box">
        <div class="news-flash-content">
            <div class="hidden-jin10">财经资讯</div>
            <iframe id="iframe"  height="8000px"  width="100%"  frameborder="0" scrolling="no" src="http://www.jin10.com/example/jin10.com.html"></iframe>
        </div>
    </div>
</template>
<!--<script>-->
    <!--var script = document.createElement('script');-->
    <!--script.src = "http://www.jin10.com/example/jin10.com";-->
    <!--document.body.appendChild(script);-->
<!--</script>-->
<script>

    export default {
        data () {
            return {}
        },
        mounted(){
//                var test = document.getElementById('iframe的id').contentWindow.document.getElementById('iframe里面要获取的元素');
        },
        beforeMount(){
        },
        methods: {}
    }
</script>
