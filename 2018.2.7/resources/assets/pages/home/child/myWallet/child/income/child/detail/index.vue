<style lang="less" scoped>
    .list_box {
        border-radius: 6px;
        background:#fff;
        padding:30px 30px 0 30px;
    }
    .time_content {
        float:left;

        .endTime {
            display: inline-block;
            width:150px;
            height:32px;
            line-height: 32px;
            border-radius: 6px;
            border:1px solid #dddee1;
            font-size:12px;
            color:#BBBEC4;
            padding:0 10px;

            .timeIco {
                font-size: 16px;
                color:#80848F;
                float:right;
                margin-top:5px;
           }
        }
    }

    .search_input {
        float:right;
        width: 239px;
        height:32px;
        line-height: 32px;
        border-radius: 6px;
        border:1px solid #dddee1;
        padding: 0 10px;
        margin-right:20px;

        .input {
            border:none;
            height:32px;
            background:none;
        }
        .searchIco {
            float:right;
            font-size: 24px;
            color:#dddee1;
            cursor:pointer;
            margin-top:5px;
        }
        .searchIco:hover{
            color:#666666;
        }

    }
    .import {
        float:left;
        width: 81px;
        height:32px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: rgb( 153, 153, 153 );
        border-radius: 6px;
        cursor:pointer;
        margin-right:10px;
        background-color: rgb( 238, 238, 238 );
    }
    .import:hover {
        background:#D9D9D9;
    }

        /*列表*/
    .list_header {
        display: flex;
        width:100%;
        height: 41px;
        line-height: 41px;
        margin-top:30px;
        border-radius: 6px;
        background-color: rgb( 245, 245, 245 );
    }

    .list_header li {
        flex: 1;
        font-size: 14px;
        color: rgb( 102, 102, 102 );
        text-align: center;
        float:left;
    }
    .list_detail {
        display: flex;
        width: 100%;
        border-bottom: 1px solid rgb(238, 238, 238);
    }
    .list_detail:last-of-type {
        border-bottom: none
    }
    .list_detail li {
        flex: 1;
        height:79px;
        line-height:79px;
        text-align: center;
        float:left;
    }
   .no_data {
       height:60px;
       line-height: 60px;
       text-align: center;
       font-size:16px;
   }

</style>

<template>
    <div class="detail_content">
        <div class="list_box">
            <!--1、搜索-->
            <div class="search_content cl">
                <div class="import" @click="Import">导出</div>
                <div class="time_content cl">
                    <DatePicker type="date"  placeholder="选择平仓时间" style="width: 150px"  v-model="startTime"  @on-change="startTime=$event" @on-open-change="handleOk" ></DatePicker>
                    至
                    <DatePicker type="date"  placeholder="选择平仓时间" style="width: 150px"  v-model="endTime"   @on-change="endTime=$event" @on-open-change="handleOk" ></DatePicker>
                </div>
                <div class="search_input cl">
                    <input type="text" class="input" placeholder="请输入客户姓名/手机号" v-model="search_val" @keyup.enter="submit">
                    <Icon type="ios-search" class="searchIco" @click.native="searchSubmit"></Icon>
                </div>
                <!--<Select style="width:120px;margin-right: 8px;float:right;" placeholder="请选择搜索类型" v-model="search_key">-->
                    <!--<Option v-for="item in optionList":value="item.type" :key="item.type">{{item.name}}</Option>-->
                <!--</Select>-->
            </div>

            <!--2、列表-->
            <div class="list_content">
                <ul class="list_header cl">
                    <li>订单号</li>
                    <li>客户昵称</li>
                    <li>手机号码</li>
                    <li>平仓时间</li>
                    <li>收入类型</li>
                    <li>收入金额($)</li>
                </ul>
                <ul class="list_detail cl" v-for="value in listModal"  v-if="listModal.length && !loading">
                    <li>{{value.Ticket}}</li>
                    <li>{{value.belong_user.name}}</li>
                    <li>{{value.belong_user.phone}}</li>
                    <li>{{timeType(value.close_time)}}</li>
                    <li>{{value.brokerage_type}}</li>
                    <li>{{value.brokerage_money}}</li>
                </ul>
                <!--=======加载中=====-->
                <v-tableSpin v-show="loading"></v-tableSpin>
            </div>
            <!--暂无数据-->
            <div class="no_data" v-if="!listModal.length && !loading">暂无数据 ！</div>
        </div>
        <!--分页-->
        <div class="pageIndex_box">
            <Page :current="pageIndex.current_page" @on-change="changePage" class-name="defaultPage" :total="pageIndex.total" :show-total="false"></Page>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                loading:false,
                pageIndex: {
                    current_page: 1,
                    last_page: 1,
                    per_page: null,
                    total: 1
                },

                //搜索
                startTime:'',     //开始时间格式
                endTime:'',       //结束时间格式
                searchTimeData:{
                    close_time_start:'',     //开始时间格式
                    close_time_end:''       //结束时间格式
                },
                search_key:'',
                search_val:'',
                searchKey:{
                    search_key:'',
                    search_val:''
                },
                optionList:[
                    {name:'客户名称',type:'name'},
                    {name:'手机号码',type:'phone'}
                ],
                incomDetailList: ''      //返回数据
            }
        },
        computed:{
            listModal(){
                return this.incomDetailList
            }
        },
        beforeMount(){
            this.getIncomDetailList()
        },
        methods:{

            //时间戳转时间格式
            timeType (dateString) {
                if(dateString!=false&&dateString!=''){
                    return new Date(dateString*1000).format("yyyy-MM-dd hh:mm:ss")
                }else{
                    return '-'
                }
            },

            //导出
            Import(){
                window.location.href=window.location.origin+'/brokerage/income?export=1'    //相对路径

            },

            //时间格式转时间戳
            changeTimeType(value){
                return Date.parse(new Date(value))/1000;
            },

            handleOk(){
                if(this.startTime&&this.endTime){
                    this.searchTime()
                }else {
                    return
                }
            },
            //根据开始结束时间搜索
            searchTime(){
                this.searchKey = null
                this.searchTimeData = {
                    close_time_start:this.changeTimeType(this.startTime)-(8*3600),
                    close_time_end:this.changeTimeType(this.endTime)+(24*3600)-(8*3600)
                }
                this.getIncomDetailList(1)
            },
            //键盘事件
            submit(){
                this.searchSubmit()
            },
            //搜索客户名称/手机号
            searchSubmit(){
                this.searchTimeData = null
                this.searchKey = {
                    search_key:this.search_key,
                    search_val:this.search_val
                }
                this.getIncomDetailList(1)
            },


            //获取收入明细列表
            getIncomDetailList(page=1){
                this.loading = true
                var ajaxData = {
                    page
                }
                ajaxData = Object.assign(ajaxData,this.searchKey,this.searchTimeData)
                this.$http.get('brokerage/income',{params:ajaxData})
                    .then((response)=>{
                        const data = response.data
                        const {retCode,retData} = data
                        if(retCode == '0'){
                            var {current_page,last_page,per_page,total,data:list}=retData
                            var pageIndexMsg={current_page,last_page,per_page,total}
                            if(current_page!='1'&&!list.length){
                                this.getIncomDetailList(--current_page)
                            }
                            Object.assign(this.pageIndex,pageIndexMsg)
                            this.incomDetailList = list
                            this.loading = false
                        }
                    })
            },
            //分页
            changePage(page){
                this.getIncomDetailList(page)
            }

        },
        activated(){
            this.$emit("changeTab",1)//切换局部导航
        }
    }
</script>