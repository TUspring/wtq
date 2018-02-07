<style lang="less" scoped>
    .removeRelation_modal {
        width: 630px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .removeRelation_content {
        width: 320px;
        padding-top: 20px;
        padding-bottom: 40px;
        margin: auto;
    }

    .removeRelation_content .prompt {
        width: 320px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #333333;
        font-size: 16px;
        margin-top: 40px;
    }

    .removeRelation_content .btn {
        margin-top: 20px;
        width: 320px;
        height: 40px;
        text-align: center;
    }

    .removeRelation_content .btn button {
        width: 120px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
    }

    .removeRelation_content .btn .remove_btn {
        background-color: #FFA114;
        color: #ffffff;
        margin-right: 40px;
        cursor: pointer;
    }

    .removeRelation_content .btn .cancel_btn {
        background-color: #eeeeee;
        color: #999999;
        cursor: pointer;
    }
</style>
<template>
    <div class="removeRelation_modal custom_modal">
        <div class="modal_top">
            <span>移除关联</span>
            <span @click="close" class="iconfont">&#xe63c;</span>
        </div>
        <div class="removeRelation_content">

            <p class="prompt">是否移除EWG-58801319的关联记录？</p>
            <div class="btn">
                <button class="remove_btn" @click="removeMT4">移除</button>
                <button class="cancel_btn" @click="close">取消</button>
            </div>


        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                choice: '',
                showModify: false,
            }
        },
        props:["modalMsg"],
        methods: {
            removeMT4(){
                var ajaxData={
                    id:this.modalMsg.id.id,
                    MT4_account:this.modalMsg.id.MT4_account,
                    server_name:this.modalMsg.id.platform.server_name
                }
                var httpName='移除';
                this.$http.post('/MT4/remove_relate',ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if(retCode=='0'){
                            this.$Message.success({content: `${httpName}成功`})
                            this.updateData()
                            this.$emit('close')
                        }else{
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
                        }

                    })
                    .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
            },

            close(){
                this.$emit('close')
            },
            updateData () {
                this.$emit('event')
                this.close()
            },
            agree(){
                this.close()
                this.$emit('agree')
            },

        }
    }
</script>


