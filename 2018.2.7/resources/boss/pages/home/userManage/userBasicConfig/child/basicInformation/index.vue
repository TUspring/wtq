<style scoped>
    @import './css/index.css'

</style>
<template>
    <div class="layout-content-main">
        <div class="layout-breadcrumb">
            <div class="layout-breadcrumb-content">
                <Row class="form_box" style="width: 915px">
                    <Col span="12">
                    <Form ref="form" :model="formItem" :rules="formRule" :label-width="100">
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="ghost" @click="back">取消</Button>
                            <Button type="primary" style="margin-left: 8px" @click="formSumbit('form')">确定</Button>
                        </FormItem>
                    </Form>
                    </Col>
                    <Col span="12">
                    <Form ref="form" :model="formItem" :rules="formRule" :label-width="100">
                        <FormItem prop="phone" label="LOGO：">
                            <Row>
                                <Upload
                                        :multiple="false"
                                        :show-upload-list="false"
                                        type="drag"
                                        action="//jsonplaceholder.typicode.com/posts/">
                                    <!--<div style="padding: 20px 0">-->
                                        <!--<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>-->
                                        <!--<p>点击或拖入文件上传</p>-->
                                    <!--</div>-->
                                    <img src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" style="">
                                    <!--<Spin @click.native.stop="console.log(111)" size="large" fix v-if="true"></Spin>-->
                                </Upload>
                            </Row>
                            <Row>
                                请上传大小为80mm*80mm，格式为png的图片，以保证LOGO图片与整个网站的协调性
                            </Row>
                        </FormItem>
                    </Form>
                    </Col>
                    <Spin size="large" fix v-if="httping"></Spin>
                </Row>
            </div>
        </div>
    </div>

</template>
<script>
    export default {

        data(){
            const validateSingleRequire = (rule, value, callback) => {
                if (this.single&&!value) {
                    return callback(new Error('不能为空'));
                }
                callback();
            };
            return {
                id:'',
                httping:false,
                single:false,
                formItem: {
                    short_name:'',
                    phone:'',
                    domain:'',
                    host:'',
                },
                formRule:{
                    short_name: [
                        { required: true, message: '请填写用户名称', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请填写手机号码', trigger: 'blur' },
                        { validator: this.$valRule.mobile, trigger:'blur'}
                    ],
                    host: [
                        { validator: validateSingleRequire, message: '请填写主机名', trigger: 'blur' }
                    ],
                    domain: [
                        { required: true, message: '请填写已备案域名',trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            this.initPage()
        },
        methods: {
            initPage(){
                this.httping=true
                setTimeout(()=>{
                    this.httping=false
                },2000)
            },
            radioClick(){
                this.single=!this.single
            },
            formSumbit(name){
                if(this.httping){
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let form=this.formItem
                        let ajaxData={
                            short_name:form.short_name,
                            phone:form.phone,
                            domain:form.domain
                        }
                        if(this.single){
                            ajaxData.host=form.host
                        }
                        this.addUser(ajaxData)
                    } else {
                        this.$Message.error('请填写完整信息');
                    }
                })
            },
            addUser(data={}){
                console.log(data);
                if(this.httping){
                    return
                }
                this.httping=true
                var addUserHttp=this.addUserHttp(data)
                addUserHttp.then((data) => {
                    this.httping=false
                    this.$Message.success({content: data})
                    this.$router.push({
                        path:'/userManage/userList/index'
                    })
                }).catch((data='请求失败') => {
                    this.httping=false
                    this.$Message.error({content: data})
                });
            },
            addUserHttp(data={}){
                const ajaxData=data
                const httpName = "添加用户"
                return new Promise((resolve, reject) => {
                    this.$http.post('boss/shop',ajaxData)
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                resolve(`${httpName}成功`)
                            }else{
                                reject(retMsg)
                            }
                        }).catch((error) =>{
                            reject(this.util.getHttpText(error))
                    });
                })
            },
            back(){
                this.$router.go(-1)
            }
        },
        props:["userId"],
        watch:{
            "userId"(){
                console.log(111)
                this.initPage()
            },
//            "$route"(){
//                if(this.id!=this.$route.query.id){
//                    console.log(111)
//                    this.id=this.$route.query.id
//                    this.initPage()
//                }
//            }
        }
    }

</script>















