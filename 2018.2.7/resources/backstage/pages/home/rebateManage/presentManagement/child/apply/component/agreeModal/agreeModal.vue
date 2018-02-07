<style lang="less" scoped>
    .agreeModal {
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
    .top_content span {
        color:#ffa114;
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
        margin-top:10px;
        margin-right:10px;
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
    <div class="agreeModal">
        <div class="top_content">同意<span>{{real_name}}</span>的提现申请</div>

        <div class="item_content input_content cl">
            <div class="title_content">
                <span>汇率(USD/CNY):</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入汇率(精确到小数点后4位)" name="汇率" v-validate data-vv-rules="required|decimal:4|between:0.01,10" v-model="parities">
            </div>
        </div>
        <div class="item_content input_content cl">
            <div class="title_content">
                <span>提现金额(￥):</span>
            </div>
            <div class="value_content">
                <span>{{money*parities|money}}元</span>
            </div>
        </div>
        <div class="item_content input_content cl">
            <div class="title_content">
                <span>转账凭证号:</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入转账凭证号(选填)" v-model="transfer_voucher">
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
                real_name:'',
                money:'',
                id:'',
                parities:'',             //汇率
                transfer_voucher:''      //转账凭证号
            }
        },
        props:["modalData"],
        beforeMount(){
            console.log(this.modalData.id);
            this.real_name = this.modalData.id.real_name
            this.money = this.modalData.id.money
            this.id = this.modalData.id.id
        },
        methods:{
            //提交同意
            submit(){
                var httpName = "同意申请"

                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }

                if(this.transfer_voucher == ''){
                    this.transfer_voucher = 0
                }


                var ajaxData = {
                    id:this.id,
                    parities:this.parities,
                    transfer_voucher:this.transfer_voucher,
                    type:1
                }

                this.$http.put('/admin/extract/audit',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `同意申请成功`})
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