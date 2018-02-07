<style scoped src="./css/header.css"></style>
<style>
    .left_nav_group {
        transition: all 0.3s ease-in-out;
        overflow: hidden;
        height: 180px;
    }

    .slide-leftNav-enter,
    .slide-leftNav-leave-active {
        height: 0;
    }
</style>
<style lang="less">

</style>
<template>
    <header id="header">
        <div class="nav_content">
            <div class="nav_left">
                <div style="display: block;float:left;width: 130px;height: 80px">
                    <router-link to='/index'>
                        <img :src="logo" style="max-width: 100%;max-height: 100%;margin: 0 auto">
                    </router-link>
                </div>
                <!--普通头部-->
                <ul v-if="isDefaultContent" style="display: block;float:left;">
                    <router-link to='/tradingStrategy'>
                        <li :class="['nav_link',{cur:curRoute.path=='/tradingStrategy'||curRoute.path.indexOf('/tradingStrategy/')>=0}]"
                            @click="silderStatus">交易策略
                        </li>
                    </router-link>
                    <!--<li class="nav_link">直播间</li>-->
                    <!--<li class="nav_link" @click="silderStatus">优质交易商</li>-->

                    <router-link to='/Artificial_Intelligence'>
                        <li :class="['nav_link',{cur:curRoute.path=='/Artificial_Intelligence'||curRoute.path.indexOf('/Artificial_Intelligence/')>=0}]"
                            @click="silderStatus">人工智能
                        </li>
                    </router-link>


                    <li :class="['nav_link slider_checkout',{cur:curRoute.path=='/Financial_Information'||curRoute.path.indexOf('/Financial_Information/')>=0}]"
                        @click="showSlider" @mouseenter="handleMouseenter"
                        @mouseleave="handleMouseleave">财经资讯
                        <!--<transition name="slide-leftNav">-->
                        <div class="nav_child_box" v-show="onNavBox">
                            <ul class="slider-ct left_nav_group">
                                <!--<ul class="slider-ct left_nav_group" v-show="slider_Choice" slot="content">-->
                                <router-link to='/Financial_Information/News_Flash/'>
                                    <li :class="['nav_silder_link',{silder_cur:curRoute.path=='/Financial_Information/News_Flash/'||curRoute.path.indexOf('/Financial_Information/News_Flash/')>=0}]">
                                        快讯速览
                                    </li>
                                </router-link>

                                <router-link to='/Financial_Information/Economic_Calendar/'>
                                    <li :class="['nav_silder_link',{silder_cur:curRoute.path=='/Financial_Information/Economic_Calendar/'||curRoute.path.indexOf('/Financial_Information/Economic_Calendar/')>=0}]">
                                        财经日历
                                    </li>
                                </router-link>

                                <router-link to='/Financial_Information/Current_Events/'>
                                    <li :class="['nav_silder_link',{silder_cur:curRoute.path=='/Financial_Information/Current_Events/'||curRoute.path.indexOf('/Financial_Information/Current_Events/')>=0}]">
                                        时事要闻
                                    </li>
                                </router-link>
                            </ul>
                        </div>
                        <!--</transition>-->
                    </li>

                    <router-link to='/periodicalProject'>
                        <li :class="['nav_link',{cur:curRoute.path=='/periodicalProject'||curRoute.path.indexOf('/periodicalProject/')>=0}]"
                            @click="silderStatus">定期项目
                        </li>
                    </router-link>

                </ul>
                <!--标题头部-->
                <ul v-if="isTitleContent">
                    <li class="nav_title"><span>{{headerState.content}}</span></li>
                </ul>
            </div>
            <div class="nav_right">
                <!--<span class="help">帮助中心</span>-->
                <ul class="nav_right_ul cl">
                    <!--普通页面未登录-->
                    <li id="nav_s1" v-if="isDefautRightContent&&(!user.id)">
                        <span class="nav_right_inline header_right_textbtn" @click="showLoginModal">登录</span>
                        <router-link to='/register'>
                            <button class="nav_right_inline header_right_btn">注册</button>
                        </router-link>
                    </li>
                    <!--普通页面已登录-->
                    <li id="nav_s2" v-if="user.id">
						<span class="nav_right_inline tips_icon iconfont">&#xe610;  <span class="prompt_badge">
							<Badge count="5"></Badge>
						</span>
						</span>
                        <router-link to='/home'><span class="nav_right_inline user_icon iconfont">&#xe653;</span>
                        </router-link>
                        <button class="nav_right_inline header_right_btn" @click="user_signout">注销</button>
                    </li>
                    <!--注册页面未登录-->
                    <li id="nav_s3" v-if="isRegisterRightContent&&(!user.id)">
                        <span class="nav_right_inline">已有账号？</span>
                        <button class="nav_right_inline header_right_btn" @click="showLoginModal">登录</button>
                    </li>
                </ul>
            </div>
        </div>
    </header>

