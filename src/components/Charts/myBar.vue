<template>
  <div class="MyBar">
    <div :id="MyBarId" class="bar">

    </div>
  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/title')
  require('echarts/lib/component/toolbox')
  export default {
    data () {
      return {
        Bar:'',                   //柱形图对象
      }
    },
    mounted () {
      setTimeout(()=>{
        this.drawBar()
      },200)
    },
    props:{
      MyBarId:{
        type:String,
        required:true
      }
    },
    methods: {
      //绘制图表
      drawBar(){
        this.Bar = echarts.init(document.getElementById(this.MyBarId))
        var _this = this
        window.addEventListener("resize",function () {
          _this.Bar.resize();
        })
        this.Bar.setOption({
          // ----  标题 -----
          title: {
            text: '',
            textStyle: {
              color: '#fff'
            },
            subtext: '',
            subtextStyle: {
              color: '#eee'
            },
          },
          // ---- legend ----
          legend: {
            type: 'plain',    // 图列类型，默认为 'plain'
            top: '1%',        // 图列相对容器的位置 top\bottom\left\right
            tooltip: {        // 图列提示框，默认不显示
              show: true,
              color: '#fff'
            },
            data: [           // 图列内容
              {
                name: '销量',
                icon: 'circle',
                textStyle: {
                  color: '#fff',  // 单独设置某一个图列的颜色
                }
              }
            ]
          },
          // ---  提示框 ----
          tooltip: {
            show: true,        // 是否显示提示框，默认为true
            trigger: 'item',   // 数据项图形触发
            axisPointer: {     // 指示样式
              type: 'shadow',
              axis: 'auto'
            },
            padding: 5,
            textStyle: {       // 提示框内容的样式
              color: '#fff'
            }
          },
          //  ------  X轴 ------
          xAxis: {
            show: true,           // 是否显示
            type: 'category',     // 轴类型， 默认为 'category'
            name: '月份',         // 轴名称
            nameLocation: 'end',  // 轴名称相对位置
            nameTextStyle: {      // 坐标轴名称样式
              color: 'white',
            },
            nameRotate: $('.MyBar').width()>=500?0:90,        // 坐标轴名字旋转
            nameGap: 15,          // 坐标轴名称与轴线之间的距离
            axisLine: {           // 坐标轴 轴线
              show: true,         // 是否显示
              symbol: ['none', 'arrow'],  // 是否显示轴线箭头
              symbolSize: [8, 8],         // 箭头大小
              symbolOffset: [0, 7],       // 箭头位置
              // ------   线 ---------
              lineStyle: {
                color: '#fff',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {           // 坐标轴 刻度
              show: true,         // 是否显示
              inside: true,       // 是否朝内
              length: 3,          // 长度
              lineStyle: {        // 默认取轴线的样式
                color: 'red',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {           // 坐标轴标签
              show: true,          // 是否显示
              inside: false,       // 是否朝内
              rotate: 0,           // 旋转角度
              margin: 5,           // 刻度标签与轴线之间的距离
              color: '#fff'        // 默认取轴线的颜色
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          //   ------   y轴  ----------
          yAxis: {
            show: true,          // 是否显示
            position: 'left',    // y轴位置
            offset: 0,           // y轴相对于默认位置的偏移
            type: 'value',       // 轴类型，默认为 ‘category’
            name: '销量',        // 轴名称
            nameLocation: 'end', // 轴名称相对位置value
            nameTextStyle: {    // 坐标轴名称样式
              color: '#fff',
              padding: [5, 0, 0, 5]  // 坐标轴名称相对位置
            },
            nameGap: 15,         // 坐标轴名称与轴线之间的距离
            nameRotate: 0,       // 坐标轴名字旋转

            axisLine: {    // 坐标轴 轴线
              show: true,  // 是否显示
              //  -----   箭头 -----
              symbol: ['none', 'arrow'],  // 是否显示轴线箭头
              symbolSize: [8, 8],  // 箭头大小
              symbolOffset: [0, 7], // 箭头位置

              // ----- 线 -------
              lineStyle: {
                color: '#fff',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {      // 坐标轴的刻度
              show: true,    // 是否显示
              inside: true,  // 是否朝内
              length: 3,      // 长度
              lineStyle: {
                color: 'red',  // 默认取轴线的颜色
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {      // 坐标轴的标签
              show: true,    // 是否显示
              inside: false,  // 是否朝内
              rotate: 0,     // 旋转角度
              margin: 8,     // 刻度标签与轴线之间的距离
              color: '#fff',  // 默认轴线的颜色
            },
            splitLine: {    // gird 区域中的分割线
              show: true,   // 是否显示
              lineStyle: {
                color: '#666',
                width: 1,
                type: 'dashed'
              }
            },
          },
          grid: {
            left: '1%',
            right: $('.MyBar').width()>768?'5%':'10%',
            bottom: '2%',
            containLabel: true,
          },
          //  -------   内容数据 -------
          series: [
            {
              name: '销量',           // 序列名称
              type: 'bar',            // 类型
              legendHoverLink: true,  // 是否启用图列 hover 时的联动高亮
              label: {                // 图形上的文本标签
                show: false,
                position: 'insideTop',// 相对位置
                rotate: 0,            // 旋转角度
                color: '#eee'
              },
              itemStyle: {            // 图形的颜色
                color: '#D53A35',
              },
              barWidth: $('.MyBar').width()>768?40:($('.MyBar').width()>=500?20:15),           // 柱形的宽度
              barCategoryGap: '20%',  // 柱形的间距
              data: [100, 400, 420, 450, 600, 560, 450, 520, 450, 540, 430, 120]
            }
          ]
        });
      }
    },
    watch:{
    }
  }
</script>

<style lang="less">
  .MyBar{
    height: 100%;
    width: 100%;
    .bar{
      height: 340px;
      overflow: hidden;
    }
  }
  @media screen and(max-width: 767px){
    .MyBar{
      .bar{
        height: 320px;
        overflow: hidden;
      }
    }
  }
</style>
