<style lang="less" scoped>
    .setModal {
        width:430px;
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
                    <FormItem label="客户名称：">
                        {{modalData.real_name}}
                    </FormItem>
                    <FormItem label="当前等级：">
                        {{modalData.level.name}}
                    </FormItem>
                    <FormItem label="升后等级：">
                        {{modalData.nextLevel.name}}
                    </FormItem>
                <!--按钮-->
                </Form>
                <div class="botton_content">
                    <Button size="large" @click="close">取消</Button>
                    <Button type="primary" size="large" style="margin-left: 20px" @click="changeLevel">确定</Button>
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
            }
        },
        props:["modalData"],
        beforeMount(){
        },
        methods:{
            //获取列表
            changeLevel(){
                var data={}
                this.loading=true
                var changeLevel=this.changeLevelHttp(data)
                Promise.all([changeLevel]).then((data) => {
                    this.refresh()
                    this.close()
                }).catch((data={title:'请求失败'}) => {
                    this.$Modal.error(data)
                    this.loading=false
                });
            },
            changeLevelHttp (data={}){
                const ajaxData={
                }
                const httpName = "升级等级"
                return new Promise((resolve, reject) => {
                    this.$http.post('/admin/up_level/'+this.modalData.id,ajaxData)
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
            //获取列表
//            getLevelList(data={},type=null){
//                var getLevelList=this.getLevelListHttp()
//                this.loading=true
//                Promise.all([getLevelList]).then((data) => {
//                    var list=data[0].level_list
//                    this.levelList=list
//                    this.loading=false
//
//                }).catch((data={title:'请求失败'}) => {
//                    this.$Modal.error(data)
//                    this.close()
//                });
//            },
//            getLevelListHttp (){
//                const httpName = "请求等级列表"
//                return new Promise((resolve, reject) => {
//                    this.$http.get('admin/customer/get_level_list/'+this.modalData.id,{})
//                    .then((response)=>{
//                        const data = response.data
//                        const {retCode,retData={},retMsg} = data
//                        if(retCode == '0'){
////                            this.$Message.success({content: `${httpName}成功`})
//                            resolve(retData)
//                        }else{
//                            reject({title:`${httpName}失败`,content:retMsg})
//                        }
//                    }).catch((error) =>{
//                        reject({title:`${httpName}失败`,content:this.util.getHttpText(error)})
//                    });
//                })
//            },
            refresh(){
                this.$emit('refresh')
            },
            close(){
                this.$emit('close')
            }
        }
    }
</script>