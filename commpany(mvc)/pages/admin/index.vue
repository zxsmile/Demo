<template>
  <div>
    <h1>你谁呀？我是首页{{user.email}} </h1>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  export default {
    layout: 'admin',
    middleware: 'auth', // 登录验证
    data () {
      return {
      };
    },
    methods: {
    },
    computed: mapState({
      'user': state => state.modUser.user
    }),
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
