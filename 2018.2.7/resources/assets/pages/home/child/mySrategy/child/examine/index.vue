<style lang="css" scoped src="./css/index.css">

</style>
<style lang="less" scoped>
    .policy_img{
        background-color: #eeeeee;
    }

    .loading_box {
        width:300px;
        height: 200px;
        position: absolute;
        top:-50%;
        left: 50%;
        margin-left: -150px;
        /*margin-top: 100px;*/
        display: flex;
        justify-content: center;
    .ivu-spin-fix {
        font-size:14px;
        background-color:rgba(0,0,0,.0);
    }
    div{
        margin-top: 20px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border:none;

    }
    }
    .container{
        position: relative;
    }
</style>
<template>
   <div class="container">
       <!--加载中-->
       <div class="loading_box cl" v-if="loading">
           <Col class="demo-spin-col" span="8">
               <Spin fix>
                   <Icon type="load-c" size=60 class="demo-spin-icon-load"></Icon>
                   <div>加载中</div>
               </Spin>
           </Col>
       </div>

       <!--弹窗-->
       <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle">
           <div slot="header"></div>
           <div slot="close"></div>
           <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData='modalData' @deleteSuccess="deleteSuccess">
               <!-- 组件在 vm.currentview 变化时改变！ -->
           </component>
           <div slot="footer"></div>
       </Modal>

       <div id="min" v-if="showPage">
           <div class="user-examine" v-for="(value,key) in listModel" v-if="listModel.length">
               <div class="user-examine-msg clearfix">
                   <router-link :to="{path: '/policyFollowing/'+value.id}">
                   <img class="policy_img" :src="value.picture?value.picture:''" alt="">
                   </router-link>
                   <div class="user_name">
                       <router-link tag="div" :to="{path: '/policyFollowing/'+value.id}">
                       <p style="cursor: pointer">{{value.name}}</p><br>
                       </router-link>
                   </div>
                   <span class="examine_time">发布时间：{{value.created_at}}</span>
               </div>
               <div class="user-examine-number">
                   <table>
                       <tr>
                           <th>策略交易资金</th>
                           <th>最小跟随资金</th>
                           <th>信号源账号</th>
                           <th>&nbsp &nbsp &nbsp &nbsp &nbsp</th>
                       </tr>
                       <tr>
                           <th>${{value.deal_money}}</th>
                           <th>${{value.min_follow_money}}</th>
                           <th>{{value.trade_platform.platform}}-{{value.MT4_account}}</th>
                           <th>
                               <span class="examine" v-if="value.review_status=='0'">审核中</span >
                               <span class="publish" v-if="value.review_status=='6'">发布中</span >
                               <router-link v-if="value.review_status=='2'" :to="{path:'/modifyNewStrategy/'+value.id}"><span class="modify" >修改</span ></router-link>
                               <span v-if="value.review_status=='2'" class="delete" @click="showModal('delete',value)" >删除</span >
                           </th>
                       </tr>
                   </table>
               </div>
               <div class="reject_reason" v-if="value.review_status=='2'">
                   <span style=" padding-left: 20px">已拒绝（拒绝理由）：</span>
                   <span style="color: #ffa114;">{{value.refused?value.refused.content:''}}</span>
               </div>
           </div>

           <div class="noList_box" v-if="!listModel.length">暂无数据</div>
           <div class="pageIndex_box">
               <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
           </div>
       </div>
   </div>
</template>

<script>
    import deleteModal from './components/deleteModal/deleteModal.vue'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                loading: false,
                showPage:false,
                policyList:null,
                pageIndex:{
                    current_page:'1',
                    last_page:null,
                    per_page:null,
                    total:null

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
                modalData:{}
            }
        },
        computed:{
            listModel(){
                return this.policyList
            }
        },
        components: {
            deleteModal
        },
        mounted(){
            const {page=1}=this.$router.currentRoute.query
            this.getPolicyList(page)
        },
        methods: {
            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            deleteSuccess(){
                if(this.policyList.length == 1 && this.pageIndex.current_page!=1){
                    this.getPolicyList(this.pageIndex.current_page-1)
                }else{
                    this.getPolicyList(this.pageIndex.current_page)
                }

            },
            getPolicyList(page=1){
                var getPolicyList=this.getPolicyListHttp(page)
                Promise.all([getPolicyList])
                .then(()=>{
                    this.showPage=true
                    this.loading = false
                }).catch(()=>{
                });
            },
            getPolicyListHttp(page=1){
                const ajaxData={
                    page,
                    review_status:2
                }
                return new Promise((resolve, reject)=>{
                    this.showPage=false
                    this.loading = true
					this.$http.get('/policy/user_list',{params:ajaxData})
					  .then((res) => {
					  	const data = res.data
					  	const {retCode,retData={}}=data
					  	if(retCode=='0'){
					  	    var {current_page,last_page,per_page,total,data:list=[]}=retData
					  	    var pageIndexMsg={current_page,last_page,per_page,total}
					  	    if(current_page!='1'&&!list.length){
					  	        this.getPolicyList(--current_page)
					  	        return
					  	    }
					  	    this.policyList=list
					  	    Object.assign(this.pageIndex,pageIndexMsg)
                            resolve();
					  	}else{
					  	    reject();
					  	}
					  }).catch((error) =>{
					    reject()
					  })
                })
            },
            changePage(page){
                this.getPolicyList(page)
            },
            showModal(name,data={}){

                this.modalData=data
                const modalList=this.modalList
                this.curModal=modalList[name],
                this.iviewModal=true
            }
        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
        }

    }
</script>