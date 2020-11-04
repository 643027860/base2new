<template>
  <div class="myGraphicalData">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="graphicalDiv">
          <div class="titlrDiv">
            <p>数据图形化</p>
          </div>
          <div class="contentDiv">
            <MyLine :MyLineId="'lineOne'"></MyLine>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="graphicalDiv">
          <div class="titlrDiv">
            <p>数据图形化</p>
          </div>
          <div class="contentDiv">
            <MyPie :myPieId="'pieOne'"></MyPie>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="graphicalDiv">
          <div class="titlrDiv">
            <p>数据图形化</p>
          </div>
          <div class="contentDiv">
            <MyPie :myPieId="'pieTwo'"></MyPie>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="graphicalDiv">
          <div class="titlrDiv">
            <p>数据图形化</p>
          </div>
          <div class="contentDiv">
            <MyBar :MyBarId="'BarOne'"></MyBar>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MyLine from '../../../components/Charts/MyLine'
  import MyPie from '../../../components/Charts/myPie'
  import MyBar from '../../../components/Charts/myBar'
  import {EXPORTFIELD,FIELDLIST} from '../../../api/types'
  import {mapState,mapActions} from 'vuex'
  export default {
    components: {MyLine,MyPie,MyBar},
    data () {
      return {}
    },
    methods: {
      ...mapActions(['choiceMenuId']),
    },
    watch: {},
    computed: {},
    mounted () {
      this.choiceMenuId('graphicalData')
    },
  }
</script>

<style lang="less">
  .myGraphicalData{
    *{
      margin: 0;
      padding: 0;
    }
    .graphicalDiv{
      height: 442px;
      margin-bottom: 23px;
      background-color: rgba(0,0,0,0.25);
      border: 1px solid rgb(128,128,128);
      .titlrDiv{
        padding: 15px;
        border-bottom: 1px solid rgb(128,128,128);
        p{
          height: 29px;
          line-height: 29px;
          font-size: 16px;
        }
      }
      .contentDiv{
        height: 380px;
        padding: 20px;
      }
    }
  }
  @media screen and(max-width: 767px){
    .myGraphicalData{
      max-width: 100vw;
      overflow: hidden;
      .graphicalDiv{
        height: 383px;
        margin-bottom: 15px;
        .titlrDiv{
          padding: 10px;
          p{
            height: 20px;
            line-height: 20px;
            font-size: 14px;
          }
        }
        .contentDiv{
          height: 340px;
          padding: 10px;
        }
      }
    }
  }
</style>
