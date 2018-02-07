<style lang="less" scoped>
    .setModal {
        width:500px;
        border-radius:6px;
        padding-bottom:40px;
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
        margin-top:40px;
    }
    .changeLevelForm{
        width: 230px;
        margin: 0 auto;
    }
</style>

<template>
    <div class="setModal">
        <div>
            <div class="top_content">升级客户等级</div>
            <div v-if="!loading">
                <Form :label-width="100" class="changeLevelForm">
                    <FormItem label="客户姓名：">
                        {{modalData.real_name||'（未实名）'}}
                    </FormItem>
                    <FormItem label="上级客户姓名：">
                        {{parentMsg.real_name}}
                    </FormItem>
                    <FormItem label="更换上级姓名：">
                        <Select placeholder="请输入姓名搜索"
                                loading-text="搜索中..."
                                v-model="changeParentId"
                                filterable
                                remote
                                :remote-method="searchMethod"
                                :loading="loadingSearch">
                            <Option v-for="(option, index) in searchResultList" :value="option.id" :key="option.id">{{option.real_name}}</Option>
                        </Select>
                    </FormItem>
                <!--按钮-->
                </Form>
                <div style="text-align: center">
                    <Input v-model="code" style="width: 120px;margin-right: 5px" placeholder="请输入短信验证码"></Input>
                    <Button v-if="codeDelay>0" disabled>{{codeDelay+'s后重新发送'}}</Button>
                    <Button @click="sendCode" v-else>获取验证码</Button>
                </div>
                <div class="botton_content">
                    <Button size="large" @click="close">取消</Button>
                    <Button type="primary" size="large" style="margin-left: 20px" @click="changeParent">确定</Button>
                </div>
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
                levelId:'',                   //等级id
                levelList: [],
                loadingSearch:false,
                searchResultList:[],
                searchResultKey:'',
                searchKey:'',
                changeParentId:'',
                code:'',
                codeDelay: 0,
                parentMsg:{
                    real_name:'',
                },
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
            }
        },
        props:["modalData"],
        beforeMount(){
            this.getParentMsg()
            const phoneLoginCodeRecode = this.util.getData('customerChangeParentRecode', 60)
            if (!this.util.isEmpty(phoneLoginCodeRecode)) {
                this.codeDelay = 60 - parseInt((new Date().getTime() - phoneLoginCodeRecode) / 1000)
                this.countCodeDelay()
            }
        },
        methods:{
//            搜索
            searchMethod (query,stillSearch=false) {
                this.searchKey=query
                if(this.query == ''){
                    this.searchResultList=[]
                    this.loadingSearch = false;
                    return
                }
                if(this.loadingSearch&&!stillSearch){
                    return
                }
                if (query !== '') {
                    this.loadingSearch = true;
                    var searchName=this.searchNameHttp({real_name:query})
                    searchName.then((data) => {
                        this.searchResultList=data
                        if(this.searchKey== ''){
                            this.searchResultList=[]
                            this.loadingSearch = false;
                            return
                        }
                        if(this.searchKey!==query){
                            this.searchMethod(this.searchKey,true)
                        }else{
                            this.loadingSearch = false;
                        }
                    }).catch((data={title:'请求失败'}) => {
                        this.loadingSearch = false;
                        this.searchResultList=[]
                    });
                } else {
                    this.searchResultList=[]
                }
            },
            searchNameHttp (data){
                const httpName = "搜索姓名"
                var ajaxData=data
                return new Promise((resolve, reject) => {
                    this.$http.post('/admin/customer/search_users',ajaxData)
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                resolve(retData)
                            }else{
                                reject([])
                            }
                        }).catch((error) =>{
                        reject([])
                    });
                })
            },
            //获取列表
            changeParent(){
                if(this.changeParentId==''){
                    return this.$Message.error({content: '未选择要更换的上级客户'})
                }
                if(this.code==''){
                    return this.$Message.error({content: '请输入短信验证码'})
                }
                if(!/^[a-zA-Z0-9]{6}$/.test(this.code)){
                    return this.$Message.error({content: '短信验证码格式不正确'})
                }
                var data={
                    users_id:this.modalData.id,
                    p_id:this.changeParentId,
                    captcha:this.code
                }
                this.loading=true
                var changeParent=this.changeParentHttp(data)
                Promise.all([changeParent]).then((data) => {
                    this.refresh()
                    this.close()
                }).catch((data={title:'请求失败'}) => {
                    this.$Modal.error(data)
                    this.loading=false
                });
            },
            changeParentHttp (data={}){
                const ajaxData=data
                const httpName = "更换上级客户"
                return new Promise((resolve, reject) => {
                    this.$http.post('/admin/customer/change_belong',ajaxData)
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData={},retMsg} = data
                            if(retCode == '0'){
                                this.$Message.success({content: `${httpName}成功`})
                                resolve()
                            }else{
                                reject({title:`${httpName}失败`,content:retMsg})
                            }
                        }).catch((error) =>{
                        reject({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
                })
            },
//            获取列表
            getParentMsg(data={},type=null){
                var getParentMsg=this.getParentMsgHttp()
                this.loading=true
                Promise.all([getParentMsg]).then((data) => {
                    var parentMsg=data[0][0]
                    this.parentMsg=parentMsg
                    this.loading=false

                }).catch((data={title:'请求失败'}) => {
                    this.$Modal.error(data)
                    this.close()
                });
            },
            getParentMsgHttp (){
                const httpName = "获取上级姓名"
                return new Promise((resolve, reject) => {
                    this.$http.get('/admin/customer/get_parent/'+this.modalData.id,{})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData={},retMsg} = data
                        if(retCode == '0'){
                            resolve(retData)
                        }else{
                            reject({title:`${httpName}失败`,content:retMsg})
                        }
                    }).catch((error) =>{
                        reject({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
                })
            },
            //发送验证码
            sendCode(){
                if (this.codeDelay > 0) {
                    return
                }
                var ajaxData = {
                }
                const httpName = "验证码发送"
                this.$http.post('/admin/authentication/sms', ajaxData)
                    .then((response) => {
                        const data = response.data;
                        const {retCode}=data;
                        if (retCode == '0') {
                            this.codeDelay = 60
                            this.util.setData('customerChangeParentRecode', new Date().getTime())
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
                const count = this.codeDelay
                this.util.interval(() => {
                    this.codeDelay--
                }, 1000, count)
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