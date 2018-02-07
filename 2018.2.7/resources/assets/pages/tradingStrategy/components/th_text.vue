<style lang="css" scoped>
    .th_text{
        cursor: pointer;
    }
    #main .user_msg-list .th_text i{
        color: #9a989a;
    }
</style>
<template>
    <div class="th_text">
        {{value.name}}
        <Tooltip :content="value.details">
            <i class="iconfont" v-show = "!value.hideIcon">&#xe622;</i>
            <div slot="content" v-html="value.details"></div>
        </Tooltip>
        <i class="iconfont" v-show = "!value.hideIcon">&#xe628;</i>
    </div>
</template>
<script>
export default {
    props:["value"]
}
</script>
