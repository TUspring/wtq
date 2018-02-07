<style lang="css" scoped src="./css/index.css"></style>

<style lang="less">
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

    .btn-content .ivu-select-single .ivu-select-selection {
        border:1px solid #FFA113;
        height:40px;
    }
    .btn-content .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
        color:#FFA113;
        line-height:40px;
    }
    .btn-content .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        color:#FFA113;
        line-height:40px;
    }
    .btn-content .ivu-icon {
        color:#FFA113;
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

       <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
           <div slot="header"></div>
           <div slot="close"></div>
           <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalData="modalData" :historyFollowForm="historyFollowForm"  @setHistoryFollowForm="setHistoryFollowForm" @Recovery="Recovery" @Modify="Modify" @Relieve="Relieve" >
               <!-- 组件在 vm.currentview 变化时改变！ -->
           </component>
           <div slot="footer"></div>
       </Modal>

       <div class="min cl" v-if="showPage">
           <div class="followName-list cl">
               <ul>
                   <li>策略</li>
                   <li>MT4账号</li>
                   <li>暂停时间</li>
                   <li>跟随方式</li>
                   <!--<li>跟随天数</li>-->
                   <li>操作</li>
               </ul>
           </div>
           <div class="followUser-list cl"  v-for="(value,key) in listModel" v-if="listModel.length">
               <ul>
                   <li>
                       <img :src="value.head?value.head:''" alt=""><br>
                       {{value.name}}
                   </li>
                   <li><span>{{value.mt4account.MT4_account}}</span></li>
                   <li>{{timeType(value.suspend_time)}}</li>
                   <li>{{value.follow}}</li>
                   <li>
                      <div class="btn-content cl">
                          <Select  v-model="value.editType" style="width:90px;margin-right:10px;"  placeholder="修改" :transfer="true">
                              <Option  value="跟随方式" key="跟随方式" @click.native="showModal('modify',{id:value})">跟随方式</Option>
                              <Option  value="更改策略" key="更改策略"  @click.native="showModal('change',{id:value})">更改策略</Option>
                          </Select>
                          <span class="followBtn recovery" @click="showModal('recovery',{id:value})">恢复跟随</span>
                      </div>
                   </li>
               </ul>
           </div>

           <div class="noList_box" v-if="!listModel.length">暂无数据</div>
           <div class="pageIndex_box">
               <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
           </div>

       </div>
   </div>
</template>

<script>
    import recoveryModal from './components/recoveryModal/recoveryModal.vue'
    import changeModal from './components/changeModal/changeModal.vue'
    import modifyModal from './components/modifyModal/modifyModal.vue'
    import { mapState } from 'vuex'
    export default {
        components: {
            recoveryModal,
            changeModal,
            modifyModal
        },
        data () {
            return {
                loading: false,
                showPage: false,
                historyFollowList: null,
                pageIndex: {
                    current_page: '1',
                    last_page: null,
                    per_page: null,
                    total: null
                },

                //子组件传回来的数据（修改）
                historyFollowForm: {
                    id: '',
                    follow_form: '',
                    follow_lot_ratio: '',
                    MT4_account: ''
                },

                modalData:{},
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    recovery: {
                        name: 'recoveryModal',
                        width: ''
                    },
                    change: {
                        name: 'changeModal',
                        width: ''
                    },
                    modify: {
                        name: 'modifyModal',
                        width: ''
                    }
                },
            }
        },
        computed:{
            listModel(){
                return this.historyFollowList
            }

        },
        mounted (){
            const {page}=this.$router.currentRoute.query
            this.getHistoryFollowList(page)
        },
        methods:{
            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },
            //计算天数
            checkDay(start,end) {

//                var starttimestamp = Date.parse(new Date(start));
//                starttimestamp = starttimestamp / 1000;

                var differ_time = end - start;
                var day = parseInt(differ_time / (60*60*24));

                if (day < 1) {
                    return 0;
                }else {
                    return day;
                }

            },

            Recovery () {
                this.getHistoryFollowList(this.pageIndex.current_page)
            },
            Modify () {
                this.getHistoryFollowList(this.pageIndex.current_page)
            },
            Relieve () {
                this.getHistoryFollowList(this.pageIndex.current_page)
            },
            //监听子组件数据变化
            setHistoryFollowForm (data) {
                object.assign(this.historyFollowForm,data)
            },

            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalData,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },


            getHistoryFollowList(page=1){
                var getHistoryFollowList=this.getHistoryFollowListHttp(page)
                Promise.all([getHistoryFollowList]).then(()=>{
                    this.showPage=true
                    this.loading = false
                }).catch(()=>{
                });
            },

            getHistoryFollowListHttp(page=1){
                const ajaxData={
                    page,
                    suspend:2
                }
                return new Promise((resolve, reject)=>{
                    this.showPage=false
                    this.loading = true
                    this.$http.get('/policyFollowing/user_list',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode=='0'){
                                var {current_page,last_page,per_page,total,data:list}=retData
                                var pageIndexMsg={current_page,last_page,per_page,total}
                                if(current_page!='1'&&!list.length){
                                    this.getHistoryFollowList(--current_page)
                                }
                                this.historyFollowList=list
                                Object.assign(this.pageIndex,pageIndexMsg)
                                resolve();
                            }else{
                                reject();
                            }
                        })
                        .catch((error) =>{
                            reject();
                        });

                })
            },
            changePage(page){
                this.getHistoryFollowList(page)
            }
        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
            this.getHistoryFollowList(this.pageIndex.current_page)
        }
    }
</script>