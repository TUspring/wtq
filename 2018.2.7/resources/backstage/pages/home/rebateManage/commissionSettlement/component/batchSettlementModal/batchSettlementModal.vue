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
        width:450px;
        margin:0 auto;
        max-height:250px;
        background:#F5F5F5;
        padding:20px 20px;
        overflow-y: auto;
    }
    .title {
        width:450px;
        margin:0 auto;
        padding:20px 20px;
        font-size: 16px;
    }
    .order_list_content {
        font-size: 14px;
    }
    .order_list_content span {
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
        <div class="top_content">批量结算佣金</div>
        <div class="title">是否结算以下用户的佣金</div>
        <div class="content">
            <ul class="order_list_content" v-for="value in messageList">
                <li>
                    <span>{{value.users.real_name}}</span>，订单号为<span>{{value.Ticket}}</span>
                </li>
            </ul>
            <ul class="order_list_content" v-if="!messageList.length">
                <li>
                    <span>暂无要结算的用户！</span>
                </li>
            </ul>
        </div>
        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass submit" @click="batchSettlement">结算</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                messageList:[],
                idObj:{}

            }
        },
        props:["modalData"],
        beforeMount(){
            this.getMessageList()
        },
        methods:{
            //由传过来的id检索到对应用户名和订单号
            getMessageList(){
                var idList = this.modalData.idList
                for(var i in idList){
                    var value = idList[i]
                    this.idObj[String(value)] = true
                }
                var list = this.modalData.list
                var messageList = []
                for (let i in list){
                    var list_item = list[i]
                    var id = list_item.id
                   if(this.idObj[String(id)]){
                       messageList.push(list_item)
                   }
                }
                this.messageList = messageList
                return  this.messageList
            },

            //批量结算
            batchSettlement(){
                var httpName = "批量结算"
                if(this.modalData.idList == 0){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请先选择要结算的订单！'})
                    return
                }
                var ajaxData = {
                    ids:this.modalData.idList
                }
                this.$http.put('/admin/brokerage/brokerage_close_batch',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `批量结算成功`})
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