<style lang="css" scoped src="./css/index.css"></style>

<style lang="less">
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .newPublish_step1_content{
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


    .item_content .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .item_content .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height:49px;
        line-height:49px;
        color:#666;
    }
    .item_content .ivu-select-single .ivu-select-selection {
        height:49px;
        border-radius: 6px;
        border:1px solid rgb( 212, 212, 212 );
    }
    .item_content .ivu-input {
        height:49px;
        line-height:49px;
    }
    .item_content .ivu-input::-webkit-input-placeholder{
        color: #666;
    }
    .item_content .ivu-input:hover{
        border-color:#dddee1;
    }
    .item_content .ivu-input-icon {
        height:49px;
        line-height:49px;
    }
    .item_content .ivu-date-picker-cells-cell {
        width: 42px;
        height: 30px;
        display: inline-block;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
    }
    .item_content .ivu-date-picker-cells-header span{
        margin:9px;
    }
    .item_content .ivu-date-picker-cells{
        width: 300px;
    }
</style>
<template>
<div class="newPublish_step1_content cl" >
    <div class="content-top">请填写您的项目信息</div>
    <div class="upload-content">
        <span>上传照片</span>
        <div class="upload_img-content">
            <template>
                <Upload
                        :headers="{'X-CSRF-TOKEN': token,'X-Requested-With':'XMLHttpRequest'}"
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

    <div class="list_box cl">
        <div class="item_content cl">
            <div class="title_content">
                <span>项目名称</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入项目名称(不超过6个汉字)" name="策略名称"  v-model="form.name"  v-validate data-vv-rules="required">
                <span class="name_warning" v-if="errors.has('策略名称')">{{ errors.first('策略名称') }}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>项目类型</span>
            </div>
            <div class="value_content">
                <Select v-model="form.project_type" style="width:319px;">
                    <Option v-for="item in typeList" :value="item.type" :key="item.value">{{ item.value }}</Option>
                </Select>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>报名截止时间</span>
            </div>
            <div class="value_content">
                <DatePicker type="date":options="dateOption"  placeholder="请选择报名截止时间" style="width: 319px" v-model="form.registration_deadline"  @on-change="form.registration_deadline=$event"></DatePicker>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>封闭开始时间</span>
            </div>
            <div class="value_content">
                <DatePicker type="date" :options="dateOption" placeholder="请选择封闭开始时间" style="width: 319px" v-model="form.start_time"  @on-change="form.start_time=$event"></DatePicker>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>封闭周期</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入封闭周期(天)" name="封闭周期"  v-model="form.period"  v-validate data-vv-rules="required|numeric">
                <span class="name_warning" v-if="errors.has('封闭周期')">{{ errors.first('封闭周期') }}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>预期收益率</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入预期收益率(%)" name="预期收益率"  v-model="form.yield"  v-validate data-vv-rules="required|decimal:2|between:0.01,100000">
                <span class="name_warning" v-if="errors.has('预期收益率')">{{ errors.first('预期收益率') }}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>盈利提成比例</span>
            </div>
            <div class="value_content">
                <input type="text" placeholder="请输入交易员盈利提成比例(%)" name="盈利提成比例"  v-model="form.trader_royalty_rate"  v-validate data-vv-rules="required|decimal:2|between:0.01,100">
                <span class="name_warning" v-if="errors.has('盈利提成比例')">{{ errors.first('盈利提成比例') }}</span>
            </div>
        </div>
        <div class="item_content cl">
            <div class="title_content">
                <span>项目简介</span>
            </div>
            <div class="value_content">
                <textarea  placeholder="请输入项目简介"  v-model="form.intro"  name="项目简介"  v-validate data-vv-rules="required"></textarea>
                <span class="name_warning" v-if="errors.has('项目简介')">{{ errors.first('项目简介') }}</span>
            </div>
        </div>

        <div id="next"  @click="next">下一步</div>
    </div>

</div>
</template>

