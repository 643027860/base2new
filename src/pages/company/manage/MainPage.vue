<template>
  <div class="myMainPage">
    <div class="searchForm">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchForm.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reqDATASOURCELIST">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="contentDiv">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQDYNAMIC,REQONEDYNAMIC,REQDATASOURCE,REQDATASOURCELIST,REQAll,REQARRAYLIST} from '../../../api/types'
  import {EXPORTFIELD,FIELDLIST} from '../../../api/types'
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {
        searchForm:{

        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
      }
    },
    methods: {
      ...mapActions(['choiceMenuId']),
      //表格多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //数据拼接字符串获取请求参数地址url
      getParamsUrl(data){
        let dataStr = ''
        if(data!=={}){
          Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
          })
          if (dataStr !== '') {
            dataStr = '?' + dataStr.substring(0, dataStr.lastIndexOf('&'))
          }
        }
        return dataStr
      },
      //动态查询数据源数据
      async reqDynamic(){
        var datasourceId = '8935abfd1530548fe1c7f28ac0ed3e1d'
        var params = {}
        var field  = ['hotel_name','channel']
        var dataTable   = 'nl_order'
        var data = [
            {
              dataTable,
              datasourceId,
              field,
              params
            }
          ]
        var result = await REQDYNAMIC(data)
        if(result.status === 0){
          console.log(result)
        }else{
          if(result.msg){
            var message = result.msg
          }else{
            var message = '动态获取数据源失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },
      //查看某个表中所有的字段
      async reqAll(){
        var datableName = 'nl_hotel'
        var datasourceId = '8935abfd1530548fe1c7f28ac0ed3e1d'
        var data = {datableName,datasourceId}
        let dataStr = this.getParamsUrl(data)
        var result = await REQAll(dataStr)
        if(result.status === 0){
          console.log(result)
        }else{
          if(result.msg){
            var message = result.msg
          }else{
            var message = '动态获取数据源失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },
      //动态查询语句，使用数据源编号
      async reqONEDYNAMIC(){
        var datasourceId = 'jdbc:mysql://172.17.0.1:3306/hc_hotel_1?useUnicode=true&characterEncoding=UTF8&allowMultiQueries=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai'
        var params = {}
        var sql = 'select * from nl_hotel'
        var data = {datasourceId,sql}
        let dataStr = this.getParamsUrl(data)
        var result = await REQONEDYNAMIC(params,dataStr)
        if(result.status === 0){
          console.log(result)
        }else{
          if(result.msg){
            var message = result.msg
          }else{
            var message = '动态获取数据源失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },
      //动态数据源连接接口
      async reqDATASOURCE(){
        var dataSourceName = '酒店'
        var databaseType = 'mysql'
        var password = '123456'
        var url = 'jdbc:mysql://172.17.0.1:3306/hc_hotel_1?useUnicode=true&characterEncoding=UTF8&allowMultiQueries=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai'
        var username = 'root'
        var data = {dataSourceName,databaseType,password,url,username}
        let dataStr = this.getParamsUrl(data)
        var result = await REQDATASOURCE(dataStr)
        if(result.status === 0){
          console.log(result)
        }else{
          if(result.msg){
            var message = result.msg
          }else{
            var message = '动态获取数据源失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },
      //查看数据源列表
      async reqDATASOURCELIST(){
        var result = await REQDATASOURCELIST()
        if(result.status === 0){
          console.log(result)
        }else{
          if(result.msg){
            var message = result.msg
          }else{
            var message = '动态获取数据源失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },
      //列表生成查询
      async reqFieldList(){
        var mainId  = '7bde6ae2-d9b6-4d95-b0b9-2cd94dcc693f'
        var data = {mainId}
        let dataStr = this.getParamsUrl(data)
        var result = await FIELDLIST(dataStr)
        if(result.status == 0){
          console.log(result)
        }else{
          if(result.msg){
            var message = result.msg
          }else {
            var message = '列表生成查询失败'
          }
          this.message(message,'error',1500)
        }
      },
      //列表导出接口
      async exportExcel(){
        var mainId = '7bde6ae2-d9b6-4d95-b0b9-2cd94dcc693f'
        var data = {mainId}
        let dataStr = this.getParamsUrl(data)
        var result = await EXPORTFIELD(dataStr)
        if(result.msg){
          var message = result.msg
          this.message(message,'error',1500)
        }
      },
      //消息提示
      message(message,type,duration){
        this.$message({
          message,type,duration
        })
      }
    },
    watch: {},
    computed: {},
    created () {
      //this.reqDynamic()
      //this.reqONEDYNAMIC()
      //this.reqDATASOURCE()
      //this.reqDATASOURCELIST()
      //this.reqAll()
      //this.reqFieldList()
      this.exportExcel()
    },
    mounted () {
      this.choiceMenuId('mainPage')
    },
  }
</script>

<style lang="less">
  @import "../../../assets/css/table/table.less";
  .myMainPage{
    .searchForm{
      .el-form-item__label{
        color: #FFFFFF!important;
      }
      input{
        background-color: rgba(0,0,0,0.25);
        border-color: transparent;
        box-sizing: border-box;
        &:focus{
          border-color:#66afe9 !important;
        }
      }
      i,input{
        color: #FFFFFF!important;
      }
      input::-webkit-input-placeholder{
        color: rgb(233,233,233);
      }
    }
  }
</style>
