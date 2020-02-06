<template>
  <el-col :span="24" class="topbar-wrap">
    <div class="topbar-logo">
      <a href="/"><img src="./logo.png"></a>
    </div>
    <div class="topbar-account topbar-btn">
      <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="iconfont icon-down"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="jumpTo('/admin/userInfo')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="jumpTo('/admin/userEdit')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-col>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'home',
    created() {
    },
    data () {
      return {
        defaultActiveIndex: '0',
        nickname: '',
        collapsed: false
      };
    },
    methods: {
      handleSelect(index) {
        this.defaultActiveIndex = index;
      },
      // 折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url) {
        this.$router.push(url); // 用go刷新
      },
      async logout() {
        this.$confirm('确认要退出管理系统吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(async () => {
          // 确认
          let res = await this.$store.dispatch('logout');
          if (res.success) {
            await this.$router.push('/admin/login');
          }
        });
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .topbar-wrap
    height: 60px
    line-height: 60px
    background: #373d41
    padding: 0px
    .topbar-logo
      float: left
      width: 250px
    .topbar-logo img
      height: 50px
      width: 249px
      margin-top: 5px
      margin-left: 2px
      padding: 2px
      background: #fff
   
    .topbar-account
      float: right
      padding-right: 12px
    
    .userinfo-inner
      cursor: pointer
      color: #fff
      padding-left: 10px
</style>
