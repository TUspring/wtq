<style lang="css" scoped>
    .container {
        position: relative;
    }
    .top_content {
        border-radius: 6px;
        margin-top:20px;
        padding:0 30px;
        font-size: 14px;
        color: rgb( 51, 51, 51 );
        background-color: rgb( 255, 255, 255 );
    }
    .user_content {
        height: 101px;
        line-height: 101px;
        float:left;
    }
    .balance_content {
        height: 101px;
        line-height: 101px;
        float:right;
    }
    .userName {
        font-size:20px;
        color:#FFA114;
    }
    .balance {
        font-size:24px;
        color:#09af48;
    }
    /*局部导航*/
    .income_nav {
        width:100%;
        background:#fff;
        border-radius: 6px;
        margin-top:30px;
        margin-bottom:20px;
    }
    .income_nav span {
        display: inline-block;
        width:199px;
        height:50px;
        line-height:50px;
        font-size: 14px;
        text-align: center;
        color: rgb( 51, 51, 51 );
    }
    .income_nav .current {
        border-top:1px solid #FFA114;
        border-right:1px solid #F5F5F5;
        border-left:1px solid #F5F5F5;
        color:#FFA114;
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

<template>
    <div class="container"  v-if="showPage">
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
                您当前的总收入为：<span class="balance">${{income}}</span>
            </div>
        </div>
        <div class="income_nav" >
            <router-link to="/home/myWallet/income/survey"><span :class="{current: (tabSwitch==tabSwitchList[0])}">经济收入概况</span></router-link>
            <router-link to="/home/myWallet/income/detail"><span :class="{current: (tabSwitch==tabSwitchList[1])}">经济收入明细</span></router-link>
        </div>

        <keep-alive>
            <router-view @changeTab="changeTab" ></router-view>
        </keep-alive>

    </div>

    <div v-else>
        <v-tableSpin v-if="!pageErrorMsg"></v-tableSpin>
        <div class="pageErrorBox" v-else>{{pageErrorMsg}}</div>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    export default {
        data(){
            return{
                tabSwitch: '',
                tabSwitchList: ['survey', 'detail'],

                topLoading:false,
                pageErrorMsg:'',    //请求数据失败时返回的报错信息
                time:'',
                income:''       //总收入
            }
        },
        created(){
            this.tabSwitch = this.tabSwitchList[0]
        },
        computed:{
            ...mapState({
                user_info: state => state.user.user_info ,
            }),
            showPage(){
                return !this.topLoading
            }
        },
        beforeMount(){
            this.getTime()
            this.getIncomeInfo()
        },
        methods:{
            //获取当前时间
            getTime(){
                var timeString =new Date()
                var time = timeString.getHours()
                this.time = time
            },

            getIncomeInfo(){
                var getIncomeHttp=this.getIncomeHttp()
                getIncomeHttp.then(() => {
                }).catch((errorMsg='') => {
                    this.pageErrorMsg=errorMsg
                });
            },
            //获取总收入
            getIncomeHttp(){
                return new Promise((resolve, reject) => {
                    this.topLoading = true
                    this.$http.get('/user')
                        .then((response)=>{
                            const data = response.data
                            const {retCode,retData} = data
                            if(retCode == '0'){
                                this.income = retData.income
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


            changeTab(index ) {
                if (this.tabSwitch != this.tabSwitchList[index]) {
                    this.tabSwitch = this.tabSwitchList[index]
                }
            }
        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
        }
    }
</script>