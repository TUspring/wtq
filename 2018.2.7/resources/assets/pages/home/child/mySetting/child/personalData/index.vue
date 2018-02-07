<style lang="css" scoped src="./css/index.css"></style>
<style>
    .verificationCode_content .disabled {
        color: #666;
        border: 1px solid #eeeeee;
        cursor: not-allowed;
    }

    .avatar_box {
        width: 120px;
        height: 120px;
        display: inline-block;
        border-radius: 50%;
    }
    .personal_data_content .details_content_left .ivu-input{
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
    }
    .personal_data_content .details_content_left .ivu-select-selection {
        height: 40px;
        line-height: 40px;
    }

    .personal_data_content .details_content_left .ivu-select-selection .ivu-select-selected-value {
        height: 40px;
        line-height: 40px;
    }

    .personal_data_content .details_content_left .ivu-select-selection .ivu-select-placeholder {
        height: 40px;
        line-height: 40px;
    }



    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .upload-pic-box{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: relative;
        background-color: #EEEEEE;
    }
    /*.upload-pic-box:hover{*/
        /*background-color: rgba(245,245,245,.7);*/
    /*}*/
    .upload-pic{
        top: 0px;
        left: 0px;
        position: absolute;
        width: 120px;
        height: 120px;
        z-index: 100;
        display: inline-block;
        border-radius: 50%;
    }
    .spin-box{
        top: 0px;
        left: 0px;
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
    }
  .uploadIcon{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      top: 0px;
      left: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
      position: relative;
   }
    .loading-box {
        width: 970px;
        height: 330px;
        background-color: #FFFFFF;
        border-radius: 6px;
        position: relative;
    }
    .loading-content{
        width: 200px;
        height: 100px;
        top: 100px;
        left: 50%;
        margin-left: -100px;
        position: absolute;
        display: flex;
        justify-content: center;
    }
    .transition-box{
        overflow: hidden;
        transition: height 0.3s ease-in-out;
    }
