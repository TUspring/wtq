<style lang="css" scoped >
    .allot_box {
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
        width:380px;
        line-height: 40px;
        margin:0 auto;
        font-size: 14px;
    }
    .title_content {
        width:70px;
        float:left;
    }
    .value_content {
        float:left;
    }
    .value_content input {
        width:200px;
        height:40px;
        border:1px solid #D4D4D4;
        border-radius: 6px;
        padding-left:10px;
    }
    .value_content .seeNickname {
        display: inline-block;
        width:80px;
        height:40px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        border:1px solid #D4D4D4;
        border-radius: 6px;
        cursor:pointer;
    }
    .value_content .seeNickname:hover {
        background:#FFA114;
        color:#fff;
        border:1px solid #FFA114;
    }

    /*按钮*/
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
    <div class="allot_box">
        <div class="top_content">模拟账号分配</div>

        <div class="item_content cl">
            <div class="title_content">
                <span>平台:</span>
            </div>
            <div class="value_content">
                <span>{{allotForm.platform}}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>账号:</span>
            </div>
            <div class="value_content">
                <span>{{allotForm.MT4_account}}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>用户ID:</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入模拟账号分配的用户ID" v-model="allotForm.users_id">
                <span class="seeNickname" @click="seeNickname">查看昵称</span>
                <p>昵称：<span v-show="showNickname">{{nickname}}</span><span v-show="noID">该用户ID不存在！</span></p>
            </div>
        </div>

        <!--按钮-->
        <div class="botton_content">
            <span class="btnClass comfirm" @click="confirm">确定</span>
            <span class="btnClass cancel" @click="cancel">取消</span>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                allotForm: {
                    MT4_account:'',
                    platform: '',
                    id:'',
                    users_id: ''
                },
                nickname:'',
                showNickname:false,
                noID:false
            }
        },
        beforeMount(){
            this.allotForm.id=this.modalMsg.id.id
            console.log('id =='+this.allotForm.id)
            this.allotForm.MT4_account = this.modalMsg.MT4_account.MT4_account
            this.allotForm.platform = this.modalMsg.platform.platform.platform
        },
        props: ["modalMsg"],
        methods: {
            //修改成功刷新页面
            Refresh() {
                this.$emit('Refresh')
            },

            //查看昵称
            seeNickname() {
                if(this.allotForm.users_id==''){
                    this.$Modal.warning({title:`查看失败`,content:'请输入用户ID！'})
                    return
                }
                var ajaxData = {
                    users_id:this.allotForm.users_id
                }
                this.$http.post('admin/MT4/get_user',ajaxData)
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            if(retData==null){
                                this.showNickname = false
                                this.noID = true
                            }else{
                                this.noID = false
                                this.showNickname = true
                                this.nickname = retData.name
                            }

                        }
                    })
            },

            confirm () {
                var ajaxData = {
                    id:this.allotForm.id,
                    users_id:this.allotForm.users_id
                }
                var httpName = "人工分配"
                this.$http.post('admin/MT4/assign_demo_MT4',ajaxData)
                    .then((response)=>{
                        const data = response.data
                        const {retCode} = data
                        if(retCode == '0'){
                            this.$Message.success({content: `${httpName}成功`})
                            this.Refresh()
                            this.cancel()
                        }
                    })
                    .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
            },

            cancel() {
                this.$emit('close')
            }
        }
    }
</script>