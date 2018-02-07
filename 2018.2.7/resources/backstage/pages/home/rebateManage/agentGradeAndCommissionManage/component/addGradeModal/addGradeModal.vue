<style lang="less" scoped>
    .addGradeModal {
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
    .code_content {
        display: flex;
        align-items: center;
        padding:0 150px;
    }
    .code_content input {
        width:180px;
        height:40px;
        line-height:40px;
        border:1px solid #D4D4D4;
        border-radius:6px;
        padding-left:10px;
    }
    .code_content .disabled{
        cursor: not-allowed;
    }
    .code_content span {
        display: inline-block;
        width:120px;
        height:40px;
        line-height:40px;
        font-size: 14px;
        color:#FFA114;
        border-radius: 6px;
        border:1px solid #FFA114;
        padding:0 10px;
        margin-left: 10px;
        cursor:pointer;
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
    <div class="addGradeModal">
        <div class="top_content">新增等级</div>

        <div class="item_content">
            <p>等级名称:</p>
            <input type="text" placeholder="请输入等级名称" name="等级名称" v-validate data-vv-rules="required|max:5" v-model="name">
        </div>

        <div class="small_item_content">
            <span>直接佣金:</span>
            <input type="text" name="直接佣金" v-validate data-vv-rules="required|decimal:2" v-model="direct_commission">美元/手
        </div>
        <div class="small_item_content">
            <span>间接佣金:</span>
            上级标准-下级标准
        </div>
        <div class="small_item_content">
            <span>同级奖励:</span>
            <input type="text" name="同级奖励" v-validate data-vv-rules="required|decimal:2" v-model="peer_reward">%
        </div>

        <!--验证码-->
        <div class="code_content cl">
            <input type="text" placeholder="短信验证码" name="短信验证码" maxlength="6" v-validate
                   data-vv-rules="required|msgCode" v-model="verify">
            <span :class="{disabled:codeDelay>0}" @click="sendCode">
                {{codeDelay>0?codeDelay+'s后重新发送':'点击获取验证码'}}
            </span>
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
                codeDelay:0,

                name:'',                     //等级名称
                direct_commission:'',        //直接佣金
                peer_reward:'',              //同级奖励
                verify:''                   //验证码
            }
        },
        beforeMount(){
            //倒计时
            const addGradeCodeRecode = this.util.getData('signUpCodeRecode', 60)
            if (!this.util.isEmpty(addGradeCodeRecode)) {
                this.codeDelay = 60 - parseInt((new Date().getTime() - addGradeCodeRecode) / 1000)
                this.countCodeDelay()
            }
        },
        methods:{
            //获取验证码
            sendCode(){
                if(this.codeDelay>0){
                    return
                }
                const httpName = "验证码发送"
                this.$http.post('/admin/authentication/sms',{})
                    .then((response) => {
                        const data = response.data
                        const {retCode,retMsg} = data
                        if(retCode == '0'){
                            this.codeDelay = 60
                            this.util.setData('signUpCodeRecode', new Date().getTime())
                            this.countCodeDelay()
                            this.$Message.success({content: `${httpName}成功`})
                        }else {
                            this.$Modal.error({title: `${httpName}失败`, content: retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    })
            },
            //验证码倒计时
            countCodeDelay(){
                if (!(this.codeDelay > 0)) {
                    return
                }
                const count = this.codeDelay;
                this.util.interval(() => {
                    this.codeDelay--
                }, 1000, count)
            },

            //提交新建
            submit(){
                const httpName = "新增等级"
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }
                if(this.name=='' && this.direct_commission == '' && this.peer_reward == ''){
                    this.$Modal.warning({content:'等级名称不能为空！'})
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
                    peer_reward:this.peer_reward,
                    verify:this.verify
                }
                this.$http.post('/admin/level/add',ajaxData)
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