</style>
<template>
    <div>
        <!--加载动画-->
        <div class="loading-box" v-if="!showPage">
            <Row class="loading-content">
                <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="load-c" size=60 class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
                </Col>
            </Row>
        </div>

        <!--个人资料-->
        <div class="personal_data_content" v-if="showPage">

            <!--弹窗-->
            <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
                   :mask-closable="false">
                <div slot="header"></div>
                <div slot="close"></div>
                <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg">
                    <!-- 组件在 vm.currentview 变化时改变！ -->
                </component>
                <div slot="footer"></div>
            </Modal>

            <!--基本资料-->
            <div class="list_box">
                <div class="basic_title" @click="changeTitle1" v-show="toggle1">
                    <span>基本资料</span>
                    <span>编辑 <span class="font_icon iconfont">&#xe66c;</span></span>
                </div>
                <v-FoldTransition>
                <div v-show="!toggle1" class="transition-box">
                    <div class="basic_details" @click="changeTitle2"  v-show="!toggle1">
                        <span>基本资料</span>
                        <span>收起 <span class="font_icon iconfont">&#xe604;</span></span>
                    </div>

                    <div class="details_content cl">
                        <div class="details_content_left">
                            <div class="details_left_name">
                                <span>昵称</span>
                                <Input class="name_input" v-model="personalForm.name" :maxlength="32" style="width: 400px"></Input>
                            </div>
                            <div class="details_left_sex">
                                <span>性别</span>
                                <div class="details_left_radio">
                                    <Radio-group v-model="personalForm.sex">
                                        <Radio label="1">男</Radio>
                                        <Radio label="2">女</Radio>
                                    </Radio-group>
                                </div>
                            </div>
                            <div class="details_left_birthday">
                                <span>生日</span>
                                <div class="details_left_date">
                                    <Select v-model="year" style="width:200px">
                                        <Option :value="2019-n" v-for="n in 80" :key="2019-n">{{2019-n}}</Option>
                                    </Select>
                                    <Select v-model="month" style="width:90px">
                                        <Option :value="n" :key="n" v-for="n in 12">{{n}}</Option>
                                    </Select>
                                    <Select v-model="day" style="width:90px">
                                        <Option :value="n" :key="n"
                                                v-for="n in new Date(this.year,this.month,0).getDate()">{{n}}
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div class="details_left_city">
                                <span>城市</span>
                                <div class="details_left_area">
                                    <Select v-model="personalForm.city.province_id" style="width:195px"
                                            placeholder="请选择省/市">
                                        <Option v-for="item in province_list" :value="item.id" :key="item.id"
                                                @click.native="changeProvince(item.id)">
                                            {{item.name}}
                                        </Option>
                                    </Select>
                                    <Select v-model="personalForm.city.id" style="width:195px" placeholder="请选择市/区">
                                        <Option v-for="item in cityListModel" :value="item.id" :key="item.id" v-show="cityListModel.length">
                                            {{item.name}}
                                        </Option>
                                        <Option value="" v-show="!(cityListModel.length)&&personalForm.city.province_id!=''">
                                            加载中...
                                        </Option>
                                        <Option value="" v-show="personalForm.city.province_id==''">
                                            请先选择省份
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <button class="personal_data_btn" @click="personalData">确定<v-reqLoading v-if="reqLoading"></v-reqLoading></button>
                        </div>

                        <div class="details_content_right">
                            <template>
                                <!--:class="['uploadBox',{hasImg:img.url}]"-->
                                <div class="upload-pic-box">
                                    <!--<div class="uploadingBox" v-if="imgUploading" @click.stop=""></div>-->
                                    <div class="spin-box" v-show="imgUploading">
                                        <Spin fix>
                                            <Icon type="load-c" size='36' class="demo-spin-icon-load"></Icon>
                                        </Spin>
                                    </div>
                                    <div class="uploadIcon" v-show="!imgUploading">
                                        <Icon type="camera" size="40"></Icon>
                                    </div>
                                    <div class="upload-pic" v-if="!imgUploading">
                                        <!--<Icon type="camera" size="40"></Icon>-->
                                        <img class="avatar_box" :src="personalForm.avatar" v-if="personalForm.avatar">
                                    </div>
                                </div>

                                <Upload
                                        ref="upload"
                                        :headers="{'X-CSRF-TOKEN': token,'X-Requested-With':'XMLHttpRequest'}"
                                        :show-upload-list="false"
                                        :default-file-list="defaultList"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :on-progress="handleProgress"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        multiple
                                        type="select"
                                        action="/upload"
                                        style="display: inline-block;width:120px;">
                                    <button class="upload_img_btn" v-if="imgUploading" @click.stop=""
                                            style="color: #FFA114">上传中...
                                    </button>
                                    <button class="upload_img_btn" v-if="!imgUploading">上传头像</button>
                                </Upload>
                            </template>
                            </span>只支持jpg、png格式且大小在2MB以内</span>
                        </div>
                    </div>
                 </div>
                </v-FoldTransition>
            </div>
            <!--手机号码-->
            <div class="list_box">
                <div class="basic_title" @click="changeTitle3" v-show="toggle2">
                    <span>手机号码</span>
                    <span>编辑 <span class="font_icon iconfont">&#xe66c;</span></span>
                </div>
                <v-FoldTransition>
                <div v-show="!toggle2" class="transition-box">
                    <div class="basic_details" @click="changeTitle4" v-show="!toggle2">
                        <span>手机号码</span>
                        <span>收起 <span class="font_icon iconfont">&#xe604;</span></span>
                    </div>
                    <div class="basic_data_content">
                        <ul class="number_content" v-if="alterationNumber">
                            <li>
                                <span>手机账号</span>
                                <span class="number" v-model="personalForm.phone">{{personalForm.phone}}</span>
                            </li>
                            <li>
                                <button class="replace_number_btn" @click="changeTel">更换手机号</button>
                            </li>
                        </ul>
                        <div class="changeNumber_container" v-if="!alterationNumber">
                            <div class="changeNumber_content">
                                <span>旧手机号</span>
                                <span type="text" class="current_number" v-model="personalForm.phone">{{personalForm.phone}}</span>
                            </div>
                            <div class="changeNumber_content">
                                <span>登陆密码</span>
                                <input type="password" class="login_psw" v-model="phoneForm.password">
                            </div>
                            <div class="changeNumber_content">
                                <span>新手机号</span>
                                <input type="text" class="newNumber" v-model="phoneForm.phone" maxlength="11">
                            </div>
                            <div class="verificationCode_content ">
                                <span>验证码</span>
                                <div>
                                    <input type="text" class="code" maxlength="6" v-model="phoneForm.phone_verify">
                                    <button :class="{disabled:codeDelay>0}" class="sendCode" @click="sendCode">
                                        {{codeDelay>0?codeDelay+'s后重新发送':'发送验证码'}}
                                    </button>
                                </div>
                            </div>
                            <button class="changeTel_btn" @click="resetPhone">确认 <v-reqLoading v-if="reqLoading"></v-reqLoading></button>
                        </div>
                    </div>
                </div>
               </v-FoldTransition>
            </div>
            <!--修改密码-->
            <div class="list_box">
                <div class="basic_title" @click="changeTitle5" v-show="toggle3">
                    <span>修改密码</span>
                    <span>编辑 <span class="font_icon iconfont">&#xe66c;</span></span>
                </div>
                <v-FoldTransition>
                <div v-show="!toggle3" class="transition-box">
                    <div class="basic_details" @click="changeTitle6" v-show="!toggle3" >
                        <span>修改密码</span>
                        <span>收起 <span class="font_icon iconfont">&#xe604;</span></span>
                    </div>
                    <div class="modify_psw_container">
                        <div class="modify_psw_content cur">
                            <span>当前密码</span>
                            <input type="password" class="current_psw" v-model="pswForm.old_password">
                            <span class="forget_psw" @click="showModal('forgetPassword',{phone:personalForm.phone})">忘记密码</span>
                        </div>
                        <div class="modify_psw_content">
                            <span>新密码</span>
                            <input type="password" class="new_psw" placeholder="6-16位字母、数字或特殊字符"
                                   v-model="pswForm.password" maxlength="16">
                        </div>
                        <div class="modify_psw_content repeatPsw">
                            <span>确认新密码</span>
                            <input type="password" class="confirm_psw" v-model="pswForm.password_confirmation"
                                   maxlength="16">
                        </div>
                        <button class="confirm_modify_btn" @click="modifyPassword">确认<v-reqLoading v-if="reqLoading"></v-reqLoading></button>
                    </div>
                </div>
                </v-FoldTransition>
            </div>
            <!--邮箱账号-->
            <div class="list_box">
                <div class="basic_title" @click="changeTitle7" v-show="toggle4">
                    <span>邮箱账号</span>
                    <span>编辑 <span class="font_icon iconfont">&#xe66c;</span></span>
                </div>
                <v-FoldTransition>
                <div v-show="!toggle4" class="transition-box">
                    <div class="basic_details" @click="changeTitle8" v-show="!toggle4">
                        <span>邮箱账号</span>
                        <span>收起 <span class="font_icon iconfont">&#xe604;</span></span>
                    </div>
                    <div class="basic_data_content">
                        <ul class="email_content" v-show="alterationEmail">
                            <li>
                                <span>邮箱账号</span>
                                <span class="email" v-model="personalForm.email">{{personalForm.email}}</span>
                            </li>
                            <li>
                                <button class="replace_email_btn" @click="changeEmail">更换邮箱号</button>
                            </li>
                        </ul>
                        <div class="changeEmail_container" v-if="!alterationEmail">
                            <div class="changeEmail_content">
                                <span>旧邮箱</span>
                                <span type="text" class="current_email" v-model="personalForm.email">{{personalForm.email}}</span>
                            </div>
                            <div class="changeEmail_content">
                                <span>登陆密码</span>
                                <input type="password" class="login_psw" v-model="emailForm.password">
                            </div>
                            <div class="changeEmail_content">
                                <span>新邮箱</span>
                                <input type="text" class="newEmail" v-model="emailForm.email">
                            </div>
                            <div class="verificationCode_content ">
                                <span>验证码</span>
                                <div>
                                    <input type="text" class="code" maxlength="6" v-model="emailForm.email_verify">
                                    <button :class="{disabled:codeDelay>0}" class="sendCode" @click="emailCode">
                                        {{codeDelay>0?codeDelay+'s后重新发送':'发送验证码'}}
                                    </button>
                                </div>
                            </div>
                            <button class="changeEmail_btn" @click="resetEmail">确认<v-reqLoading v-if="reqLoading"></v-reqLoading></button>
                        </div>
                    </div>
                </div>
                </v-FoldTransition>
            </div>
        </div>
    </div>
