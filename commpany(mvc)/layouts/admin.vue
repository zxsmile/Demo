<template>
  <el-row class="container">
    <!-- 头部 -->
    <v-header></v-header>
    <!-- 中间 -->
    <el-col :span="24" class="main">
      <!-- 左侧导航 -->
      <v-aside></v-aside>
      <!-- 右侧内容区 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <nuxt />
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import vHeader from '../components/header/header.vue';
  import vAside from '../components/aside.vue';
  export default {
    head() {
      return {
        title: '后台管理系统'
      };
    },
    components: {
      vHeader,
      vAside
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .container
    position: absolute
    top: 0px
    bottom: 0px
    width: 100%
    .main
      display: -webkit-box
      display: -webkit-flex
      display: -ms-flexbox
      display: flex
      position: absolute
      top: 60px
      bottom: 0px
      overflow: hidden
    .content-container
      background: #fff
      flex: 1
      overflow-y: auto
      padding: 10px
      padding-bottom: 1px
      .content-wrapper
        background-color: #fff
        box-sizing: border-box
</style>
