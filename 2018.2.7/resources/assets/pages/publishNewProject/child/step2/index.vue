<style lang="css" scoped src="./css/index.css"></style>
<style lang="less">
    #platform_dropdown,#server_dropdown {
        position:relative;
        height: 49px;
        line-height:49px;
    }
    #platform_dropdown .ivu-input-wrapper {
        position:absolute;
        top:0;
        left:110px;
    }
    #server_dropdown .ivu-input-wrapper {
        position:absolute;
        top:0;
        left:110px;
    }

    #platform_dropdown  .ivu-input:hover {
        border-color:#D4D4D4;
    }
    #server_dropdown  .ivu-input:hover {
        border-color:#D4D4D4;
    }
    #platform_dropdown  .ivu-input{
        &{
            width:319px;
            height:49px;
            border:1px solid #D4D4D4;
            border-radius:6px;
            font-size:14px;
            padding:0 20px;
            /*color:#757575;*/
        }
        &:focus{
             border:1px solid #D4D4D4;
            box-shadow: none;
         }
         &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            color: #636363;
        }
    &:hover{
         border:1px solid #D4D4D4;
     }
    }

    #server_dropdown  .ivu-input{
    &{
        width:319px;
        height:49px;
        border:1px solid #D4D4D4;
        border-radius:6px;
        font-size:14px;
        padding:0 20px;
    /*color:#757575;*/
    }
    &:focus{
         border:1px solid #D4D4D4;
         box-shadow: none;
     }
    &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
         color: #636363;
     }
    &:hover{
         border:1px solid #D4D4D4;
     }
    }

    #platform_dropdown .ivu-select-dropdown {
        max-height:150px;
        margin-left:75px;
        margin-top:25px;
    }
    #server_dropdown .ivu-select-dropdown {
        max-height:150px;
        margin-left:75px;
        margin-top:25px;
    }

    #platform_dropdown .ivu-select-dropdown .ivu-select-dropdown-list li {
          margin-top:5px;
   }
    #server_dropdown .ivu-select-dropdown .ivu-select-dropdown-list li {
        margin-top:5px;
    }
</style>

