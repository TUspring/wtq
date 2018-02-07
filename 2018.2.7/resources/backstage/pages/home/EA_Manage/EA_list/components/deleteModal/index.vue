
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

    .removeEA_content .btn .cancel_btn {
        margin-right: 30px;
    }
</style>
<template>
    <div class="removeEA_modal custom_modal">
        <div class="modal_top">
            <span>删除EA</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="removeEA_content">
            <p class="prompt">是否删除EA： <span class="tx">  {{EA_name}}</span></p>
            <div class="btn">
                <Button class="cancel_btn" @click="close">取消</Button>
                <Button  @click="deleteEA" type="primary">确定</Button>
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
            this.EA_id=this.modalMsg.id
            this.EA_name=this.modalMsg.name
        },

        methods:{
            deleteEA(){
                var ajaxData={
                    id:this.EA_id,
                }
                var httpName='删除EA'
                this.$http.delete('/admin/ea_manage/del_ea',{params:ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retData,retMsg}=data;
                        if (retCode == '0') {
                            this.$Modal.success({content: `删除EA成功！`})
                            this.$emit('close')
                            this.$emit('Refresh')
                        } else {
                           this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                       this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})

                    });
            },



            close(){
                this.$emit('close')
            }
        }
    }
</script>













