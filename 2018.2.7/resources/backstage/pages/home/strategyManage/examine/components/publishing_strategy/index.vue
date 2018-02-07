<style lang="css" scoped src="./css/index.css"></style>
<style>

</style>
<template>
    <div class="publishing-strategy publishing_strategy">
        <div class="publishing-strategy-container">
            <p class="title">发布策略：{{UserId.user.name}}</p>
            <div class="publishing-details">
                <span class="left-introduce">星级:</span>
                <input type="text" placeholder="请输入星级" v-model="publishExamineForm.recommend_level" maxlength="5">
            </div>
            <div class="publishing-details">
                <span class="left-introduce">初始跟随人数:</span>
                <input type="text" placeholder="0" v-model="publishExamineForm.follow_number" maxlength="10">
                <span class="right-unit">人</span>
            </div>
            <div class="publishing-details">
                <span class="left-introduce">初级跟随资金:</span>
                <input type="text" placeholder="0" v-model="publishExamineForm.initial_follow_money" maxlength="15">
                <span class="right-unit">美元</span>
            </div>
            <div class="publishing-details">
                <span class="left-introduce">标准账号平台:</span>
                <Select style="width:186px;" size="large" placeholder="请选择平台" v-model="publishExamineForm.platform">
                    <Option :value="item.platform" :key="item.platform"  v-for="item in duplicateRemovalPlatformList" >{{item.platform}}</Option>

                </Select>
            </div>
            <div class="publishing-details">
                <span class="left-introduce">标准账号服务器:</span>
                <Select style="width:186px;" size="large" placeholder="请选择服务器" v-model="publishExamineForm.standard_trade_platform_id">
                    <Option :value="item.id" :key="item.id" v-for="item in serverSelectList" @click.native="platformSelection(item.server_name)">{{item.server_name}}</Option>
                </Select>
            </div>
            <div class="publishing-details">
                <span class="left-introduce">标准账号:</span>
                <input type="text" placeholder="" v-model="publishExamineForm.standard_MT4_account" maxlength="20">
            </div>
            <div class="publishing-details">
                <span class="left-introduce">标准账号密码:</span>
                <input type="password" placeholder="" v-model="publishExamineForm.standard_investor_password">
            </div>

            <div class="publishing-btn">
                <!--<span @click="close">取消</span>-->
                <!--<span class="publishing" @click="publishExamine">发布</span>-->
                <Button @click="close">取消</Button>
                <Button type="primary" class="publishing" @click="publishExamine">发布 <v-reqLoading v-if="reqLoading"></v-reqLoading></Button>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                reqLoading:false,
                showModify: false,
                serverNameList:'',
                duplicateRemovalPlatformList:'',
                publishExamineForm:{
                    recommend_level:'',
                    follow_number:'',
                    initial_follow_money:'',
                    review_status:'',
                    content:'',
                    standard_trade_platform_id:'',
                    standard_MT4_account:'',
                    standard_investor_password:'',
                    standard_server_name:'',
                    platform:''

                }
            }
        },
        props: ["modalMsg"],
        computed:{
            serverSelectList(){
                return this.getServerSelectList(this.modalMsg.platformList,this.publishExamineForm.platform)
            }
        },
        beforeMount (){
            this.UserId=this.modalMsg.id
            this.review_status=this.modalMsg.id.review_status
            var arr =  this.modalMsg.platformList
            var hash = {};
            arr = arr.reduce(function(item, next) {
                hash[next.platform] ? '' : hash[next.platform] = true && item.push(next);
                return item
            }, [])
            this.duplicateRemovalPlatformList=arr
        },

        methods: {
            platformSelection(demoData){
                this.demoData=demoData
            },

            getServerSelectList(data,platform){
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

            publishExamine(){

                if(this.publishExamineForm.recommend_level>5||this.publishExamineForm.recommend_level<1){
                    this.$Modal.warning({title:`提示`,content:'星级区间:1.0--5.0.精确到小数点后1位'})
                    return
                }

                var ajaxData={
                    id:this.UserId.id,
                    recommend_level:this.publishExamineForm.recommend_level,
                    follow_number:this.publishExamineForm.follow_number,
                    initial_follow_money:this.publishExamineForm.initial_follow_money,
                    review_status:1,
                    standard_MT4_account:this.publishExamineForm.standard_MT4_account,
                    standard_investor_password:this.publishExamineForm.standard_investor_password,
                    standard_server_name:this.demoData,
                    standard_trade_platform_id:this.publishExamineForm.standard_trade_platform_id
                }
               this.reqLoading=true
                var httpName='发布'
                this.$http.put('/admin/policy/audit',ajaxData)
                    .then((response) => {
                    const data = response.data;
                const {retCode,retMsg}=data;
                if (retCode == '0') {
                    this.reqLoading=false
                    this.$Message.success({content:`发布成功`})
                    this.refresh()
                    this.close()
                } else {
                    this.reqLoading=false
                    this.$Modal.error({title: `发布失败`, content:retMsg})
                }
            })
            .catch((error) => {
                this.reqLoading=false
                this.$Modal.error({title: `${httpName}失败`, content: this.util.getHttpText(error)})
            });
            },
            refresh(){
                this.$emit('refresh')
            },
            close() {
                this.$emit('close')
            },
        }
    }
</script>