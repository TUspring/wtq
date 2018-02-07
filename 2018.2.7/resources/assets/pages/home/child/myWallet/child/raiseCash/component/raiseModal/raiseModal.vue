<style lang="css" scoped>
    .raiseModal {
        width:630px;
        border-radius:6px;
        padding-bottom:40px;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
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

    .input_content {
        position: relative;
        width:330px;
        height:49px;
        line-height:49px;
        margin:0 auto;
        margin-top:20px;
    }
    .input_content span {
        font-size: 14px;
        color: rgb( 153, 153, 153 );
        margin-right:20px;
    }
    .input_content input {
        width: 231px;
        height: 49px;
        border-radius: 5px;
        float:right;
        padding-left:10px;
        border:1px solid rgb( 212, 212, 212 );
    }
    #showText {
        position: absolute;
        top:2px;
        left:109px;
        font-size: 14px;
        color: rgb( 153, 153, 153 );
    }
    #showText:hover {
        cursor: text;
    }
    .warning_content {
        width: 591px;
        padding:20px 40px;
        margin:0 auto;
        margin-top:30px;
        background-color: rgb( 245, 245, 245 );
    }
    .warning_content p {
        font-size: 12px;
        color: rgb( 51, 51, 51 );
        margin-bottom:20px;
    }
    .warning_content span {
        font-size: 12px;
        color: rgb( 153, 153, 153 );
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
   /*提交成功内容*/
    .success_content {
        text-align: center;
        margin-top:60px;
    }
    .success_content p {
        font-size: 16px;
        color: rgb( 51, 51, 51 );
    }
    .botton {
        width: 321px;
        height: 51px;
        line-height:51px;
        text-align: center;
        font-size: 16px;
        color: rgb( 255, 255, 255 );
        border-radius: 6px;
        margin:0 auto;
        margin-top:40px;
        cursor:pointer;
        background-color: rgb( 255, 161, 20 );
    }


</style>

<style lang="css">
    /*高度*/
    .input_content .ivu-select-single .ivu-select-selection {
        height:49px;
    }
    .input_content .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height:49px;
        line-height:49px;
    }
    /*点击后边框颜色 无*/
    .input_content .ivu-select-visible .ivu-select-selection {
        border-color:rgb( 212, 212, 212 );
        box-shadow: none;
    }
    /*鼠标悬停发光 无*/
    .input_content .ivu-select-selection:hover {
        border-color:rgb( 212, 212, 212 );
    }
    .input_content .ivu-select-dropdown {
        max-height:100px;
    }
</style>

<template>
    <div class="raiseModal">
        <div class="modal-top cl">
            <span>提现金额</span>
            <span @click="close"class="iconfont" >&#xe63c;</span>
        </div>

        <!--提交内容-->
       <div v-show="submitText">
           <div class="input_content cl">
               <span clss="title">可提现金额</span>
               <input type="text"  name="提现金额" v-validate data-vv-rules="required|decimal:2" v-model="money"  id="price" @focus="inputFocus" @blur="inputBlur">
               <label for="price" id="showText" v-if="showText">{{extract | showNum}}</label>
           </div>
           <div class="input_content cl">
               <span clss="title">银行卡号</span>
               <Select style="width:231px;float:right;" :transfer="true" v-model="bank_id">
                   <Option v-for="item in bankCardList" :value="item.id" :key="item.id">{{item.bank_number}}</Option>
               </Select>
           </div>
           <!--提示-->
           <div class="warning_content">
               <p>提现提醒</p>
               <span>
                最低提现金额为100美金
            </span>
           </div>

           <!--按钮-->
           <div class="botton_content">
               <span class="btnClass submit" @click="submit">提交</span>
               <span class="btnClass cancel" @click="cancel">取消</span>
           </div>
       </div>

        <!--提交成功内容-->
        <div v-show="successText">
            <div class="success_content">
                <p>您的提现申请已经提交！</p>
            </div>
            <div class="botton" @click="know">我知道了</div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                submitText:true,
                successText:false,

                extract:'',             //可提现余额
                money:'',
                bank_id:'',             //银行卡ID

                bankCardList:'',        //银行卡列表信息
                showText:true
            }
        },
        filters:{
            showNum(value){
                return  '可提现金额$'+value
              }
        },
        props:["modalData"],
        beforeMount(){
            this.extract = this.modalData.extract
            this.getBankCardList()
        },
        methods:{

            //鼠标获取焦点
            inputFocus (){
                this.showText = false
            },

            //移除焦点
            inputBlur(){
                if(this.money == ''){
                    this.showText = true
                }else {
                    this.showText = false
                }
            },

            //获取银行卡列表信息
            getBankCardList(){
                this.$http.get('/bank')
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        this.bankCardList = retData.data
                    }
                })
            },

            //提交申请
            submit(){
                const httpName = "申请提现"
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }
                var money = parseInt(this.money)
                if(money<100){
                    this.$Modal.warning({title:`${httpName}失败`,content:'提现金额不能小于100美元！'})
                    return
                }
                if(this.money == ''){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请填写提现金额！'})
                    return
                }
                if(this.bank_id == ''){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请选择要提现的银行卡！'})
                    return
                }

                if(money > this.extract){
                    this.$Modal.warning({title:`${httpName}失败`,content:'可提现余额不足！'})
                    return
                }
                var ajaxData = {
                    money:this.money,
                    bank_id:this.bank_id
                }
                this.$http.post('/extract',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0' ){
                        this.submitText = false
                        this.successText = true
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
            know(){
                this.Refresh()
                this.$emit('close')
            },

            close(){
                this.$emit('close')
            },
            cancel(){
                this.$emit('close')
            }
        }
    }
</script>