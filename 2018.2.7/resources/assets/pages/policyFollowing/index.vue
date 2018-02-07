<style scoped src="./css/index.css"></style>
<style>

    .slide-fade-enter-active {
        transition: all .5s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }

    .bounce-enter-active {
        animation: bounce-in 1s;
    }

    .bounce-leave-active {
        animation: bounce-in .8s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
<template>
    <div id="trading_strategy_follow">


        <!--弹窗-->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"
               :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg"
                       @buttonShow="buttonShow">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>


        <!--顶部信息-->
        <div class="follow_container_top cl" id="followContainerTop">
            <div class="top_content_left">
                <img :src="followDataList.picture" alt="" class="avatar">
                <p>{{followDataList.MT4_account}}</p>
                <Tooltip placement="bottom">
                    <button class="follow_btn"><span class="iconfont">&#xe629;</span><span class="typeface">关注</span>
                    </button>
                    <div slot="content">
                        功能开发中，好建议请邮件PM@zhongfx.cn
                    </div>
                </Tooltip>
            </div>
            <div class="top_content_center">
                <p>{{followDataList.describe}}</p>
                <div>
                    <ul>
                        <li>
                            <p class="monthly_average_income"><span>{{followDataList.average_monthly_income}}</span>
                            </p>
                            <p class="prompt_text">月均收益</p>
                        </li>
                        <li>
                            <p><span>{{followDataList.max_drawdown}}%</span></p>
                            <p class="prompt_text">最大回撤</p>
                        </li>
                        <li>
                            <p>{{followDataList.Sharpe_Ratio}}</p>
                            <p class="prompt_text">夏普比例</p>
                        </li>
                        <li>
                            <p>{{followDataList.Profit_coefficient}}</p>
                            <p class="prompt_text">获利系数</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="top_content_right">
                <button @click="showModal('followBtn',followDataList)" v-if="followBtnShow!=followDataList.is_follow&&loading">一键跟随</button>
                <button class="already_follow" v-if="followBtnShow==followDataList.is_follow&&loading" @click="dropDown">
                    <span class="already_follow_font">已跟随</span>
                    <span class="iconfont already_follow_icon" v-if="dropShow">&#xe66c;</span>
                    <span class="iconfont already_follow_icon" v-if="!dropShow">&#xe604;</span>
                </button>
             <transition name="bounce">
                 <!--<transition name="slide-leftNav">left_nav_group-->
                    <div v-if="dropDownBtn" class="drop_down_btn">
                        <button @click="followManage"><span class="iconfont">&#xe616;</span><span>跟随管理</span></button>
                        <button @click="showModal('followBtn',followDataList)"><span class="iconfont">&#xe624;</span><span>新增跟随</span></button>
                    </div>
                </transition>
            </div>
        </div>

        <!--悬浮块-->
        <transition name="slide-fade">
            <div class="pullDown_switch" v-if="pullDown">
                <ul>
                    <li class="pullDown_switch_left">
                        <div class="left_box">
                            <img :src="followDataList.picture" alt="">
                        </div>
                        <div class="right_box">
                            <p>{{followDataList.MT4_account}}</p>
                            <Tooltip placement="bottom">
                                <button><span style="font-size: 16px">+</span>关注</button>
                                </button>
                                <div slot="content">
                                    功能开发中，好建议请邮件PM@zhongfx.cn
                                </div>
                            </Tooltip>
                        </div>
                    </li>
                    <li class="pullDown_switch_center">
                        <div class="pullDown_switch_center_container">
                            <ul class="pullDown_switch_center_ul">
                                <li>
                                    <p class="monthly_average_income">
                                        <span>{{followDataList.average_monthly_income}}</span></p>
                                    <p class="prompt_text">月均收益</p>
                                </li>
                                <li>
                                    <p><span>{{followDataList.max_drawdown}}%</span></p>
                                    <p class="prompt_text">最大回撤</p>
                                </li>
                                <li>
                                    <p><span>{{followDataList.Sharpe_Ratio}}</span></p>
                                    <p class="prompt_text">夏普比例</p>
                                </li>
                                <li>
                                    <p><span>{{followDataList.Profit_coefficient}}</span></p>
                                    <p class="prompt_text">获利系数</p>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="pullDown_switch_right">
                        <button v-if="followBtnShow!=followDataList.is_follow" @click="showModal('followBtn',followDataList)">一键跟随
                        </button>
                        <button class="already_follow" v-if="followBtnShow==followDataList.is_follow">已跟随</button>
                    </li>
                </ul>
            </div>
        </transition>

        <!--切换tab-->
        <div class="follow_checkout">
            <div>
                <ul>
                    <router-link :to="{path:'/policyFollowing/dynamicComm/'+followId}">
                    <li :class="{current:(tabSwitch==tabSwitchList[0])}">动态交流</li>
                    </router-link>
                    <router-link :to="{path:'/policyFollowing/policyData/'+followId}">
                    <li :class="{current:(tabSwitch==tabSwitchList[1])}">策略数据</li>
                    </router-link>
                </ul>
            </div>
        </div>
        <keep-alive>
        <router-view @changeTab="changeTab"></router-view>
        </keep-alive>

    </div>
</template>
<script>
    import followModal from './components/followModal/index.vue'
    export default {
        components: {
            'followModal': followModal,
        },
        name: 'Bank',
        data () {
            return {
                loading:false,
                dropShow: true,
                pullDown: false,
                followBtnShow: 1,
                dropDownBtn: false,
                followDataList:'',
                tabSwitch: '',
                tabSwitchList: ['dynamic_communication', 'transaction_data'],
                iviewModal: false,
                scrolled: '',
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    followBtn: {
                        name: 'followModal',
                        width: ''
                    },
                }
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[1]
        },
        computed:{

        },
        beforeMount() {
            this.followId = this.$router.currentRoute.params.id
            this.$http.get('/policy/' + this.followId)
                .then((response) => {
                    const data = response.data;
                    const {retCode, retData = {}}=data;
                    if (retCode == '0') {
                        this.followDataList = retData
                        this.loading=true
                    } else {
                        console.log('请求数据失败');
                    }
                }).catch((error) => {
                console.log(error);
            });
        },
        methods: {
            //监听屏幕滚动
            handleScroll() {
                var doc = document.documentElement || document.body
                var scrollTop = doc.scrollTop;
                if (scrollTop > 240) {
                    this.pullDown = true;
                } else {
                    this.pullDown = false
                }
            },
            showModal(name, data = {}){
                const modalList = this.modalList
                this.modalMsg = data
                this.curModal = modalList[name],
                    this.iviewModal = true
            },
            changeTab(index){
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            },
            //跟随Btn
            dropDown(){
                this.dropDownBtn = !this.dropDownBtn
                this.dropShow = !this.dropShow
            },
            buttonShow(){
               this.followBtnShow = this.followDataList.is_follow
            },

            //跟随管理
            followManage(){
                this.$router.push({
                    path:'/home/myFollow/following'
                })
            },
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('scroll', this.handleScroll);
            })
        }
    }
</script>
