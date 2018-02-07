<!--<style>-->
    <!--.demo-spin-icon-load {-->
        <!--animation: ani-demo-spin 1s linear infinite;-->
    <!--}-->

    <!--@keyframes ani-demo-spin {-->
        <!--from {-->
            <!--transform: rotate(0deg);-->
        <!--}-->
        <!--50% {-->
            <!--transform: rotate(180deg);-->
        <!--}-->
        <!--to {-->
            <!--transform: rotate(360deg);-->
        <!--}-->
    <!--}-->
    <!--.tinymce-textarea-box  .ivu-card-body{-->
        <!--padding: 0px;-->
    <!--}-->
    <!--.tinymce-textarea-box .mce-tinymce{-->
        <!--box-shadow: none;-->
    <!--}-->
    <!--.tinymce-textarea-box  .ivu-card-shadow{-->
        <!--box-shadow: none;-->
    <!--}-->
<!--</style>-->
<!--<style lang="css" scoped>-->
    <!--.layout-content-main {-->
        <!--padding: 20px 20px 50px;-->
    <!--}-->

    <!--.news-title {-->
        <!--margin: 30px 0px;-->
    <!--}-->

    <!--.news-pic span {-->
        <!--display: inline-block;-->
        <!--float: left;-->
    <!--}-->

    <!--.news-pic .add-pic {-->
        <!--width: 200px;-->
        <!--height: 120px;-->
        <!--position: relative;-->
        <!--border: 1px solid #cccccc;-->
        <!--display: inline-block;-->
    <!--}-->

    <!--.plus-icon {-->
        <!--top: 50%;-->
        <!--left: 50%;-->
        <!--margin-top: -50px;-->
        <!--margin-left: -25px;-->
        <!--position: absolute;-->
        <!--font-size: 100px;-->
        <!--color: #cccccc;-->
    <!--}-->

    <!--.tinymce-textarea-details {-->
        <!--margin-top: 30px;-->
    <!--}-->

    <!--.news-detals-title {-->
        <!--display: inline-block;-->
        <!--float: left;-->
    <!--}-->

    <!--.tinymce-textarea-box {-->
        <!--width: 700px;-->
        <!--display: inline-block;-->
        <!--position: relative;-->
        <!--float: left;-->
        <!--padding:0px;-->
    <!--}-->
    <!--.news-btn {-->
        <!--margin: 30px 0px;-->
        <!--padding-left: 70px;-->
    <!--}-->
    <!--.news-btn span{-->
        <!--height: 30px;-->
        <!--line-height: 30px;-->
        <!--display: inline-block;-->
        <!--padding: 0px 10px;-->
        <!--border:1px solid #cccccc;-->
        <!--border-radius: 4px;-->
        <!--cursor: pointer;-->
        <!--color: #999;-->
    <!--}-->
    <!--.news-btn span:hover{-->
        <!--color: #ffa114;-->
        <!--border:1px solid #ffa114;-->
    <!--}-->
    <!--.news-btn .cancel{-->
       <!--margin-right: 30px;-->
   <!--}-->
