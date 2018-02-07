
<style lang="less" scoped src="./css/index.css"></style>
<style lang="css" scoped >

    .router-link-active {
        border-bottom:none;
    }
    .currentClass {
        border-left:1px solid #FFA013;
    }
</style>
<template>
    <div>
        <!--交易员左侧样式-->
        <div class="content-left">
            <div class="head-portrait">
                <img :src="user_info.avatar" alt="">
                <p>{{user_info.name}}</p>
                <span class="textRightBorder">我的关注</span><small>0</small><br>
                <div class="btn_contnet" v-if="user_info.is_trader=='0'||user_info.is_trader==0">
                    <Button type="primary" @click="becomeTrader">成为交易员</Button>

                </div>
                <div class="btn_contnet" v-if="user_info.is_broker=='0'||user_info.is_broker==0">
                    <Button type="primary" @click="becomeAgent">成为经纪人</Button>
                </div>
                <div class="btn_contnet cl" v-else>
                    <div class="invitation_content">
                        <span>邀请码</span><br>
                        <span>{{user_info.invitation_code}}</span>
                    </div>
                    <div class="invitation_content">
                        <span>邀请链接</span><br>
                        <Button id="copyInvaBtn" size="small" type="error">复制链接</Button>
                    </div>
                </div>

            </div>
            <div class="left-nav">
                <ul class="left-nav-ul">
                    <router-link to="/home/myFollow" ><li><p  :class="{currentClass: cur=='follow'}" >我的跟随</p></li></router-link>
                    <router-link to="/home/mySrategy" v-if="user_info.is_trader> 0 "><li><p :class="{currentClass : cur=='strategy'}">我的策略</p></li></router-link>
                    <router-link to="/home/myProject" v-if="user_info.is_trader> 0 "><li><p :class="{currentClass : cur=='project'}">我的项目</p></li></router-link>
                    <router-link to="/home/myWallet" v-if="user_info.is_broker> 0"><li><p :class="{currentClass : cur=='wallet'}">我的钱包</p></li></router-link>
                    <router-link to="/home/myCustomer" v-if="user_info.is_broker> 0 "><li><p :class="{currentClass : cur=='customer'}">我的客户</p></li></router-link>
                    <router-link to="/home/myParticipate"><li><p :class="{currentClass : cur=='participate'}">我的参与</p></li></router-link>
                    <router-link to="/home/mySetting"><li class="last"><p :class="{currentClass : cur=='setting'}">我的设置</p></li></router-link>
                </ul>
            </div>
        </div>

    </div>


</template>
<script>
import { mapState} from 'vuex'
import Clipboard from 'clipboard';
    export default {
        data () {
            return {
                cur:this.curlink,
                showDealer: false,
                showAverageUser: true,
                follow: true,
                strategy: false,
                setting: false,
                clipboard:null

            }
        },
        watch:{
            curlink(value){
                this.cur=value
            }
        },
        computed:{
             ...mapState({
        		user_info: state => state.user.user_info ,
        	}),
        },
        mounted(){
          this.$nextTick(()=>{
              this.initCopyInvaLink()
          })
        },
        beforeDestroy(){
            this.clipboard.destroy();
        },
        methods: {
            //成为交易员
            becomeTrader () {
                this.$router.push({
                    path: '/becomeTrader'
                })
            },
            //成为经纪人
            becomeAgent(){
                this.$router.push({
                    path: '/becomeAgent'
                })
            },
            initCopyInvaLink(){
                var location=window.location
                var link=`${location.origin}/#/register?invitationCode=${this.user_info.invitation_code}`        //拼接的写法
                this.clipboard = new Clipboard('#copyInvaBtn',{
                    text: ()=> link
                });
                //复制成功执行的回调
                this.clipboard.on('success', (e)=> {
                    this.$Message.success({content:'链接已复制'})
                });

                //复制失败执行的回调
                this.clipboard.on('error', (e)=> {
                    this.$Message.error({content:'复制失败，请手动复制'})
                });
            }
        },
        props:["curlink"]
    }
</script>