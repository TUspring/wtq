<style>


    .tinymce-textarea-box  .ivu-card-body{
        padding: 0px;
    }
    .tinymce-textarea-box .mce-tinymce{
        box-shadow: none;
    }
    .tinymce-textarea-box  .ivu-card-shadow{
        box-shadow: none;
    }
   .layout-content-main .ivu-input{
        border-radius: 0px;
        margin-left: -3px;
    }
    .details_content_right {

    .ivu-upload .ivu-icon-camera {
        font-size: 40px !important;
        line-height: 120px;
    }

    .uploadBox {
        width: 120px;
        height: 120px;
        background: #F5F5F5;
        border-radius: 50%;
        position: relative;

    &
    :hover {
        background: #EEEEEE;
    }

    &
    >
    div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0
    }

    .uploadingBox {
        border-radius: 50%;
        background-color: #fff;

    &
    >
    div {
        border-radius: 50%;
        border: 1px solid #f5f5f5;
        font-size: 18px;
    }

    }
    }
    .uploadBox.hasImg {

    .uploadIcon {
        display: none;
    }

    &
    :hover {

    .uploadIcon {
        background-color: rgba(0, 0, 0, 0.4);
        display: block;

    .ivu-icon {
        color: #dddddd
    }

    }
    }
    }
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
    .mce-window {
        transform: initial !important;
    }

</style>
<style lang="css" scoped>
    .layout-content-main {
        padding: 20px 20px 50px;
    }

    .EA-title {
        margin: 30px 0px;
    }
 .EA-left-titile{
     width: 70px;
     display: inline-block;
   }
    .EA-pic span {
        display: inline-block;
        float: left;
    }

    .EA-pic .add-pic {
        width: 200px;
        height: 120px;
        position: relative;
        border:1px solid #dddee1;
        display: inline-block;
    }

    .upload_pic{
        width: 200px;
        height: 118px;
        top: 0px;
        left: 0px;
        display: inline-block;
        position: absolute;
        z-index: 999;
    }

    .plus-icon {
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -25px;
        position: absolute;
        font-size: 100px;
        color: #cccccc;
    }

    .tinymce-textarea-details {
        margin-top: 30px;
    }

    .EA-detals-title {
        display: inline-block;
        float: left;
        width: 70px;
    }

    .tinymce-textarea-box {
        width: 1030px;
        display: inline-block;
        position: relative;
        float: left;
        padding:0px;
    }
    .synopsis{
        width: 600px;
        height: 100px;
        resize: none;
        padding: 10px;
        border:1px solid #dddee1;
    }
    .EA-btn {
        margin: 30px 0px;
        text-align: center;
    }

    .EA-btn .cancel{
        margin-right: 30px;
    }
</style>
<style>
    #tinymceCard{
        width: 1030px;
    }
    #tinymceCard img{
        max-width: 100%;
    }
    .demo-spin-container{
        display: inline-block;
        width: 200px;
        height: 100px;
        position: relative;
    }
</style>
<template>
    <div class="layout-content-main">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
               :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem>EA管理</BreadcrumbItem>
                <BreadcrumbItem href="/EA_Manage/EA_list">EA列表</BreadcrumbItem>
                <BreadcrumbItem>新增EA</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="EA-title">
            <span class="EA-left-titile">EA名称：</span>
            <Input placeholder="请输入要闻名称" style="width: 600px" v-model="EA_name"></Input>
        </div>

        <div class="EA-pic cl">
            <span class="EA-left-titile">封面图片：</span>
            <template>
                <Tooltip placement="right" content="点击上传Banner图片">
                <Upload
                        ref="admin/ea_manage/upload_img"
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
                        action="admin/ea_manage/upload_img"
                        style="display: inline-block;width:200px;">
                    <div class="add-pic">
                           <div :class="['uploadBox',{hasImg:img.url}]">
                        <div class="uploadingBox" v-if="imgUploading" @click.stop=""></div>
                        <div class="uploadingBox" v-if="imgUploading">
                            <Spin fix>
                                <Icon type="load-c" size='36' class="demo-spin-icon-load"></Icon>
                            </Spin>
                        </div>
                    </div>
                        <img class="avatar_box upload_pic" :src="personalForm.avatar" v-if="personalForm.avatar">
                       <Icon type="ios-plus-empty" class="plus-icon"></Icon>
                   </div>
                </Upload>
                </Tooltip>
            </template>


        </div>
        <div class="EA-title">
            <span class="EA-left-titile">价格：</span>
            <Input placeholder="请输入EA价格" style="width: 200px" v-model="EA_price"></Input>
            <span> 元/套</span>
        </div>
        <div class="EA-pic cl">
            <span class="EA-left-titile">EA简介：</span>
            <textarea class="synopsis" name="" id="" cols="30" rows="10" v-model="EA_introduction"></textarea>
        </div>
        <div class="tinymce-textarea-details cl">
            <span class="EA-detals-title">EA详情：</span>
            <div class="tinymce-textarea-box">
                <Card shadow id="tinymceCard">
                    <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
                </Card>
                <Spin fix v-if="spinShow">
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>加载组件中...</div>
                </Spin>
            </div>
        </div>
        <Spin size="large" fix v-if="spinLoading"></Spin>
        <div class="EA-btn">
            <router-link to="/EA_Manage/EA_list">
                <!--<span class="cancel">取消</span>-->
                <Button class="cancel">取消</Button>
            </router-link>
            <!--<span @click="addEA">保存EA</span>-->
            <Button @click="addEA" type="primary">保存EA</Button>
        </div>
    </div>
