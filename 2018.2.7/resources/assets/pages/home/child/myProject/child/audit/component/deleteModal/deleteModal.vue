<style lang="less" scoped>
    .deleteModal {
        width:630px;
        border-radius:6px;
        padding-bottom:40px;
        border:5px solid rgba(204,204,204,.3);
        background:#fff;
    }
    .modal-top {
        width:620px;
        height:60px;
        padding:0 20px;
        line-height:60px;
        border-bottom:1px solid #EEEEEE;
    }
    .modal-top span {
        font-size:16px;
        color:#151515;
    }
    .modal-top span:last-child {
        float:right;
        color:#CCCCCC;
        cursor:pointer;
    }
    .modal-top span:last-child:hover {
        color:grey;
    }
    #delete_content {
        text-align:center;
        margin:40px 0;
    }
    #delete_content p {
        font-size: 16px;
        font-weight:bold;
    }


    .btn-content {
        width:620px;
        margin-top:40px;
        text-align:center;
    }
    .btn-content button {
        border-radius:5px;
        font-size:14px;
        width:120px;
        height:40px;
        margin:0 20px;
        cursor:pointer;
    }
    .btn-content #confirm {
        color:#fff;
        background:#FFA113;
    }
    .btn-content #cancel {
        color:#999999;
        background:#EEEEEE;
    }

</style>

<template>
    <div class="deleteModal">
        <div class="delete">
            <div class="modal-top">
                <span>项目删除</span>
                <span @click="close" class="iconfont">&#xe63c;</span>
            </div>
            <div id="delete_content">
                <p>是否删除<span>{{name}}</span>？</p>
            </div>
            <div class="btn-content">
                <button id="confirm" @click="submit">确定</button>
                <button id="cancel"  @click="close">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                name:'',
                id:''
            }
        },
        props:["modalData"],
        beforeMount(){
            this.name = this.modalData.id.name
            this.id = this.modalData.id.id
        },
        methods:{
            //提交删除
            submit(){
                var httpName = "删除项目"
                var ajaxData = {
                    id:this.id
                }
                this.$http.delete('regular_project',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0') {
                        this.$Message.success({content: `${httpName}成功`})
                        this.close()
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
            close(){
                this.$emit('close')
            }
        }
    }
</script>