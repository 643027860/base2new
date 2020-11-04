<template>
  <div class="myMenu">
    <el-menu
      :default-active="menuId"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      background-color="rgba(0,0,0,0.1)"
      text-color="rgb(255,255,255)"
      active-text-color="rgb(64, 158, 255)"
    >
      <el-submenu index="mainPage">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">主页</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{name:'mainPage'}"><el-menu-item index="mainPage" @click="close">主页</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>
          <router-link :to="{name:'graphicalData'}"><el-menu-item index="graphicalData" @click="close">图像化数据</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>
          <router-link :to="{name:'move'}"><el-menu-item index="move" @click="close">拖动</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="mainPage4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">主页</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{name:'mainPage'}"><el-menu-item index="mainPage5" @click="close">主页</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>
          <router-link :to="{name:'mainPage'}"><el-menu-item index="mainPage6" @click="close">主页</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>
          <router-link :to="{name:'mainPage'}"><el-menu-item index="mainPage7" @click="close">主页</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    computed:{
      ...mapState(['isCollapse','menuId'])
    },
    data () {
      return {

      }
    },
    mounted () {
      if($(window).width()  < 1000) {
        this.ocmenus()
      }
    },
    methods: {
      ...mapActions(['ocmenus']),
      //小于1000px时点击菜单选项隐藏菜单
      close(){
        if($(window).width()  < 1000) {
          this.ocmenus()
        }
      },
    },
  }
</script>

<style lang="less">
  .el-menu--vertical{
    li,div{
      padding: 0;
      margin: 0;
      &:hover{
        background-color: rgba(0,0,0,0.3) !important;
      }
    }
  }
  .myMenu{
    .el-menu {
      border-right: none;
      li{
        text-align: left;
        &:hover{
          background-color: rgba(0,0,0,0.1) !important;
        }
      }
      .el-submenu__title{
        background-color: rgba(0,0,0,0.1) !important;
        &:hover{
          background-color: rgba(0,0,0,0.3) !important;
        }
      }
      .el-menu-item-group__title{
        padding-bottom: 0px;
        padding-top: 0px;
      }
      a{
        text-decoration: none;
      }
      .el-menu--inline .el-menu-item{
        background-color: rgba(0,0,0,0.2) !important;
      }
      .el-menu--inline .el-menu-item:hover{
        background-color: rgba(0,0,0,0.3) !important;
        color: rgb(64, 158, 255) !important;
      }
    }
  }
</style>
