<style lang="less">

</style>
<template>
	<div id="test_content">
		测试22
		<div id="echartContainer" style="width: 500;height: 500px"></div>
	</div>
</template>
<script>
    var echarts = require('echarts')
    export default {
    	data(){
    		return {
    		}
    	},
		computed:{
		},

        mounted(){
            this.initCharts()
        },
        methods:{
            initCharts(){
                var myChart = echarts.init(document.getElementById('echartContainer'));
// 绘制图表
                myChart.setOption({
                    title: { text: 'ECharts 入门示例' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>