<!--</style>-->
<!--<template>-->
    <!--<div class="layout-content-main">-->
        <!--&lt;!&ndash;&#45;&#45;弹窗-&#45;&#45;&ndash;&gt;-->
        <!--<Modal v-model="iviewModal" :width="curModal.width" class-name="ivu-modal-custom ivu-modal-middle"-->
               <!--:mask-closable="false">-->
            <!--<div slot="header"></div>-->
            <!--<div slot="close"></div>-->
            <!--<component v-if="iviewModal" v-bind:is="curModal.name" @close="iviewModal=false" :modalMsg="modalMsg">-->
                <!--&lt;!&ndash; 组件在 vm.currentview 变化时改变！ &ndash;&gt;-->
            <!--</component>-->
            <!--<div slot="footer"></div>-->
        <!--</Modal>-->

        <!--<div class="layout-breadcrumb">-->
            <!--<Breadcrumb>-->
                <!--<BreadcrumbItem href="/">后台</BreadcrumbItem>-->
                <!--<BreadcrumbItem>资讯管理</BreadcrumbItem>-->
                <!--<BreadcrumbItem href="/articleManage/Financial_news">财经要闻</BreadcrumbItem>-->
                <!--<BreadcrumbItem>新增要闻</BreadcrumbItem>-->
            <!--</Breadcrumb>-->
        <!--</div>-->

        <!--<div class="news-title">-->
            <!--<span>要闻名称：</span>-->
            <!--<Input placeholder="请输入要闻名称" style="width: 600px"></Input>-->
        <!--</div>-->

        <!--<div class="news-pic cl">-->
            <!--<span>封面图片：</span>-->
            <!--<span class="add-pic">-->
                <!--<Icon type="ios-plus-empty" class="plus-icon"></Icon>-->
            <!--</span>-->
        <!--</div>-->
        <!--<div class="tinymce-textarea-details cl">-->
            <!--<span class="news-detals-title">要闻详情：</span>-->
            <!--<div class="tinymce-textarea-box">-->
                <!--<Card shadow>-->
                    <!--<textarea class='tinymce-textarea' id="tinymceEditer"></textarea>-->
                <!--</Card>-->
                <!--<Spin fix v-if="spinShow">-->
                    <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
                    <!--<div>加载组件中...</div>-->
                <!--</Spin>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="news-btn">-->
            <!--<router-link to="/articleManage/Financial_news">-->
                <!--<span class="cancel">取消</span>-->
            <!--</router-link>-->
            <!--<span>保存要闻</span>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import tinymce from 'tinymce';-->
    <!--export default {-->
        <!--components: {},-->
        <!--name: 'text-editor',-->
        <!--data(){-->
            <!--return {-->
                <!--spinShow: true,-->
                <!--iviewModal: false,-->
                <!--curModal: {-->
                    <!--name: '',-->
                    <!--width: ''-->
                <!--},-->
                <!--modalList: {-->
                    <!--details: {-->
                        <!--name: '',-->
                        <!--width: ''-->
                    <!--},-->

                <!--},-->
                <!--modalMsg: {},  //传给子组件的数据-->
            <!--}-->
        <!--},-->
        <!--computed: {},-->
        <!--beforeMount() {-->

        <!--},-->
        <!--mounted () {-->
            <!--this.init();-->
        <!--},-->
        <!--destroyed () {-->
            <!--tinymce.get('tinymceEditer').destroy();-->
        <!--},-->
        <!--methods: {-->

            <!--//富文本编辑器-->
            <!--init () {-->
                <!--this.$nextTick(() => {-->
                    <!--let vm = this;-->
                    <!--let height = document.body.offsetHeight - 300;-->
                    <!--tinymce.init({-->
                        <!--selector: '#tinymceEditer',-->
                        <!--branding: false,-->
                        <!--elementpath: false,-->
                        <!--height: height,-->
                        <!--language: 'zh_CN.GB2312',-->
                        <!--menubar: 'edit insert view format table tools',-->
<!--//                        plugins: [-->
<!--//                            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',-->
<!--//                            'searchreplace visualblocks visualchars code fullpage',-->
<!--//                            'insertdatetime media nonbreaking save table contextmenu directionality',-->
<!--//                            'emoticons paste textcolor colorpicker textpattern imagetools codesample'-->
<!--//                        ],-->
<!--//                        toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',-->
                        <!--plugins: [-->
                            <!--'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',-->
                            <!--'searchreplace visualblocks visualchars code fullpage',-->
                            <!--'insertdatetime media nonbreaking save table contextmenu directionality',-->
                            <!--'emoticons paste textcolor colorpicker textpattern imagetools codesample'-->
                        <!--],-->
                        <!--toolbar1: '  undo redo | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | link image ',-->
                        <!--autosave_interval: '20s',-->
                        <!--image_advtab: true,-->
                        <!--table_default_styles: {-->
                            <!--width: '100%',-->
                            <!--borderCollapse: 'collapse'-->
                        <!--},-->
                        <!--setup: function (editor) {-->
                            <!--editor.on('init', function (e) {-->
                                <!--vm.spinShow = false;-->
                                <!--if (localStorage.editorContent) {-->
                                    <!--tinymce.get('tinymceEditer').setContent(localStorage.editorContent);-->
                                <!--}-->
                            <!--});-->
                            <!--editor.on('keydown', function (e) {-->
                                <!--localStorage.editorContent = tinymce.get('tinymceEditer').getContent();-->
                                <!--console.log(localStorage.editorContent);-->
                            <!--});-->
                        <!--}-->
                    <!--});-->
                <!--});-->
            <!--},-->
            <!--//弹窗-->
            <!--showModal(name, data = {}){-->
                <!--const modalList = this.modalList-->
                <!--Object.assign(this.modalMsg, data)-->
                <!--this.curModal = modalList[name],-->
                    <!--this.iviewModal = true-->
            <!--},-->

            <!--//切换导航-->
            <!--changeLeftNav(){-->
                <!--var leftNav = {-->
                    <!--openName: 'articleManage',-->
                    <!--activeName: 'addNews'-->
                <!--}-->
                <!--this.$emit("changeLeftNav", leftNav)-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
