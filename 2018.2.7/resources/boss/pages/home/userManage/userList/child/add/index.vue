<style scoped>
    @import './css/index.css'

</style>
<template>
    <div class="layout-content-main">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>用户管理</BreadcrumbItem>
                <BreadcrumbItem href="/userManage/userList/index">用户列表</BreadcrumbItem>
                <BreadcrumbItem>新增用户</BreadcrumbItem>
            </Breadcrumb>
            <div class="layout-breadcrumb-content">
                <Row class="form_box">
                    <Form ref="form" :model="formItem" :rules="formRule" :label-width="100">
                        <FormItem prop="short_name" label="用户名称：">
                            <Input v-model="formItem.short_name" placeholder="请输入用户名称" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem label="用户域名：">
                            <Row style="width: 330px">
                                <Col span="2" style="text-align: center">
                                <Radio @click.native="radioClick" size="large" v-model="single"></Radio>
                                </Col>
                                <Col span="7" style="text-align: center">
                                <FormItem prop="host">
                                    <Input v-model="formItem.host" placeholder="主机名" :disabled="single?false:true"></Input>
                                </FormItem>
                                </Col>
                                <Col span="1" style="text-align: center"><span style="font-size: 20px;line-height: initial;">.</span></Col>
                                <Col span="14">
                                <FormItem prop="domain">
                                    <Input v-model="formItem.domain" placeholder="请输入已备案域名"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem prop="phone" label="手机号码：">
                            <Input v-model="formItem.phone" placeholder="请输入手机号码" style="width: 331px"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="ghost" @click="back">取消</Button>
                            <Button type="primary" style="margin-left: 8px" @click="formSumbit('form')">确定</Button>
                        </FormItem>
                    </Form>
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
        },
        methods: {
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
                    this.$http.post('/boss/shop',ajaxData)
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
        }
    }

</script>















