<template>
  <div class="MyLine">
    <div :id="MyLineId" class="line">

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
        Line:'',                   //折现图对象
      }
    },
    mounted () {
      setTimeout(()=>{
        this.drawLine()
      },200)
    },
    props:{
      MyLineId:{
        type:String,
        required:true
      }
    },
    methods: {
      //绘制图表
      drawLine(){
        console.log(this.MyLineId)
        this.Line = echarts.init(document.getElementById(this.MyLineId))
        var _this = this
        window.addEventListener("resize",function () {
          _this.Line.resize();
        })
        this.Line.setOption({
          title: {
            text: ''
          },
          color:['#2db7f5','#ff6600','#808bc6'],
          tooltip: {
            trigger: 'item'   // axis   item   none三个值
          },
          legend: {
            data: $('.MyLine').width()>=400?['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']:[]
          },
          grid: {
            left: '1%',
            right: $('.MyLine').width()>=500?'5%':'10%',
            bottom: $('.MyLine').width()>=500?'2%':'5%',
            containLabel: true
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {//动态类型切换,包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）。
                type: ['bar', 'line','stack','tiled'],
              },
              saveAsImage: {//保存图片
                show: true,
              },
            },
            iconStyle:{
              normal:{
                color:'#FFF',//设置颜色
              }
            }
          },
          xAxis: {
            type: 'category',
            name:'横轴名字',
            nameTextStyle:{                  //横轴名字/大小/宽度
              fontWeight:600,
              fontSize:$(window).width>768?16:14,
            },
            nameRotate: $('.MyLine').width()>=500?0:90,                  // 坐标轴名字旋转
            axisLabel: {
              show: true,
              textStyle: {                   //坐标颜色/大小
                fontSize:$(window).width>768?14:10,
                color:'#FFF'
              }
            },                 //X轴坐标样式
            axisLine: {                       //X轴颜色
              lineStyle: {
                color: '#FFF',
              }
            },
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {                           //Y轴坐标样式
            type: 'value',
            name:'纵轴名字',
            nameTextStyle:{                   //纵轴名字/大小/宽度
              fontWeight:500,
              fontSize:$(window).width>768?16:14
            },
            axisLabel: {
              show: true,
              textStyle: {                   //坐标颜色/大小
                fontSize:$(window).width>768?14:10,
                color:'#FFF'
              }
            },
            axisLine: {                       //Y轴颜色
              lineStyle: {
                color: '#FFF',
              }
            },
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              smooth:true,            //线条平滑
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              smooth:true,            //线条平滑
              data: [220, 482, 191, 234, 1090, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              smooth:true,           //线条平滑
              data: [150, 732, 201, 154, 1090, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              smooth:true,           //线条平滑
              data: [320, 332, 901, 334, 390, 1330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              smooth:true,           //线条平滑
              data: [120, 532, 701, 934, 1290, 1330, 1320]
            }
          ]
        })
      }
    },
    watch:{
    }
  }
</script>

<style lang="less">
  .MyLine{
    height: 100%;
    width: 100%;
    .line{
      height: 340px;
      overflow: hidden;
    }
  }
  @media screen and(max-width: 767px){
    .MyLine{
      .line{
        height: 320px;
        overflow: hidden;
      }
    }
  }
</style>
