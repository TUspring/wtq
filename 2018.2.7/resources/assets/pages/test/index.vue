<style>
.c3-filters{
 margin-left: 100px;
}
.normal{
    -webkit-filter:grayscale(1);
}

</style>
<template>
    <div id="home">
        <!--<v-shareModal v-if="iviewModal"  :message="curModal.name" v-bind:is="curModal.name"></v-shareModal>-->
        <v-shareModal v-if="iviewModal"  :message="testModal"></v-shareModal>

        <p @click="showModal('test')">点击弹出模态框</p>
        <p></p>
        <!--<div @click="renderFunc">Notice</div>-->
        <Button type="primary" @click="renderFunc">Open notice</Button>


       <div class="c3-filters">
           <img class="normal" title="normal" width="128" height="128" alt="HTML5 Logo" src="http://www.w3cplus.com/sites/default/files/filter.jpg" />
       </div>

        <DatePicker type="datetime" format="yyyy-MM-dd 00:00:00" placeholder="选择时间" style="width: 200px"  :disabled="true"></DatePicker>

        <DatePicker type="date" placeholder="Select date" format="yyyy-MM-dd 00:00:00" style="width: 200px"></DatePicker>

        <v-reqLoading></v-reqLoading>
    </div>
</template>
<script>

import testModal from './components/deleteModal/index.vue'
    export default {
    components:{
        testModal,
    },
        data () {
            return {

                modalMsg: {},
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    test: {
                        name: 'testModal',
                        width: ''
                    },
                },
            }
        },
        mounted(){

        },

        beforeMount(){
        },
        methods: {

            renderFunc () {
                this.$Notice.success({
                    title: 'Notification title',
                    desc: 'The desc will hide when you set render.',
                    render: h => {
                        return h('span', [
                            'This is created by ',
                            h('a', 'render'),
                            ' function'
                        ])
                    }
                });
            },

            showModal(name,data={}){
                console.log(this.$refs.childModal);
                const modalList=this.modalList
                console.log(this.modalList);
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },
        }
    }


</script>