<template>
    <div class="newPublish_step2_content cl">
        <div class="content_top">请填写您的项目信息</div>
        <form>
            <div class="content_box cl">
                <ul>
                    <li>
                        <div class="trade_platform_content cl" id="platform_dropdown">
                            <small>交易商名称</small>
                            <AutoComplete
                                    v-model="platformName"
                                    placeholder="请输入交易商名称"
                                    @on-search="handleSearch"
                                    style="width:200px">
                                <Option v-for="(value,index) in platformData" :value="value.platform" :key="value.platform"  @click.native="matchServer(value.platform)">{{ value.platform }}</Option>
                            </AutoComplete>
                        </div>
                        <p v-if="errors.has('交易商名称')">{{ errors.first('交易商名称') }}</p>
                    </li>
                    <li>
                        <div class="MT4_number_content">
                            <small>MT4账号</small>
                            <input type="text" placeholder="请输入MT4账号" v-model="form.MT4_account" name="MT4账号" v-validate data-vv-rules="required|numeric|min:4|max:20">
                        </div>
                        <p v-if="errors.has('MT4账号')">{{ errors.first('MT4账号') }}</p>
                    </li>
                    <li>
                        <div class="investor_password_content">
                            <small>投资人密码</small>
                            <input type="password" placeholder="请输入投资人密码" v-model="form.investor_password" name="投资人密码" v-validate data-vv-rules="required">
                            <b>请不要填写交易密码</b>
                        </div>
                        <p v-if="errors.has('投资人密码')">{{ errors.first('投资人密码') }}</p>
                    </li>
                    <li>
                        <div class="server_name_content cl" id="server_dropdown">
                            <small>服务器名称</small>
                            <AutoComplete
                                    v-model="serverName"
                                    :data="serverData"
                                    placeholder="请输入服务器名称"
                                    style="width:200px">
                            </AutoComplete>
                        </div>
                    </li>
                    <li>
                        <div class=" btn_content cl">
                            <div id="next" @click="next">下一步</div>
                            <router-link to="/publishNewProject/step1"><div id="pre">上一步</div></router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapState,mapActions} from 'vuex'
    export default {
        data () {
            return {
                form: {
                    trade_platform_id: '',
                    platform: '',
                    MT4_account: '',
                    investor_password: '',
                    server_name: ''
                },
                platformName: '',
                serverName: '',
                platformData: [],   //匹配到的平台名称
                serverData: [],   //匹配到的服务器名称
                platformList:[]  //所有的平台信息包括平台名称、平台ID、服务器名称
            }
        },
        props: ["strategy"],
        beforeMount(){
            if(this.util.isEmpty(this.strategy.name)){
                this.$router.replace({
                    path: '/publishNewProject/step1'
                })
            }
        },
        mounted(){
            this.getPlatformList()
        },
        methods: {

            //获取平台列表
            getPlatformList(){
                var httpName='获取平台列表'
                this.$http.get('/platform')
                    .then((response) => {
                        const data = response.data
                        const {retCode}=data
                        if(retCode=='0'){
                            this.platformList=data.retData
                        }else{
                            this.$Modal.error({title:`${httpName}失败`,content:data.retMsg})
                        }
                    })
                    .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                    });
            },

            //根据服务器名称获取id
            getPlatformId (value) {
                var id=''
                var platformList=this.platformList
                for(var i in platformList){
                    var item=platformList[i]
                    if(item["server_name"]===value){
                        id = item.id
                    }
                }
                return id
            },

            //搜索匹配平台信息列表（列表包含平台名字、服务器名字、ID）
            handleSearch (value) {
                var platform_list=[]
                var platformList=this.platformList
                if(!this.util.isEmpty(value)){
                    for(var i in platformList){
                        var item=platformList[i]
                        if(item["platform"].indexOf(value)>-1){
                            platform_list.push(item)
                        }
                    }
                }
                this.platformData = platform_list
            },

            //选择平台名称时匹配到的服务器名称列表
            matchServer(value) {
                this.serverData = []
                var platformList = this.platformList
                for (var i in platformList) {
                   var item = platformList[i]
                    if(value == item.platform){
                       var serverList = item.server_name
                        this.serverData.push(serverList);
                   }
                }
            },

            //下一步
            next () {
                    if(this.platformName == '') {
                        this.$Modal.warning({title: `下一步失败`, content: '交易平台不能为空！'})
                        return
                    }
                    if(this.platformName.length >30) {
                        this.$Modal.warning({title: `下一步失败`, content: '交易不能超过30个字符！'})
                        return
                    }
                    if(this.serverName.length >50) {
                        this.$Modal.warning({title: `下一步失败`, content: '服务器名称不能超过50个字符！'})
                        return
                    }
                    if(this.serverName == '') {
                        this.$Modal.warning({title: `下一步失败`, content: '服务器名称不能为空！'})
                        return
                    }
                    this.$validator.validateAll();
                    if (this.errors.any()) {
                        this.$Modal.warning({content:this.errors.items[0].msg})
                        return
                    }

                    var form=this.form
                    var ajaxData=form

                    var checkPassword =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,50}$/
                    if(!checkPassword.test(ajaxData.investor_password)) {
                        this.$Modal.error({title: `下一步失败`, content: '密码为6-50位字母和数字组合，支持特殊字符！'})
                        return
                    }

                    var step2_strategy = {
                        trade_platform_id:this.getPlatformId(this.serverName),
                        platform: this.platformName,
                        server_name:this.serverName,
                        MT4_account:form.MT4_account,
                        investor_password:form.investor_password
                    }
                    this.setStrategy(step2_strategy)
                    this.$router.push({
                        path: '/publishNewProject/step3'
                    })
            },

            setStrategy (data) {
                this.$emit("setStrategy", data)
            }
        }
    }
</script>