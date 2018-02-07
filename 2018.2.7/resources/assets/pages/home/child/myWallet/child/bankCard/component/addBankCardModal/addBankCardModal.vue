<style lang="css" scoped>
    .addBankCardModal {
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
    .title {
        width:320px;
        text-align: center;
        margin:0 auto;
        font-size: 18px;
        color: rgb( 255, 161, 20 );
        margin-top:30px;
        border-bottom:1px solid rgb( 255, 161, 20 );
    }

    .item_content {
        width:350px;
        height: 49px;
        line-height: 49px;
        margin:0 auto;
        margin-top:20px;
    }
    .item_title {
        width:100px;
        float:left;
    }
    .item_title span {
        float:right;
        font-size: 14px;
        color: rgb( 153, 153, 153 );
    }

    .item_value {
        width:250px;
        float:left;
        padding-left:20px;
    }
    .item_value span {
        font-size: 14px;
        color: rgb( 51, 51, 51 );
    }
    .item_value input {
        width: 231px;
        height: 49px;
        border-radius: 5px;
        padding-left:10px;
        border:1px solid rgb( 212, 212, 212 );
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

    /*提交成功、失败内容*/
    .success_content,.fail_content{
        text-align: center;
    }
    .success_text p,.fail_text p {
        font-size: 16px;
        color: rgb( 51, 51, 51 );
        margin-top:60px;
    }
    .fail_text p{
        margin-bottom:20px;
    }
    .fail_text span {
        font-size: 12px;
        color: rgb( 153, 153, 153 );
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

<template>
    <div class="addBankCardModal">
        <div class="modal-top cl">
            <span>新增银行卡</span>
            <span @click="close"class="iconfont" >&#xe63c;</span>
        </div>
        <div class="content cl" v-show="submitText">
            <div class="title">新增银行卡信息</div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>户主姓名</span>
                </div>
                <div class="item_value">
                    <span>{{user_info.real_name}}</span>
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>银行名称</span>
                </div>
                <div class="item_value">
                    <input type="text" placeholder="请输入银行名称" name="银行名称" v-model="bank_name"  v-validate data-vv-rules="required">
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>银行卡号</span>
                </div>
                <div class="item_value">
                    <input type="text" placeholder="请输入银行卡号" name="银行卡号"  v-model="bank_number" v-validate data-vv-rules="required|numeric|min:12|max:19">
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>支行名称</span>
                </div>
                <div class="item_value">
                    <input type="text" placeholder="请输入正确的支行名称" name="支行名称" v-model="sub_branch" v-validate data-vv-rules="required">
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>预留手机号码</span>
                </div>
                <div class="item_value">
                    <input type="text" placeholder="请输入预留手机号码" name="手机号码" v-model="reserved_phone" v-validate data-vv-rules="required|numeric|phone">
                </div>
            </div>

            <!--提示-->
            <div class="warning_content">
                <p>温馨提示</p>
                <span>
                1.只能绑定本人的银行卡；2.若不知道支行名称，请联系银行客服查找
            </span>
            </div>
            <!--按钮-->
            <div class="botton_content">
                <span class="btnClass submit" @click="add">提交</span>
                <span class="btnClass cancel" @click="cancel">取消</span>
            </div>

        </div>

        <!--验证成功内容-->
        <div class="success_content" v-show="successContent">
            <div class="title">验证银行卡</div>
            <div class="success_text">
                <p>恭喜，您的银行卡验证成功！</p>
            </div>
            <div class="botton" @click="checkSuccess">我知道了</div>
        </div>

        <!--验证失败内容-->
        <div class="fail_content" v-show="failContent">
            <div class="title">验证银行卡</div>
            <div class="fail_text">
                <p>抱歉，您的银行卡验证失败！</p>
                <span>无相关银行卡信息，请检查银行卡号</span>
            </div>
            <div class="botton" @click="checkFail">我知道了</div>
        </div>

    </div>
</template>

<script>
    import { mapState} from 'vuex'
    export default {
        data(){
            return{
                submitText:true,
                successContent:false,
                failContent:false,

                bank_number:'',            //银行卡号
                bank_name:'',             //银行卡名称
                sub_branch:'',            //支行名称
                reserved_phone:'',        //预留手机号码
                real_name:'',             //真实姓名
                ID_number:'',             //身份证号
            }
        },
        computed:{
            ...mapState({
                user_info: state => state.user.user_info ,
            }),
        },
        beforeMount(){
            this.real_name = this.user_info.real_name
            this.ID_number = this.user_info.ID_number
        },
        methods:{
            //匹配中文 给两个字节，其余一个字节
            getStrLength(str) {
                var bytesCount = 0
                var str = str
                for (var i = 0; i < str.length; i++)
                {
                    var name = str.charAt(i);
                    if (/^[\u0000-\u00ff]$/.test(name))
                    {
                        bytesCount += 1;
                    }
                    else
                    {
                        bytesCount += 2;
                    }
                }
                return bytesCount
            },

            //新增银行卡
            add(){
                this.$validator.validateAll();
                if (this.errors.any()) {
                    this.$Modal.warning({content:this.errors.items[0].msg})
                    return
                }
                //正则匹配银行卡名字/支行名称
                var checkName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                if(!checkName.test(this.bank_name)) {
                    this.$Modal.warning({title: `银行卡验证失败`, content: '银行卡名称必须是中文和字母组成！'})
                    return
                }
                if(!checkName.test(this.sub_branch)) {
                    this.$Modal.warning({title: `银行卡验证失败`, content: '支行名称必须是中文和字母组成！'})
                    return
                }

                if (this.getStrLength(this.bank_name) > 40 && this.bank_name != '') {
                    this.$Modal.warning({title: `提示`, content: '银行名称不超过20个汉字、40个字节！'})
                    return
                } else if (this.getStrLength(this.sub_branch) > 100 && this.sub_branch != '') {
                    this.$Modal.warning({title: `提示`, content: '支行名称不超过50个汉字、100个字节！'})
                    return
                }
                var ajaxData = {
                    bank_number:this.bank_number,                       //银行卡号
                    bank_name:this.bank_name,                          //银行卡名称
                    sub_branch:this.sub_branch,                       //支行名称
                    reserved_phone:this.reserved_phone,              //预留手机号码
                    real_name:this.real_name,                       //真实姓名
                    ID_number:this.ID_number                       //身份证号
                }
              this.$http.post('/bank/check_bank_card',ajaxData)
              .then((response)=>{
                const data = response.data
                const {retCode} = data
                if(retCode == '0'){
                    this.submitText = false
                    this.failContent = false
                    this.successContent = true
                }else {
                    this.submitText = false
                    this.successContent = false
                    this.failContent = true
                }
              })
            },
            Refresh(){
                this.$emit('Refresh')
            },

            checkSuccess(){
                this.close()
                this.Refresh()
            },
            checkFail(){
                this.failContent = false
                this.submitText = true
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