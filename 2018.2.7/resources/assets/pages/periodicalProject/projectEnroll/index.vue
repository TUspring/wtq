<style lang="css" scoped>


    .project-search-box {
        height: 60px;
        line-height: 60px;
        border-radius: 6px;
        padding-left: 20px;
        background-color: #FFFFFF;
    }

    .ct-list-box {
        margin-top: 30px;
    }

    .list-ul {

    }

    .list-ul .list-li {
        width: 1200px;
        height: 240px;
        border-radius: 6px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
        position: relative;
    }
    .flag-container{
        top: -1px;
        right: -1px;
        width: 150px;
        height: 100px;
        position: absolute;
        overflow: hidden;
    }
    .flag-box{
        top: 0px;
        right: -20px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        padding-left: 40px;
        border-radius: 6px;
        transform: rotate(30deg);
        position: absolute;
        box-shadow: 1px 1px 0px 0px #ffa114;
        background-color: #ffa114;

    }
    .top-box {
        width: 1140px;
        height: 120px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 10px 30px;
        border-bottom: 1px solid rgb(238, 238, 238);
    }

    .top-left-content div {
        float: left;
    }

    .top-left-content .pic-box {
        width: 90px;
        height: 90px;
    }

    .top-left-content .tx-box {
        padding: 20px 0px;
        margin-left: 30px;

    }

    .top-left-content .tx-box p {
        line-height: 30px;
    }

    .top-left-content .tx-box p:nth-child(1) {
        font-size: 16px;
        color: #ffa114;
    }

    .top-left-content .tx-box p:nth-child(2) {
        font-size: 14px;
        color: #999;
    }

    .top-left-content .pic-box img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        display: block;
        background: url("../images/pic_bg_shadow.png") no-repeat;
        background-size: 100% 100%;
        box-shadow: 0px 3px 10px 0px rgba(212, 212, 212, 0.3)
    }

    .top-right-content .btn {
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        color: #ffa114;
        cursor: pointer;
        border: 1px solid #ffa114;
        border-radius: 6px;
        margin-right: 20px;
    }

    .top-right-content .btn:hover {
        background-color: #ffa114;
        color: #FFFFFF;
    }

    .top-right-content .prompt {
        display: inline-block;
        width: 170px;
        font-size: 12px;
        color: #333;
    }

    .below-box {
        height: 120px;
        width: 1200px;
        padding: 30px 0px;
    }

    .below-box-ul {
        display: flex;
    }

    .below-box-ul li {
        height: 80px;
        flex: 1;
        text-align: center;
        border-right: 1px solid rgb(238, 238, 238);
    }

    .below-box-ul li:nth-last-child(1) {
        border-right: none;
    }

    .below-box-ul .num {
        font-size: 16px;
        color: #333;
    }

    .below-box-ul .data-name {
        font-size: 14px;
        color: #999;
        margin-top: 20px;
    }

    .prompt-icon {
        cursor: pointer;
    }

    .ai-page {
        width: 1200px;
        background-color: #fff;
        height: 50px;
        margin: auto;
        line-height: 50px;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        margin-bottom: 30px;
        border-radius: 6px;
    }

    .no_data_content {
        font-size: 18px;
        color: #999;
        line-height: 50px;
        border-radius: 6px;
        margin-bottom: 30px;
        text-align: center;
        background: #fff;
    }

