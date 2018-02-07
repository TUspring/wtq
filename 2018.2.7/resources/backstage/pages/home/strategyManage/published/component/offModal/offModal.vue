<style lang="css" scoped src="./css/offModal.css"></style>

<template>
    <div class="off_box">
        <div class="header">
            下架已发布策略：<span>{{name}}</span>
        </div>

        <div class="off_content cl">
            <div class="reason_title cl">
                <span>下架理由:</span>
            </div>
            <div class="reason_input">
                <textarea v-model="offForm.content" placeholder="请输入不超过20个字的下架理由"></textarea>
            </div>
        </div>
        
        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass comfirm" @click="confirm">确定</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                name:'',
                offForm: {
                    id:'',
                    review_status:'',
                    content: ''
                }
            }
        },
        beforeMount(){
            this.name = this.modalMsg.id.name
            this.offForm.id=this.modalMsg.id.id
        },
        props: ["modalMsg"],
        methods: {
            //修改成功刷新页面
            Refresh() {
                this.$emit('offRefresh')
            },
            confirm() {
                if(this.offForm.content.length >20){
                    this.$Modal.warning({title: `下架失败`, content: '下架理由不能超过20个字！'})
                    return
                }
                var ajaxData = {
                    id:this.offForm.id,
                    review_status:5,
                    content:this.offForm.content
                }
                var httpName = "下架"
                this.$http.put('/admin/policy/put_out',ajaxData)
                    .then((response)=>{
                        const data = response.data
                        const {retCode}= data
                        if(retCode == '0'){
                            this.$Message.success({content: `${httpName}成功`})
                            this.$emit('close')
                            this.Refresh()
                        }
                    })
                    .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
            },
            cancel() {
                this.$emit('close')
            }
        }
    }
</script>