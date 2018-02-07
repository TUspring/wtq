<style lang="css" scoped src="./css/index.css"></style>

<style lang="less">
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

    .becomeTrader_step1_content{
             .ivu-progress-bg {
            background-color:#FFA113;
        }
            .ivu-upload .ivu-icon-camera{
            font-size:40px !important;
            line-height:120px;
        }
        .uploadBox{
            width: 120px;
            height:120px;
            background:#F5F5F5;
            border-radius: 6px;
            cursor:pointer;
            position: relative;
            &:hover{
                 background:#EEEEEE;
                 }
            &>div{
                  width: 100%;
                  height: 100%;
                  border-radius: 6px;
                  text-align:center;
                  cursor:pointer;
                  position: absolute;
                  left: 0;
                  top:0
              }
            .uploadingBox{
                border-radius: 6px;
                background-color: #fff;
                &>div{
                      border-radius: 6px;
                      border: 1px solid #f5f5f5;
                      font-size: 18px;
                  }
                .demo-spin-icon-load{
                    animation: ani-demo-spin 1s linear infinite;
                }
            }
        }

        #face_img_content img {
            width:120px;
            height:120px;
            border-radius:6px;
        }
        #back_img_content img {
             width:120px;
             height:120px;
             border-radius:6px;
         }
        .uploadBox.hasImg{
            .uploadIcon{
                display: none;
            }
            &:hover{
                .uploadIcon{
                    background-color: rgba(0,0,0,0.4);
                    display: block;
                    .ivu-icon{
                        color:#dddddd
                    }
                }
            }
        }
}
#userCheck  .ivu-progress-bg {
    background-color:#FFA113;
}

</style>

