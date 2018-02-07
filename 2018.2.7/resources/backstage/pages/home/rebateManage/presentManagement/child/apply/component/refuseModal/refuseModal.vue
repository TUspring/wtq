<style lang="less" scoped>
    .refuseModal {
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
    .value_content textarea {
        width:200px;
        height:150px;
        line-height: 20px;
        border:1px solid #D4D4D4;
        border-radius: 6px;
        padding:10px;
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
    <div class="refuseModal">
        <div class="top_content">拒绝<span>{{real_name}}</span>的提现申请</div>

        <div class="item_content input_content cl">
            <div class="title_content">
                <span>拒绝理由:</span>
            </div>
            <div class="value_content">
                <textarea placeholder="请输入拒绝原因(20字以内)" name="拒绝理由" v-validate data-vv-rules="required|max:20" v-model="content"></textarea>
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
                id:'',
                content:''     //拒绝理由
            }
        },
        props:["modalData"],
        beforeMount(){
            this.real_name = this.modalData.id.real_name
            this.id = this.modalData.id.id
        },
        methods:{
            //提交拒绝
            submit(){
                var httpName = "拒绝申请"
                if(this.content.length >20){
                    this.$Modal.warning({title: `拒绝申请失败`, content: '拒绝理由理由不能超过20个字！'})
                    return
                }
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }

                var ajaxData = {
                    id:this.id,
                    content:this.content,
                    type:2
                }

                this.$http.put('/admin/extract/audit',ajaxData)
                    .then((response)=>{
                        const data =response.data
                        const {retCode,retMsg} = data
                        if(retCode == '0') {
                            this.$Message.success({content: `拒绝申请成功`})
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