<template>
  <div class="manageFile">
    <div class="filesDiv">
      <el-dialog title="文件预览" :visible.sync="dialogFileVisible">
        <div v-loading="loading">
          <iframe :src="pathUrl" width="100%" height="500px" v-if="pathUrl"></iframe>
        </div>
      </el-dialog>
      <el-dialog title="文件上传" :visible.sync="dialogUploadVisible" width="500px">
        <el-form ref="form" :model="uploadForm" label-width="70px">
          <el-form-item label="课件名">
            <el-input v-model="uploadForm.courseName"></el-input>
          </el-form-item>
          <el-form-item label="文件">
            <el-upload
              class="avatar-uploader"
              ref="uploadFile"
              :show-file-list="false"
              action=""
              :on-change="handleFile"
              :auto-upload="false"
              accept=".ppt"
            >
              <el-button type="primary" size="medium" class="myUploadButton" style="float: left;"><i class="el-icon-upload el-icon--right"></i>{{uploadForm.fileName?'更改ppt':'选择ppt'}}</el-button>
            </el-upload>
            <span class="uploadFileName" v-show="uploadForm.fileName">{{uploadForm.fileName}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toUploadFile(0,false)">立即上传</el-button>
            <el-button @click="dialogUploadVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="fileTitle noSelect">
        课件上传：
        <el-button type="primary" size="medium" class="myUploadButton" style="float: right;" @click="dialogUploadVisible=true"><i class="el-icon-upload el-icon--right"></i>上传课件</el-button>
      </div>
      <el-table
        :data="myFiles"
        empty-text="暂无上传文件"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="文件名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="time"
          label="上传时间"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          label="上传进度"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-progress style="width:80%;display: inline-block;" :text-inside="true" :stroke-width="24" :percentage="scope.row.persent" :color="scope.row.status==='success'?'#67C23A':(scope.row.status==='error'?'#F56C6C':'#409EFF')"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          label="上传状态"
          min-width="100"
        >
          <template slot-scope="scope">
            {{scope.row.status==='success'?'上传成功':(scope.row.status==='error'?'上传失败':(scope.row.status==='cancle'?'已取消':'上传中'))}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status==='loading'&&scope.row.persent!==99"
              @click="cancel(scope.row.index,false)">
              取消上传
            </el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.status!=='loading'&&scope.row.status!=='success'"
              @click="reloadFile(scope.row.index)">
              重新上传
            </el-button>
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.status==='success'"
              @click="toSee(scope.row.index)">
              预览文件
            </el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status!=='loading'"
              @click="cancel(scope.row.index,true)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {UPLOADFILE,REQFILE} from '../../api/types'
  import {mapActions} from 'vuex'
  export default {
    name: 'ManageUploadFile',
    data () {
      return {
        uploadForm:{
          courseName:'',           //课件名字
          file:null,               //文件
          fileName:'',             //选中文件名字
        },   //上传文件表单

        files:[],                  //上传文件数组
        sources:[],                //保存上传文件列表

        dialogUploadVisible:false, //是否弹出上传文件弹窗

        dialogFileVisible:false,   //是否弹出文件预览弹窗
        loading:false,             //是否在请求文件中
        pathUrl:'',                //预览地址
      }
    },
    computed:{
      myFiles:function(){
        return this.files.filter(item => item.status!=='detele')
      }
    },
    methods: {
      ...mapActions(['choiceManageMenuId']),

      //选择文件上传
      handleFile(file, fileList){
        this.uploadForm.file = file
        this.uploadForm.fileName = file.name
      },
      //取消上传文件,isDetele为true时既取消上传，又使之隐藏，为false时仅仅取消上传，还能重新上传
      cancel(index,isDetele = false){
        if(this.sources[index]){                 //我先判断soucre是否存在，因为如果我打开弹框不作任何操作，点击取消按钮没有这一层判断的话，that.source.cancel('取消上传');会报错。
          this.sources[index].cancel('取消上传'); //"取消上传"这几个字，会在上面catch（）的error中输出的
          if(isDetele){
            this.files[index].status = 'detele'
          }else{
            this.files[index].status = 'cancle'
          }
        }
      },
      //准备上传资源文件
      toUploadFile (index,reload = false) {
        let cancelToken = axios.CancelToken;
        var {uploadForm} = this
        var {file,courseName,fileName} = uploadForm
        if(file && courseName && fileName){
          this.sources.push(cancelToken.source())
          var time = this.getTime()
          var size = this.getSize(file.size)
          var saveFile = {
            name: courseName,
            size,
            time,
            persent: 0,
            status:'loading',
            file:file,
            index:this.files.length,
            uid:file.uid,
          }
          this.files.push(saveFile)
          //去上传文件
          this.uploadFile(this.files.length-1,file,courseName)
          //提取完所有信息后关闭上传文件弹窗
          this.dialogUploadVisible = false
        }else{
          this.message('请输入完整信息','warning',1500)
        }
      },
      //重新上传文件
      reloadFile(index){
        //重新上传时刷新之前的状态
        let cancelToken = axios.CancelToken
        this.sources.splice(index,1,cancelToken.source())
        var oldFile = this.files[index]
        var courseName = oldFile.name
        var file = oldFile.file
        var time = this.getTime()
        oldFile.time = time
        oldFile.persent = 0
        oldFile.status = 'loading'
        this.files.splice(index,1,oldFile)
        //去重新上传文件
        this.uploadFile(index,file,courseName)
      },
      //上传
      uploadFile(index,file,courseName){
        let self = this
        let param = new FormData();
        param.append('file',file.raw)
        let config = {
          headers:{
            'Content-Type':'multipart/form-data',
          },
          cancelToken:this.sources[index].token,         //取消事件
          transformRequest: [function (data) {
            return data
          }],
          onUploadProgress: progressEvent => {
            let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)
            //请求还未完成都不能置100
            if(persent != 100){
              self.files[index].persent = persent
            }else{
              self.files[index].persent = 99
            }
          },
        }
        axios.post('http://172.16.13.73:8222/courses?courseName='+courseName,param,config)
          .then(response=>{
            var result = response.data
            if(result && result.status == 0){
              self.files[index].status = 'success'
              //请求完成，进度置100
              self.files[index].persent = 100
              //保存上传成功后文件的id
              self.files[index].courseId = result.data.courseId
            }else{
              self.files[index].status = 'error'
              if(result.msg){
                this.message(result.msg,'error',1500)
              }else{
                this.message('课件上传失败','error',1500)
              }
            }
          }).catch(err => {
          self.files[index].status = 'error'
          this.message('课件上传失败','error',1500)
        })
      },

      //清空上传表单
      emptyUpload(){
        this.uploadForm.file = null
        this.uploadForm.courseName = ''
        this.uploadForm.fileName = ''
      },
      //预览文件
      async toSee(courseId){
        //courseId = '53934544-d82e-4bcf-a0d8-ae683c054961'
        this.dialogFileVisible = true
        this.loading = true
        var result = await REQFILE(courseId,{pageNum:1,pageSize:10})
        this.loading = false
        if(result && result.status === 0){
          var {coursePdfUrl} = result.data
          this.pathUrl = '../../../static/pdf/web/viewer.html?file=' + encodeURIComponent(coursePdfUrl)
        }else{
          this.dialogFileVisible = false
          this.message('预览文件失败','error',1500)
        }
      },
      //获取文件大小
      getSize(size){
        if(size/1024/1024/1024>0.5){
          var result = ((size/1024/1024/1024)+'').split('.')
          if(result[1]){
            return result[0]+'.' + result[1].slice(0,2) + 'GB'
          }else{
            return result[0] + 'GB'
          }
        } else if(size/1024/1024>0.5){
          var result = ((size/1024/1024)+'').split('.')
          if(result[1]){
            return result[0]+'.' + result[1].slice(0,2) + 'MB'
          }else{
            return result[0] + 'MB'
          }
        }else if(size/1024>0.5){
          var result = ((size/1024)+'').split('.')
          if(result[1]){
            return result[0]+'.' + result[1].slice(0,2) + 'KB'
          }else{
            return result[0] + 'KB'
          }
        }else{
          return size + 'B'
        }
      },
      //获取年-月-日 时:分:秒时间
      getTime(){
        var date = new Date()
        var y = date.getFullYear()
        var m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        var d = date.getDate() + 1 > 9 ? date.getDate() + 1 : '0' + (date.getDate() + 1)
        var H = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        var M = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        var S = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
        return y + '-' + m + '-' + d + '   ' + H + ':' + M + ':' + S
      },
      //消息提示
      message(message,type,duration){
        this.$message({
          message,
          duration,
          type
        })
      },
    },
    mounted () {
      this.choiceManageMenuId('ManageUploadFile')
    },
    watch:{
      //每次关闭上传文件弹窗都需要重置之前的信息
      dialogUploadVisible(newval,oldval){
        if(!newval){
          this.emptyUpload()
        }
      },
      //每次关闭预览弹窗都需要重置之前的信息
      dialogFileVisible(newval,oldval){
        if(!newval){
          this.loading = false
          this.pathUrl = ''
        }
      }
    }
  }
</script>

<style lang="less">
  @media (any-hover: hover){
    .manageFile{
      .filesDiv{
        .fileTitle{
          &:hover{
            &:after{
              width: 120px!important;
            }
          }
        }
      }
    }
  }
  .manageFile{
    height: 100%;
    min-height: calc(100% - 40px);
    .filesDiv{
      min-height: calc(100% - 32px);
      button{
        outline: 0;
      }
      .myUploadButton{
        margin-right: 25px;
        i{
          margin-right: 10px;
        }
      }
      .avatar-uploader{
        display: inline-block;
      }
      .uploadFileName{
        display: inline-block;
        width: 210px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .fileTitle{
        position: relative;

        font-size: 20px;
        color: #1976d2;
        font-family: "Poppins", sans-serif;
        font-weight: 400;

        margin-top: 0px;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(233,233,233);

        &:after {
          content: "";
          position: absolute;
          width: 70px;
          height: 2px;
          content: "";
          background: #1976d2;
          left: 0;
          bottom: 0;
          -moz-transition: all .5s ease;
          -webkit-transition: all .5s ease;
          transition: all .5s ease;
        }
      }
    }
  }
</style>