</style>
<template>
    <div id="complete-project">
        <div class="project-content">
            <div class="project-search-box">
                <span>项目类型：</span>
                <Select style="width:200px" placeholder="全部" v-model="searchType" @on-change="search()">
                    <Option  v-for="value in projectTypeList" :value="value.id" :key="value.id">{{value.name}}</Option>
                </Select>
            </div>
            <div class="ct-list-box">
                <ul class="list-ul">
                    <li class="list-li" v-for="item in projectListData">
                       <div class="flag-container">
                           <div class="flag-box">
                               <span v-if="item.project_type==1">保本保息型</span>
                               <span v-if="item.project_type==2">保本型</span>
                               <span v-if="item.project_type==3">普通型</span>
                           </div>
                       </div>
                        <div class="top-box">
                            <div class="top-left-content cl">
                                <div class="pic-box">
                                    <router-link :to="{path:'/periodicalProject/projectDetail/'+item.id}">
                                    <img :src="item.picture ? item.picture :''" alt="">
                                    </router-link>
                                </div>
                                <div class="tx-box">
                                    <router-link :to="{path:'/periodicalProject/projectDetail/'+item.id}">
                                    <p>{{item.name}}</p>
                                    </router-link>
                                    <p>项目封闭期：{{item.start_time | timeStamp}} 至 {{item.period | endTime(item.start_time)}}</p>
                                </div>
                            </div>
                            <div class="top-right-content">
                                <router-link :to="{path:'/periodicalProject/projectDetail/'+item.id}">
                                    <span class="btn" @click="toProjectDetails">报名参与</span>
                                </router-link>
                                <span class="prompt">{{curTime |surplusTime(item.registration_deadline)}}</span>
                                <!--<span class="prompt">24小时48分后停止报名</span>-->
                            </div>
                        </div>
                        <div class="below-box">
                            <ul class="below-box-ul">
                                <li>
                                    <p class="num">{{item.yield ? item.yield +"%":'暂无数据'}}</p>
                                    <p class="data-name">
                                        <span>预期收益率</span>
                                        <Tooltip placement="bottom">
                                            <span><Icon type="help-circled" class="prompt-icon"></Icon></span>
                                            <div slot="content">
                                                根据交易员历史交易记录，交易员事先预估<br>
                                                的收益率。
                                            </div>
                                        </Tooltip>

                                    </p>
                                </li>
                                <li>
                                    <!--force_close_line yield-->
                                    <p class="num">{{item.force_close_line ? item.force_close_line:'暂无数据'}}</p>
                                    <p class="data-name">
                                        <span>净值强平线</span>
                                        <Tooltip placement="bottom">
                                            <span><Icon type="help-circled" class="prompt-icon"></Icon></span>
                                            <div slot="content">
                                                项目的最大亏损比例，当亏损比例达到该值<br>
                                                之时将提前结束该项目。<br>
                                            </div>
                                        </Tooltip>

                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.trader_royalty_rate ? item.trader_royalty_rate +"%" :
                                        '暂无数据'}}</p>
                                    <p class="data-name">
                                        <span>利润提成比例</span>
                                        <Tooltip placement="bottom">
                                            <span><Icon type="help-circled" class="prompt-icon"></Icon></span>
                                            <div slot="content">
                                                项目结束后，交易员需从项目所有盈利资金<br>
                                                中抽取的分成比例。
                                            </div>
                                        </Tooltip>

                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.min_follow_money ? "$"+item .min_follow_money : '暂无数据'}}</p>
                                    <p class="data-name">
                                        <span>最小参与资金</span>
                                        <Tooltip placement="bottom">
                                            <span><Icon type="help-circled" class="prompt-icon"></Icon></span>
                                            <div slot="content">
                                                参与项目所需要的最小资金额，参与账号的<br>
                                                账户净值低于该资金时，无法参与项目。
                                            </div>
                                        </Tooltip>

                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.participation_count ? item.participation_count :'暂无数据'}}</p>
                                    <p class="data-name">
                                        <span>参与人数</span>
                                        <Tooltip placement="bottom">
                                            <span><Icon type="help-circled" class="prompt-icon"></Icon></span>
                                            <div slot="content">
                                                实际参与项目实际的总人数<br>
                                            </div>
                                        </Tooltip>

                                    </p>
                                </li>
                                <li>
                                    <p class="num">{{item.money_count ? "$"+ item.money_count :'暂无数据'}}</p>
                                    <p class="data-name">
                                        <span>总参与资金</span>
                                        <Tooltip placement="bottom">
                                            <span><Icon type="help-circled" class="prompt-icon"></Icon></span>
                                            <div slot="content">
                                                所有参与者的参与资金的总和。<br>
                                            </div>
                                        </Tooltip>

                                    </p>
                                </li>
                            </ul>
                            <v-tableSpin v-show="loading"></v-tableSpin>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="projectListData==''&&!loading" class="no_data_content">暂无数据！</div>
            <div class="ai-page cl">
                <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage"
                      :total="pageIndex.total" :show-total="false"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                curTime: new Date(),
                loading: false,
                pageIndex: {
                    current_page: 1,
                    last_page: null,
                    per_page: null,
                    total: null
                },
                projectTypeData: [
                    {name: '全部', id: ''},
                    {name: '保本保息型', id: '1'},
                    {name: '保本型', id: '2'},
                    {name: '普通型', id: '3'},
                ],
                projectListData: '',
                searchType: '',
            }
        },


        computed: {
            projectTypeList(){
                return this.projectTypeData
            }
        },
        filters: {
            timeStamp(value){
                return new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss")
            },
            endTime(value,end){
                var totalTime=end + value*24*60*60
                return new Date(totalTime * 1000).format("yyyy-MM-dd hh:mm:ss")
            },
            //剩余时间处理
            surplusTime(cur, value){
                var surplus_time = parseInt(value *1000 - cur)
                var d=Math.floor(surplus_time/86400000)
                var h=Math.floor(surplus_time/3600000)%24
                var m=Math.floor(surplus_time/60000)%60
                if(h<10)h="0"+h
                if(m<10)m="0"+m
                if((surplus_time/86400000)>1){
                    return  d+"天 "+h+"小时 "+m+"分后停止报名"
                }
                if((surplus_time/86400000)<1&&(surplus_time/86400000)>0){
                    return  h+"小时 "+m+"分后停止报名"
                }

                if(surplus_time<0){
                    return "报名已截止"
                }

//                var d = new Date(surplus_time).format("dd")
//                var h = new Date(surplus_time).format("hh")
//                var m = new Date(surplus_time).format("mm")
//                switch (d, h, m) {
//                    case d == 0 && h != 0:
//                        return h + "时" + m + "分";
//                        break;
//                    case d == 0 && h == 0:
//                        return m + "分";
//                        break;
//                    default:
//                        return d + "天" + h + "时" + m + "分"
//                }
            },
        },
        mounted(){
            var _this = this
            this.timer = setInterval(function () {
                _this.curTime = new Date().getTime()
            }, 60000)
        },
        beforeDestroy(){
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        beforeMount(){
            this.getProjectList()
        },
        methods: {

            getProjectList(page = 1){
                const ajaxData = {
                    page,
                    project_type: this.searchType,
                    review_status: 1,
                }
                return new Promise((resolve, reject) => {
                    this.loading = true
                    this.$http.get('regular_project', {params: ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode, retData = {}}=data
                            if (retCode == '0') {
                                var {current_page, last_page, per_page, total, data:list = []}=retData
                                var pageIndexMsg = {current_page, last_page, per_page, total}
                                if (current_page != '1' && !list.length) {
                                    this.getProjectList(--current_page)
                                    return
                                }
                                this.projectListData = list
                                Object.assign(this.pageIndex, pageIndexMsg)
                                this.loading = false
                                resolve();
                            } else {
                                reject();
                            }
                        })
                        .catch((error) => {
                            reject();
                        });
                })
            },
            search(){
                this.getProjectList()
            },
            toProjectDetails(){

            },

            changePage(page){
                this.getProjectList(page)
            },

//            regular_project/user_list
        },

    }

</script>
