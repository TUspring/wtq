
<style lang="less">
	.ivu-modal-footer{
		border-top:none;
	}
</style>
<template>
	<div class="demo-spin-col" span="24">
		<Modal
				:scrollable="true"
				v-model="iviewModal"
				:mask-closable="false"
				:title="modal_title"
				@on-cancel="cancel">
			<div slot="header"></div>
			<div slot="close"></div>
			<component v-bind:is="Modal_Info" @close="iviewModal=false" ref="childModal"></component>
			<component :is="$options.components.child"></component>
			<!--<component  v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg"></component>-->
			<div slot="footer"></div>
		</Modal>
	</div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                iviewModal:true,
                modal_title:'222',
                Modal_Info:'',
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
		props:["message"],
        beforeMount(){

            this.Modal_Info=this.message

        },
		methods:{
            closeModal(){

			},
            cancel(){
                console.log(3);
            },
		},
    }
</script>