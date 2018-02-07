<style lang="less" scoped>
    .recoveryModal {
        width:630px;
        border-radius:6px;
        padding-bottom:40px;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
        background:#fff;
    }
    .top_content {
        font-size: 18px;
        line-height: 50px;
        text-align: left;
        padding-left: 18px;
        margin-bottom: 50px;
        border-bottom: 1px solid #ccc;
    }
    .content {
        width:100%;
        text-align: center;
        font-size: 16px;
    }
    .content span {
        color:#FFA114;
    }


    .botton_content {
        width:100%;
        text-align: center;
        margin-top:70px;
    }
    .btnClass {
        display: inline-block;
        width: 120px;
        height: 40px;
    }
    .submit {
        margin-left:40px;
    }

</style>

<template>
    <div class="recoveryModal">
        <div class="top_content">恢复跟随</div>

        <div class="content">
            姓名:<span>{{name}}</span>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <Button class="btnClass cancel" @click="cancel">取消</Button>
            <Button class="btnClass submit" type="primary" @click="submit">确定</Button>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                name:'',   //姓名
                id:''      //项目ID
            }
        },
        props:["modalMsg"],
        beforeMount(){
            this.name = this.modalMsg.id.users.name
            this.id = this.modalMsg.id.id
        },
        methods:{
            //提交
            submit(){
                var httpName = "恢复跟随"
                var ajaxData = {
                    id:this.id
                }
                this.$http.put('/admin/regular_project/process/pRenew',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `${httpName}成功`})
                        this.cancel()
                        this.Refresh()
                    }else{
                        this.$Modal.error({title:`${httpName}失败`,content:retMsg})
                    }
                }).catch((error) =>{
                    this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },
            Refresh(){
                this.$emit('Refresh')
            },
            cancel(){
                this.$emit('close')
            }
        }
    }
</script>