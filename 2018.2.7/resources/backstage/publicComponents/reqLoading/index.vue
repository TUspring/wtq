<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100%;
        position: relative;
    }
    .demo-spin-icon-load{
        color: #FFFFFF;
    }
    .ivu-spin-show-text .ivu-spin-text{
        padding-left: 10px;
    }
    .ivu-spin{
        width: 20px;
        position: relative;
        display: inline-block;
    }
    .ivu-spin-fix{
        background-color: rgba(255,255,255,0);
    }
</style>
<template>
    <Spin fix>
        <Icon type="load-a" size=18 class="demo-spin-icon-load"></Icon>
    </Spin>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted(){},
        beforeMount(){},
        methods: {}
    }


</script>