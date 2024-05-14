import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

//echarts配置数据
const axisOption = {
    textStyle:{
        color:"#333"
    },
    tooltip:{
        trigger:"axis"
    },
    xAxis:{
        type:"category",
        data:[],
        axisLine:{
            lineStyle:{
                color:"#17b3a3"
            }
        },
        axisLabel:{
            interval:0,
            color:"#333"
        }
    },
    yAxis:{
        type:"value",
        axisLine:{
            lineStyle:{
                color:"#17b3a3"
            }
        }
    },
    color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
    series:[]
}

const normalOption = {
    tooltip:{
        trigger:"item"
    },
    color:[
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf"
    ],
    series:[]
}

const Echarts = ({style,chartData,isAxisChart = true}) => {
    //创建 echartRef
    const echartRef = useRef()
    let echartObj = useRef(null)
    useEffect(()=>{
        //初始化echarts
        echartObj.current = echarts.init(echartRef.current)
        // 设置option
        if(isAxisChart){
            //设置x轴数据
            axisOption.xAxis.data = chartData.xData
            axisOption.series = chartData.series
        }else {
            normalOption.series = chartData.series
        }
        echartObj.current.setOption(isAxisChart ? axisOption : normalOption)
    },[chartData])
    return (
        <div style={style} ref={echartRef}>

        </div>
    )
}

export default Echarts