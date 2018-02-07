<style lang="css" scoped src="./css/index.css"></style>
<style>

</style>
<template>
    <div class="refuse-publish refusePublish">
        <div class="refuse-publish-container">
            <p class="title">是否取消 <span class="name">{{strategyName}} </span>的热门推荐</p>
            <div class="refuse-btn">
                <span @click="close">取消</span>
                <span class="confirm" @click="confirm">确定</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                strategyName:'',
                showModify: false,
            }
        },
        props: ["modalMsg"],

        beforeMount (){
//            console.log(this.modalMsg.id.id);
//            console.log(this.modalMsg.id.hot);
           this.strategyName=this.modalMsg.id.name
        },

        methods: {
            confirm(){
              var ajaxData={
                  id:this.modalMsg.id.id,
                  hot:0
                }
                this.$http.put('/admin/policy/put_hot',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.$Message.success({content: '取消成功'})
                            this.refresh()
                            this.close()
                        } else {
                            this.$Message.error({content: '取消失败'})
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            },
            close(){
                this.$emit("close")
            },
            refresh(){
                this.$emit('refresh')
            },
        }
    }
</script>