
<style lang="less" scoped>
    .public_modal {
        width: 560px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
    }

    .public-ec-container{
        width: 360px;
        padding: 30px 0px;
        margin: auto;
    }
    .public-ec-ul .ec-li{
        height: 60px;
        display: flex;
        align-items: center;
    }
    .left-title{
        width: 150px;
        display: inline-block;
        font-size: 16px;
        color: #333;
    }
    .public-ec-ul li input{
        width: 200px;
        height: 30px;
        line-height: 30px;
        border:1px solid #D4D4D4;
    }
    .public-ec-btn{
        width: 360px;
        height: 40px;
        text-align: center;
        margin: auto;
        margin-top: 30px;
    }


    .public-ec-btn  .cancel {
        margin-right: 60px;
        width: 70px;
        height: 32px;
    }
    .public-ec-btn  .public{
        width: 70px;
        height: 32px;
    }

</style>
<template>
    <div class="public_modal custom_modal">
        <div class="modal_top">
            <span>发布 {{projectName}} 项目</span>
            <span @click="close"><Icon type="close-round"></Icon></span>
        </div>
        <div class="public-ec-container">
            <ul class="public-ec-ul">
                <li class="ec-li">
                    <span class="left-title">标准账号平台：</span>
                    <Select style="width:200px" v-model="platform_Name">
                        <Option v-for="item in PlatformList" :value="item.platform" :key="item.id">{{item.platform}}</Option>
                    </Select>
                </li>
                <li class="ec-li">
                    <span class="left-title">标准账号服务器：</span>
                    <Select style="width:200px" v-model="platform_id">
                        <Option v-for="value in serverSelectList" :value="value.id" :key="value.id" @click.native="getServerName(value.server_name)">{{value.server_name}}</Option>
                    </Select>
                </li>
                <li class="ec-li">
                    <span class="left-title">标准账号：</span>
                    <Input placeholder="" style="width: 200px" v-model="accounted"></Input>
                </li>
                <li class="ec-li">
                    <span class="left-title">标准账号密码：</span>
                    <Input placeholder="" style="width: 200px" v-model="accountedPsw" type="password"></Input>
                </li>
            </ul>
            <div class="public-ec-btn">
                <Button class="cancel" @click="close">取消</Button>
                <Button class="public" type="primary" @click="public">发布<v-reqLoading v-if="reqLoading"></v-reqLoading></Button>

            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                reqLoading:false,
                accounted:'',
                accountedPsw:'',
                platform_id:'',
                projectName:'',
                projectId:'',
                cooperativePlatformList:'',
                PlatformList:'',
                platform_Name:'',
                ServerName:'',
            }
        },

        props:['modalMsg'],
        beforeMount() {
            this.projectId=this.modalMsg.id
            this.projectName=this.modalMsg.name
            this.getPlatformData()
        },
        computed:{
            serverSelectList(){
                return this.SelectServiceList(this.cooperativePlatformList,this.platform_Name)
            }
        },

        methods:{

            getPlatformData(){
                //请求合作平台交易商数据
                this.$http.get('/platform/cooperative')
                    .then((response) => {
                    const data = response.data;
                const {retCode, retData = {}}=data;
                if (retCode == '0') {
                    this.cooperativePlatformList = retData
                    var arr =  this.cooperativePlatformList
                    var hash = {};
                    arr = arr.reduce(function(item, next) {
                        hash[next.platform] ? '' : hash[next.platform] = true && item.push(next);
                        return item
                    }, [])
                    this.PlatformList=arr

                } else {}
            }).catch((error) => {});
            },

            SelectServiceList(data,platform){
                var list=[]
                if(platform===''){
                    return list
                }
                for(var i in data){
                    if(platform==data[i]["platform"]){
                        list.push(data[i])
                    }
                }
                return list
            },
            getServerName(name){
                console.log(name);
                this.ServerName=name
            },

            //发布
            public(){
                if(!this.accounted){
                    this.$Modal.warning({title: "提示", content: '标准账号不能为空！'})
                    return
                }
                if(!this.accountedPsw){
                    this.$Modal.warning({title: "提示", content: '标准账号密码不能为空！'})
                    return
                }
                var regExpTest=/^\d{4,20}$/
                var regExpPsw=/[\w\S]{1,50}/
                if(!regExpTest.test(this.accounted)){
                    this.$Modal.warning({title: "提示", content: '标准账号为4-20个字，数字！'})
                    return
                }
                if(!regExpPsw.test(this.accounted)){
                    this.$Modal.warning({title: "提示", content: '标准账号密码为1-50个字，数字、大小写英文字母、符号！'})
                    return
                }

                var ajaxData={
                    id:this.projectId,
                    standard_trade_platform_id:this.platform_id,  //标准平台id
                    standard_server_name:this.ServerName,         //标准服务器名称
                    standard_MT4_account:this.accounted,       //标准MT4账号
                    standard_investor_password:this.accountedPsw,   //标准投资人密码
                    }
                console.log(ajaxData);
                this.reqLoading=true
                this.$http.put('/admin/regular_project/check/published',ajaxData)
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData, retMsg}=data;
                            if (retCode == '0') {
                                this.reqLoading=false
                              this.$Message.success({content: `发布成功`})
                                this.close()
                                this.$emit('Refresh')
                            }else {
                         this.$Modal.error({title:`发布失败`,content:retMsg})
                      }
                   }).catch((error)=>{
                   this.$Modal.error({title:`发布失败`,content:this.util.getHttpText(error)})
                    })
            },

            close(){
                this.$emit('close')
            }
        }
    }
</script>













