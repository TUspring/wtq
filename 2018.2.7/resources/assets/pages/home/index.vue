<style lang="css">

</style>
<template>
    <div class="box" v-if="showPage">
        <div class="content clearfix" style="width:1200px;margin:0 auto;">
            <leftNav :curlink="curLink"></leftNav>
            <router-view @changeCurLink="changeCurLink"></router-view>
        </div>
    </div>
</template>
<script>
    import leftNav from './components/leftNav/index.vue'
    import { mapState,mapActions } from 'vuex'
    import {USER_SETINFO} from 'store/user'
    export default {
        data () {
            return {
                showPage:false,
                curLink:null,
                MT4List:{}
            }
        },
        components: {
            leftNav,
        },
        computed: {
            ...mapState({compontentStatus: state => state.components})
        },
        beforeMount(){
            var getUserInfo=this.getUserInfo()
            getUserInfo.then(()=>{
                this.showPage=true;
            })
        },
        methods: {
            ...mapActions([USER_SETINFO]),

            changeCurLink(data){
                this.curLink=data
            },
        	//获取用户信息
        	getUserInfo(){
        	    return new Promise((resolve, reject)=>{
        	        this.showPage=false;
                    this.$http.get('/user')
					  .then((response) => {
					  	const data = response.data
					  	const {retCode,retData}=data
					  	if(retCode=='0'){
        				    this.USER_SETINFO(retData)
        				    resolve();
					  	}else{
					  	    reject();
					  	}
					  })
					  .catch((error) =>{
					    reject();
					  });
        	    })
        	},
        }
    }
</script>