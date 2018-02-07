<style lang="less">

</style>
<template>
	<div id="test_content">
		测试1
		<div id="echartContainer" style="width: 500;height: 500px"></div>
	</div>
</template>
<script>
    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');

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
                    tooltip : {
                        trigger: 'axis',
                        formatter :'时间：2017.{b}<br>交易量(手)：{c}'
                    },
                    xAxis: {
                        boundaryGap: ['0.1', '0.1'],
                        type: 'category',
						name:'时间',
                        axisLabel : {
                            formatter: '2017.{value}',
                            interval:15
                        },
                        axisTick:{
                            show  :false
                        },
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sui']
                    },
                    yAxis: {
                        type: 'value',
                        name:'交易量(手)',
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1111],
                        type: 'line',
                        showSymbol:false,
                        symbolSize:2,
                        symbol: 'circle',
                        markLine : {
                            data : [
                                {type : 'average', name: '平均交易量'}
                            ]
                        },
                        lineStyle:{
                            normal:{
                                color:'rgb(65,155,249)'
							}
						},
                        itemStyle:{
                            normal:{
                                color:'rgb(65,155,249)'
                            }
                        }
                    }],
                });
			}
        }
    }
</script>