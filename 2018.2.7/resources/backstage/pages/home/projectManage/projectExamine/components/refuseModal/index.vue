<style lang="css" scoped src="./css/index.css"></style>
<style>

</style>
<template>
    <div class="refuse-examine">
        <div class="refuse-examine-container">
            <p class="title">拒绝发布{{projectName}} 项目</p>
            <div class="refuse-edit">
                <span>拒绝理由:</span>
                <textarea v-model="refuseContent" placeholder="100字以内"></textarea>
            </div>
            <div class="refuse-btn">
                <!--<span @click="close">取消</span>-->
                <Button @click="close">取消</Button>
                <Button type="primary" class="confirm" @click="determine">确定</Button>
                <!--<span class="confirm" @click="determine">确定</span>-->
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                showModify: false,
                refuseContent:'',
                projectId:'',
                projectName:'',
            }
        },
        props: ["modalMsg"],

        beforeMount() {
            this.projectId=this.modalMsg.id
            this.projectName=this.modalMsg.name
        },

        methods: {
            determine(){
                if (this.refuseContent==''){
                    this.$Modal.warning({title: `提示`, content: '请输入拒绝理由！'})
                    return
                }

               var regExpTest=/^[\s\S]{1,100}$/
                if (!regExpTest.test(this.refuseContent)){
                    this.$Modal.warning({title: `提示`, content: '拒绝理由在100字以内！'})
                    return
                }
                var ajaxData={
                  id:this.projectId,
                  content:this.refuseContent
                }
                this.$http.put('/admin/regular_project/check/cReject',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retData,retMsg}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: `提交拒绝验证成功`})
                            this.close()
                             this.Refresh()
                        } else {
                            this.$Modal.error({title: `失败`, content:retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `失败`, content: this.util.getHttpText(error)})
                    });

            },
            Refresh(){
                this.$emit('Refresh')
            },
            close(){
                this.$emit('close')
            }
        }
    }
</script>