<style lang="css" scoped src="./css/index.css"></style>
<style>
.no-real-account{
    width: 910px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #CCCCCC;
    border-radius: 6px;
    background-color: #f5f5f5;
    margin-top: 20px;
}
    .no-domeMT4List{
        width: 910px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #CCCCCC;
        border-radius: 6px;
        background-color: #f5f5f5;
        margin-top: 20px;
    }
</style>
<template>
    <!--MT4账号-->
    <div class="mt4_account" >

        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
               :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg"
                       @event="updateData">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <!--模拟账户-->
        <div class="simulation_account">
            <div class="simulation_account_top">模拟账号</div>
            <div class="simulation_account_content">
                <v-tableSpin v-show="loading"></v-tableSpin>
                <ul class="classification_list">
                    <li>平台名称</li>
                    <li>服务器名称</li>
                    <li>账号</li>
                    <li>密码</li>
                    <li>分配时间</li>
                    <li>到期时间</li>
                </ul>
                <div class="no-domeMT4List" v-if="dome_MT4List.length==0">暂无数据</div>
                <ul class="data_list" v-for="item in dome_MT4List">
                    <li>{{item.platform.platform}}</li>
                    <li>{{item.platform.server_name}}</li>
                    <li>{{item.MT4_account}}</li>
                    <li>{{item.MT4_password}}</li>
                    <li>{{new Date(item.start_time*1000).format("yyyy-MM-dd")}}</li>
                    <li>{{new Date(item.deadline*1000).format("yyyy-MM-dd")}}</li>
                </ul>
            </div>
        </div>
        <!--真实账户-->
        <div class="real_account">
            <div class="real_account_top">
                <span>真实账户</span>
                <span class="relation_mt4" @click="showModal('newRelation')">新增关联MT4账号</span>
            </div>
            <div class="real_account_content">
                <ul class="classification_list">
                    <li>账号</li>
                    <li>状态</li>
                    <li>操作</li>
                </ul>
                   <div class="no-real-account" v-if="MT4_list.length==0">
                       暂无数据
                   </div>
                <div class="relation_status">
                    <!--状态 0-移除关联 1-关联成功 2-关联失败 3-正在关联-->

                    <!--正在关联 出现-->
                    <ul class="associated" v-for="item in MT4_list" v-if="item.review==3">
                        <li v-model="item.MT4_account">{{item.MT4_account}}</li>
                        <li v-model="item.status">正在关联</li>
                        <li>-</li>
                    </ul>

                    <!--关联失败 出现-->
                    <ul class="relation_fail" v-for="item in MT4_list" v-if="item.review==2">
                        <li>{{item.MT4_account}}</li>
                        <li><p>关联失败 <span class="fail_information">
                            <!--（MT4注册邮箱与中汇绑定邮箱不一致）-->
                        </span></p></li>
                        <li class="operation_btn">
                            <button class="again_relation" @click="showModal('againRelation',{id:item})">重新关联
                            </button>
                            <button class="remove" @click="showModal('removeMT4',{id:item})">移除</button>
                        </li>
                    </ul>

                    <!--关联成功 出现-->
                    <ul class="relation_success" v-for="item in MT4_list" v-if="item.review==1">
                        <li>{{item.MT4_account}}</li>
                        <li>关联成功</li>
                        <li class="success_btn">
                            <button class="change_psw" @click="showModal('changePassword',{id:item})">
                                更改密码
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import relationMT4_Modal from './components/relationMT4_Modal'
    import changePassword_Modal from './components/changePassword_Modal'
    import againRelation_Modal from './components/againRelation_Modal'
    import removeMT4_Modal from './components/removeMT4_Modal'
    import {mapState, mapActions} from 'vuex'
    import {USER_SETINFO} from 'store/user'
    export default {
        components: {
            'relationMT4_Modal': relationMT4_Modal,
            'changePassword_Modal': changePassword_Modal,
            'againRelation_Modal': againRelation_Modal,
            'removeMT4_Modal': removeMT4_Modal,
        },

        data () {
            return {
                loading:false,
                //MT4账号列表
                MT4_list: '',
                dome_MT4List: '',
                trade_platform: '',
                MT4_account: '',
                MT4_password: '',
                server_name: '',
                status: '',
                user_id: '',
                review: '',
                time: '',
                id: '',
                platformCooperativeList:'',
                modalList: {
                    newRelation: {
                        name: 'relationMT4_Modal',
                        width: ''
                    },
                    againRelation: {
                        name: 'againRelation_Modal',
                        width: ''
                    },
                    removeMT4: {
                        name: 'removeMT4_Modal',
                        width: ''
                    },
                    changePassword: {
                        name: 'changePassword_Modal',
                        width: ''
                    },
                },
                curModal: {
                    name: '',
                    width: ''
                },
                iviewModal: false,
            }
        },

        beforeMount(){
            this.getUserMt4()
            this.getDemoMT4()
        },

        methods: {
            showModal(name, data = {}){
                const modalList = this.modalList
                this.modalMsg = data
                this.curModal = modalList[name],
                    this.iviewModal = true
            },
            updateData (){
                this.getUserMt4()
            },

            // MT4模块
            getUserMt4(){
                //请求MT4数据
                return new Promise((resolve, reject) => {
                    this.$http.get('/MT4')
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData}=data;
                            if (retCode == '0') {
                                this.MT4_list = retData;
                                console.log(this.MT4_list);
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },

            getDemoMT4(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/MT4/demo_MT4')
                        .then((response) => {
                            const data = response.data;
                            const {retCode, retData}=data;
                            if (retCode == '0') {
                                this.dome_MT4List = retData;
                                console.log(this.dome_MT4List);
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch((error) => {
                        reject();
                    });
                })
            },
        },
        activated(){
            this.$emit("changeTab",1) //切换局部导航
        }
    }
</script>