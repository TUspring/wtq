<style lang="css">
    .left_nav {
        width:150px;
        height:500px;
        background:#FFAD33;
        margin-left:20px;
        margin-top:10px;
        padding-top:10px;
        float:left;
    }
    .left_nav li {
        text-align:center;
        padding:10px 0;
        background:#fff;
        margin:10px;
        border:1px solid #fff;
        border-radius:6px;
    }
    .left_nav li:hover {
        color:#fff;
        background:#FFAD33
    }
    .left_nav a {
        color:#999;
        font-size:16px;
    }
    .left_nav .current {
        color:#fff;
        background:#FFAD33
    }
</style>

<template>
   <div>
       <div class="left_nav">
           <ul>
               <router-link to="/MT4Trading/followTrade">
                   <li :class="{current: cur=='followTrade'}">跟随交易</li>
               </router-link>
               <!--<router-link to="/MT4Trading/independentTrade">-->
                   <!--<li :class="{current: cur=='independentTrade'}">自主交易</li>-->
               <!--</router-link>-->
           </ul>
       </div>
   </div>
</template>
<script>
    export default{
        data(){
            return{
                cur:this.curlink,
                followTrade:true,
                independentTrade:false,
                detailId:''
            }
        },
        watch:{
            curlink(value){
                this.cur=value
            }
        },
        beforeMount(){
            this.detailId = +this.dataId
            console.log('子组件leftNav中的id==='+this.detailId);
        },
        methods:{

        },
        props:["curlink","dataId"]
    }
</script>