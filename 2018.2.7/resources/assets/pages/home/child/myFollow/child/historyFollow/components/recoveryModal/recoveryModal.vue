<style lang="css" scoped src="./css/recoveryModal.css">

</style>
<style>
    #progress_content .ivu-progress-bg {
        background-color:#FFA113
    }
</style>

<template>
    <div class="stopModal cl">
        <!--stopModal-->
        <div class="stop">
            <div class="modal-top">
                <span>恢复跟随</span>
                <span @click="close" class="iconfont" v-show="close_icon">&#xe63c;</span>
            </div>
            <div class="modal-content">
                <div class="explain">
                    <p>恢复跟随之后，将继续跟随老师的新订单</p>
                    <p>正在进行的订单，将继续跟随老师的平仓信号</p>
                    <span>如有需要，您可以随时在手机或电脑上登录MT4账号，自行进行平仓操作</span>
                </div>
            </div>
            <div class="btn-content" v-show="stop_btn">
                <button id="stop" @click="stop">立即恢复</button>
                <button id="cancel" @click="close">取消</button>
            </div>
            <!--进度条-->
            <div class="progress_content" id="progress_content"  v-show="show_stopProgress">
                <Progress :percent="val" status="active" ></Progress>
            </div>
            <!--暂停成功按钮-->
            <div class="successBtn" v-show="show_successBtn" @click="stopSuccess">已恢复成功</div>
        </div>


    </div>
</template>
<script>
    export default {
        data () {
            return {
                close_icon: true,
                stop_btn: true,
                show_stopProgress:false,
                show_successBtn: false,
                followingMsg: {
                    id: '',

                },
                val:0
            }
        },
        beforeMount() {
            this.followingMsg.id = this.modalData.id.id
        },
        methods: {
            //加载进度
            scrollTime(){
                const httpName = "恢复跟随"
                this.show_stopProgress = true
                let step = Math.floor(Math.random() * 10 + 1);
                let timer = setInterval(() => {
                    this.val = this.val + step;
                    if (this.val >= 100) {
                        this.val = 100;
                        clearInterval(timer);
                        this.$Message.success({content: `${httpName}成功`})
                        this.show_stopProgress = false
                        this.show_successBtn = true
                        return
                    }
                }, 200)
            },

            close(){
                this.$emit('close')
            },
            stopSuccess () {
                this.Recovery()
            },
            Recovery(){
                this.$emit("Recovery")
                this.close()
            },
            stop() {
                const ajaxData = {
                    id:this.followingMsg.id,
                    suspend:2
                }
                const httpName = "恢复跟随"
                this.$http.put('policyFollowing/recovery_follow',ajaxData,{timeout:30000})
                    .then((response) => {
                    const data = response.data
                    const {retCode,sucCode} = data
                    if (retCode == '0') {
                        this.close_icon = false
                        this.stop_btn = false
                        this.scrollTime()
                    }
                })
                .catch((error) =>{
                        this.$Modal.error({title:`${httpName}失败`,content:this.util.getHttpText(error)})
                });
            }
        },
        props: ['id','modalData']
    }
</script>