<style lang="css" scoped src="./css/index.css"></style>

<style lang="less" scoped>
    .no_data {
        height:60px;
        line-height: 60px;
        text-align: center;
        font-size:16px;
    }
</style>

<template>
    <div class="container">
        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalData="modalData" @Refresh="Refresh">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="list_box">
            <div class="list_title cl">
                <span>银行卡</span>
                <span class="addBankCard"  @click="showModal('addBankCard')">新增绑定银行卡</span>
            </div>
            <div class="list_content">
                <ul class="list_header cl">
                    <li>户主姓名</li>
                    <li>银行卡号</li>
                    <li>银行名称</li>
                    <li>支行名称</li>
                    <li>预留手机号</li>
                    <li>操作</li>
                </ul>
                <ul class="list_detail cl" v-for="value in listModal"  v-if="listModal.length && !loading">
                    <li>{{value.real_name}}</li>
                    <li>{{value.bank_number}}</li>
                    <li>{{value.bank_name}}</li>
                    <li class="remarkText">
                        <div class="remark">{{value.sub_branch}}</div>
                    </li>
                    <li>{{value.reserved_phone}}</li>
                    <li>
                        <span class="modify" @click="showModal('modifyBankCard',{id:value})">修改</span>
                    </li>
                </ul>
                <!--=======加载中=====-->
                <v-tableSpin v-show="loading"></v-tableSpin>
            </div>
            <!--暂无数据-->
            <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>
        </div>

        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>

    </div>
</template>

<script>
    import addBankCardModal from './component/addBankCardModal/addBankCardModal.vue'
    import modifyBankCardModal from './component/modifyBankCardModal/modifyBankCardModal.vue'
    export default {
        components:{
            addBankCardModal,
            modifyBankCardModal
        },
        data(){
            return{
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    addBankCard: {
                        name: 'addBankCardModal',
                        width: ''
                    },
                    modifyBankCard: {
                        name: 'modifyBankCardModal',
                        width: ''
                    }
                },
                modalData:{},        //传给子组件的数据

                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },
                bankCardList:''      //返回银行卡列表数据

            }
        },
        computed:{
            listModal(){
                return this.bankCardList
            }
        },
        beforeMount(){
            this.getBankCardList()
        },
        methods:{
            //刷新
            Refresh(){
                this.getBankCardList(this.pageIndex.current_page)
            },

            //获取银行卡列表数据
            getBankCardList(page=1){
                this.loading = true
                var ajaxData = {
                    page
                }
                this.$http.get('/bank',{params:ajaxData})
                .then((response)=>{
                    const data = response.data
                    const {retCode,retData} = data
                    if(retCode == '0'){
                        var {current_page,last_page,per_page,total,data:list}=retData
                        var pageIndexMsg={current_page,last_page,per_page,total}
                        if(current_page!='1'&&!list.length){
                            this.bankCardList(--current_page)
                        }
                        Object.assign(this.pageIndex,pageIndexMsg)
                        this.bankCardList = list
                        this.loading = false
                    }
                })
            },
            //分页
            changePage(page){
                this.getBankCardList(page)
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
            this.$emit("changeTab",2)//切换局部导航
        }
    }
</script>