</template>
<script>
    import tinymce from 'tinymce';
    window.$=require("jquery")
    import jQuery_form from '../jQuery_form.js'
    export default {
        components: {},
        name: 'text-editor',
        data(){
            return {
                spinLoading:false,
                // 头像上传
                defaultList: [
                    {
                        'name': '26cf7329f534947bcc5b8097bb41ad73648',
                        'url': 'http://zhonghui-pic.oss-cn-shenzhen.aliyuncs.com/26cf7329f534947bcc5b8097bb41ad73648/avatar'
                    }
                ],
                personalForm: {
                    avatar: '',
                },
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
                spinShow: true,
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    details: {
                        name: '',
                        width: ''
                    },

                },

                //新增EA表单
                EA_name:'',       //名称
                EA_price:'',    //价格
                EA_introduction:'', //简介
                EA_details:'',        //详情

                modalMsg: {},  //传给子组件的数据
            }
        },
        computed: {},
        beforeMount() {
            this.token = document.getElementById("csrf-token").getAttribute("content")
        },
        mounted () {
            this.init();
        },
        destroyed () {
            tinymce.get('tinymceEditer').destroy();
        },
        methods: {


            //富文本编辑器
            init () {
                this.$nextTick(() => {
                    let vm = this;
                    let height = document.body.offsetHeight - 300;
                    tinymce.init({
                        selector: '#tinymceEditer',
                        branding: false,
                        elementpath: false,
                        convert_urls: false,
                        height: height,
                        language: 'zh_CN.GB2312',
                        menubar: 'edit insert view format table tools',
                        plugins: [
                            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                            'searchreplace visualblocks visualchars code fullpage',
                            'insertdatetime media nonbreaking save table contextmenu directionality',
                            'emoticons paste textcolor colorpicker textpattern imagetools codesample',
                            'imageupload',
                        ],
                        toolbar1: ' imageupload | undo redo | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | link image ',
                        imageupload_url: '/admin/ea_manage/upload_img',
                        autosave_interval: '20s',
                        image_advtab: true,
                        table_default_styles: {
                            width: '100%',
                            borderCollapse: 'collapse'
                        },
                        setup: function (editor) {
                            editor.on('init', function (e) {
                                vm.spinShow = false;
                                if (localStorage.editorContent) {
                                    tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                                }
                            });
                            editor.on('keyup', function (e) {
                                localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                            });
                        }
                    });
                });
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
            //弹窗
            showModal(name, data = {}){
                const modalList = this.modalList
                Object.assign(this.modalMsg, data)
                this.curModal = modalList[name],
                    this.iviewModal = true
            },


            addEA(){

                var EA_details= tinyMCE.activeEditor.getContent()
                if(this.EA_name==''){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `EA名称不能为空！`})
                }
                if(this.personalForm.avatar==''){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `请上传EA封面图片！`})
                }
                if(this.EA_price==''){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `EA价格不能为空！`})
                }
                if(this.EA_introduction==''){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `EA简介不能为空！`})
                }
                if(EA_details==''){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `EA详情不能为空！`})
                }
                if(isNaN(this.EA_price)){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `EA价格只能为数字！`})
                }
                if(this.EA_price<0||this.EA_price>100000){
                    return   this.$Modal.warning({title: `新增EA失败`, content: `EA价格为0.00-99999.99，保留小数点后两位！`})
                }
                if(this.EA_price.lastIndexOf(".")!='-1'){
                    if((this.EA_price.substr(this.EA_price.lastIndexOf(".") + 1).length)>2){
                        return   this.$Modal.warning({title: `新增EA失败`, content: `EA价格为0.00-99999.99，保留小数点后两位！`})
                    }
                }

                var ajaxData ={
                    name:this.EA_name,   //名称
                    price:this.EA_price,  //价格
                    introduction:this.EA_introduction,  //简介
                    detail:EA_details,      //详情
                    cover:this.personalForm.avatar,
                }
                var EA_name_RegExp = /^.{1,30}$/;
                var EA_introduction_RegExp = /^.{1,250}$/;
                var EA_details_RegExp = /^.{1,20000}$/;
                if (!EA_name_RegExp.test(this.EA_name)) {
                    this.$Modal.warning({title: "提示", content: 'EA名称为中文、数字、大小写字母、特殊符号，1-30个字！'})
                    return
                }

                if (!EA_introduction_RegExp.test(this.EA_name)) {
                    this.$Modal.warning({title: "提示", content: 'EA简介为中文、数字、大小写字母、特殊符号，1-250个字！'})
                    return
                }
                if (!EA_details_RegExp.test(this.EA_name)) {
                    this.$Modal.warning({title: "提示", content: 'EA详情为中文、数字、大小写字母、特殊符号，1-20000个字！'})
                    return
                }
                this.spinLoading=true
                return new Promise((resolve, reject) => {
                    this.$http.post('/admin/ea_manage/add_ea',ajaxData)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.spinLoading=false
                                this.$Message.success({content: `新增EA成功`})
                                this.$router.push({
                                    path:'/EA_Manage/EA_list'
                                })
                                resolve();
                            } else {
                                this.spinLoading=false
                                this.$Modal.error({title: `新增EA失败`, content: data.retMsg})
                                reject();
                            }
                        }).catch((error) => {
                        this.spinLoading=false
                        this.$Modal.error({title: `新增EA失败`, content: this.util.getHttpText(error)})
                        reject();
                    });
                })
            },

            //切换导航
            changeLeftNav(){
                var leftNav = {
                    openName: 'articleManage',
                    activeName: 'addNews'
                }
                this.$emit("changeLeftNav", leftNav)
            }
        }
    }
</script>
