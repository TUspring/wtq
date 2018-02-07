
<style>
    .formatModal_box {
        width: 800px;
        height: 500px;
        padding-bottom: 30px;
        box-shadow: 0px 0px 20px 3px rgba(51, 51, 51, .8);
        background: #fff;
        position: relative;
    }
    .formatModal_box img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .close{
        top:-30px;
        right: -20px;
        font-size: 20px;
        cursor: pointer;
        color: #FFFFFF;
        position: absolute;
    }
    .close:hover{
      color: rgb( 53, 155, 249 );
    }

</style>
<template>
    <div class="formatModal_box">
        <span class="close" @click="close"><Icon type="close-round"></Icon></span>
        <img :src="picUrl" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props:['modalMsg'],
        beforeMount(){
            this.picUrl=this.modalMsg.picPath
        },
        methods: {

            close () {
                this.$emit('close')
            },
        }
    }
</script>