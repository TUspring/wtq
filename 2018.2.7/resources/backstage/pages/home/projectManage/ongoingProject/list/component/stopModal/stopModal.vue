<style lang="less" scoped>
    .stopModal {
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
    <div class="stopModal">
        <div class="top_content">提前结束项目</div>

        <div class="item_content cl">
            <div class="title_content">
                <span>项目名称:</span>
            </div>
            <div class="value_content">
                <span>{{name}}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>结束理由:</span>
            </div>
            <div class="value_content">
                <textarea placeholder="请输入结束理由(20字以内)" v-model="content"></textarea>
            </div>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass submit" @click="submit">确定</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>

    </div>
</template>

<script>
    export default{
        data(){
            return{
                name:'',
                id:'',
                content:''
            }
        },
        props:["modalMsg"],
        beforeMount(){
            console.log(this.modalMsg.id)
            this.name = this.modalMsg.id.name
            this.id = this.modalMsg.id.id
        },
        methods:{
            submit(){
                var httpName = "提前结束"
                var ajaxData = {
                    id:this.id,
                    content:this.content
                }
                this.$http.put('/admin/regular_project/process/preFinish',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0') {
                        this.$Message.success({content: `${httpName}成功`})
                        this.cancel()
                        this.stopRefresh()
                    }else{
                        this.$Modal.error({title:`${httpName}失败`,content:retMsg})
                    }
                }).catch((error) =>{
                     this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },
            stopRefresh(){
                this.$emit('stopRefresh')
            },
            cancel(){
                this.$emit('close')
            }
        }
    }
</script>