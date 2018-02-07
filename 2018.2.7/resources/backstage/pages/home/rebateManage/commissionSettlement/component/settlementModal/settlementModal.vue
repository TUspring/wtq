<style lang="less" scoped>
    .batchSettlementModal {
        width:630px;
        border-radius:6px;
        padding-bottom:40px;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
        background:#fff;
    }
    .top_content {
        font-size: 20px;
        padding:30px 0;
        text-align: center;
    }
    .content {
        text-align: center;
    }
    .content p {
        font-size: 14px;
    }
    .content span {
        color: rgb( 255, 161, 20 );
    }

    .botton_content {
        width:100%;
        text-align: center;
        margin-top:40px;
    }
    .btnClass {
        display: inline-block;
        width: 121px;
        height: 41px;
        line-height: 41px;
        text-align: center;
        border-radius: 6px;
        font-size: 14px;
        cursor:pointer;
    }
    .submit {
        color:#fff;
        background-color: rgb( 255, 161, 20 );
        margin-right:40px;
    }
    .cancel {
        color: rgb( 153, 153, 153 );
        background-color: rgb( 238, 238, 238 );
    }
</style>

<template>
    <div class="batchSettlementModal">
        <div class="top_content">结算佣金</div>

        <div class="content">
            <p>
                是否结算 <span>{{name}}</span>订单号为<span>{{Ticket}}</span>的佣金
            </p>
        </div>
        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass submit" @click="submit">结算</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                name:'',
                Ticket:'',
                id:''
            }
        },
        props:["modalData"],
        beforeMount(){
            this.name = this.modalData.id.belong_user.real_name
            this.Ticket = this.modalData.id.Ticket
           this.id = this.modalData.id.id
        },
        methods:{
            submit(){
                var httpName = "结算"
                this.$http.put('/admin/brokerage/brokerage_close/'+this.id)
                .then((response)=>{
                    const data = response.data
                    const {retCode} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `结算成功`})
                        this.cancel()
                        this.Refresh()
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