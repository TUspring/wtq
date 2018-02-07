

<style lang="css" scoped>
    .layout-content-main{
        padding: 20px;
    }


    .info_Exp_content  .addNews {
        width:80px;
        height:30px;
        line-height:30px;
        text-align:center;
        color:#fff;
        font-size:14px;
        border-radius:4px;
        background: #ffa114;
        margin-top: 20px;
        cursor:pointer;
    }
    .info_Exp_content  .addNews:hover{
        background-color: rgba(255,161,20,.8);
    }

    .information_content{
        margin-top: 20px;
        background-color: #fff;
    }
    .news_list{
        width:100%;
        border:1px solid #D4D4D4;
        border-collapse:collapse;
    }
    .news_list th {
        height:50px;
        font-size:14px;
        color:#666666;
        background:#F5F7F9;
        border:1px solid #D4D4D4;
        border-collapse: collapse;
    }
    .news_list td {
        height:70px;
        font-size:14px;
        color:#666666;
        text-align:center;
        background-color: #fff;
        border: 1px solid #D4D4D4;
        border-collapse: collapse;
    }

    .info-btn span:nth-child(1){
        margin-right: 20px;
    }
    .news-btn  .details-btn{
        width: 70px;
        color: #666666;
        border:1px solid #d4d4d4;
    }
    .news-btn  .remove{
        color: #666666;
        border:1px solid #d4d4d4;
    }
    .news-btn span{
        width:50px;
        height:30px;
        line-height:30px;
        text-align:center;
        border:1px solid  #ffa114;
        color:#ffa114;
        border-radius:4px;
        cursor:pointer;
        display:inline-block;
    }

</style>
<template>
    <div class="layout-content-main">
        <!----弹窗----->
        <Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle" :mask-closable="false">
            <div slot="header"></div>
            <div slot="close"></div>
            <component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false"  :modalMsg="modalMsg">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
            <div slot="footer"></div>
        </Modal>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/">后台</BreadcrumbItem>
                <BreadcrumbItem >资讯管理</BreadcrumbItem>
                <BreadcrumbItem>财经要闻</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="info_Exp_content">
            <router-link to="/articleManage/addNews">
            <div class="addNews">新增要闻</div>
            </router-link>
            <div class="information_content">
                <table class="news_list" width="100%">
                    <tr>
                        <th>日期</th>
                        <th>封面</th>
                        <th>标题</th>
                        <th>导读</th>
                        <th>详情</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>2017-11-11 14:41</td>
                        <td>放图片</td>
                        <td>买买买买买赚赚赚赚</td>
                        <td>今天天气很好</td>
                        <td class="news-btn">
                            <span class="details-btn" @click="showModal('details')">查看详情</span>
                        </td>
                        <td>
                            <span>未推荐</span>
                        </td>
                        <td class="news-btn">
                            <span @click="showModal('recommend')">推荐</span>
                            <router-link to="/articleManage/modify_news">
                                <span>修改</span>
                            </router-link>
                            <span class="remove" @click="showModal('remove')">删除</span>
                        </td>
                    </tr>
                </table>

                <!--<div class="no_data_content">暂无数据！</div>-->
            </div>
        </div>

    </div>
</template>
<script>
  import newsDetails from './components/news_details/index.vue'
  import removeNews from './components/remove_news/index.vue'
  import recommendNews from './components/recommend_news/index.vue'
    export default {
        components: {
            newsDetails,
            removeNews,
            recommendNews
        },
        data(){
            return {
                iviewModal: false,
                curModal: {
                    name: '',
                    width: ''
                },
                modalList: {
                    details: {
                        name: 'newsDetails',
                        width: ''
                    },
                    remove: {
                        name: 'removeNews',
                        width: ''
                    },
                    recommend: {
                        name: 'recommendNews',
                        width: ''
                    },
                },
                modalMsg: {},  //传给子组件的数据
            }
        },
        computed: {

        },
        beforeMount() {

        },

        methods:{

            //弹窗
            showModal(name,data={}){
                const modalList=this.modalList
                Object.assign(this.modalMsg,data)
                this.curModal=modalList[name],
                    this.iviewModal=true
            },

            //切换导航
            changeLeftNav(){
                var leftNav={
                    openName:'articleManage',
                    activeName:'Financial_news'
                }
                this.$emit("changeLeftNav",leftNav)
            }
        }
    }
</script>