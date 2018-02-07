<style lang="css" scoped>
    .modifyModal {
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
        width:350px;
        line-height: 40px;
        margin:0 auto;
    }
    .title_content {
        width:120px;
        float:left;
    }
    .title_content span {
        font-size: 14px;
    }
    .value_content {
        float:left;
    }
    .value_content span {
        font-size: 14px;
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
<style lang="less">
    .value_content .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .value_content .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height:40px;
        line-height: 40px;
    }
    .value_content .ivu-select-single .ivu-select-selection {
        height:40px;
    }
</style>

<template>
    <div class="modifyModal">
        <div class="top_content">账号返佣权限修改</div>

        <div class="item_content cl">
            <div class="title_content">
                <span>当前返佣权限:</span>
            </div>
            <div class="value_content">
                <span v-if="type==1">返佣</span>
                <span v-if="type==2">不返佣</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>修改后返佣权限:</span>
            </div>
            <div class="value_content">
                <Select style="width:200px;" v-model="is_rebate">
                    <Option :value="1">返佣</Option>
                    <Option :value="2">不返佣</Option>
                </Select>
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
                type:'',
                is_rebate:'',
                id:''
            }
        },
        props:["modalMsg"],
        beforeMount(){
            this.id = this.modalMsg.id.id
            this.type = this.modalMsg.id.is_rebate
        },
        methods:{
            submit(){
                var httpName = "修改"
                if(this.modalMsg.id.is_rebate == this.is_rebate){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请选择与当前不同的权限进行修改！'})
                    return
                }
                if(this.is_rebate == ''){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请选择权限进行修改！'})
                    return
                }
                var ajaxData = {
                    is_rebate:this.is_rebate
                }
                this.$http.post('admin/MT4/put_is_rebate/'+this.id,ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0') {
                        this.$Message.success({content: `${httpName}成功`})
                        this.cancel()
                        this.Refresh()
                    }else{
                        this.$Modal.warning({title:`${httpName}失败`,content:retMsg})
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