
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


    .banner-pic .pic{
        width: 200px;
        height: 120px;
       background: url("./image/banner_pic.png") no-repeat;
        background-size:100% 100%;
        display: inline-block;
        float: left;
        margin-bottom: 20px;
    }
    .banner-left-title{
        width: 90px;
        line-height: 32px;
        display: inline-block;
    }

    .stopBannerPic_content .btn .add_btn {
        margin-left: 30px;
    }

</style>
<template>
    <div class="stopEA_modal custom_modal">
        <div class="modal_top">
            <span>启用Banner图片</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="stopBannerPic_content">
            <div class="banner-pic cl">
                <span class="banner-left-title">是否启用图片：</span>
                <img class="pic" :src="singleData.path" alt="">
               </span>
            </div>
            <div class="banner-pic cl">
                <span class="banner-left-title">图片位置：</span>
                <Select style="width:200px" v-model="pic_position">
                    <Option :value="num" :key="num" v-for="num in enableNumData">{{num}}</Option>
                    </Select>
                </span>
            </div>
            <div class="btn">
                <Button  @click="close">取消</Button>
                <Button class="add_btn" @click="startUse_Banner" type="primary">启用</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                singleData:'',
                pic_position:'',
                enableNum:'',
            }
        },
        computed: {
            enableNumData(){
                return this.enableNum +1
            },
        },
        props:['modalMsg'],
        beforeMount() {
            this.singleData=this.modalMsg.id,
            this.enableNum=this.modalMsg.enable_num
    },

        methods:{
                startUse_Banner(){
                    var ajaxData ={
                       id:this.singleData.id,
                       position:this.pic_position
                    }
                    return new Promise((resolve, reject) => {
                        this.$http.put('/admin/upload/set_enable',ajaxData)
                            .then((response) => {
                                const data = response.data;
                                const {retCode, retData = {}}=data;
                                if (retCode == '0') {
                                    this.$Message.success({content: `启用Banner图片成功`})
                                    this.$emit('close')
                                    this.$emit('Refresh')
                                    resolve();
                                } else {
                                    this.$Message.error({content: `启用Banner图片失败`})
                                    reject();
                                }
                            }).catch((error) => {
                        this.$Modal.error({title: `启用Banner图片失败`, content: this.util.getHttpText(error)})
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













