<style scoped lang="less">
    .layout{
        background: #f5f7f9;
        margin: auto;
        min-width: 1200px;
        max-width: 1920px;
    }
   #app_content .ivu-row{
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    #leftNavUl{
        min-height:200px;
        a{
            color: #495060;
        }
    }
</style>
<style>
    .layout-content-main{
        padding: 10px 15px 15px 15px;
    }
    .layout-breadcrumb-content{
        margin-top: 6px;
    }
</style>
<template>
    <div id="app_content">
        <Modal v-model="compontentStatus.changePWDModal.show" width="630" class-name="ivu-modal-custom ivu-modal-middle"
               @on-cancel="closeChangePWDModal" :mask-closable="true">
            <div slot="header"></div>
            <div slot="close"></div>
            <v-changePWDModal v-if="compontentStatus.changePWDModal.show" @close="closeChangePWDModal"></v-changePWDModal>
            <div slot="footer"></div>
        </Modal>
        <v-header></v-header>
        <!--<div class="layout" v-if="user.id">-->
        <div class="layout" v-if="true">
            <div class="layout-content">
                <Row>
                    <Col span="4">
                    <Menu id="leftNavUl" ref="leftNav" :active-name="leftNav.activeName" width="auto" :open-names="leftNav.openName">
                        <Submenu :name="value.group" v-for="(value,index) in leftNavList" :key="value.group">
                            <template slot="title">
                                <Icon :type="value.iconType"></Icon>
                                {{value.text}}
                            </template>
                            <router-link :to="value.path" v-for="(value,index) in value.child" :key="value.name">
                                <MenuItem :name="value.name">{{value.text}}</MenuItem>
                            </router-link>

                        </Submenu>
                        <!--&lt;!&ndash;//账号管理&ndash;&gt;-->
                        <!--<Submenu name="accountManage">-->
                        <!--<template slot="title">-->
                        <!--<Icon type="ios-keypad"></Icon>-->
                        <!--账户管理-->
                        <!--</template>-->
                        <!--<router-link to="/accountManage/callAccount"><MenuItem name="callAccount">喊单账号</MenuItem></router-link>-->
                        <!--<router-link to="/accountManage/followAccount"><MenuItem name="followAccount">跟单账号</MenuItem></router-link>-->
                        <!--</Submenu>-->
                    </Menu>
                    </Col>
                    <Col span="20">
                    <router-view @changeLeftNav="changeLeftNav"></router-view>
                    </Col>
                </Row>
            </div>
            <div class="layout-copy">
                备案/许可证编号:鄂ICP备17023790号
            </div>
        </div>
        <Back-top></Back-top>
    </div>
</template>
<script>
import { mapState,mapActions} from 'vuex'
import leftNavListData from './leftNav/leftNavListData'
    export default {
        data() {
			return {
			    leftNav:{
			        openName:[],
			        activeName:''
			    },
                leftNavList:leftNavListData
			}
		},
        mounted(){
            this.checkRouteLeftNav() //检测路由左侧栏信息
        },
        computed:{
            ...mapState({
                user: state => state.user ,
                compontentStatus:state => state.components
            }),
            curRoute(){
                return this.$route
            }
        },
        methods:{
            ...mapActions({changeCompontentStatus:'changeCompontentStates'}),
                closeChangePWDModal(){
                    var data={
                        changePWDModal:{
                            show:false
                        }
                    }
                    this.changeCompontentStatus(data)
                },
                closeResetPWDModal(status=false){
                    var data={
                        resetPWDModal:{
                            show:status
                        }
                    }
                    this.changeCompontentStatus(data)
                },


                changeLeftNav({openName='',activeName=''}){
                      return
//                    var leftNav=this.leftNav
//                    if(openName!==''){
//                        var hasSame=false
//                        var nowOpenName=leftNav.openName
//                        for(var i in nowOpenName){
//                           if(nowOpenName[i]==openName){
//                                hasSame=true
//                           }
//                        }
//                        if(!hasSame){
//                            leftNav.openName.push(openName)
//                        }
//                    }
//                    if(activeName!==''){
//                        leftNav.activeName=activeName
//                    }
//                    this.$set(this,'leftNav', leftNav);
//                    this.$nextTick(()=>{
//                        this.$refs.leftNav.updateOpened();
//                    })

                },
                //获取展开组别名
                getOpenNameByActiveName(name){
                    var list=this.leftNavList
                    for(let i in list){
                        var child=list[i]["child"]
                        for(let j in child){
                            if(child[j]["name"]==name){
                                return list[i]["group"]
                            }
                        }
                    }
                },
                //检测路由左侧栏信息
                checkRouteLeftNav(){
                    console.log(1)
                    var activeName = this.curRoute.matched[2].name                  //router.js 路由的命名
                    this.leftNav.activeName = activeName
                    if(activeName){
                        var openName=this.getOpenNameByActiveName(activeName)
                        this.leftNav.openName=[openName]                           //[openName] 将新的openName重新添加进去类似this.leftNav.openName.push(openName)
                        this.$nextTick(()=>{
                            this.$refs.leftNav.updateOpened();                     //updateOpened() 手动展开当前active的导航项 iview Menu 方法
                        })
                    }
                }
        }
    }

</script>