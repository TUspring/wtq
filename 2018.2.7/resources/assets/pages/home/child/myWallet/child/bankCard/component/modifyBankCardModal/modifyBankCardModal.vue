<style lang="css" scoped>
    .modifyBankCardModal {
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
        background-color: rgb( 245, 245, 245 );
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
    <div class="modifyBankCardModal">
        <div class="modal-top cl">
            <span>修改银行卡信息</span>
            <span @click="close"class="iconfont" >&#xe63c;</span>
        </div>

        <div class="content">
            <div class="item_content cl">
                <div class="item_title cl">
                    <span>户主姓名</span>
                </div>
                <div class="item_value">
                    <span>{{bankCardDetail.real_name}}</span>
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>银行名称</span>
                </div>
                <div class="item_value">
                   <span>{{bankCardDetail.bank_name}}</span>
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>银行卡号</span>
                </div>
                <div class="item_value">
                    <span>{{bankCardDetail.bank_number}}</span>
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>支行名称</span>
                </div>
                <div class="item_value">
                    <input type="text" name="支行名称" v-model="bankCardDetail.sub_branch" v-validate data-vv-rules="required">
                </div>
            </div>

            <div class="item_content cl">
                <div class="item_title cl">
                    <span>预留手机号码</span>
                </div>
                <div class="item_value">
                    <span>{{bankCardDetail.reserved_phone}}</span>
                </div>
            </div>

            <!--按钮-->
            <div class="botton_content">
                <span class="btnClass comfirm"  @click="modify">确定</span>
                <span class="btnClass cancel" @click="cancel">取消</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                bankCardDetail:{
                    real_name:'',          //用户名
                    bank_name:'',         //银行名
                    bank_number:'',       //银行卡号
                    sub_branch:'',        //支行名称
                    reserved_phone:''     //预留手机号

                },
                id:''                      //银行卡ID
            }
        },
        props:['modalData'],
        beforeMount(){
            this.id = this.modalData.id.id
            this.getBankCardDetail()
        },
        methods:{
            //获取银行卡详情信息
            getBankCardDetail(){
                this.$http.get('/bank/'+this.id)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        this.bankCardDetail = retData
                    }
                })
            },
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

            //修改银行卡
            modify(){
                const httpName = "修改银行卡"
                if(this.bankCardDetail.sub_branch == ''){
                    this.$Modal.warning({title:`${httpName}失败`,content:'请填写支行名称！'})
                    return
                }
                //正则匹配支行名称
                var checkName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                if(!checkName.test(this.bankCardDetail.sub_branch)) {
                    this.$Modal.warning({title: `银行卡验证失败`, content: '支行名称必须是中文和字母组成！'})
                    return
                }

                if (this.getStrLength(this.bankCardDetail.sub_branch) > 100 && this.bankCardDetail.sub_branch != '') {
                    this.$Modal.warning({title: `提示`, content: '支行名称不超过50个汉字、100个字节！'})
                    return
                }
                var ajaxData = {
                    id:this.id,
                    sub_branch:this.bankCardDetail.sub_branch
                }
                this.$http.put('/bank',ajaxData)
                .then((response)=>{
                    const data = response.data
                    const {retCode,retMsg} = data
                    if(retCode == '0'){
                        this.$Message.success({content: `${httpName}成功`})
                        this.Refresh()
                        this.cancel()
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
            },
            cancel (){
                this.$emit('close')
            }
        }
    }
</script>