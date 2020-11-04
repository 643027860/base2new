<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
  //修改移动端的弹出窗样式和消息提示样式以及部分输入框样式
  .pc{
    display: block;
  }
  .mobile{
    display: none;
  }
  *{
    box-sizing:border-box;
  }
  body,html{
    padding: 0;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    .el-dialog__wrapper .el-dialog {
      width: 300px !important;
    .el-dialog__body{
      padding: 10px 20px!important;
    .el-form-item__label{
      width: 68px!important;
    }
    .el-select,.el-input{
      width: 180px!important;
    }
  }
  }
  .el-message {
    min-width: 300px !important;
  }
  .el-message-box{
    width: 300px !important;
  }
 }
  @media screen and (max-width: 500px){
    .pc{
      display: none!important;
    }
    .mobile{
      display: block!important;
    }
  }
  //组件过渡动画样式
  .component-fade-enter-active{
    transition: all .4s ease;
  }
  .component-fade-leave-active {
    transition: all .4s ease;
  }
  .component-fade-enter{
    transform: translateX(-50px);
    opacity: 0;
  }
  .component-fade-leave-to{
    transform: translateX(50px);
    opacity: 0;
  }
</style>
