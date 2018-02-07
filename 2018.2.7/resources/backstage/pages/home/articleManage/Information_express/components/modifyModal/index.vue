
<style lang="less" scoped>
    .details_modal {
        width: 540px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .details_content {
        width: 540px;
        padding-top: 20px;
        padding-bottom: 40px;
        margin: auto;
    }

   .content-title-box{
       height: 90px;
       padding-left: 20px;
       display: flex;
       align-items: center;
   }
    .content-title-box span{
        width: 80px;
        font-size: 14px;
        color: #333333;
        display: inline-block;
    }
    .content-title-box input{
        width: 200px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #cccccc;
        padding-left: 10px;
        color: #666;
    }
    .content-textarea-box{
        padding-left: 20px;
    }
    .content-textarea-box p{
        width: 80px;
        font-size: 14px;
        float: left;
        color: #333333;
        display: inline-block;
    }
    .content-textarea-box .textarea-box{
        height: 200px;
        width: 300px;
        float: left;
    }
    .textarea-box textarea{
        width: 300px;
        height: 200px;
        padding: 10px;
        font-size: 14px;
        color: #666;
        resize: none;
        border: 1px solid #cccccc;
    }
    .modify-btn-box{
        text-align: center;
        margin-top: 50px;
    }
    .modify-btn-box span{
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
    .modify-btn-box  .cancel{
        border:1px solid  #cccccc;
        color: #666;
        margin-right: 20px;
    }
</style>
<template>
    <div class="details_modal custom_modal">
        <div class="modal_top">
            <span>修改资讯</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="details_content">
            <div class="content-title-box">
                <span>标题：</span>
                <input type="text">
            </div>
            <div class="content-textarea-box cl">
                <p>内容：</p>
                <div class="textarea-box">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="modify-btn-box">
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





