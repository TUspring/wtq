<style lang="css" scoped src="./css/index.css"></style>
<style>

</style>
<template>
    <div class="refuse-publish refusePublish">
        <div class="refuse-publish-container">
            <p class="title">拒绝发布策略: <span style="color: #ffa114;"> {{UserInfo.name}}</span></p>
            <div class="refuse-edit">
                <span>拒绝理由:</span>
                <textarea v-model="refuseContent"></textarea>
            </div>
            <div class="refuse-btn">
                <Button @click="close">取消</Button>
                <Button type="primary" class="confirm" @click="determine">确定</Button>
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
            }
        },
        props: ["modalMsg"],

        beforeMount (){
            this.UserInfo=this.modalMsg.id
        },

        methods: {
            determine(){
                if (this.refuseContent==''){
                    this.$Modal.warning({title: `提示`, content: '请输入拒绝理由！'})
                    return
                }
                var ajaxData={
                    id:this.UserInfo.id,
                    content:this.refuseContent,
                    review_status:2,
                }
               var httpName=''
                this.$http.put('/admin/policy/audit',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: `${httpName}成功`})
                            this.close()
                             this.refresh()
                        } else {
                            console.log(5);
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `失败`, content: this.util.getHttpText(error)})
                    });

            },
            refresh(){
                this.$emit('refresh')
            },
            close(){
                this.$emit('close')
            }
        }
    }
</script>