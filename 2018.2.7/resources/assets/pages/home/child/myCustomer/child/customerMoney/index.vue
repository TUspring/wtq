<style lang="less" scoped src="./css/index.less"></style>

<template>
    <div class="customerMoney-content">
        <div class="listTypeSelect-box">
            <Select class="listTypeSelect" v-model="selectItem.value" size="large" :placeholder="selectItem.placeholder" style="width:200px" v-for="(selectItem,index) in selectList" >
                <Option v-for="(optionItem,index) in selectItem.optionList" :value="optionItem.value" :key="optionItem.value">{{ optionItem.text }}</Option>
            </Select>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                selectList: [
                    {
                        placeholder: '时间',
                        dataKey:'data',
                        value:'',
                        optionList: [
                            {text: '从最新到最旧', value: '1'},
                            {text: '从最旧到最新', value: '2'}
                        ]
                    },
                    {
                        placeholder: '出入金类型',
                        dataKey:'moneyType',
                        value:'',
                        optionList: [
                            {text: '出金', value: '1'},
                            {text: '入金', value: '2'}
                        ]
                    },
                    {
                        placeholder: '金额',
                        dataKey:'money',
                        value:'',
                        optionList: [
                            {text: '从高到低', value: '1'},
                            {text: '从低到高', value: '2'}
                        ]
                    }
                ]
            }
        },
        activated(){
            this.$emit("changeTab", 2)//切换局部导航
        }
    }
</script>