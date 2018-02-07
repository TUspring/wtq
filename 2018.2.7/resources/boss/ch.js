option = {
    title : {
        text: '一周内交易情况',
        subtext: ''
    },
    tooltip : {
        trigger: 'axis',
        formatter :'日期：2017.{b}<br>交易量(手)：{c}'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap :true,
            data : ['9.1','9.2','9.3','9.4','9.5','9.6','9.7','9.1','9.2','9.3','9.4','9.5','9.6','9.7'],
            axisLabel : {
                formatter: '2017.{value}',
                interval:2
            },
            axisTick:{
                show  :false
            },
            splitLine :{
                show:false
            },
            splitArea :{
                show:false
            }
        }
    ],
    yAxis : [
        {

            type : 'value',
            axisLabel : {
                interval :4,
                formatter: '{value}'+'手'
            }
        }
    ],
    series : [
        {
            name:'当天交易量',
            type:'line',
            stack: '总量',
            data:[111, 111, 115, 113,313, 332, 313, 2110,111, 111, 115, 1113,313, 332, 313, 210],
            markLine : {
                data : [
                    {type : 'average', name: '平均交易量'}
                ]
            },
            itemStyle: {
                normal: {
                    labelLine  :{

                    }
                },
                emphasis: {

                }
            }
        }
    ]
};
                    