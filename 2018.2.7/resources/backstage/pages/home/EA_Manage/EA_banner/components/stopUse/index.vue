
<style lang="less" scoped>
    .stopEA_modal {
        width: 560px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .stopBannerPic_content {
        width: 360px;
        padding-top: 20px;
        padding-bottom: 40px;
        margin: auto;
    }

    .stopBannerPic_content .btn {
        margin-top: 20px;
        width: 320px;
        height: 40px;
        text-align: center;
    }

    .stopBannerPic_content .btn button {
        width: 100px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
    }

    .banner-pic span {
        display: inline-block;
        float: left;
    }

    .banner-pic .add-pic {
        width: 200px;
        height: 120px;
        position: relative;
        cursor: pointer;
        border: 1px solid #cccccc;
        display: inline-block;
    }
    .banner-pic .pic{
        width: 200px;
        height: 120px;
       background: url("./image/banner_pic.png") no-repeat;
        background-size:100% 100%;
        display: inline-block;
        float: left;
        border:1px solid #EEEEEE;
    }

    .details-prompt{
        margin-top: 10px;
        padding:0px 10px;
        line-height: 20px;
        color: #333;
    }
    

    .stopBannerPic_content .btn .add_btn {
     margin-left: 30px;
    }

</style>
<template>
    <div class="stopEA_modal custom_modal">
        <div class="modal_top">
            <span>停用Banner图片</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="stopBannerPic_content">
            <div class="banner-pic cl">
                <span>是否停止使用图片：</span>
                <img class="pic" :src="singleData.path" alt="">
            </span>
            </div>
            <p class="details-prompt">停止使用后，后台仍保留该图片，但是前台不显示，若需要重新使用，重新启用。</p>
            <div class="btn">
                <Button  @click="close">取消</Button>
                <Button class="add_btn" @click="stop_pic" type="primary">确定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                singleData:'',
            }
        },
        computed: {

        },
        props:['modalMsg'],
        beforeMount() {
            this.singleData=this.modalMsg.id
        },


        methods:{
                stop_pic(){
                    var ajaxData ={
                     id:this.singleData.id,
                      position:this.singleData.position
                    }
                    console.log(ajaxData);
                    return new Promise((resolve, reject) => {
                        this.$http.put('/admin/upload/set_unable',ajaxData)
                            .then((response) => {
                                const data = response.data;
                                const {retCode, retData = {}}=data;
                                if (retCode == '0') {
                                    this.$Message.success({content: `停用Banner图片成功`})
                                    this.$emit('close')
                                    this.$emit('Refresh')
                                    resolve();
                                } else {
                                    this.$Modal.error({title: `停用失败`, content: data.retMsg})
                                    reject();
                                }
                            }).catch((error) => {
                            this.$Modal.error({title: `停用失败`, content: this.util.getHttpText(error)})
                            reject();
                        });
                    })
                },

            close(){
                this.$emit('close')
            }
        }
    }
</script>













