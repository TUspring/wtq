<style scoped src="./css/register_fist_content.css">

</style>
<style lang="less">
	#test_content{
		background: #fff;
	}
	#test_content{
		.userStepBox{
			width: 150px;
			margin: 20px auto;
			.ivu-steps-title:hover{
				color: #666;
				cursor: pointer;
			}
			.ivu-steps-icon{
				cursor: pointer;
			}
		}
		.userStepBox2{
			width: 150px;
			max-height: 1000px;
			margin-left: 50px;
		}
	}
</style>
<template>
	<div id="test_content">
		<!--弹窗-->
		<Modal v-model="ivewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle">
			<div slot="header"></div>
			<div slot="close"></div>
			<component v-if="ivewModal" v-bind:is="curModal.name" @close="ivewModal=false" @event="event">
				<!-- 组件在 vm.currentview 变化时改变！ -->
			</component>
			<div slot="footer"></div>
		</Modal>

		<div class="register_bottom">
			<Button @click="showModal('a')">弹窗1</Button>
			<Button @click="showModal('b')">弹窗</Button>
			<Button @click="showModal('c')">弹窗3</Button>
			<Button @click="testModal()">弹窗3</Button>
		</div>
		<div class="userStepBox">
			<Steps :current="3" direction="vertical">
				<Step icon="person" status="wait" title="用户2" @click="stepclick()"></Step>
				<Step icon="person" status="wait" title="用户2"></Step>
				<Step icon="person" status="process" title="用户3"></Step>
				<Step icon="person" status="wait" title="用户4"></Step>
				<Step icon="person" status="wait" title="用户5"></Step>
				<Step icon="person" status="wait" title="用户6"></Step>
				<Step icon="person" status="wait" title="用户4"></Step>
				<Step icon="person" status="wait" title="用户5"></Step>
				<Step icon="person" status="wait" title="用户6"></Step>
			</Steps>
		</div>
		<div class="userStepBox2">
			<clientLink></clientLink>
		</div>
	</div>
</template>
<script>
	import modal1 from './compontents/modal1'
	import modal2 from './compontents/modal2'
	import modal3 from './compontents/modal3'
    import clientLink from './compontents/clientLink'
    export default {
      	components: {
    		'modal1': modal1,
    		'modal2': modal2,
    		'modal3': modal3,
			'clientLink':clientLink
  		},
    	data(){
    		return {
    		    showimg:false,
				ivewModal:false,
				curModal:{
					name:'',
					width:''
				},
    			agreementCheckbox:false,
    			modalList:{
					a:{
						name:'modal1',
						width:600
					},
					b:{
						name:'modal2',
						width:400
					},
					c:{
						name:'modal3',
						width:600
					}
				}
    		}
    	},
		computed:{
		},

    	beforeMount(){
            new Promise((resolve, reject)=>{
                this.showPage=false;
                this.$http.get('https://news.jin10.com/datas/index/p657.json?v=1514542159292', {params: {},headers:{"sn":"201021622343"}})
                    .then((response) => {
                        const data = response.data

                    })
                    .catch((error) =>{
                        reject();
                    });
            })
    	},
        methods:{
            stepclick(){
              console.log(11)
			},
        	showModal(name){
        	    this.showimg=!this.showimg
				const modalList=this.modalList
				this.curModal=modalList[name],
				this.ivewModal=true
        	},
            event(obj){
        	    return
        	    const compontent={
        	        modal1:{
        	            click:function (data) {
                        }
					}
				}
				const {name,event,data}=obj
                compontent.name.event(data)
                this.$emit("event",{
                    name:'modal1',
                    event:"click",
                    data:{}
                })
			},
			testModal(){
				this.$Modal.success({title:'成功',content:'成功信息'})
			}
        }
    }
</script>