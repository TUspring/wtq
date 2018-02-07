<style lang="less" scoped>
    .batchAgreementModal {
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
    .item_content {
        width:450px;
        margin:0 auto;
        margin-bottom:20px;
    }
    .input_content {
        line-height:40px;
    }
    .title_content {
        width:150px;
        float:left;
    }
    .title_content span {
        float:right;
        font-size: 14px;
    }
    .value_content {
        width:300px;
        float:left;
        padding-left:20px;
    }
    .value_content input {
        width:200px;
        height:40px;
        border:1px solid #D4D4D4;
        border-radius: 6px;
        padding-left:10px;
    }
    .list_content {
        padding-right:100px;
        max-height:150px;
        overflow-y: auto;
    }
    .list_content li {
        float:left;
        font-size: 14px;
        color:#ffa114;
        margin-bottom:10px;
        margin-right:10px;
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
    .comfirm {
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
    <div class="batchAgreementModal">
        <div class="top_content">批量同意提现申请</div>

        <div class="item_content cl">
            <div class="title_content">
                <span>姓名:</span>
            </div>
            <div class="value_content cl">
                <ul class="list_content cl"  v-if="messageList.length">
                    <li v-for="value in messageList">{{value.bank.real_name}}</li>
                </ul>
                <ul class="order_list_content" v-if="!messageList.length">
                    <li>
                        <span>暂无要同意的用户</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="item_content input_content cl">
            <div class="title_content">
                <span>汇率(USD/CNY):</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入汇率(精确到小数点后4位)" name="汇率" v-validate data-vv-rules="required|decimal:4|between:0.01,10" v-model="parities">
            </div>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass comfirm" @click="submit">确定</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                parities:'',
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
                    var value=idList[i]
                    this.idObj[String(value)]=true
                }
                var list = this.modalData.list
                var messageList = []
                for (let i in list){
                    var list_item = list[i]
                    var id=list_item.id
                    if(this.idObj[String(id)]){
                        messageList.push(list[i])
                    }
                }
                this.messageList = messageList
                return  this.messageList
            },
            //提交批量同意申请
            submit(){
                var httpName = "批量同意"
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }

                if(this.modalData.idList == 0){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请先选择同意申请用户！'})
                    return
                }
                var ajaxData = {
                    parities:this.parities,
                    ids:this.modalData.idList,
                    type:1
                }
                this.$http.put('/admin/extract/audit_batch',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `批量同意成功`})
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