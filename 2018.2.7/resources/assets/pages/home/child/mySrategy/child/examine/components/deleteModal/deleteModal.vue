<style lang="css" scoped src="./css/deleteModal.css">

</style>

<template>
    <div class="deleteModal cl">
        <div class="delete">
            <div class="modal-top">
                <span>移除关联</span>
                <span @click="close" class="iconfont">&#xe63c;</span>
            </div>
            <div id="delete_content">
                <p>确定删除{{name}}？</p>
            </div>
            <div class="btn-content">
                <button id="confirm" @click="deleteItem">确定</button>
                <button id="cancel"  @click="close">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                id:'',
                name:'',
                httping:false,
            }
        },
        beforeMount(){
            this.id=this.modalData.id
            this.name=this.modalData.name
        },
        methods:{
            close(){
                this.$emit('close')
            },
            deleteItem(){
                if(this.httping){
                    return
                }
                const httpName="删除"
                var ajaxData={
                    id:this.id
                }
                this.httping=true
			    this.$http.delete('/policy',{params:ajaxData})
			      .then((res) => {
			      	const data = res.data
			      	const {retCode}=data
			      	if(retCode=='0'){
			      	    this.$Message.success({content: `${httpName}成功`})
			      	    this.deleteSuccess()

			      	}else{
			      	    this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
			      	}
			      	this.httping=false
			      })
			      .catch((error) =>{
			        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
			        this.httping=false
			      });
            },
            deleteSuccess(){
                this.$emit("deleteSuccess")
                this.close()
            }
        },
        props:["modalData"]
    }
</script>