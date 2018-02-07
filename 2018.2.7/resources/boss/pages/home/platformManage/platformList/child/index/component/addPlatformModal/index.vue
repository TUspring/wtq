<style lang="less" scoped>
    .setModal {
        width:430px;
        border-radius:6px;
        padding-bottom:0px;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
        background:#fff;
    }
    .top_content {
        font-size: 20px;
        padding:30px 0;
        text-align: center;
    }

    .botton_content {
        width:100%;
        text-align: center;
        margin-top:20px;
    }
    .mainForm{
        width: 305px;
        margin: 0 auto;
        padding-top: 10px;
    }
</style>

<template>
    <div class="setModal">
        <div>
            <div v-if="!loading">
                <Form ref="form" :model="formData" :label-width="80" class="mainForm">
                    <FormItem label="平台名称" prop="platform"
                              :rules="{required: true, message: '平台名称不能为空', trigger: 'blur'}">
                        <Input v-model="formData.platform" placeholder="请输入平台名称"></Input>
                    </FormItem>
                    <FormItem
                            v-for="(item, index) in formData.items"
                            :key="index"
                            :label="index=='0'?'服务器':''"
                            :prop="'items.' + index + '.value'"
                            :rules="{required: true, message: '服务器名称不能为空', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                            <Input type="text" v-model="item.value" placeholder="请输入该平台服务器名称"></Input>
                            </Col>
                            <Col span="4" offset="1">
                            <Button type="ghost" @click="handleRemove(index)" v-if="formData.items.length>1">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="plus-round">添加</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="ghost" size="large" @click="close">取消</Button>
                        <Button type="primary" size="large" style="margin-left: 8px" @click="formSumbit('form')">确定</Button>
                    </FormItem>
                </Form>
            </div>
            <v-tableSpin v-else><div slot="text"></div></v-tableSpin>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                loading:false,
                httping:false,
                index: 1,
                formData: {
                    platform:'',
                    items: [
                        {
                            value: ''
                        }
                    ]
                }
            }
        },
        props:["modalData"],
        beforeMount(){
        },
        methods:{
            formSumbit(name){
                if(this.httping){
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let form=this.formData
                        let ajaxData={
                            platform:form.platform
                        }
                        this.add(ajaxData)
                    } else {
                        this.$Message.error('请填写完整信息');
                    }
                })
            },
            add(data={}){
                if(this.httping){
                    return
                }
                this.httping=true
                var addHttp=this.addHttp(data)
                addHttp.then((data) => {
                    this.httping=false
                    this.$Message.success({content: data})
                    this.refresh()
                }).catch((data='请求失败') => {
                    this.httping=false
                    this.$Message.error({content: data})
                });
            },
            addHttp(data={}){
                const ajaxData=data
                const httpName = "新增交易平台"
                return new Promise((resolve, reject) => {
                    this.$http.post('/boss/manage/total_trade',ajaxData)
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
            handleAdd () {
//                this.index++;
                this.formData.items.push({
                    value: ''
                });
            },
            handleRemove (index) {
//                this.formData.items[index].status = 0;
                this.formData.items.splice(index,1)
            },
            refresh(){
                this.$emit('refresh')
            },
            close(){
                this.$emit('close')
            }
        }
    }
</script>