<style lang="css" scoped src="./css/recommendModal.css"></style>

<template>
    <div class="recommend_box">
        <div class="header">
            是否推荐：<span>{{recommendForm.name}}</span>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass comfirm" @click="recommend">推荐</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                recommendForm: {
                    id:'',
                    name:''
                }
            }
        },
        beforeMount (){
            this.recommendForm.name = this.modalMsg.id.name
            this.recommendForm.id = this.modalMsg.id.id
        },
        props: ["modalMsg"],
        methods: {

            //修改成功刷新页面
            Refresh() {
                this.$emit('nomalRefresh')
            },
            recommend() {
                var ajaxData={
                    id:this.recommendForm.id,
                    hot:1
                }
                this.$http.put('/admin/policy/put_hot',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: '推荐成功'})
                            this.cancel()
                            this.Refresh()
                        } else {
                            this.$Message.error({content: '推荐失败'})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `推荐失败`, content: this.util.getHttpText(error)})
                    });

            },
            cancel() {
                this.$emit('close')
            }
        }
    }
</script>