<template>
    <div id="becomeTrader_step1_content" class="becomeTrader_step1_content cl"  v-if="step1Page">
        <Modal v-model="iviewModal" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <!--个人身份验证进度-->
            <div id="userCheck" class="progress_content" v-show="progress_content">
                <div class="progress_top">
                    <span>身份验证</span>
                </div>
                <div class="progress_middle">
                    <p>正在验证个人信息，请稍等！</p>
                </div>
                <div class="progress" id="progress">
                    <Progress :percent="val" status="active"></Progress>
                </div>
            </div>

            <!--验证成功-->
            <div class="success_content" v-show="success_content">
                <div class="success_top">
                    <span>身份验证</span>
                </div>
                <div class="success_middle">
                    <p>恭喜，您的个人身份验证成功！</p>
                    <span v-model="delay">{{delay}}秒后即将自动前往绑定银行卡</span>
                </div>
                <div class="button" @click="go">立即前往</div>
            </div>

            <!--验证失败-->
            <div class="fail_content" v-show="fail_content">
                <div class="fail_top">
                    <span>身份验证</span>
                </div>
                <div class="fail_middle">
                    <p>抱歉，您的个人身份验证失败！</p>
                    <span>姓名、身份证号与身份证照片不符。</span>
                </div>
                <div class="button"  @click="modify">立即修改</div>
            </div>
        </Modal>

        <div class="content_top">请上传本人的身份证件，确保图片清晰，四角完整</div>
        <div class="content">
            <ul>
                <li>
                   <div class="name_input_content cl">
                       <span>姓名</span>
                       <input type="text" placeholder="请输入真实姓名" name="真实姓名" v-model="form.real_name" v-validate data-vv-rules="required">
                   </div>
                    <p v-if="errors.has('真实姓名')">{{ errors.first('真实姓名') }}</p>
                </li>
                <li>
                    <div class="ID_input_content cl">
                        <span>身份证号码</span>
                        <input type="text" placeholder="请输入身份证号码" name="身份证号码" v-model="form.ID_number" v-validate data-vv-rules="required|alpha_num|min:18|max:18">
                    </div>
                    <p v-if="errors.has('身份证号码')">{{ errors.first('身份证号码') }}</p>
                </li>
                <li>
                    <div class="upload_ID_img-contetn cl">
                        <div class="uploadTitle">
                            <span>证件照片</span>
                        </div>
                        <div class="ID_img_content cl">
                            <!--正面-->
                            <div id="upload_positive">
                                <template>
                                    <Upload
                                            :headers="{'X-CSRF-TOKEN': token,'X-Requested-With':'XMLHttpRequest'}"
                                            :show-upload-list="false"
                                            :default-file-list="defaultList"
                                            :on-success="handleFaceSuccess"
                                            :on-error="handleFaceError"
                                            :on-progress="handleFaceProgress"
                                            :format="['jpg','jpeg','png']"
                                            :max-size="3072"
                                            :on-format-error="handleFaceFormatError"
                                            :on-exceeded-size="handleFaceMaxSize"
                                            multiple
                                            type="select"
                                            action="/upload"
                                            style="display: inline-block;width:120px;">
                                        <div :class="['uploadBox',{hasImg:faceImg.url}]">
                                            <div class="uploadingBox" v-if="faceImgUploading" @click.stop="">

                                                <Spin fix>
                                                    <Icon type="load-c" size='32' class="demo-spin-icon-load"></Icon><br>
                                                    <span style="color:#FFA113;">上传中...</span>
                                                </Spin>

                                            </div>
                                            <div id="face_img_content" v-if="!faceImgUploading">
                                                <img :src="faceImg.url" v-if="faceImg.url">
                                            </div>
                                            <div class="uploadIcon" v-if="!faceImgUploading">
                                                <Icon type="camera" size="40"></Icon>
                                            </div>

                                        </div>

                                    </Upload>
                                </template>
                            </div>

                            <!--反面-->
                            <div id="upload_opposite"><template>
                                <Upload
                                        :headers="{'X-CSRF-TOKEN': token,'X-Requested-With':'XMLHttpRequest'}"
                                        :show-upload-list="false"
                                        :default-file-list="defaultList"
                                        :on-success="handleBackSuccess"
                                        :on-error="handleBackError"
                                        :on-progress="handleBackProgress"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="3072"
                                        :on-format-error="handleBackFormatError"
                                        :on-exceeded-size="handleBackMaxSize"
                                        multiple
                                        type="select"
                                        action="/upload"
                                        style="display: inline-block;width:120px;">
                                    <div :class="['uploadBox',{hasImg:backImg.url}]">
                                        <div class="uploadingBox" v-if="backImgUploading" @click.stop="">

                                            <Spin fix>
                                                <Icon type="load-c" size='32' class="demo-spin-icon-load"></Icon><br>
                                                <span style="color:#FFA113;">上传中...</span>
                                            </Spin>

                                        </div>
                                        <div id="back_img_content" v-if="!backImgUploading">
                                            <img :src="backImg.url" v-if="backImg.url">
                                        </div>
                                        <div class="uploadIcon" v-if="!backImgUploading">
                                            <Icon type="camera" size="40"></Icon>
                                        </div>

                                    </div>

                                </Upload>
                            </template>

                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="example_ID_img_content cl">
                        <div class="ID_img_content cl">
                            <div id="example_positive">
                                <img src="./images/face.png" alt="">
                            </div>
                            <div id="example_opposite">
                                <img src="./images/back.png" alt="">
                            </div>
                            <!--图片遮罩-->
                            <div id="positive_shadow">
                                <div class="icon_content">
                                    <i class="iconfont">&#xe605;</i>
                                    <small>正面</small>
                                </div>
                            </div>
                            <div id="opposite_shadow">
                                <div class="icon_content">
                                    <i class="iconfont">&#xe605;</i>
                                    <small>反面</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<p>请上传身份证照片！</p>-->
                </li>
                <li>
                    <div id="warning">
                        <p>
                            温馨提示：
                            <span>图片不超过3M；图片格式为JPG、GIF、PNG</span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="btn_content">
                        <div id="next"   @click="next">下一步</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState,mapActions} from 'vuex'
    export default {
        data () {
            return {
                iviewModal: false,
                progress_content: false,
                success_content: false,
                fail_content: false,
                form: {
                    real_name: '',
                    ID_number: '',
                    ID_face: '',
                    ID_back: ''
                },

                token:null,
                faceImg:{
                    url: '',
                    path: ''
                },
                backImg: {
                    url: '',
                    path: ''
                },
                faceImgUploading: false,
                backImgUploading:false,
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
                imgName: String,
                visible: false,
                uploadList: [],
                val: 0,
                codeDelay: 0,
                delay: 3,
                step1Page: true,
                hasBankNumber: ''

            }
        },
        beforeMount(){
            this.token=document.getElementById("csrf-token").getAttribute("content")
            this.$http.get('/user/is_id_card')
                .then((response) => {
                    const data = response.data
                    const {retCode} = data
                    if (retCode == '0') {
                        this.step1Page = false
                        this.checkBackCard()
                    }else{
                        this.$router.push({
                            path: '/becomeTrader'
                        })
                    }
                })

        },
        props: ["userMsg"],
        methods: {
            //检验银行卡是否通过验证
            checkBackCard (){
                this.step1Page = false
                this.$http.get('/user/is_bank_card')
                    .then((response) => {
                        const data = response.data
                        const {retCode} = data
                        if (retCode == '0') {
                            this.step1Page = false
                            this.$router.push({
                                path: '/becomeTrader/step3'
                            })

                            var bankNumber = {
                                hasBankNumber:'6228481538135629999'
                            }
                            this.setUserMsg(bankNumber)
                        }else {
                            this.$router.push({
                                path: '/becomeTrader/step2'
                            })
                        }
                    })
            },
            setUserMsg(data) {
                this.$emit('setUserMsg',data)
            },

            //加载进度
            scrollTime(){
                this.fail_content = false
                this.progress_content = true
                let step = Math.floor(Math.random() * 10 + 1);
                let timer = setInterval(() => {
                    this.val = this.val + step;
                    if (this.val >= 100) {
                        this.val = 100;
                        clearInterval(timer);
                        this.progress_content = false
                        this.fail_content = false
                        this.success_content = true
                        this.countDelay()
                        return
                    }
                }, 200)
            },
            //3秒倒计时
            countDelay(){
                const count = this.delay;
                this.util.interval(() => {
                    this.delay--
                    if (this.delay <= 0) {
                        this.go()
                    }
                },1000,count)
            },

            //正面
            handleFaceSuccess (res, file) {
                if(res.retCode =='0'){
                    this.faceImg = res.retData
                    this.form.ID_face = this.faceImg.url
                    this.$Message.success({content: `上传成功`})
                }else{
                    this.$Modal.error({title:`上传失败`,content:res.retData})
                }
                this.faceImgUploading=false
            },
            //背面
            handleBackSuccess (res, file) {
                if(res.retCode =='0'){
                    this.backImg = res.retData
                    this.form.ID_back = this.backImg.url
                    this.$Message.success({content: `上传成功`})
                }else{
                    this.$Modal.error({title:`上传失败`,content:res.retData})
                }
                this.backImgUploading=false

            },
            handleFaceError (error) {
                this.$Modal.error({title:`上传失败`,content:this.util.getHttpText(error)})
                 this.faceImgUploading=false
            },
            handleFaceProgress(event, file, fileList){
                this.faceImgUploading=true
            },
            handleFaceFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleFaceMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 3M。'
                });
            },

            handleBackError (error) {
                this.$Modal.error({title:`上传失败`,content:this.util.getHttpText(error)})
                this.backImgUploading=false
            },
            handleBackProgress(event, file, fileList){
                this.backImgUploading=true
            },
            handleBackFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleBackMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            setUserMsg (data) {
                this.$emit("setUserMsg", data)
            },
            next () {
                this.$validator.validateAll();
                if (this.errors.any()) {
                	this.$Modal.error({content:this.errors.items[0].msg})
                    return
                }

                var form=this.form
                if(form.ID_face==''){
                    this.$Modal.error({content:'请上传证件正面照'})
                    return
                }
                if(form.ID_back==''){
                    this.$Modal.error({content:'请上传证件反面照'})
                    return
                } var form = this.form
                var ajaxData = form
                const httpName = "个人身份验证"

                //正则匹配真实姓名
                var checkName = /^[\u4e00-\u9fa5]{2,}$/;
                if(!checkName.test(ajaxData.real_name)) {
                    this.$Modal.error({title: `身份验证失败`, content: '真实姓名必须是2～20个字的中文！'})
                    return
                }

                this.iviewModal = true;
                this.fail_content = false
                this.progress_content = true

                this.$http.post('/user/check_id_card', ajaxData,{timeout:30000})
                    .then((response) => {
                        const data = response.data
                        const {retCode, retMsg} = data
                        if (retCode == '0') {
                            var step1_check = {
                                real_name:this.form.real_name,
                                ID_number:this.form.ID_number
                            }
                            this.setUserMsg(step1_check)
                            this.scrollTime()

                        }else {
                            this.success_content = false
                            this.progress_content = false
                            this.fail_content = true
                        }
                    })
                    .catch((error) =>{
                        this.iviewModal = false
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})

                    })
            },
            go() {
                this.$router.push({
                    path: '/becomeTrader/step2'
                })
            },
            modify () {
               this.iviewModal = false;
            }
        }
    }
</script>