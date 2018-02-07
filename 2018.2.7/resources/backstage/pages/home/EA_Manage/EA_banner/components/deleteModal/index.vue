
<style lang="less" scoped>
    .removeBanner_modal {
        width: 560px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .removeBannerPic_content {
        width: 360px;
        padding-top: 30px;
        padding-bottom: 40px;
        margin: auto;
    }

    .removeBannerPic_content .btn {
        margin-top: 30px;
        width: 320px;
        height: 40px;
        text-align: center;
    }

    .removeBannerPic_content .btn button {
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
        border:1px solid #EEEEEE;
       background: url("./image/banner_pic.png") no-repeat;
        background-size:100% 100%;
        display: inline-block;
        float: left;
    }

    .plus-icon {
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -25px;
        position: absolute;
        font-size: 100px;
        color: #cccccc;
    }
    

    .removeBannerPic_content .btn .add_btn {
     margin-left: 30px;
    }

</style>
<template>
    <div class="removeBanner_modal custom_modal">
        <div class="modal_top">
            <span>删除Banner图片</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="removeBannerPic_content">
            <div class="banner-pic cl">
                <span>是否删除Banner图片：</span>
                <img class="pic" :src="singleData.path" alt="">
            </span>
            </div>
            <div class="btn">
                <Button  @click="close">取消</Button>
                <Button class="add_btn" @click="removeBanner" type="primary">确定</Button>
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
            removeBanner(){
                var ajaxData={
                    id:this.singleData.id,
                    position:this.singleData.position,
                }
                console.log(ajaxData);
                this.$http.delete('/admin/upload/del_banner',{params:ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retData,retMsg}=data;
                        if (retCode == '0') {
                            this.$Message.success({content:`删除banner成功`})
                            this.close()
                            this.$emit('Refresh')
                        } else {
                           this.$Message.error({content:`删除banner失败`})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `删除banner失败`, content: this.util.getHttpText(error)})

                    });
            },


            close(){
                this.$emit('close')
            }
        }
    }
</script>