</template>
<script>
    import './css/header.css'
    import logo from './images/zhongfx_logo.png'
    import {mapState, mapActions} from 'vuex'
    import {USER_SIGNOUT, USER_SETSTATE, USER_SETINFO} from 'store/user'
    export default {
        data() {
            return {
                slider_Choice: false,
                header_type: 1,
                userAutoLoginKey: 'userAutoLogin',
                userLoginFormKey: 'userLoginForm',
                onNavBox: false,
                logo
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
                headerState: state => state.components.header,
                auth: state => state.components.auth
            }),
            isDefaultContent(){
                return this.headerState.contentType == 'default'
            },
            isTitleContent(){
                return this.headerState.contentType == 'title'
            },
            isDefautRightContent(){
                return this.headerState.rightContentType == 'default'
            },
            isRegisterRightContent(){
                return this.headerState.rightContentType == 'register'
            },
            curRoute(){
                return this.$route
            }
        },
        beforeMount(){

            if (this.auth) {
                this.checkLoginStates()
            }
            //监听用户id变化
            this.$store.watch(this.$store.getters.getUserId, () => {
                this.checkLoginStates()
            })
        },
        methods: {
            ...mapActions({changeCompontentStates: 'changeCompontentStates'}),
            ...mapActions([USER_SIGNOUT, USER_SETSTATE, USER_SETINFO]),
            //登录弹窗
            showLoginModal(){
                var data = {
                    loginModal: {
                        show: true
                    }
                }
                this.changeCompontentStates(data)
            },
            //注销
            user_signout(){
                this.$http.post('/login_out')
                    .then((response) => {
                        const data = response.data
                        const {retCode, retData}=data
                        if (retCode == '0') {
                            this.util.removeData(this.userAutoLoginKey)
                            this.util.removeData(this.userLoginFormKey)
                            this.USER_SIGNOUT()
                            if (this.auth) {
                                this.$router.replace({
                                    path: '/index'
                                })
                            }
                        } else {
                            this.$Message.error({content: '请输入有效的手机号码！'})
                        }

                    })
                    .catch((error) => {
                    });
            },
            //检测是否登录状态
            checkLoginStates(){
                var id = this.user.id
                if (!this.util.isEmpty(id)) {
                    this.getUserInfo()
                } else {
                    this.USER_SIGNOUT()
                }
            },
            //获取用户信息
            getUserInfo(){
                this.$http.get('/user')
                    .then((response) => {
                        const data = response.data
                        const {retCode, retData}=data
                        if (retCode == '0') {
                            this.USER_SETINFO(retData)
                        } else {
                        }
                    })
                    .catch((error) => {
                    });
            },
            routechange(){
                this.curtRoute = this.$route
            },
            showSlider(){
                this.slider_Choice = !this.slider_Choice
                this.onNavBox = false
            },
            silderStatus(){
                if (this.slider_Choice) {
                    this.slider_Choice = false
                }
            },
            handleMouseenter(){
                this.onNavBox = true
            },
            handleMouseleave(){
                this.onNavBox = false
            }
        }
    }
</script>