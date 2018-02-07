<style lang="less" scoped src="./css/index.css"></style>
<style>
    #againRelation_modal .platform_box .ivu-select {
        width: 230px;
        margin-left: 20px;
    }

    #againRelation_modal .platform_box .ivu-select-single .ivu-select-selection {
        height: 48px;
        line-height: 48px;
        width: 230px;
        text-align: left;
        background-color: #f5f5f5;
    }

    #againRelation_modal .ivu-select-single .ivu-select-selection .ivu-select-placeholder, #againRelation_modal .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        color: #999999;
    }

    #againRelation_modal .ivu-select-dropdown-list .ivu-select-item {
        text-align: left;
    }


</style>
<template>
    <div class="againRelation_modal custom_modal" id="againRelation_modal">
        <div class="modal_top">
            <span>重新关联MT4账号</span>
            <span @click="close" class="iconfont">&#xe63c;</span>
        </div>
        <div class="againRelation_content" :class="{Modal_scroll:scrollShow}">
            <div class="relation_prompt">
                <p>关联提示</p>
                <span>账号信息采用加密传输，关联成功后，我们将在云端登录并保存您的MT4账号，届时可进行一键跟随，自动复制中汇的交易策略信号</span>
            </div>
            <!--中间input块内容-->
            <div class="againRelation_details">
                <div class="platform_box">
                    <span>交易商平台:</span>
                    <span class="content-box">{{MT4List.platform.platform}}</span>
                </div>
                <div class="platform_box">
                    <span>服务器名称:</span>
                    <span class="content-box">{{MT4List.platform.server_name}}</span>
                </div>
                <div class="platform_box">
                    <span>MT4账号:</span>
                    <span class="content-box">{{MT4List.MT4_account}}</span>
                </div>
                <div class="platform_box">
                    <span>MT4密码:</span>
                    <input type="password" value="" v-model="MT4_password" maxlength="16">
                </div>
                <div class="platform_box">
                    <span>确认密码:</span>
                    <input type="password" value="" v-model="MT4_password_confirmation" maxlength="16">
                </div>
            </div>
            <div class="email_prompt">
                <p>邮箱提示</p>
                <span>您已绑定 <span class="user_emails">{{this.user.email}}</span>,为成功关联交易账号，请保持MT4注册邮箱与中汇注册邮箱一致性，若不一致，请前往<span
                        class="changeEmails" @click="toEmail">修改邮箱</span></span>
            </div>
            <button class="relation_btn" @click="immediately_relation">立即关联 <v-reqLoading v-if="reqLoading"></v-reqLoading></button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {USER_SIGNOUT, USER_SETSTATE, USER_SETINFO} from 'store/user'
    export default {
        data() {
            return {
                reqLoading:false,
                choice: '',
                showModify: false,
                 MT4_password: '',
                 MT4_password_confirmation: '',
                MT4_account: '',
                scrollShow: false,
                server_name: '',
                MT4List:{
                    platform: '',
                },
            }
        },
        props: ["modalMsg"],
        mounted(){
            this.MT4List=this.modalMsg.id
            this.setModalMaxHeight()
        },
        computed: {
            ...mapState({
                user: state => state.user.user_info,
            }),
            againPW(){
                return this.MT4_password != '' && (this.MT4_password != this.MT4_password_confirmation) && (!this.errors.has('密码'))
            },
        },
        methods: {
            setModalMaxHeight(){
                if (window.screen.height > document.documentElement.clientHeight + 100) {
                    this.scrollShow = true
                }
            },

            immediately_relation(){

                if(!this.MT4_password||!this.MT4_password_confirmation){
                    this.$Modal.warning({title: `提示`, content: '密码不能为空！'})
                    return
                }
                if (this.againPW) {
                    this.$Modal.warning({title: `提示`, content: '两次输入的密码不一致'})
                    return
                }
                var passWord = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/;
                if (!passWord.test(this.MT4_password)) {
                    this.$Modal.warning({title: `提示`, content: '密码为6-16位字母和数字组合，支持特殊字符！'})
                    return
                }
                var ajaxData = {
                    id: this.MT4List.id,
                    server_name: this.MT4List.platform.server_name,
                    MT4_account: this.MT4List.MT4_account,
                    MT4_password: this.MT4_password,
                    // platform: this.MT4List.platform.platform,
                }
                 this.reqLoading=true
                var httpName = '关联'
                this.$http.post('/MT4/reset_MT4', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`});
                            this.updateData()
                            this.$emit('close')
                        } else {
                            this.reqLoading=false
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                        this.reqLoading=false
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    })
            },

            toEmail(){
                this.close()
                this.$router.push({
                    path:'/home/mySetting/personalData/'
                })
            },
            close(){
                this.$emit('close')
            },
            agree(){
                this.close()
                this.$emit('agree')
            },
            updateData () {
                this.$emit('event')
                this.close()
            },
        },
    }
</script>