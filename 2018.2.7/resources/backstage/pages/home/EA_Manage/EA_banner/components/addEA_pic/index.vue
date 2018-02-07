<style>

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
<style lang="less" scoped>
    .removeEA_modal {
        width: 560px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .addEA_content {
        width: 320px;
        padding-top: 20px;
        padding-bottom: 40px;
        margin: auto;
    }

    .addEA_content .btn {
        margin-top: 20px;
        width: 320px;
        height: 40px;
        text-align: center;
    }

    .addEA_content .btn button {
        width: 100px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
    }

    .banner-pic span {
        display: inline-block;
        float: left;
    }

    .banner-pic .add-pic {
        width: 200px;
        height: 120px;
        position: relative;
        cursor: pointer;
        border: 1px solid #cccccc;
        display: inline-block;
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

    .details-prompt{
        margin-top: 10px;
        padding:0px 10px;
        line-height: 20px;
        color: #333;
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


    .addEA_content .btn .add_btn {
        margin-left: 30px;
    }

</style>
<template>
    <div class="removeEA_modal custom_modal">
        <div class="modal_top">
            <span>新增Banner图片</span>
            <span @click="close" class="iconfont"><Icon type="close-round"></Icon></span>
        </div>
        <div class="addEA_content">
            <div class="banner-pic cl">
                <span>封面图片：</span>
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
                            :format="['jpg','jpeg']"
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
            <p class="details-prompt">请上传大小为1920mm*540mm,格式为jpg、jpeg的图片，以保证Banner图片与整个网站的协调性</p>
            <div class="btn">
                <Button  @click="close">取消</Button>
                <Button class="add_btn" @click="add_pic" type="primary">确定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
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
            }
        },
        computed: {

        },
        beforeMount() {
            this.token = document.getElementById("csrf-token").getAttribute("content")
        },
        mounted(){

        },
        methods:{


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
                    duration:'8',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },

            add_pic(){
                var ajaxData ={
                    path:this.personalForm.avatar,
                }
                console.log(ajaxData);
                return new Promise((resolve, reject) => {
                    this.$http.post('/admin/upload/add_path',ajaxData)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData = {}}=data;
                            if (retCode == '0') {
                                this.$Message.success({content: `新增Banner图片成功`})
                                this.$emit('Refresh')
                                this.$emit('close')
                                resolve();
                            } else {
                                this.$Message.error({content: `新增Banner图片失败`})
                                reject();
                            }
                        }).catch((error) => {
                        console.log(error);
                        reject();
                    });
                })
            },


            close(){
                this.$emit('close')
            }
        }
    }
</script>













