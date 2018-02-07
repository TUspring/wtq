<style lang="less" scoped>
    .setModal {
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
        padding:0 150px;
        margin-bottom:20px;
    }
    .item_content p {
        font-size: 14px;
        margin-bottom:10px;
    }
    .item_content input {
        width:300px;
        height:40px;
        border:1px solid #D4D4D4;
        border-radius: 6px;
        padding-left:10px;
    }
    .small_item_content {
        padding:0 150px;
        margin-bottom:20px;
    }
    .small_item_content span {
        font-size: 14px;
    }
    .small_item_content input {
        width:60px;
        height:30px;
        border:1px solid #D4D4D4;
        border-radius: 6px;
        padding-left:10px;
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
    <div class="setModal">
        <div class="top_content">等级及佣金设置</div>

        <div class="item_content">
            <p>等级名称:</p>
            <input type="text" v-model="name"  name="等级名称" v-validate data-vv-rules="required|max:5">
        </div>
        <div class="small_item_content">
            <span>等级值:</span>
            {{level}}
        </div>

        <div class="small_item_content">
            <span>直接佣金:</span>
            <input type="text" v-model="direct_commission"  name="直接佣金" v-validate data-vv-rules="required|decimal:2" >美元/手
        </div>
        <div class="small_item_content">
            <span>间接佣金:</span>
            上级标准-下级标准
        </div>
        <div class="small_item_content">
            <span>同级奖励:</span>
            <input type="text" v-model="peer_reward"  name="同级奖励" v-validate data-vv-rules="required|decimal:2" >%
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
                level:'',                   //等级值
                name:'',                   //等级名称
                direct_commission:'',     //直接佣金
                peer_reward:''           //同级奖励
            }
        },
        props:["modalData"],
        beforeMount(){
            this.name = this.modalData.name
            this.level = this.modalData.level
            this.direct_commission = this.modalData.direct_commission
            this.peer_reward = this.modalData.peer_reward
        },
        methods:{
            //提交设置
            submit (){
                const httpName = "等级设置"
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }
                if(this.direct_commission >100000){
                    this.$Modal.warning({content:'直接佣金不能超过100000美元！'})
                    return
                }
                if(this.peer_reward >100){
                    this.$Modal.warning({content:'同级奖励不能超过100%！'})
                    return
                }
                var ajaxData = {
                    name:this.name,
                    direct_commission:this.direct_commission,
                    peer_reward:this.peer_reward
                }
                this.$http.post('/admin/level/put/'+this.modalData.id,ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `${httpName}成功`})
                        this.cancel()
                        this.nomalRefresh()
                    }else{
                        this.$Modal.error({title:`${httpName}失败`,content:retMsg})
                    }
                }).catch((error) =>{
                    this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },
            nomalRefresh(){
                this.$emit('nomalRefresh')
            },
            cancel(){
                this.$emit('close')
            }
        }
    }
</script>