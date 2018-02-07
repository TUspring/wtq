<style lang="less" scoped src="./css/index.less"></style>
<template>
    <div class="clientLink">

        <div :class="['link-item',{'cur':value.id==curId}]" style="width: 100%;" v-for="(value,index) in customerLink">
            <div class="link-tail">
                <Icon type="ios-arrow-thin-down"></Icon>
            </div>
            <div class="link-head">
                <div class="link-head-inner">
                    <div class="head-portrai-box">
                        <img :src="value.avatar" v-if="value.avatar">
                        <Icon type="person" size="24" v-else></Icon>
                    </div>
                </div>
            </div>
            <div class="link-main">
                <div class="link-title" @click.stop="stickCustome(value.id)">{{value.real_name?value.real_name:value.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                showimg: false,
                ivewModal: false
            }
        },
        methods: {
            stickCustome(id){
                this.$emit("stickCustome",{id:id})
            }

        },
        props: ["customerLink","curId"]
    }
</script>