
<style lang="less" scoped>
    .details_modal {
        width: 500px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .details_content {
        width: 400px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin: auto;
    }

    .content-title-box{
        height: 90px;
        padding-left: 20px;
    }
    .content-title-box p{
        width: 100px;
        height: 50px;
        font-size: 14px;
        color: #333333;
        float: left;
    }
    .content-title-box .news_content{
        color: #999;
        width: 200px;
        height: 100px;
        float: left;
    }


    .recommend-btn-box{
        text-align: center;
        margin-top: 30px;
    }
    .recommend-btn-box span{
        display:inline-block;
        width:70px;
        height:30px;
        line-height:30px;
        text-align:center;
        border:1px solid  #ffa114;
        color:#ffa114;
        border-radius:4px;
        cursor:pointer;
    }
    .recommend-btn-box  .cancel{
        border:1px solid  #cccccc;
        color: #666;
        margin-right: 20px;
    }
</style>
<template>
    <div class="details_modal custom_modal">
        <div class="modal_top">
            <span>推荐要闻</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="details_content">
            <div class="content-title-box cl">
                <p>是否推荐要闻：</p>
                <p class="news_content">2018年顶级投资交易：买入欧元吧！目标看向1.25</p>
            </div>

            <div class="recommend-btn-box">
                <span class="cancel" @click="cancel">取消</span>
                <span>确定</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        computed: {

        },
        beforeMount() {

        },

        methods:{
            close(){
                this.$emit('close')
            },
            cancel(){
                this.close()
            }
        }
    }
</script>





