
<style lang="less" scoped>
    .removeEA_modal {
        width: 560px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .removeEA_content {
        width: 320px;
        padding-top: 20px;
        padding-bottom: 40px;
        margin: auto;
    }

    .removeEA_content .prompt {
        width: 320px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #333333;
        font-size: 16px;
        margin-top: 40px;
    }
    .removeEA_content .tx{
        color: #999;
    }
    .removeEA_content .btn {
        margin-top: 20px;
        width: 320px;
        height: 40px;
        text-align: center;
    }

    .removeEA_content .btn button {
        width: 100px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
    }

    .removeEA_content .btn .remove_btn {
        background-color: #FFA114;
        color: #ffffff;
        cursor: pointer;
    }

    .removeEA_content .btn .cancel_btn {
        background-color: #D4D4D4;
        color: #666666;
        margin-right: 30px;
        cursor: pointer;
    }
</style>
<template>
    <div class="removeEA_modal custom_modal">
        <div class="modal_top">
            <span>删除EA</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="removeEA_content">
            <p class="prompt">是否删除EA： <span class="tx">vvvv</span></p>
            <div class="btn">
                <button class="cancel_btn" @click="close">取消</button>
                <button class="remove_btn">删除</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                EA_name:'',
            }
        },
        props:['modalMsg'],
        computed: {

        },
        beforeMount() {
        },

        methods:{
            close(){
                this.$emit('close')
            }
        }
    }
</script>













