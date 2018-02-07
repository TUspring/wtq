<style lang="css"></style>

<template>
    <div class="box cl">
        <leftNav :curlink="curLink" :dataId="dataId"></leftNav>
        <router-view @changeCurLink="changeCurLink"></router-view>
    </div>
</template>

<script>
    import leftNav from './component/leftNav/index.vue'
    import { mapState,mapActions } from 'vuex'
    export default {
        components: {
            leftNav
        },
        data() {
            return {
                dataId:'',
                curLink:null
            }
        },
        beforeMount(){
            this.dataId=JSON.parse(this.$route.query.data)
        },
        methods: {
            changeCurLink(data){
                this.curLink=data
            }
        }
    }
</script>