<template>
  <el-form ref="accountForm" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h1 class="title">管理员登录</h1>
    <el-form-item prop="email">
      <el-input type="text" v-model="account.email" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="onLogin" :loading="loading">登录</el-button>
      <el-button type="primary" style="width:100%;" @click.native.prevent="onRegist">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  export default {
    head() {
      return {
        title: '登录后台管理系统'
      };
    },
    data() {
      return {
        loading: false,
        account: {
          email: 'admin',
          password: '123456'
        },
        rules: {
          email: [
            {
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ]
        },
        checked: true
      };
    },
    methods: {
      async onLogin() {
        this.$refs.accountForm.validate(async (valid) => {
          if (valid) {
            this.loading = true;
            let loginParams = {
              email: this.account.email,
              password: this.account.password
            };
            let res = await this.$store.dispatch('login', loginParams);
            if (res.success) {
              this.$router.push('/admin');
            } else {
              this.$confirm(res.err, '提示', {
                confirmButtonClass: 'el-button--warning'
              }).then(() => {
                this.loading = false;
                this.$router.push('/admin/login');
              }).catch(() => {
                this.loading = false;
                this.$router.push('/admin/login');
              });
            }
          }
        });
      },
      async onRegist() {
        this.$refs.accountForm.validate(async (valid) => {
          if (valid) {
            let loginParams = {
              email: this.account.email,
              password: this.account.password,
              nickname: 'zsq'
            };
            let res = await this.$store.dispatch('addUser', loginParams);
            if (res.success) {
              this.$router.push('/admin');
            } else {
              this.$confirm(res.err, '提示', {
                confirmButtonClass: 'el-button--warning'
              }).then(() => {
                this.loading = false;
                this.$router.push('/admin/login');
              }).catch(() => {
                this.loading = false;
                this.$router.push('/admin/login');
              });
            }
          }
        });
      }
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">
  body
    background: #DFE9FB
    
  .login-container
    -webkit-border-radius: 5px
    border-radius: 5px
    -moz-border-radius: 5px
    background-clip: padding-box
    margin: 160px auto
    width: 350px
    padding: 35px 35px 15px 35px
    background: #fff
    border: 1px solid #eaeaea
    box-shadow: 0 0 25px #cac6c6
    
    background: -ms-linear-gradient(top, #ace, #00C1DE) /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE) /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)) /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE) /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE) /*Opera 11.10+*/
    
    .title
      margin: 0px auto 40px auto
      text-align: center
      color: #505458
      font-size: 25px
      font-weight: bold
    
    .remember
      margin: 0px 0px 35px 0px
      
</style>





