<style lang="less" scoped>
    .container{
        position: relative;
    }
    .item_content {
        width:100%;
        background:#fff;
        border-radius: 4px;
        padding:0 30px 30px 30px;
        margin-top:20px;
    }
    .top_content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
        height:80px;
        border-bottom:1px solid #EDEDED;
    }
    .top_content .left_content {
        height:51px;
        display: flex;
        align-items: center;
    }
    .top_content .pic {
        width:51px;
        height:51px;
        border-radius:50%;
        float:left;
        background:rgb( 238, 238, 238 );
        margin-right:20px;
    }
    .top_content .pic img {
        width:51px;
        height:51px;
        border-radius:50%;
    }

    .top_content .name {
        float:left;
        padding-top:7px;
    }
    .top_content .name p {
        font-size: 12px;
        line-height:0;
        margin-bottom:20px;
        color: rgb( 51, 51, 51 );
    }
    .top_content .name span {
        font-size: 12px;
        color: rgb( 153, 153, 153 );
    }
    .top_content .publicTime {
        font-size: 12px;
        color: rgb( 51, 51, 51 );
    }
    .refuse_content{
        font-size: 14px;
        color: rgb( 51, 51, 51 );
        margin-top:20px;
    }
    .refuse_content span {
        color:#FFA114;
    }


    /*==列表==*/
    .list_box{
        width:100%;
        margin-top:30px;
    }
    .list_header {
        display: flex;
        border-radius: 6px;
        height: 41px;
        line-height:41px;
        background-color: rgb( 245, 245, 245 );
    }
    .list_header li {
        flex:1;
        font-size: 14px;
        color: rgb( 102, 102, 102 );
        text-align: center;
        float:left;
    }
    .list_detail {
        display: flex;
        height: 61px;
        line-height:61px;
    }
    .list_detail li {
        flex:1;
        font-size: 14px;
        color: rgb( 51, 51, 51 );
        text-align: center;
        float:left;
    }
    .list_detail .platform_box {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
    }
    .list_detail .platform_content {
        height:100%;
        max-width:150px;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .list_detail .btnClass {
        display: inline-block;
        width: 79px;
        height: 29px;
        line-height:29px;
        text-align: center;
        font-size: 14px;
        color: rgb( 0, 113, 252 );
        border:1px solid rgb( 0, 113, 252 );
        border-radius: 6px;
    }
    .list_detail .delete {
        color: rgb( 153, 153, 153 );
        border:none;
        background:rgb( 238, 238, 238 );
        cursor:pointer;
    }

    .no_data {
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        padding: 13px 0;
        background-color: #fff;
        border-radius: 6px;
    }

    /*==列表==*/
</style>

<template>
    <div class="container">
        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData='modalData' @Refresh="Refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="item_content" v-for="value in listModal" v-if="listModal.length && !loading">
            <div class="top_content">
                <div class="left_content cl">
                    <div class="pic">
                        <router-link :to="{path:'/periodicalProject/projectDetail/'+value.id}">
                        <img  :src="value.picture?value.picture:''" alt="">
                        </router-link>
                    </div>
                    <div class="name">
                        <router-link :to="{path:'/periodicalProject/projectDetail/'+value.id}">
                        <p>{{value.name}}</p>
                        </router-link>
                        <span>项目封闭期：{{timeType(value.start_time)}} 至 {{timeType(value.start_time+value.period*24*3600)}}</span>
                    </div>
                </div>
                <div> <span class="publicTime">申请时间：{{value.created_at}}</span></div>
            </div>
            <div class="list_box">
                <ul class="list_header">
                    <li>最小跟随资金</li>
                    <li>信号源账号</li>
                    <li>预期收益率</li>
                    <li>交易员提成比例</li>
                    <li>&nbsp</li>
                </ul>
                <ul class="list_detail">
                    <li>${{value.min_follow_money}}</li>
                    <li  class="platform_box">
                        <p class="platform_content" :title="titleCt(value.trade_platform.platform,value.MT4_account)"> {{value.trade_platform.platform}}-{{value.MT4_account}}</p>
                    </li>
                    <li>{{value.yield}}%</li>
                    <li>{{value.trader_royalty_rate}}%</li>
                    <li>
                        <span v-if="value.review_status == 0" class="btnClass exmain">审核中</span>
                        <span v-if="value.review_status == 6" class="btnClass exmain">发布中</span>
                        <span v-if="value.review_status == 4" class="btnClass delete" @click="showModal('delete',{id:value})">删除</span>
                    </li>
                </ul>
            </div>
            <!--拒绝理由-->
            <div class="refuse_content"  v-if="value.review_status == 4" >
                <p>
                    <span>拒绝理由：</span>
                    {{value.refused.content}}
                </p>
            </div>
        </div>

        <!--=======加载中=====-->
        <v-tableSpin v-show="loading" style="margin-top:20px;"></v-tableSpin>

        <!--暂无数据-->
        <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>

        <!--分页-->
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>

    </div>
</template>

<script>
    import deleteModal from './component/deleteModal/deleteModal.vue'
    export default {
        components:{
            deleteModal
        },
        data(){
            return {
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                iviewModal: false,
                curModal:{
                    name:'',
                    width:''
                },
                modalList:{
                    delete:{
                        name:'deleteModal',
                        width:''
                    }
                },
                modalData:{},    //传给子组件的数据
                auditList:''       //返回数据
            }
        },
        computed:{
            listModal(){
                return this.auditList
            }
        },
        beforeMount(){
            this.getAuditList()
        },
        methods:{
            titleCt(val1,val2){
                return val1+'-'+val2
            },

            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            Refresh(){
                if(this.auditList.length == 1 && this.pageIndex.current_page!=1){
                    this.getAuditList(this.pageIndex.current_page-1)
                }else{
                    this.getAuditList(this.pageIndex.current_page)
                }
            },

            //获取审核中列表
            getAuditList(page=1){
                this.loading = true
                var ajaxData = {
                    review_status:0,
                    page
                }
                this.$http.get('regular_project/user_list',{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0') {
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.getAuditList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.auditList = list
                            this.loading = false
                        }
                    })
            },
            //分页
            changePage(page){
                this.getAuditList(page)
            },

            //弹窗
            showModal(name,data={}){
                this.modalData=data
                const modalList=this.modalList
                this.curModal=modalList[name],
                this.iviewModal=true
            }
        },
        activated(){
            this.$emit("changeTab",2)//切换局部导航
        }
    }
</script>