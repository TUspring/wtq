<style lang="less" scoped>
    .stopModal {
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
        margin-bottom: 30px;
        border-bottom: 1px solid #ccc;
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
        width: 120px;
        height: 40px;
    }
    .submit {
        margin-left:40px;
    }
</style>

<template>
    <div class="stopModal">
        <div class="top_content">暂停跟随</div>

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
                <span>暂停理由:</span>
            </div>
            <div class="value_content">
                <textarea placeholder="请输入暂停理由（20个字以内）" v-model="content"></textarea>
            </div>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <Button class="btnClass" @click="cancel">取消</Button>
            <Button class="btnClass submit" type="primary" @click="submit">确定</Button>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                name:'',         //姓名
                id:'',         // 项目ID
                content:''    //拒绝理由
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
                var httpName = "暂停跟随"
                var ajaxData = {
                    id:this.id,
                    content:this.content
                }
                this.$http.put('/admin/regular_project/process/pause',ajaxData)
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