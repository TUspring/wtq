<style lang="css" scoped src="./css/index.css"></style>
<style lang="less" scoped>
    .no_data {
        height:60px;
        line-height: 60px;
        text-align: center;
        font-size:16px;
    }
    .pageErrorBox{
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 6px;
        background-color: #fff;
        margin-top: 15px;
        font-size: 18px;
    }
</style>
<style lang="css">
    .balance_content .ivu-tooltip {
        width:0px;
        height:0px;
    }
   .balance_content .ivu-tooltip-rel {
       position:relative;
        width:20px;
       height:20px;
       text-align: center;
   }
   .balance_content .help {
       position: absolute;
       left:-3px;
       top:5px;
       font-size:16px;
       cursor:pointer;
       margin-left:10px;
   }
</style>
<template>
    <div class="container" v-if="showPage">
        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData="modalData" @Refresh="Refresh" >
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="top_content cl">
            <div class="user_content">
                亲爱的 <span class="userName">{{user_info.name}}</span>，
                <span v-if="time>=6 && time<=8 ">早上好！</span>
                <span v-if="time>8 && time<=12 ">上午好！</span>
                <span v-if="time>12 && time<=16">下午好！</span>
                <span v-if="time>16 && time<=20">傍晚好！</span>
                <span v-if="time>20 && time<=23">晚上好！</span>
                <span v-if="time>=0 && time<6">凌晨好！</span>
            </div>
            <div class="balance_content">
                您当前的钱包余额为<span class="balance">$ {{balance}}</span>
                可提现金额为<span class="balance">$ {{money|moneyFixed}}</span> 
                <Tooltip  placement="bottom">
                    <Icon type="help-circled" class="help"></Icon>
                    <div slot="content">
                        <p class="warning_text">可提现金额为钱包余额减去已<br>被冻结资金。已被冻结资金包<br>括：提现申请中的资金。</p>
                    </div>
                </Tooltip>
                <span class="raiseCashBtn"  @click="showModal('raise',{extract:money})">提现</span>
            </div>
            <!--=======加载中=====-->
            <v-tableSpin v-show="topLoading"></v-tableSpin>
        </div>

        <div class="list_box">
            <div class="list_title">提现记录</div>
            <div class="list_content">
                <ul class="list_header cl">
                    <li>时间</li>
                    <li>提现金额($)</li>
                    <li>状态</li>
                    <li>转账凭证号</li>
                    <li>汇率(USD/CNY)</li>
                    <li>转账金额(￥)</li>
                    <li>备注</li>
                </ul>
                <ul class="list_detail cl" v-for="value in listModal" v-if="listModal.length && !loading">
                    <li>{{value.created_at}}</li>
                    <li>{{value.money}}</li>
                    <li>
                        <span v-if="value.type==0">审核中</span>
                        <span v-if="value.type==1">同意</span>
                        <span v-if="value.type==2">拒绝</span>
                    </li>
                    <li>
                        <span v-if="value.type==1">{{value.transfer_voucher==0?'-':value.transfer_voucher}}</span>
                        <span v-if="value.type==2">-</span>
                    </li>
                    <li>
                        <span v-if="value.type==1">{{value.parities}}</span>
                        <span v-if="value.type==2">-</span>
                    </li>
                    <li>
                        <span v-if="value.type==1">{{value.RMB}}</span>
                        <span v-if="value.type==2">-</span>
                    </li>
                    <li class="remarkText">
                       <div  v-if="value.type==2" class="remark">{{value.refused.content}}</div>
                    </li>
                </ul>
                <!--=======加载中=====-->
                <v-tableSpin v-show="loading"></v-tableSpin>
            </div>
            <!--暂无数据-->
            <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>
        </div>

        <!--分页-->
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>

    </div>
    <div v-else>
        <v-tableSpin v-if="!pageErrorMsg"></v-tableSpin>
        <div class="pageErrorBox" v-else>{{pageErrorMsg}}</div>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    import raiseModal from './component/raiseModal/raiseModal.vue'
    export default {
        components:{
            raiseModal
        },
        data(){
            return{
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    raise: {
                        name: 'raiseModal',
                        width: ''
                    }
                },

                time:'',

                balance:'',          //剩余金额
                extract:'',         //冻结金额
                money:'',          //可提现余额 balance-extract

                pageErrorMsg:'',
                topLoading:false,
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                modalData:{},       //传给子组件的数据
                raiseCashList:''           //返回列表
            }
        },
        computed:{
            listModal(){
                return this.raiseCashList
            },
            ...mapState({
                user_info: state => state.user.user_info ,
            }),
            showPage(){
                return !this.topLoading
            }
        },
        beforeMount(){
            this.getTime()
            this.getPageInfo()

        },
        methods:{
            //获取当前时间
            getTime(){
                var timeString =new Date()
                var time = timeString.getHours()
                this.time = time
            },
            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            //获取页面数据
            getPageInfo(page=1){
                var getExtract=this.getExtract()
                var getBalance=this.getBalance()
                var getRaiseCash = this.getRaiseCash(page)
                Promise.all([getExtract,getBalance,getRaiseCash]).then(() => {

                }).catch((errorMsg='') => {
                    this.pageErrorMsg=errorMsg
                });
            },

            //获取钱包余额
            getBalance(){
                return new Promise((resolve, reject) => {
                    this.topLoading = true
                    this.$http.get('/user')
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            this.balance = retData.balance                            //钱包余额
                            this.money = parseFloat(this.balance)-this.extract         //可提现金额=钱包余额-冻结金额
                            this.topLoading = false
                            resolve()
                        }else{
                            reject('获取失败')
                        }
                    }).catch((error) =>{
                        reject('获取失败')
                    });
                })
            },

            //获取冻结金额
            getExtract(){
                return new Promise((resolve, reject) => {
                    this.topLoading = true
                    this.$http.get('/extract/withdrawal_money')
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            this.extract = retData
                            this.topLoading = false
                            resolve()
                        }else{
                            reject('获取失败')
                        }
                    }).catch((error) =>{
                        reject('获取失败')
                    });
                })
            },

            //刷新
            Refresh(){
                this.getPageInfo()
            },

            //获取提现记录列表信息
            getRaiseCash(page=1){
                return new Promise((resolve, reject) => {
                    this.loading = true
                    var ajaxData = {
                        page
                    }
                    this.$http.get('/extract',{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.raiseCashList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.raiseCashList = list
                            this.loading = false
                            resolve()
                        }else{
                            reject()
                        }
                    }).catch((error) =>{
                        reject()
                    });
                })
            },
            //分页
            changePage(page){
                this.getRaiseCash(page)
            },

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalData,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            }
        },
        activated(){
            this.$emit("changeTab",0)//切换局部导航
        }
    }
</script>