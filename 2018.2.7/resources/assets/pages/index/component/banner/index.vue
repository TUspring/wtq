<style lang="css" scoped src="./css/index.css"></style>
<template>
    <div class="picture_roll_content cl">
        <div class="pre"  @click="pre"><img src="./images/pre.png" alt=""></div>
        <div class="next" @click="next"><img src="./images/next.png" alt=""></div>

        <div class="picture_box cl">
            <ul id="trader_list" class="cl" ref="rool" :style="{left:left+'px',position:position}">
                <li v-for="value in traderList">
                    <div class="list_item">
                        <div class="picture_content">
                            <img :src="value.img" alt="">
                        </div>
                        <div class="describe_content">
                            <div class="trader_name">
                                {{value.name}}
                            </div>
                            <span>
                                {{value.describe}}
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                autoPlayInval:null,
                left: "0",
                position: "relative",
                delay: 5,
                traderList: [
                    {img:'./images/dealer1.png',name:'魔尊重楼',describe:'10年以上外汇实盘交易经验，擅长趋势、波段交易，对市场环境，世界经济变化以及波段的强弱推理有深刻的见解'},
                    {img:'./images/dealer2.png',name:'黑豹',describe:'以趋势波段为主要交易方式，结合基本面的分析推测，相对高收益的策略创造者'},
                    {img:'./images/dealer3.png',name:'狙击手2007',describe:'严谨的波段间距与仓位需求设定的稳定收益交易策略，使交易风险可控且收益稳步增长'},
                    {img:'./images/dealer4.png',name:'步步为赢',describe:'通过分段操作，用稳健的手法将盈利早早锁入收入囊中，是真正有勇有谋的交易员'},
                    {img:'./images/dealer5.png',name:'十字星光',describe:'十分擅长做顺势交易，很稳健，而且交易员是分段操作，盈利一单再下一单追加利润'}
                ]
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.autoPlay()

            })
        },
        methods: {
            pre() {
                this.delay = 5
                var left = this.left
                var len = this.traderList.length
                if(left > (-(len-4)*260)) {
                    left -= 260
                    this.left = left
                }else {
                    this.left = left
                    return
                }
            },
            next() {
                this.delay = 5
                var left = parseInt(this.left)
                if(left < 0) {
                    left += 260
                    this.left = left
                }else {
                    left = 0
                    this.left = left
                    return
                }
            },
            //自动轮播
            autoPlay () {
                this.autoPlayInval=this.util.interval(() => {
                    this.delay--
                    if( this.delay <= 0 ) {
                        this.pre()
                    }
                },1000)
            }
        },
        beforeDestroy(){
            this.autoPlayInval.clear()
        }
    }
</script>