<script>
    import { mapState,mapActions} from 'vuex'
    export default {
        data () {
            return {
                token:null,
                img:{
                    url: '',
                    path: ''
                },
                imgUploading:false,
                form: {
                    url:'',                                  //图片(完整路径)
                    picture: '',                            //图片(相对路径)
                    name: '',                              //项目名称
                    project_type:'',                      //项目类型
                    registration_deadline:'',            //报名截止时间
                    start_time:'',                      // 项目开始时间
                    period:'',                         //项目周期
                    yield:'',                         //预期收益率
                    trader_royalty_rate:'',          //交易员盈利提成比例
                    intro: ''                       //	项目简介
                },
                typeList:[
                    {value:'保本保息',type:1},
                    {value:'保本不保息',type:2},
                    {value:'不保本不保息',type:3}
                ],

                dateString:'',            //当天时间的时间戳
                dateOption: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now();
                    }
                },

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
        props:["strategy"],
        beforeMount(){
            this.token=document.getElementById("csrf-token").getAttribute("content")
            this.getDateString()
        },
        methods: {

            //获取当前时间
            getDateString(){
                var timestamp=parseInt(new Date().getTime()/1000);
                this.dateString = timestamp
            },

            handleSuccess (res, file) {
                if(res.retCode =='0'){
                    this.img = res.retData
                    this.img.url = res.retData.url
                    this.img.path = res.retData.path
                    this.form.picure = this.img.path
                    this.$Message.success({content: `上传成功`})
                }else{
                    this.$Modal.error({title:`上传失败`,content:res.retMsg})
                    this.imgUploading=false
                }
                this.imgUploading=false

            },
            setStrategy (data) {
                this.$emit("setStrategy", data)
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

            //时间格式转时间戳
            changeTimeType(value){
                return Date.parse(new Date(value))/1000;
            },

            next(){
                this.$validator.validateAll().then(() => {
                    if (this.errors.any()) {
                        this.$Modal.error({title: `修改失败`, content: this.errors.items[0].msg})
                    }else{
                        this.nextAjax()
                    }
                }).catch(() => {
                    this.$Modal.error({title: `修改失败`, content: '操作失败'})
                });
            },


            nextAjax () {
                this.form.picture = this.img.path
                var form=this.form
                var ajaxData=form
                if(this.form.project_type==''){
                    this.$Modal.warning({title: `提示`, content: '请选择项目类型！'})
                    return
                }
                if(this.form.registration_deadline==''){
                    this.$Modal.warning({title: `提示`, content: '请选择报名截止时间！'})
                    return
                }
                if(this.form.start_time==''){
                    this.$Modal.warning({title: `提示`, content: '请选择封闭开始时间！'})
                    return
                }
                if (this.getStrLength(ajaxData.name) > 12 && this.form.name != '') {
                    this.$Modal.warning({title: `提示`, content: '项目名称不超过6个汉字、12个字节！'})
                    return
                }
                if(this.getStrLength(ajaxData.intro) > 250 && this.form.intro != '') {
                    this.$Modal.warning({title: `提示`, content: '项目简介不超过125个汉字、250个字节！'})
                    return
                }
                if (ajaxData.picture == '') {
                    this.$Modal.warning({title: `提示`, content: '必须上传图片！'})
                    return
                }
                if (this.form.yield > 100000){
                    this.$Modal.warning({title: `提示`, content: '预期收益率不能大于100000！'})
                    return
                }
                if (this.form.trader_royalty_rate > 100){
                    this.$Modal.warning({title: `提示`, content: '盈利提成比例不能大于100！'})
                    return
                }
                if (this.changeTimeType(this.form.registration_deadline) > this.changeTimeType(this.form.start_time)){
                    this.$Modal.warning({title: `提示`, content: '开始时间必须是和报名截止时间相同或往后的时间！'})
                    return
                }
                if(this.changeTimeType(this.form.registration_deadline)<this.dateString){
                    this.$Modal.warning({title: `提示`, content: '报名截止时间不能选当天/已经过去的时间！'})
                    return
                }
                if(this.changeTimeType(this.form.start_time)<this.dateString){
                    this.$Modal.warning({title: `提示`, content: '封闭开始时间不能选当天/已经过去的时间！'})
                    return
                }
                var step1_strategy = {
                    picture: this.form.picture,
                    name: this.form.name,
                    project_type:this.form.project_type,
                    registration_deadline:this.changeTimeType(this.form.registration_deadline),
                    start_time:this.changeTimeType(this.form.start_time),
                    period:this.form.period,
                    yield:this.form.yield,
                    trader_royalty_rate:this.form.trader_royalty_rate,
                    intro: this.form.intro
                }
                console.log(step1_strategy);
                this.setStrategy(step1_strategy)
                this.$router.push({
                    path: '/publishNewProject/step2'
                })

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
        }
    }
</script>