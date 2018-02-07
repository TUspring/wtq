<style lang="css" scoped src="./css/index.css"></style>

<style lang="less">
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .modify_strategy_step1{
    .ivu-upload .ivu-icon-camera{
        font-size:40px !important;
        line-height:120px;
    }
    .uploadBox{
        width: 120px;
        height:120px;
        background:#F5F5F5;
        border-radius: 50%;
        cursor:pointer;
        position: relative;
    &:hover{
         background:#EEEEEE;
     }
    &>div{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align:center;
          cursor:pointer;
          position: absolute;
          left: 0;
          top:0
      }
    .uploadingBox{
        border-radius: 50%;
        background-color: #fff;
    &>div{
          border-radius: 50%;
          border: 1px solid #f5f5f5;
          font-size: 18px;
      }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    }
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
        color:#dddddd;
    }
    }
    }
    }
    }
</style>

<template>
    <div class="modify_strategy_step1 cl">
        <div class="content-top">请填写您的基本信息</div>
        <div class="upload-content">
            <span>上传照片</span>
            <div class="upload_img-content">
                <template>
                    <Upload

                            ref="upload"
                            :headers="{'X-CSRF-TOKEN': token}"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :on-progress="handleProgress"
                            :format="['jpg','jpeg','png']"
                            :max-size="3072"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            multiple
                            type="select"
                            action="/upload"
                            style="display: inline-block;width:120px;">
                        <div :class="['uploadBox',{hasImg:img.url}]">
                            <div class="uploadingBox" v-if="imgUploading" @click.stop="">

                                <Spin fix>
                                    <Icon type="load-c" size='32' class="demo-spin-icon-load"></Icon>
                                    <div style="font-size: 14px;">上传中...</div>
                                </Spin>

                            </div>
                            <div v-if="!imgUploading">
                                <img :src="img.url" v-if="img.url">
                            </div>
                            <div class="uploadIcon" v-if="!imgUploading">
                                <Icon type="camera" size="40"></Icon>
                            </div>

                        </div>

                    </Upload>
                </template>


                <b>图片大小不超过3M;格式为JPG、GIF、PNG</b>
            </div>
        </div>

        <div class="srategy-msgInput">
            <form action="">
                <ul>
                    <li>
                        <div id="strategyName">
                            <small>策略名称</small>
                            <input type="text" placeholder="请输入策略名称" name="策略名称"  v-model="form.name"  v-validate data-vv-rules="required">
                            <span>不超过6个汉字</span><br>
                            <span id="name_warning" v-if="errors.has('策略名称')">{{ errors.first('策略名称') }}</span>
                        </div>
                    </li>
                    <li>
                        <div id="strategyDescribe">
                            <small>策略描述</small>
                            <textarea name="" id="" cols="30" rows="10" placeholder="请输入策略描述"  v-model="form.describe"  name="策略描述"  v-validate data-vv-rules="required"></textarea>
                            <span>不超过140个字</span><br>
                            <span  id="describe_warning" v-if="errors.has('策略描述')">{{ errors.first('策略描述') }}</span>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        <div class="clear"></div>
        <div id="next" @click="next">下一步</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
//                showDask: false,
                form: {
                    id: '',
                    name: '',
                    describe: '',
                    old_picture: '',
                    picture: '',
                    imgUrl:'',
                    imgPath:''
                },

                token:null,
                img:{
                    url: '',
                    path: ''
                },
                imgUploading:false,

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
                uploadList: []
            }
        },
        beforeMount(){
            this.token=document.getElementById("csrf-token").getAttribute("content")
            this.policyList.id= this.$router.currentRoute.params.id
            this.setForm(this.policyList)
        },
        watch:{
            policyList(value){
                this.setForm(value)
            }
        },
        methods: {

            setForm(data){
                var {id,name,describe,old_picture,picture,imgUrl,imgPath}=data
                Object.assign(this.form,{id,name,describe,old_picture,picture,imgUrl,imgPath})
                Object.assign(this.img,{url:imgUrl,path:imgPath})
            },
            setImg(){

                var imgMsg = {
                    imgUrl:this.img.url,
                    imgPath:this.img.path
                }
                this.$emit("setPolicy",imgMsg)
            },

            //step1的数据传回父级
            setPolicy (data) {
                this.$emit("setPolicy",data)
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

            //下一步
            next () {
                var form=this.form
                var ajaxData=form

                if (this.getStrLength(ajaxData.name) > 12 && this.form.name != '') {
                    this.$Modal.warning({title: `提示`, content: '策略名称不超过6个汉字、12个字节！'})
                    return
                }else if(this.getStrLength(ajaxData.describe) > 280 && this.form.describe != '') {
                    this.$Modal.warning({title: `提示`, content: '策略描述不超过140个汉字、280个字节！'})
                    return
                }else {
                    var step1Form = {
                        name:this.form.name,
                        describe:this.form.describe,
                        picture:this.form.picture,
                        imgUrl:this.form.imgUrl,
                        imgPath:this.form.imgPath
                    }
                    this.setPolicy(step1Form)
                    this.setImg()
                    this.$router.push({
                        path:'/modifyNewStrategy/'+this.policyList.id+'/step2'
                    })
                }
            },

            handleSuccess (res, file) {
                if(res.retCode =='0'){
                    this.img = res.retData
                    this.setImg()
                    this.$Message.success({content: `上传成功`})
                }else{
                    this.$Modal.error({title:`上传失败`,content:res.retMsg})
                    this.imgUploading=false
                }
                this.imgUploading=false

            },
            handleError (error) {
                this.$Modal.error({title:`上传失败`,content:this.util.getHttpText(error)})
                this.imgUploading=false
            },
            handleProgress(event, file, fileList){
                this.imgUploading=true
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
            }
        },
        props: ['policyList']


    }
</script>