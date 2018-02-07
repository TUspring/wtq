<style lang="less" scoped>

</style>
<template>
    <div class="changePassword_modal custom_modal">
        <div class="modal_top">
            <span>更改密码</span>
            <span @click="close" class="iconfont">&#xe63c;</span>
        </div>
        <div class="changePassword_content">

            <!--更新密码-->
            <div class="changePassword_identity">
            <p class="detail_title">更改MT4账号密码</p>
            <div class="new_psw same">
            <input type="password" placeholder="新的密码" v-model="MT4_password" maxlength="16">
            </div>
            <div class="confirm_psw same">
            <input type="password" placeholder="确认密码" v-model="MT4_password_confirmation" maxlength="16">
            </div>
            <button class="next" @click="changePassword">立即更改 <v-reqLoading v-if="reqLoading"></v-reqLoading></button>
            </div>

        </div>
    </div>
</template>

<script>
    import './css/index.css'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                reqLoading:false,
                choice: '',
                showModify: false,
                MT4_password:'',
                MT4_password_confirmation:'',
            }
        },
        props:["modalMsg"],

        computed: {
            againPW(){
                return this.MT4_password!=''&&(this.MT4_password!=this.MT4_password_confirmation)&&(!this.errors.has('密码'))
            },
        },

        methods: {
            close(){
                this.$emit('close')
            },
            agree(){
                this.close()
                this.$emit('agree')
            },

            changePassword(){
                var ajaxData={
                    id:this.modalMsg.id.id,
                    MT4_account:this.modalMsg.id.MT4_account,
                    MT4_password:this.MT4_password,
                    server_name:this.modalMsg.id.platform.server_name
                }
                this.$validator.validateAll()
                if (this.againPW) {
                    this.$Modal.warning({title: `提示`, content: '两次输入的密码不一致'})
                    return
                }
                var passWord = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{1,50}$/;
                if (!passWord.test(this.MT4_password)) {
                    this.$Modal.warning({title: `提示`, content: '密码为1-50位字符，数字、大小写字母、符号！'})
                    return
                }
                this.reqLoading=true
                var httpName='更改'
                this.$http.post('/MT4/modify_password',ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`});
                            this.$emit('close')
                        } else {
                            this.reqLoading=false
                            this.$Modal.error({title:`更改失败`,content:data.retMsg})
                        }
                })
                .catch((error)=>{
                    this.reqLoading=false
                    this.$Modal.error({title:`更改失败`,content:this.util.getHttpText(error)})
                })
            }
        },
    }
</script>