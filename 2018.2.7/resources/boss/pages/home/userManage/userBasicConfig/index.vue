<template>
    <div class="layout-content-main" v-if="showPage">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>用户管理</BreadcrumbItem>
                <BreadcrumbItem>基础配置</BreadcrumbItem>
            </Breadcrumb>
            <Select
                    :label="labelName"
                    label-in-value
                    style="width: 150px;margin-top:15px "
                    v-model="model13"
                    filterable
                    remote
                    @on-change="keyChange"
                    :remote-method="remoteMethod1"
                    :loading="loading1">
                <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
            <Row style="margin-top:15px ">
                <Col span="24">
                <Form :label-width="90" class="changeLevelForm">
                    <FormItem label="请选择用户：">
                        <Select
                                :label="labelName"
                                style="width: 150px;"
                                placeholder="请输入用户名搜索"
                                loading-text="搜索中..."
                                v-model="id"
                                @on-change="keyChange"
                                filterable
                                remote
                                :remote-method="searchMethod"
                                :loading="loadingSearch">
                            <Option v-for="(option, index) in searchResultList" :value="option.id" :key="option.id">
                                {{option.real_name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <!--按钮-->
                </Form>
                </Col>
            </Row>
            <Tabs v-model="tabName" @on-click="changeTabName" style="margin-top:15px ">
                <TabPane label="基本信息" icon="information-circled" name="tab1">
                    <keep-alive>
                        <basicInformation v-if="tabName=='tab1'" :userId="model13"></basicInformation>
                    </keep-alive>
                </TabPane>
                <TabPane label="交易商" icon="social-tumblr" name="tab2">
                    <keep-alive>
                        <traders v-if="tabName=='tab2'" :userId="model13"></traders>
                    </keep-alive>
                </TabPane>
                <TabPane label="协议" icon="document-text" name="tab3">
                    <keep-alive>
                        <agreement v-if="tabName=='tab3'" :userId="model13"></agreement>
                    </keep-alive>
                </TabPane>
                <TabPane label="图片" icon="ios-photos" name="tab4">
                    <keep-alive>
                        <banner v-if="tabName=='tab4'" :userId="model13"></banner>
                    </keep-alive>
                </TabPane>
            </Tabs>

            <!--<Breadcrumb>-->
            <!--<BreadcrumbItem :href="'/userManage/userBasicConfig/basicInformation?id='+model13">基本信息</BreadcrumbItem>-->
            <!--<BreadcrumbItem :href="'/userManage/userBasicConfig/traders?id='+model13">交易商</BreadcrumbItem>-->
            <!--<BreadcrumbItem :href="'/userManage/userBasicConfig/agreement?id='+model13">协议</BreadcrumbItem>-->
            <!--<BreadcrumbItem :href="'/userManage/userBasicConfig/banner?id='+model13">图片</BreadcrumbItem>-->
            <!--</Breadcrumb>-->
            <!--<keep-alive>-->
            <!--<router-view v-if="model13&&showRouter" :userId="model13"></router-view>-->
            <!--</keep-alive>-->
        </div>
    </div>

</template>
<script>
    import basicInformation from './child/basicInformation/index.vue'
    import traders from './child/traders/index.vue'
    import agreement from './child/agreement/index.vue'
    import banner from './child/banner/index.vue'
    export default {

        data(){
            return {
                labelName: '',
                tabName: '',
                showRouter: true,
                showPage: false,
                val: '11',
                model13: "",
                loading1: false,
                options1: [],
                model14: [],
                loading2: false,
                options2: [],
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
                /*搜索*/
                id:'',
                loadingSearch: false,
                searchResultList: [],
                searchResultKey: '',
                searchKey: '',
                /*搜索*/
            }
        },
        components: {
            basicInformation,
            traders,
            agreement,
            banner
        },
        computed: {
            userid(){
                return this.id
            }
        },
        watch: {
            '$route'(){
                this.initPage()
            }
        },
        created(){
            setTimeout(() => {
//                this.showPage=true
                this.initPage()
                this.showPage = true
            }, 1)
//            this.initPage()
        },
        methods: {
            initPage(){
                console.log('init')
                let id = this.$route.query.id
                let name = this.$route.query.name
                let tabName = this.$route.query.tabName
//                this.options1=[{label:'名字',value:'110'}]
//                this.model13='110'
//                this.labelName='名字'
                if (id && tabName) {
                    this.model13 = id
                    this.labelName = name
                }
                if (tabName) {
                    this.tabName = tabName
                } else {
                    this.tabName = 'tab1'
                }
//                this.id=this.$route.params.id
//                            setTimeout(()=>{
//                this.showPage=true
//            },5000)
            },
            keyChange({value, label}){
//                return
//                this.id=val
//                console.log(val)
//                return
                console.log(this.id)
                console.log(this.userid)
                var {params, query, path}=this.$route
                var newQuery = Object.assign({}, query, {id: value, name: label, tabName: this.tabName})
                this.$router.replace({
                    path,
                    params,
                    query: newQuery

                })
            },
            changeTabName(val){
                var {params, query, path}=this.$route
                var newQuery = Object.assign({}, query, {id: this.model13, tabName: this.tabName})
                this.$router.replace({
                    path,
                    params,
                    query: newQuery

                })
            },
            remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item + 'val',
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            },
            //            搜索
            searchMethod (query, stillSearch = false) {
                this.searchKey = query
                if (this.query == '') {
                    this.searchResultList = []
                    this.loadingSearch = false;
                    return
                }
                if (this.loadingSearch && !stillSearch) {
                    return
                }
                if (query !== '') {
                    this.loadingSearch = true;
                    var searchName = this.searchNameHttp({short_name: query})
                    searchName.then((data) => {
                        this.searchResultList = data
                        if (this.searchKey == '') {
                            this.searchResultList = []
                            this.loadingSearch = false;
                            return
                        }
                        if (this.searchKey !== query) {
                            this.searchMethod(this.searchKey, true)
                        } else {
                            this.loadingSearch = false;
                        }
                    }).catch((data = {title: '请求失败'}) => {
                        this.loadingSearch = false;
                        this.searchResultList = []
                    });
                } else {
                    this.searchResultList = []
                }
            },
            searchNameHttp (data){
                const httpName = "搜索姓名"
                var ajaxData = data
                return new Promise((resolve, reject) => {
                    this.$http.post('/boss/search_shoper', ajaxData)
                        .then((response) => {
                            const data = response.data
                            const {retCode, retData = {}, retMsg} = data
                            if (retCode == '0') {
                                resolve(retData)
                            } else {
                                reject([])
                            }
                        }).catch((error) => {
                        reject([])
                    });
                })
            },
        }
    }

</script>















