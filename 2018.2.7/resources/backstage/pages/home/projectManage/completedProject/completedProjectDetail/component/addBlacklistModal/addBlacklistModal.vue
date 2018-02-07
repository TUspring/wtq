<style lang="less" scoped>
    .addBlacklistModal{
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
    .item_content {
        width:450px;
        margin:0 auto;
        margin-bottom:20px;
    }
    .title_content {
        width:150px;
        line-height:40px;
        float:left;
    }
    .title_content span {
        float:right;
        font-size: 14px;
    }
    .value_content {
        width:300px;
        line-height:40px;
        float:left;
        padding-left:20px;
    }
    .value_content input {
        width: 180px;
        height: 32px;
        border: 1px solid #D4D4D4;
        border-radius: 4px;
        padding-left: 6px;
        margin-left: 6px;
    }


    .botton_content {
        width:100%;
        text-align: center;
        margin-top:50px;
    }
    .btnClass {
        display: inline-block;
        width: 100px;
        height: 40px;
    }
    .submit {
        margin-left:40px;
    }

</style>

<template>
    <div class="addBlacklistModal">
        <div class="top_content">加入黑名单</div>

        <div class="item_content cl">
            <div class="title_content">
                <span>姓名:</span>
            </div>
            <div class="value_content">
                <span>{{name}}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>待支付金额:</span>
            </div>
            <div class="value_content">
               $ <input type="text" placeholder="请输入该项目的待付金额" name="待付金额" v-model="unpaid_money"  v-validate data-vv-rules="required|decimal:2">
            </div>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <Button class="btnClass" @click="cancel">取消</Button>
            <Button type="primary" class="btnClass submit" @click="submit">确定</Button>
        </div>


    </div>
</template>

<script>
    export default{
        data(){
            return {
                name:'',
                id:'',
                unpaid_money:''
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
                var httpName = "加入黑名单"
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }
                if(this.unpaid_money <= 0){
                    this.$Modal.error({title:`${httpName}失败`,content:'待付金额不能小于0'})
                    return
                }

                var ajaxData = {
                    id:this.id,
                    unpaid_money:this.unpaid_money
                }
                this.$http.post('/admin/regular_project/blackList',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0') {
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