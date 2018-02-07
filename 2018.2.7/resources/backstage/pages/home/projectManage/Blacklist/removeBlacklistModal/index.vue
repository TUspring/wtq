<style lang="css" scoped src="./css/index.css"></style>
<style>

</style>
<template>
    <div class="offShelf-publish">
        <div class="offShelf-publish-container">
            <p class="title">解除黑名单</p>
             <div class="ct-1">
                 <div class="project-name">
                   <p>您正在解除 <span style="color: #ffa114;">{{this.projectName}}</span>的黑名单限制，该用户当前待支付总额为 <span style="color: #ffa114;">{{this.unpaidMoney}}</span> 美元，解除后待支付金额将清零。         </p>
                 </div>

                 <div class="offShelf-btn">
                     <!--<span @click="close">取消</span>-->
                     <!--<span class="confirm" @click="determine">确定</span>-->
                     <Button @click="close">取消</Button>
                     <Button class="confirm" type="primary" @click="determine">确定</Button>
                 </div>
             </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                showModify: false,
                offShelfContent:'',
                projectId:'',
                projectName:'',
                unpaidMoney:'',
            }
        },
        props: ["modalMsg"],

        beforeMount (){
            this.projectId=this.modalMsg.id
            this.projectName=this.modalMsg.name
            this.unpaidMoney=this.modalMsg.price
        },

        methods: {
            determine(){
                var ajaxData={
                    id:this.projectId,
                }
                console.log(ajaxData);
                var httpName='解除'
                this.$http.delete('/admin/regular_project/blackList',{params:ajaxData})
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retMsg}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: `${httpName}成功`})
                            this.close()
                             this.Refresh()
                        } else {
                            this.$Modal.error({title: `解除失败`, content: retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `解除失败`, content: this.util.getHttpText(error)})
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