</template>
<script>
    import forgetPassword_Modal from './components/forgetPassword_Modal'
    import {mapState, mapActions} from 'vuex'
    import {USER_SETINFO} from 'store/user'
    export default {
        components: {
            'forgetPassword_Modal': forgetPassword_Modal,
        },

        data () {
            return {
//            头像上传
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                reqLoading:false,
                imgUploading: false,
                token: null,
                img: {
                    url: '',
                    path: ''
                },
                form: {
                    picture: '',
                    name: '',
                    describe: ''
                },

                //基本资料表单
                personalForm: {
                    name: '',
                    sex: '',
                    birthday: '',
                    avatar: '',
                    phone: '',
                    email: '',
                    city: {
                        id: '',
                        province_id: ''
                    },
                },
                //省市表
                province_list: '',
                city_list: {},
                cityListModel: [],
                province_id: '',
                // 重置手机号表单
                phoneForm: {
                    old_phone: '',
                    phone: '',
                    password: '',
                    phone_verify: ''
                },
                //邮箱表单
                emailForm: {
                    email: '',
                    old_email: '',
                    email_verify: '',
                    password: ''
                },

                //修改密码表单
                pswForm: {
                    old_password: '',
                    password: '',
                    password_confirmation: ''
                },

                toggle1: true,
                toggle2: true,
                toggle3: true,
                toggle4: true,
                //年月日
                phone: '',
                year: '',
                month: '',
                day: '',
                codeDelay: 0,
                alterationEmail: true,
                alterationNumber: true,
                modalList: {
                    forgetPassword: {
                        name: 'forgetPassword_Modal',
                        width: ''
                    }
                },
                curModal: {
                    name: '',
                    width: ''
                },
                iviewModal: false,
                showPage: false,
            }
        },
        beforeMount(){
            const changeTelCodeRecode = this.util.getData('phoneChangeCodeRecode', 60)
            if (!this.util.isEmpty(changeTelCodeRecode)) {
                this.codeDelay = 60 - parseInt((new Date().getTime() - changeTelCodeRecode) / 1000)
                this.countCodeDelay()
            }

            const changeEmailCodeRecode = this.util.getData('changeEmailCodeRecode', 60)
            if (!this.util.isEmpty(changeEmailCodeRecode)) {
                this.codeDelay = 60 - parseInt((new Date().getTime() - changeEmailCodeRecode) / 1000)
                this.countCodeDelay()
            }
            this.token = document.getElementById("csrf-token").getAttribute("content")
            this.getReadyHttp()
        },
        computed: {
            againPW(){
                return this.pswForm.password != '' && (this.pswForm.password != this.pswForm.password_confirmation)
            },
            phoneSame(){
                return this.personalForm.phone == this.phoneForm.phone
            },
            new_old_PswSame(){
                return this.pswForm.old_password == this.pswForm.password
            },
        },
        methods: {
            showModal(name, data = {}){
                const modalList = this.modalList
                this.modalMsg = data
                this.curModal = modalList[name],
                    this.iviewModal = true
            },
            ...mapActions([USER_SETINFO]),
            ...mapActions({changeCompontentStates: 'changeCompontentStates'}),
            getReadyHttp(){
                var getUserInfo = this.getUserInfo()
                var getProvinceList = this.getProvinceList()

                Promise.all([getUserInfo, getProvinceList]).then(() => {
                    var province_id = this.personalForm.city.province_id
                    if (province_id != '') {

                        var cur_province = this.cur_province(province_id)
                        cur_province.then(() => {
                            this.cityListModel = this.city_list[String(province_id)]
                            this.showPage = true
                        }).catch(() => {
                            //   this.$Modal.error({content:'请求失败'})
                        })
                    } else {
                          this.showPage = true
                    }
                }).catch(() => {
                    console.log('请求失败');
                    // this.$Modal.error({content:'请求失败'})
                });
            },
            getUserInfo(){
                //请求个人资料数据
                return new Promise((resolve, reject) => {
                    this.$http.get('/user')
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;

                            if (retCode == '0') {

                                Object.assign(this.personalForm, retData)
                                if (!this.personalForm.city) {
                                    this.personalForm.city = {
                                        id: '',
                                        province_id: ''
                                    }
                                }
//                             this.personalForm.city.province_id = Number(this.personalForm.city.province_id)
                                if (this.personalForm.birthday !== null){
                                    var arr = (this.personalForm.birthday).split("-");
                                    this.year = Number(arr[0]);
                                    this.month = Number(arr[1]);
                                    this.day = Number(arr[2]);
                                }

                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            //  头像上传
            handleSuccess (res, file) {
                if (res.retCode == '0') {
                    this.img = res.retData
                    this.img.url = res.retData.url
                    this.img.path = res.retData.path
                    this.personalForm.avatar = res.retData.url
                    this.form.picture = this.img.path
                    //   this.$Message.success({content: `上传成功`})
                } else {
                    this.$Modal.error({title: `上传失败`, content: res.retData})
                }
                this.imgUploading = false
            },
            handleError (error) {
                this.$Modal.error({title: `上传失败`, content: this.util.getHttpText(error)})
                this.imgUploading = false
            },
            handleProgress(event, file, fileList){
                this.imgUploading = true
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            //个人资料提交
            personalData(){
                var date = this.year + "-" + this.month + "-" + this.day
                if (date == '--') {
                    date = ''
                } else {
                    if (this.util.isEmpty(this.year) || this.util.isEmpty(this.month) || this.util.isEmpty(this.day)) {
                        this.$Modal.error({content: '请选择完整的生日日期'})
                        return
                    }
                }
                var ajaxData = {
                    name: this.personalForm.name,
                    sex: this.personalForm.sex,
                    birthday: date,
                    avatar: this.personalForm.avatar,
                    city_id: this.personalForm.city.id
                };
                this.reqLoading=true
                var httpName = '修改'
                this.$http.put('/user', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.USER_SETINFO(ajaxData)
                            this.$Message.success({content: `${httpName}成功`})
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

            // 重置手机号表单请求
            resetPhone(){
                var httpName = '修改'
                if (this.phoneSame) {
                    this.$Modal.error({title: `${httpName}失败`, content: '新手机号不能跟原来手机号一样'})
                    return
                }
                var ajaxData = {
                    old_phone: this.personalForm.phone,
                    phone: this.phoneForm.phone,
                    password: this.phoneForm.password,
                    phone_verify: this.phoneForm.phone_verify,
                }
                this.reqLoading=true
                this.$http.post('/user/reset_phone', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`})
                            this.alterationNumber = !this.alterationNumber
                            this.personalForm.phone = "";
                            this.phoneForm.phone = "";
                            this.phoneForm.password = "";
                            this.phoneForm.phone_verify = "";
                            this.update()
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

            //修改密码请求
            modifyPassword(){
                var ajaxData = this.pswForm;
                var httpName = '修改';
                if (this.againPW) {
                    this.$Modal.error({title: `修改失败`, content: '两次输入的密码不一致'})
                    return
                }
                if (this.new_old_PswSame) {
                    this.$Modal.error({title: `修改失败`, content: '不能跟原来密码一样'})
                    return
                }
                var passWord = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/;
                if (!passWord.test(this.pswForm.password)) {
                    this.$Modal.error({title: `修改失败`, content: '密码为6-16位字母和数字组合，支持特殊字符！'})
                    return
                }
                this.reqLoading=true
                this.$http.post('user/modify_pwd', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`})
                            this.update()
                            this.pswForm.password = "";
                            this.pswForm.password_confirmation = "";
                            this.pswForm.old_password = "";
                            this.toggle3 = !this.toggle3
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

            //重置邮箱请求
            resetEmail(){
                var ajaxData = {
                    email: this.emailForm.email,
                    old_email: this.personalForm.email,
                    email_verify: this.emailForm.email_verify,
                    password: this.emailForm.password
                };

                var httpName = '邮箱修改';
                this.reqLoading=true
                this.$http.post('/user/modify_email', ajaxData)
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if (retCode == '0') {
                            this.reqLoading=false
                            this.$Message.success({content: `${httpName}成功`})
                            this.alterationEmail = !this.alterationEmail
                            this.emailForm.email = "";
                            this.emailForm.password = "";
                            this.emailForm.email_verify = "";
                            this.update()
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
            changeTitle1(){
                this.toggle1 = !this.toggle1;
                this.toggle2 = true
                this.toggle3 = true
                this.toggle4 = true
            },
            getProvinceList(){
                return new Promise((resolve, reject) => {
                    //省份数据
                    this.$http.get('/area/province_list')
                        .then((response) => {

                            const {retCode, retData}= response.data;
                            if (retCode == '0') {
                                this.province_list = retData;
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },
            changeProvince(id){
                console.log(id);
                var cityList = this.city_list
                if (!!cityList[String(id)]) {
                    this.cityListModel = cityList[String(id)]
                } else {
                    this.personalForm.city.id = ''
                    this.cityListModel = []
                    var cur_province = this.cur_province(id)
                    cur_province.then(() => {
                        this.cityListModel = cityList[String(id)]
                    }).catch(() => {
                    })
                }
            },
            //关联市
            cur_province (id) {
                return new Promise((resolve, reject) => {
                    var ajaxData = {
                        province_id: id,
                    };
                    this.$http.get('/area/city_list', {params: ajaxData})
                        .then((response) => {
                            const data = response.data
                            const {retCode, retData}=data
                            if (retCode == '0') {
                                this.city_list[String(id)] = retData;
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            changeTitle2(){
                this.toggle1 = !this.toggle1;
            },
            changeTel(){
                this.alterationNumber = !this.alterationNumber
            },
            changeEmail(){
                this.alterationEmail = !this.alterationEmail
            },
            changeTitle3(){
                this.toggle2 = !this.toggle2
                this.toggle1 = true
                this.toggle3 = true
                this.toggle4 = true
            },
            changeTitle4(){
                this.toggle2 = !this.toggle2
            },
            changeTitle5(){
                this.toggle3 = !this.toggle3
                this.toggle1 = true
                this.toggle2 = true
                this.toggle4 = true
            },
            changeTitle6(){
                this.toggle3 = !this.toggle3
            },
            changeTitle7(){
                this.toggle4 = !this.toggle4
                this.toggle1 = true
                this.toggle2 = true
                this.toggle3 = true
            },
            changeTitle8(){
                this.toggle4 = !this.toggle4
            },
            update(){
                this.$http.get('/user')
                    .then((response) => {
                        const data = response.data;
                        const {retCode, retData = {}}=data;
                        if (retCode == '0') {
                            Object.assign(this.personalForm, retData)
                            if (!this.personalForm.city) {
                                this.personalForm.city = {
                                    id: '',
                                    province_id: ''
                                }
                            }
                            var arr = (this.personalForm.birthday).split("-");
                            this.year = Number(arr[0]);
                            this.month = Number(arr[1]);
                            this.day = Number(arr[2]);
                        } else {
                            console.log("请求数据错误");
                        }
                    }).catch((error) => {
                    console.log(error);
                });

            },
            forgetPassword(){
                var data = {
                    forgetPassword_Modal: {
                        show: true
                    }
                };
                this.changeCompontentStates(data)
            },

            //更改手机号--发送验证码
            sendCode(){
                if (this.codeDelay > 0) {
                    return
                }
                var ajaxData = {
                    phone: this.phoneForm.phone
                };
                var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!phoneReg.test(ajaxData.phone)) {
                    this.$Message.error({content: '请输入有效的手机号码！'})
                    return
                }
                const httpName = "验证码发送"
                this.$http.post('/user/get_reset_phone_code', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.codeDelay = 60
                            this.util.setData('phoneChangeCodeRecode', new Date().getTime())
                            this.countCodeDelay()
                            this.$Message.success({content: `${httpName}成功`})
                        } else {
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})

                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})

                    });
            },

            //更改邮箱账号--发送验证码
            emailCode(){
                if (this.codeDelay > 0) {
                    return
                }
                var ajaxData = {
                    email: this.emailForm.email
                }
                //邮箱正则表达式
                var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if (!emailReg.test(ajaxData.email)) {
                    this.$Message.error({content: '请输入有效的邮箱！'})
                    return
                }
                const httpName = "验证码发送"
                this.$http.post('/user/send_code_by_email', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.codeDelay = 60;
                            this.util.setData('changeEmailCodeRecode', new Date().getTime())
                            this.countCodeDelay()
                            this.$Message.success({content: `${httpName}成功`})
                        } else {
                            this.$Modal.error({title: `${httpName}失败`, content: data.retMsg})
                        }
                    })
                    .catch((error) => {
                        this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
                    });
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
        },
        activated(){
            this.$emit("changeTab",0)//切换局部导航
        }
    }
</script>