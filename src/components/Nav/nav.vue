<template>
  <div class="myNav">
    <MenuControl style="float: left;"></MenuControl>
    <div class="rightAvatar">
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script>
  import Avatar from './avatar'
  import MenuControl from '../Menus/controlmenu'
  export default {
    name: '',
    components: {
      Avatar,
      MenuControl
    },
    data () {
      return {}
    },
    methods: {},
    watch: {},
    created () {

    },
    mounted () {

    },
  }
</script>

<style lang="less">
  .myNav{
    height: 60px;
    background-color: rgba(0,0,0,0.3);
    .rightAvatar{
      padding: 10px 0;
    }
  }
</style>
