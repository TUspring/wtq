<style lang="less" scoped src="./css/index.less"></style>
<template>
    <div class="customer-item">
        <span class="hideboderline hideboderline-top"></span>
        <span class="hideboderline hideboderline-mid"></span>
        <span class="hideboderline hideboderline-bottom"></span>
        <div class="customer-item-content cl">
            <div class="customer-item-content-block">
                <div class="head-portrait">
                    <img alt="" :src="customer.users.avatar" v-if="customer.users.avatar">
                    <Icon type="person" size="30" v-else></Icon>
                </div>
                <Icon :class="['statusIcon',{'open-arrow':open,'close-arrow':!open}]" :type="open?'ios-arrow-down':'ios-arrow-right'" @click.native="changeOpenStatus()" v-if="canOpen&&(!loading)"></Icon>
                <Spin class="loadingChildSpin" fix v-if="loading">
                    <Icon type="load-c" size='20' class="demo-spin-icon-load"></Icon>
                </Spin>
                <!--<Spin class="loadingChildSpin"></Spin>-->
        </div>
            <div class="customer-item-content-block">
                <span class="right-border"></span>
                <div class="middle-content levelContent">
                    <div style="width: 53px">
                        <span class="content-title">等级</span><br>
                        <span>{{customer.users.level&&String(customer.users.level.id)!=0?customer.users.level.name:'客户'}}</span>
                    </div>
                </div>
            </div>
            <div class="customer-item-content-block">
                <span class="right-border"></span>
                <div class="middle-content">
                    <div style="width: 116px">
                    <span class="content-title">姓名</span><br>
                    <span>{{customer.users.real_name||'（未实名）'}}</span>
                    </div>
                </div>
            </div>
            <div class="customer-item-content-block">
                <span class="right-border"></span>
                <div class="middle-content">
                    <div style="width: 152px">
                    <span class="content-title">电话</span><br>
                    <span>{{customer.users.phone||'&nbsp;'}}</span>
                    </div>
                </div>
            </div>
            <div class="customer-item-content-block">
                <span class="right-border"></span>
                <!--<div class="middle-content personHand-content">-->
                <div class="middle-content personHand-content" style="padding-left: 0">
                    <!--<div style="width: 85px">-->
                    <div style="width: auto">
                    <span class="content-title">个人手数</span><br>
                    <span>{{customer.lots_count.lots!==undefined?customer.lots_count.lots:'&nbsp;'}}</span>
                    </div>
                </div>
                <!--<div class="middle-content chartsIcon">-->
                    <!--<img src="./images/chartsIcon.jpg" alt="">-->
                <!--</div>-->
            </div>
            <div class="customer-item-content-block">
                <span class="right-border"></span>
                <!--<div class="middle-content teamHand-content">-->
                <div class="middle-content teamHand-content" style="padding-left: 0">
                    <!--<div style="width: 85px">-->
                    <div style="width: auto">
                    <span class="content-title">团队手数</span><br>
                        <span>{{customer.lots_count.team_lots!==undefined?customer.lots_count.team_lots:'&nbsp;'}}</span>
                    </div>
                </div>
                <!--<div class="middle-content chartsIcon">-->
                    <!--<img src="./images/chartsIcon.jpg" alt="">-->
                <!--</div>-->
            </div>
        </div>
        <!--<transition name="fold">-->
        <v-FoldTransition>
        <div :class="['customer-item-child-box','cl',{'sildeHidden':false}]" v-if="canOpen" v-show="open">
        <div class="customer-item-child">
            <customerItem v-if="index<showCount" v-for="(value,index) in customer.sons" :key="value.id" :customer="value" :loadingChild="loadingChild" @stickCustome="stickCustome" @changeLoadingChildStatus="changeLoadingChildStatus"></customerItem>
        </div>
            <div class="loadingMore_box" @click="addShowCount" v-if="canLoadingMore">......</div>
        </div>
        </v-FoldTransition>
    </div>
</template>

<script>
    export default {
        name: 'customerItem',
        data(){
            return {
                open:false,
                loading:false,
                noChild:false,
                showCount:20,
                addShowNum:10
            }
        },
        computed:{
            canLoadingMore(){
                return this.customer.sons&&(this.customer.sons.length>this.showCount)
            },
            canOpen(){
                return ((this.customer.customer_no>0)||(this.isLowestChild&&!this.loadingChild))&&!this.noChild
            },
            isLowestChild(){
                return this.customer.customer_no>0&&this.util.getType(this.customer.sons)==='undefined'
            }
        },
        props: ['customer','loadingChild'],
        methods:{
            addShowCount(){
                if(this.canLoadingMore){
                    this.showCount+=this.addShowNum
                }
            },
            changeOpenStatus(){
                if(this.isLowestChild){
                    if(this.loadingChild){
                        return
                    }
                    console.log(this.customer)
                    this.getCustomerList({id:this.customer.users_id})
                }else{
                    this.open=!this.open
                }
            },
            stickCustome(data){
                this.$emit('stickCustome',data)
            },
            changeLoadingChildStatus:function (bool) {
                this.$emit('changeLoadingChildStatus',bool)
            },
            getCustomerList(data={}){
                var getCustomerList=this.getCustomerListHttp(data)
                Promise.all([getCustomerList]).then((data) => {
                    var customer=data[0]
                    if(customer.customer_no>0){
                        this.stickCustome(customer)
                    }else{
                        this.noChild=true
                    }
                    this.changeLoadingChildStatus(false)
                    this.loading=false

                }).catch(() => {
                    this.changeLoadingChildStatus(false)
                    this.loading=false
                });
            },

            getCustomerListHttp(data){
                const ajaxData=data
                this.changeLoadingChildStatus(true)
                this.loading=true
                return new Promise((resolve, reject) => {
                    this.$http.get('customer/team',{params:ajaxData})
                        .then((res) => {
                            const data = res.data
                            const {retCode,retData={}}=data
                            if(retCode == '0'){
                                if(!retData.users_id){
                                    reject()
                                }else{
                                    resolve(retData)
                                }
                            }else{
                                reject()
                            }
                        }).catch((error) =>{
                        reject()
                    });

                })
            }
        }
    }
</script>