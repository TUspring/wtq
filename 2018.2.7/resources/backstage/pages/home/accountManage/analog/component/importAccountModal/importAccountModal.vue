<style lang="css" scoped>
    .importAccount_box {
        width:630px;
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
    .item_content {
        width:450px;
        margin:0 auto;
        font-size:14px;
        line-height: 40px;
        margin-bottom:20px;
        padding-left:80px;
    }
    .title_content {
        width:100px;
        float:left;
    }
    .value_content {
        float:left;
    }



    /*按钮*/
    .botton_content {
        width:100%;
        text-align: center;
        margin-top:40px;
    }
    .btnClass {
        display: inline-block;
        width: 121px;
        height: 41px;
        line-height: 41px;
        text-align: center;
        border-radius: 6px;
        font-size: 14px;
        cursor:pointer;
    }
    .comfirm {
        color:#fff;
        background-color: rgb( 255, 161, 20 );
        margin-right:40px;
    }
    .cancel {
        color: rgb( 153, 153, 153 );
        background-color: rgb( 238, 238, 238 );
    }


    .content_text {
        width:100%;
        text-align:center;
    }
    .content_text span {
        font-size:20px;
    }
    .confirm {
        color:#fff;
        background-color: rgb( 255, 161, 20 );
    }
    /*======成功=====*/
    .success_content {
        width:630px;
        border-radius:6px;
        padding-bottom:40px;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
        background:#fff;
    }
    .success_content .content_text{
        padding:20px 0;
    }
    /*=======失败====*/
    .fail_content {
        width:630px;
        border-radius:6px;
        padding-bottom:40px;
        box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.1);
        background:#fff;
    }
    .fail_content .content_text{
        padding:20px 0;
    }
</style>
<style lang="css">
    .value_content .ivu-select-dropdown {
        height:150px;
    }
    .value_content .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .value_content .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
        height:40px;
        line-height:40px;
    }
    .value_content .ivu-select-single .ivu-select-selection{
        height:40px;
    }
</style>
<template>
    <div class="box">
        <div class="importAccount_box" v-show="import_content">
            <div class="top_content">导入新账号</div>

            <div class="item_content cl">
                <div class="title_content">
                    <span>选择文件:</span>
                </div>
                <div class="value_content" v-if="showFileInput">
                    <input type="file" name="file_data" value="选择jar包" ref="fileUpload" @change="handleFile($event)" id="upload"/>
                </div>
            </div>
            <div class="item_content select_content cl">
                <div class="title_content">
                    <span>选择平台:</span>
                </div>
                <div class="value_content " v-if="showFileInput">
                    <Select v-model="platform" style="width:200px" >
                        <Option v-for="item in platformData" :value="item.platform" :key="item.platform" @click.native="matchServer(item.platform)">{{ item.platform }}</Option>
                    </Select>
                </div>
            </div>
            <div class="item_content select_content cl">
                <div class="title_content">
                    <span>选择服务器:</span>
                </div>
                <div class="value_content " v-if="showFileInput">
                    <Select v-model="server_name" style="width:200px" :transfer="true">
                        <Option v-for="item in serverData" :value="item" :key="item">{{item}}</Option>
                    </Select>
                </div>
            </div>


            <!--按钮-->
            <div class="botton_content">
                <span class="btnClass comfirm" @click="importAccount">确定</span>
                <span class="btnClass cancel" @click="cancel">取消</span>
            </div>

        </div>

        <!--导入成功-->
        <div class="success_content" v-show="success_content">
            <div class="content_text">
                <span>导入新账号成功</span>
            </div>
            <div class="botton_content">
                <span class="btnClass confirm" @click="successOK">确定</span>
            </div>
        </div>

        <!--导入失败-->
        <div class="fail_content" v-show="fail_content">
            <div class="content_text">
                <span>导入新账号失败</span>
            </div>
            <div class="botton_content">
                <span class="btnClass confirm" @click="failOK">确定</span>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                import_content: true,
                success_content: false,
                fail_content: false,

                platformList:'', //全部平台列表
                platformData: '', //去重后的平台列表
                serverData: [],
                platform: '',
                server_name: '',
                file_data: '',
                showFileInput:true

            }
        },
        beforeMount() {
            this.token=document.getElementById("csrf-token").getAttribute("content")
            this.getPlatformList()
            this.platform = this.platformList.platform

        },
        methods: {
            //解决chang事件点击一次就失效的方法
            handleFile(e) {
                this.showFileInput=false
                this.showFileInput=true
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

            //获取平台列表数据
            getPlatformList (){
                this.$http.get('platform/cooperative')
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData={}} = data
                        if(retCode == '0'){
                            this.platformList = retData

                            //平台去重
                            var arr =  this.platformList
                            var hash = {};
                            arr = arr.reduce(function(item, next) {
                                hash[next.platform] ? '' : hash[next.platform] = true && item.push(next);
                                return item
                            }, [])
                            this.platformData=arr
                        }
                    })
            },

            importAccount () {
                var input=document.getElementById('upload')
                var file=input.files[0]

                let param = new FormData(); //创建form对象
                param.append('file_data',file);//通过append向form对象添加数据
                param.append('platform',this.getPlatformId(this.server_name));//添加form表单中其他数据

                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                if(file==undefined){
                    this.$Modal.warning({title:`导入失败`,content:'请选择导入文件！'})
                    return
                }

                this.$http.post('admin/MT4/import_demo_MT4',param,config)
                    .then((response)=>{
                        const data = response.data
                        const {retCode} = data
                        if(retCode == '0'){
                            this.import_content = false
                            this.fail_content = false
                            this.success_content = true
                        }else{
                            this.import_content = false
                            this.success_content = false
                            this.fail_content = true
                        }
                    })
            },
            cancel () {
                this.$emit('close')
            },
            successOK() {
                this.$emit('close')
            },
            failOK() {
                this.$emit('close')
            }
        }

    }
</script>