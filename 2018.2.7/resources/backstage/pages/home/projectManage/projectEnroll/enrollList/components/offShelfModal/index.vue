<style lang="css" scoped src="./css/index.css"></style>
<style>

</style>
<template>
    <div class="offShelf-publish">
        <div class="offShelf-publish-container">
            <p class="title">下架项目</p>
             <div class="ct-1" v-show="showDetails">
                 <div class="project-name">
                     <span>项目名称:</span>
                     <span>{{projectName}}</span>
                 </div>
                 <div class="offShelf-edit">
                     <span>下架理由:</span>
                     <textarea v-model="offShelfContent"></textarea>
                 </div>
                 <div class="offShelf-btn">
                     <Button  @click="close">取消</Button>
                     <Button type="primary" class="confirm" @click="next">确定</Button>
                 </div>
             </div>
            <div class="ct-2"  v-show="!showDetails">
              <div class="ct-2-tx">
                  <p>下架项目后，该项目将直接删除！！！</p>
                  <p>原参与用户直接解除参与关系。</p>
              </div>
                <div class="offShelf-btn">
                    <Button  @click="back">返回</Button>
                    <Button type="primary" class="confirm" @click="determine">确定 <v-reqLoading v-if="reqLoading"></v-reqLoading></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                reqLoading:false,
                showDetails:true,
                showModify: false,
                offShelfContent:'',
                projectId:'',
                projectName:''
            }
        },
        props: ["modalMsg"],

        beforeMount (){
            this.projectId=this.modalMsg.id
            this.projectName=this.modalMsg.name
        },

        methods: {

             next(){
                 this.showDetails=!this.showDetails
             },

            determine(){
                if (this.offShelfContent==''){
                    this.$Modal.warning({title: `提示`, content: '请输入拒绝理由！'})
                    return
                }
                var ajaxData={
                    id:this.projectId,
                    content:this.offShelfContent,
                }
              this.reqLoading=true
                var httpName='下架'
                this.$http.put('/admin/regular_project/enroll/under',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode,retMsg}=data;
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`})
                            this.close()
                             this.Refresh()
                        } else {
                            this.reqLoading=false
                            this.$Modal.error({title: `下架失败`, content: retMsg})
                        }
                    })
                    .catch((error) => {
                        this.reqLoading=false
                        this.$Modal.error({title: `下架失败`, content: this.util.getHttpText(error)})
                    });

            },
            Refresh(){
                this.$emit('Refresh')
            },
            back(){
                this.showDetails=!this.showDetails
            },
            close(){
                this.$emit('close')
            }
        }
    }
</script>