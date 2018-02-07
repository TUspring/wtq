
<style lang="less" scoped>
    .modify_modal {
        width: 560px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .modifyBanner_content {
        width: 320px;
        padding-top: 20px;
        padding-bottom: 40px;
        margin: auto;
    }

    .modifyBanner_content .btn {
        margin-top: 20px;
        width: 320px;
        height: 40px;
        text-align: center;
    }

    .modifyBanner_content .btn button {
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
        background:url("./image/banner_pic.png") no-repeat;
        background-size: 100% 100%;
        display: inline-block;
    }

    .select-box{
        margin:20px 0px 50px;
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

    .details-prompt{
        margin-top: 10px;
        padding:0px 10px;
        line-height: 20px;
        color: #333;
    }


    .modifyBanner_content .btn .add_btn {
      margin-left: 30px;
    }

</style>
<template>
    <div class="modify_modal custom_modal">
        <div class="modal_top">
            <span>修改Banner图片位置</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="modifyBanner_content">
            <div class="select-box">
                <span>图片位置：</span>
                <Select style="width:200px" v-model="banner_position">
                    <Option  :value="num" :key="num" v-for="num in enableNum">{{num}}</Option>
                </Select>
            </div>
            <div class="btn">
                <Button @click="close">取消</Button>
                <Button class="add_btn" @click="modifyBanner" type="primary">确定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                banner_position:'',
            }
        },
        computed: {

        },
        props:['modalMsg'],
        beforeMount() {
            this.singleData=this.modalMsg.id
            this.enableNum=this.modalMsg.enable_num
            this.banner_position=this.singleData.position
        },

        methods:{

            modifyBanner(){
                var ajaxData={
                    id:this.singleData.id,
                    old_position:this.singleData.position,
                    new_position:this.banner_position
                }
                console.log(ajaxData);
                this.$http.put('/admin/upload/update_position',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retData,retMsg}=data;
                        if (retCode == '0') {
                            this.$Message.success({content:`修改banner成功`})
                            this.close()
                            this.$emit('Refresh')
                        } else {
                            this.$Modal.error({title: `修改banner失败`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `修改banner失败`, content: this.util.getHttpText(error)})

                    });
            },


            close(){
                this.$emit('close')
            }
        }
    }
</script>













