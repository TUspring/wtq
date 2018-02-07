
<style lang="less" scoped>
    .details_modal {
        width: 640px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .details_modal  .modal_top{
        height: 80px;
        padding-top:15px;
    }
    .modal_top div h5{
        padding-left: 10px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
    }
    .modal_top  div p{
        padding-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #999;
    }
    .details_content {
        width: 640px;
        padding:10px 10px 40px;
        margin: auto;
    }
    .details_content  .details-top-txt{
        padding: 10px 10px 30px;
        background-color: #D4D4D4;
    }

    .details-top-txt p{
        width: 40px;
        float: left;
    }
    .details-top-txt .prompt{
        font-size: 14px;
        width: 550px;
    }

  .prompt-details{
      max-height: 400px;
    padding:20px 0px;
    font-size: 14px;
    line-height: 24px;
    color: #666;
     overflow-y: scroll;
}

</style>
<template>
    <div class="details_modal custom_modal">
        <div class="modal_top">
           <div>
               <h5>顶级投资交易：买欧元吧！目标看向1.25</h5>
               <p>2017-12-06 14:41</p>
           </div>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="details_content">
              <div class="details-top-txt cl">
                  <p>导读：</p>
                  <p class="prompt">FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行</p>
              </div>
            <div class="prompt-details">
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
                FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行FX168财经报社（香港）讯，国际知名投行
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
            }
        }
    }
</script>













