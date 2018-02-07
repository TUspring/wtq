<style lang="css" scoped>
    .th_text{
        cursor: pointer;
    }
    #main .user_msg-list table tr span{
        border: none;
    }
    .green_text{
        color: #09af48;
    }
</style>
<template>
    <div id="main">
        <div class="content clearfix" >
            <div class="nav-top">
                <a :class="{cur:isHot=='1'}" @click.prev="changeListHot(1)">热门交易策略</a>
                <a :class="{cur:isHot=='0'}" @click.prev="changeListHot(0)">所有策略</a>
            </div>
            <div class="clearfix" v-if="showPage">
            <div class="user_msg-list clearfix">
                <table rules="rows" cellspacing="0" align="right" v-if="listModel.length">
                    <tr class="th_text_top">
                        <th v-for = "(value,index) in msgLists" >
                            <Dropdown trigger="click" placement="bottom" v-if="!value.hideIcon">
                                <th-text :value="value"></th-text>
                                <Dropdown-menu slot="list">
                                    <Dropdown-item @click.native="dropDownSortFirst(value.id)">{{value.name}}从高到低</Dropdown-item>
                                    <Dropdown-item @click.native="dropDownSortLast(value.id)">{{value.name}}从低到高</Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                            <th-text :value="value" v-else></th-text>
                        </th>
                        <th></th>
                    </tr>

                    <tr class="th_text_content" v-for="(value,index) in listModel">
                        <td>
                            <p class="base_information">
                                <router-link :to="{path: '/policyFollowing/'+value.id}">
                                    <img :src="value.picture" alt="">
                                </router-link>
                                {{value.name}}
                            </p>
                        </td>
                        <td>
                            <Rate disabled :value="parseInt(value.recommend_level)"></Rate>
                        </td>
                        <td><span class="green_text">{{value.average_monthly_income}}</span></td>
                        <td>{{value.max_drawdown}}</td>
                        <td>{{value.Sharpe_Ratio}}</td>
                        <td>{{value.Profit_coefficient}}</td>
                        <td>{{value.min_follow_money}}</td>
                        <td>{{value.follow_number}}</td>
                        <td>
                            <!--<span>关注</span>-->
                            <router-link :to="{path: '/policyFollowing/'+value.id}">
                                <span class="follow_btn" v-if="showFollowBtn!=value.is_follow">跟随</span>
                                <span class="alreadyfollow_btn" v-if="showFollowBtn==value.is_follow">已跟随</span>
                            </router-link>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="noList_box" v-if="!listModel.length">暂无数据</div>
            <div class="pageIndex_box"><Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page></div></div>
            </div>
        </div>

  </div>
</template>


<script>
import thText from './components/th_text'
import './css/index.css'
import { mapState } from 'vuex'
    export default {
        data () {
            return {
                isHot:1,
                id:'',
                showPage:false,
                policyList:[],
                showFollowBtn:1,
                dropDownFirstName:'',
                dropDownLastName:'',
                pageIndex:{
                    current_page:1,
                    last_page:null,
                    per_page:null,
                    total:null
                },
                msgLists: [
                {id:'1',name:'基本信息',value:'info',hideIcon:true},
                {id:'2',name:'综合评分',value:'recommend_level',details:'根据交易策略的各项参数指标（包括但不仅<br>限于：月均收益、最大回撤、夏普比率、获<br>利系数、跟随人数、互动活跃等），计算出<br>交易策略的综合评分，满分为5分。'},
                {id:'3',name:'月均收益',value:'average_monthly_income',details:'交易策略每一个自然月的收益率的平均值，<br>不包括当月数据'},
                {id:'4',name:'最大回撤',value:'max_drawdown',details:'计算选定周期内每一个历史时点，往后推移<br>后策略余额走到最低点时发生的亏损的比例。然后取最大值，描述历史出现过的最糟糕的情况，用于衡量跟随后可能会遇到的风险'},
                {id:'5',name:'夏普比率',value:'Sharpe_Ratio',details:'绩效评价标准化指标，可以同时对收益与风<br>险加以考虑。中汇采用每周收益率作为基<br>准进行计算，夏普比率越高越好，夏普比率<br>等于2，表示，每周当中，承受多亏损1%的<br>风险，可能多带来2%的收益。'},
                {id:'6',name:'获利系数',value:'Profit_coefficient',details:'获利交易的利润总额除以亏损交易的损失总<br>额，该系数大于1，策略才能产生净利润。该<br>系数越大，代表同等条件下，该策略的盈利<br>能力和抗风险能力更强。'},
                {id:'7',name:'最低跟随资金',value:'min_follow_money',details:'跟随该策略时，交易员老师建议的最低资金<br>量要求。账户净值低于该资金时，无法使用<br>智能同比。低于该资金进行跟随时，会有较<br>大风险，请慎重考量。'},
                {id:'8',name:'跟随人数',value:'follow_number',details:'跟随该策略的mt4账号数量，包括模拟账号<br>和实盘账号'}
                ]
            }
        },
        components:{
            'th-text':thText
        },
        computed:{
            listModel(){

                if(this.dropDownFirstName==2){
                    return  this.policyList.sort(this.sortBy('recommend_level',false))
                }
                if(this.dropDownLastName==2){
                    return  this.policyList.sort(this.sortBy('recommend_level',true))
                }
            else {
                    return this.policyList
                }

            }
        },
        mounted(){
            const {page=1}=this.$router.currentRoute.query
            this.getPolicyList(page)
        },
        methods: {
            //排序
            sortBy(attr,rev){
                //第二个参数没有传递 默认升序排列
                if(rev ==  undefined){
                    rev = 1;
                }else{
                    rev = (rev) ? 1 : -1;
                }
                return function(a,b){
                    a = a[attr];
                    b = b[attr];
                    if(a < b){
                        return rev * -1;
                    }
                    if(a > b){
                        return rev * 1;
                    }
                    return 0;
                }
            },
            dropDownSortFirst(data){
                this.dropDownFirstName=data
            },
            dropDownSortLast(data){
                this.dropDownLastName=data
            },



            getPolicyList(page=1){
                var getPolicyList=this.getPolicyListHttp(page)
                Promise.all([getPolicyList]).then(()=>{
                    this.showPage=true
                }).catch(()=>{
                    // this.$Modal.error({title:`请求失败`,content:''})
                });
            },
            //分页
            getPolicyListHttp(page=1){
                const ajaxData={
                    page,
                    review_status:1,
                    hot:this.isHot
                }
                return new Promise((resolve, reject)=>{
                    this.showPage=false;
					this.$http.get('/policy',{params:ajaxData})
					  .then((res) => {
					  	const data = res.data
					  	const {retCode,retData={}}=data
                          if(retCode=='0'){
                            var {current_page,last_page,per_page,total,data:list=[]}=retData
					  	    var pageIndexMsg={current_page,last_page,per_page,total}
					  	    if(current_page!='1'&&!list.length){
					  	        this.getPolicyList(--current_page)
					  	        return
					  	    }
					  	    this.policyList=list
                              Object.assign(this.pageIndex,pageIndexMsg)
                              resolve();
					  	}else{
					  	    reject();
					  	}
					  })
					  .catch((error) =>{
					    reject();
					  });
                })
            },
            changePage(page){
                this.getPolicyList(page)
            },
            changeListHot(n){
                this.isHot=n;
                this.getPolicyList(1)
            },
        }
    }
    
</script>