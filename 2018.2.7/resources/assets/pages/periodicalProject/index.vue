<style lang="css" >
    #p-project-page {
        width:1200px;
        margin:0 auto;
        margin-top:30px;
        border-radius:5px;
    }
    .project-nav-box{
        height: 80px;
        width: 1200px;
        margin:20px auto;
        border-radius: 6px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom:1px solid rgb( 238, 238, 238 );
    }
    .project-nav-ul{

    }
    .project-nav-ul li{
        width: 220px;
        height: 80px;
        line-height: 80px;
        float: left;
        padding:0px 10px;
        color: #333;
        text-align: center;
        cursor: pointer;
        font-size: 18px;
        border-right: 1px solid rgb( 238, 238, 238 );
    }

    .project-nav-ul .nav_link.cur{
        border-top:1px solid #ffa114;
        color: #ffa114;
        box-sizing: border-box;
        border-bottom:1px solid #FFFFFF;
    }

    .update-prompt{
        padding-right: 20px;
        font-size: 12px;
        color: #999;
    }
</style>

<template>
    <div class="cl" id="p-project-page">
        <div class="project-nav-box">
            <ul class="project-nav-ul">
                <router-link to="/periodicalProject/projectEnroll">
                    <li :class="['nav_link',{cur:curRoute.path=='/periodicalProject/projectEnroll'||curRoute.path.indexOf('/periodicalProject/projectEnroll/')>=0}]"  @click="silderStatus">报名中</li>
                </router-link>
                <router-link to="/periodicalProject/ongoingProject">
                    <li :class="['nav_link',{cur:curRoute.path=='/periodicalProject/ongoingProject'||curRoute.path.indexOf('/periodicalProject/ongoingProject/')>=0}]"   @click="silderStatus">进行中</li>
                </router-link>
                <router-link to="/periodicalProject/completeProject">
                    <li :class="['nav_link',{cur:curRoute.path=='/periodicalProject/completeProject'||curRoute.path.indexOf('/periodicalProject/completeProject/')>=0}]"  @click="silderStatus">已完成</li>
                </router-link>
            </ul>
           <!--<p class="update-prompt">更新时间：2017-8-8 12:00</p>-->
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        components:{

        },
        data () {
            return {
                slider_Choice: false,
                currentStyle:true,
            }
        },

        beforeMount() {

        },
        computed:{
            curRoute(){
                return this.$route
            }
        },
        methods: {
            silderStatus(){
                if (this.slider_Choice) {
                    this.slider_Choice = false
                }
            },
        }
    }
</script>