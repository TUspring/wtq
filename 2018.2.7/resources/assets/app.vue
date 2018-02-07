<style lang="css">

</style>

<template>
    <div id="app_content">
        <Modal  v-model="compontentStatus.loginModal.show" width="630" class-name="ivu-modal-custom ivu-modal-middle" @on-cancel="closeLoginModal" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <v-loginModal v-if="compontentStatus.loginModal.show" @close="closeLoginModal" @forgetPWD="forgetPWD"></v-loginModal>
            <div slot="footer"></div>
        </Modal>
        <Modal  v-model="compontentStatus.resetPWDModal.show" width="630" class-name="ivu-modal-custom ivu-modal-middle" @on-cancel="closeResetPWDModal" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <v-resetPWDModal v-if="compontentStatus.resetPWDModal.show" @close="closeResetPWDModal"></v-resetPWDModal>
            <div slot="footer"></div>
        </Modal>
        <v-header></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
        <Back-top></Back-top>
    </div>
</template>
<script>
import { mapState,mapActions} from 'vuex'
    export default {
        data() {
			return {
			}
		},
        computed:{
            ...mapState({compontentStatus:state => state.components})
        },
        methods:{
            ...mapActions({changeCompontentStatus:'changeCompontentStates'}),
                closeLoginModal(){
                    var data={
                        loginModal:{
                            show:false
                        }
                    }
                    this.changeCompontentStatus(data)
                },
                closeResetPWDModal(status=false){
                    var data={
                        resetPWDModal:{
                            show:status
                        }
                    }
                    this.changeCompontentStatus(data)
                },
                forgetPWD(){
                    this.closeLoginModal()
                    this.closeResetPWDModal(true)
                }
        }
    }
</script>