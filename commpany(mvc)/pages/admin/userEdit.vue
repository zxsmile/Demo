<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    
    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="handleChangepwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
  export default{
    layout: 'admin',
    middleware: 'auth', // 登录验证
    data() {
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        }
      };
    },
    methods: {
      handleChangepwd() {
        this.$message({message: '此功能只是让你看看，不会开发！', duration: 2000});
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
