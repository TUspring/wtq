<style lang="css" scoped src="./css/modifyModal.css"></style>

<template>
    <div class="modify_box cl">
       <div class="header">
           修改策略：<span>{{name}}</span>
       </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>星级:</span>
            </div>
            <div class="value_content">
                <input type="text" v-model="modifyForm.recommend_level">
                <p>星级区间：1.0 - 5.0 ，精确到小数点后一位</p>
            </div>
        </div>

        <div class="item_content cl">
            <div class="title_content">
                <span>初始跟随人数:</span>
            </div>
            <div class="value_content">
                <input type="text" v-model="modifyForm.follow_number">
                <span>(单位：人)</span>
            </div>
        </div>

        <div class="item_content cl">
            <div class="title_content">
                <span>初始跟随资金:</span>
            </div>
            <div class="value_content">
                <input type="text"  v-model="modifyForm.initial_follow_money">
                <span>(单位：美元)</span>
            </div>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass comfirm"  @click="publish">确定</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                name:'',
                modifyForm: {
                    id: '',
                    recommend_level: '',
                    follow_number:'',
                    initial_follow_money: ''
                }
            }
        },
        beforeMount(){
            this.name = this.modalMsg.id.name
            this.modifyForm.id=this.modalMsg.id.id
        },
        props: ["modalMsg"],
        methods: {
            //修改成功刷新页面
            Refresh() {
                this.$emit('nomalRefresh')
            },
            publish() {
                if(this.modifyForm.recommend_level>=6){
                    this.$Modal.warning({title: `修改策略`, content: '星级最大不能超过5！'})
                    return
                }
                var ajaxData = {
                    id:this.modifyForm.id,
                    recommend_level:this.modifyForm.recommend_level,
                    follow_number:this.modifyForm.follow_number,
                    initial_follow_money:this.modifyForm.initial_follow_money
                }
                const httpName = "修改策略"
                this.$http.put('/admin/policy/put_level',ajaxData)
                    .then((response)=>{
                        const data = response.data
                        const {retCode} = data
                        if(retCode == '0'){
                            this.$Message.success({content: `${httpName}成功`})
                            this.cancel()
                            this.Refresh()
                        }
                })
                .catch((error) =>{
                   this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            },
            cancel () {
                this.$emit('close')
            }

        }
    }
</script>