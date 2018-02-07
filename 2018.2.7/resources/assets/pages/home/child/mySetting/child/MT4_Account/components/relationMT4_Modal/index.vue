<style lang="less" scoped src="./css/index.css"></style>
<style>
    #relationMT4_modal .relation_progress_content .progress_gif .ivu-progress-bg {
        background-color: #FFA114;
    }

    #relationMT4_modal .platform_box .ivu-select-single .ivu-select-selection {
        height: 50px;
        line-height: 50px;
        border-radius: 6px;
        border: 1px solid #CCCCCC;
    }

    #relationMT4_modal .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        color: #999999;
    }


</style>
<template>
    <div id="relationMT4_modal" class="relationMT4_modal custom_modal">

        <div v-if="relation_account">
            <div class="modal_top">
                <span>关联MT4账号</span>
                <span @click="close" class="iconfont">&#xe63c;</span>
            </div>

            <div class="relationMT4_content" ref="modal_content" :class="{Modal_scroll:scrollShow}">
                <div class="relation_prompt">
                    <p>关联提示</p>
                    <span>账号信息采用加密传输，关联成功后，我们将在云端登录并保存您的MT4账号，届时可进行一键跟随，自动复制中汇的交易策略信号</span>
                </div>
                <!--中间input块内容-->
                <!--1-EWG 2-KVB 3-TERA 4-->
                <div class="relation_details">
                    <div class="platform_box">
                        <Select style="width:320px" placeholder="交易商平台" v-model="getPlatform">
                            <Option v-for="item in duplicateRemovalPlatformList" :value="item.platform" :key="item.platform">{{item.platform}}</Option>
                        </Select>
                    </div>
                    <div class="platform_box">
                        <Select  style="width:320px" placeholder="服务器名称" v-model="relationForm.platform" >
                            <Option :value="item.id" :key="item.id" v-for="item in serverSelectList" @click.native="getServerName(item.server_name)">{{item.server_name}}</Option>
                        </Select>
                    </div>
                    <div class="input_box">
                        <input type="text" placeholder="MT4账号" v-model="relationForm.MT4_account"
                                                  name="MT4账号" v-validate data-vv-rules="required|numeric|min:4"
                                                  maxlength="20">
                                </div>
                    <div class="input_box">
                        <input type="password" placeholder="MT4密码" v-model="relationForm.MT4_password" maxlength="50">
                        <span>请字母区分大小写</span>
                    </div>

                    <div class="input_box"><input type="password" placeholder="确认密码" v-model="password_confirmation"
                                                  maxlength="50">
                                       </div>
                            </div>

                <!--<div class="email_prompt">-->
                    <!--<p>邮箱提示</p>-->
                    <!--<span>您已绑定 <span-->
                            <!--class="user_emails">XXX@163.com</span>,为成功关联交易账号，请保持MT4注册邮箱与中汇注册邮箱一致性，若不一致，请前往<span-->
                            <!--class="changeEmails" @click="modifyEmail">修改邮箱</span></span>-->
                <!--</div>-->
               <div class="relation-btn-container"><button class="relation_btn" @click="relationPost">立即关联 <v-reqLoading v-if="reqLoading"></v-reqLoading></button></div>
            </div>
        </div>



        <div v-if="relation_progress">
            <div class="modal_top">
                <span>关联进度</span>
            </div>
             <!--关联进度1-->
            <!--<div class="relation_progress_content" v-if="relation==1">-->
                <!--<p class="relation_progress_title"><span class="iconfont number_icon">&#xe681;</span>检验客户体系</p>-->
                <!--<p class="iconfont bottle_icon">&#xe6a7;</p>-->
                <!--&lt;!&ndash;进度条&ndash;&gt;-->
                <!--<p class="progress_gif" v-if="relation_gif==1">-->
                    <!--<Progress :percent="val" status="active"></Progress>-->
                <!--</p>-->
                <!--&lt;!&ndash;<p class="prompt_information">您的MT4账号没有注册在中汇的客户体系内，请联系 <span>在线客服</span>，协助您更改客户归属。&ndash;&gt;-->
                <!--&lt;!&ndash;</p>&ndash;&gt;-->
            <!--</div>-->

            <!--关联进度2-->
            <!--<div class="relation_progress_content" v-if="relation==2">-->
                <!--<p class="relation_progress_title"><span class="iconfont number_icon">&#xe682;</span>检验邮箱一致性</p>-->
                <!--<p class="iconfont bottle_icon">&#xe647;</p>-->
                <!--&lt;!&ndash;进度条&ndash;&gt;-->
                <!--<p class="progress_gif" v-if="relation_gif==2">-->
                    <!--<Progress :percent="val2" status="active"></Progress>-->
                <!--</p>-->
                <!--&lt;!&ndash;<p class="prompt_information" >您的账号绑定邮箱，与MT4账号绑定邮箱不一致请先前往 <span>修改绑定邮箱</span></p>&ndash;&gt;-->
            <!--</div>-->

            <!--关联进度3-->
            <div class="relation_progress_content" v-if="relation==3">
                <p class="relation_progress_title">
                    <!--<span class="iconfont number_icon">&#xe683;</span>-->
                    检验交易密码</p>
                <p class="iconfont bottle_icon">&#xe927;</p>
                <!--进度条-->
                <p class="progress_gif" v-if="relation_gif==3">
                    <Progress :percent="val3" status="active"></Progress>
                </p>
                <!--<div class="psw_error_information">-->
                <!--<p>交易密码错误，请重新输入</p>-->
                <!--<div><input type="password" placeholder="请输入交易密码"></div>-->
                <!--<div><input type="password" placeholder="再次确认密码"></div>-->
                <!--<button class="relation_btn">重新关联</button>-->
                <!--</div>-->
            </div>


            <!--关联进度4-->
            <div class="relation_progress_content relation_progress_four" v-if="relation==4">
                <p class="relation_progress_title">
                    <!--<span class="iconfont number_icon">&#xe684;</span>-->
                    账号关联中...</p>
                <p class="iconfont bottle_icon">&#xe609;</p>

                <p class="prompt_information" style="text-align: center">关联需要10分钟，请耐心等待!</p>
                <div class="relation_success_btn">
                    <button class="relation_btn" @click="know">我知道了</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'
    export default {

        data() {
            return {
                reqLoading:false,
                choice: '',
                showModify: false,
                getPlatform:'',
                relationForm: {
                    platform: '',
                    MT4_account: '',
                    MT4_password: '',
                    server_name:'',
                },
                cooperativePlatformList: '',
                duplicateRemovalPlatformList:'',
                password_confirmation: '',
                relation_account: true,
                relation_progress: false,
                relation: '',
                relation_gif: '',
                val: 0,
                val2: 0,
                val3: 0,
                scrollShow: false,
              //  serverNameList:'',
                platform:'',
            }
        },
        computed: {
            againPW(){
                return this.relationForm.MT4_password != '' && (this.relationForm.MT4_password != this.password_confirmation) && (!this.errors.has('密码'))
            },

            //下拉框数据
            serverSelectList(){
                return this.getServerSelectList(this.cooperativePlatformList,this.getPlatform)
            }
        },
        watch: {

        },
        beforeMount(){
            console.log(this.modalMsg);
            //请求MT4demo账号数据
            this.$http.get('/MT4/demo_MT4')
                .then((response) => {
                    const data = response.data;
                    const {retCode, retData = {}}=data;
                    if (retCode == '0') {
                        this.demoMT4List=retData;
                    } else {
                        console.log('请求数据失败');
                    }
                }).catch((error) => {
                console.log(error);
            });

            //请求合作平台交易商数据
            this.$http.get('/platform/cooperative')
                .then((response) => {
                    const data = response.data;
                    const {retCode, retData = {}}=data;
                    if (retCode == '0') {
                        this.cooperativePlatformList = retData
                        var arr =  this.cooperativePlatformList
                        var hash = {};
                        arr = arr.reduce(function(item, next) {
                            hash[next.platform] ? '' : hash[next.platform] = true && item.push(next);
                            return item
                        }, [])
                        this.duplicateRemovalPlatformList=arr

                    } else {
                        console.log('请求数据失败');
                    }
                }).catch((error) => {
                console.log(error);
            });
            this.setModalMaxHeight()
        },
        props:["modalMsg"],
        methods: {
            //下拉框绑定数据
            getServerSelectList(data,platform){
                var list=[]
                if(platform===''){
                    return list
                }
                for(var i in data){
                    if(platform==data[i]["platform"]){
                        list.push(data[i])
                    }
                }
                return list
            },



    setModalMaxHeight(){
          //     var modal_content = this.$refs.modal_content;
                if (window.screen.height > document.documentElement.clientHeight+100) {
                    this.scrollShow = true
                }
            },


            getServerName(data){
               return this.serverName=data
            },
            //  关联MT4账号
            relationPost(){
                this.$validator.validateAll()
                var accountWord= /^\d{4,20}$/;
                if(!accountWord.test(this.relationForm.MT4_account)){
                    this.$Modal.warning({title:`提示`,content:'MT4账号为4-20位字符,只能为数字'})
                    return
                }

                if (this.againPW) {
                    this.$Modal.warning({title: `提示`, content: '两次输入的密码不一致'})
                    return
                }
                var ajaxData = {
                    platform: this.relationForm.platform,
                    MT4_account: this.relationForm.MT4_account,
                    MT4_password: this.relationForm.MT4_password,
                    server_name:this.serverName
                };
                console.log(ajaxData);
                //密码为0-50位数字和字母或特殊字符组合
                // var passWord = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{0,50}$/;
                //密码为0-50位数字、字母、特殊字母、可以为纯数字或者纯字母
                var passWord = /^[0-9a-zA-Z]{0,50}$/;
                if (!passWord.test(this.relationForm.MT4_password)) {
                    this.$Modal.warning({title: `提示`, content: '密码为0-50位字符，数字、大小写字母、符号！'})
                    return
                }

                var httpName = '关联';
                this.reqLoading=true
                this.$http.post('/MT4/relate_MT4', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.relation_account = false;
                            this.relation_progress = true;
                            this.relation = 4;
//                            this.relation_gif = 3;
 //                           this.$Message.success({content: `${httpName}成功`})

                        } else {
                            this.reqLoading=false
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                        this.reqLoading=false
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    });
            },
//            modifyEmail(){
//                this.close();
//                this.$router.push({
//                    path:'/home/mySetting/personalData'
//                })
//            },
            close(){
                this.$emit('close')
            },
            know () {
                this.updateData()
            },
            updateData () {
                this.$emit('event')
                this.close()
            },
            agree(){
                this.close()
                this.$emit('agree')
            },
//            scrollTime(){
//                let timer = setInterval(() => {
//                    let step = Math.floor(Math.random() * 10 + 1);
//                    this.val = this.val + step;
//                    if (this.val >= 100) {
//                        this.val = 100;
//                        clearInterval(timer);
//                        this.follow = 2;
//                        this.follow_gif = 2;
//                        this.scrollTime2()
//                        return
//                    }
//                }, 300)
//            },
//            scrollTime2(){
//                let timer = setInterval(() => {
//                    let step = Math.floor(Math.random() * 10 + 1);
//                    this.val2 = this.val2 + step;
//                    if (this.val2 >= 100) {
//                        this.val2 = 100;
//                        clearInterval(timer);
//                        this.follow = 3;
//                        this.follow_gif = 3;
//                        this.scrollTime3()
//                        return
//                    }
//                }, 350)
//            },
//            scrollTime3(){
//                var httpName = '关联'
//                let timer = setInterval(() => {
//                    let step = Math.floor(Math.random() * 10 + 1);
//                    this.val3 = this.val3 + step;
//                    if (this.val3 >= 100) {
//                        this.val3 = 100;
//                        clearInterval(timer);
//                        this.follow = 4;
//                        this.$Message.success({content: `${httpName}成功`})
//                        return
//                    }
//                }, 500)
//            },
        }
    }
</script>