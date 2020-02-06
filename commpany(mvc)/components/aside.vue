<template>
  <aside :class="{showSidebar:!collapsed}">
    <!--展开折叠开关-->
    <div class="menu-toggle" @click.prevent="collapse">
      <i class="iconfont icon-menufold" v-show="!collapsed"></i>
      <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
    </div>
    <!--导航菜单-->
    <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
      <template v-for="(item,index) in leftMenu" v-if="item.menuShow">
        <el-submenu v-if="!item.leaf" :index="index+''">
          <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
          <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                        :class="$route.path==term.path?'is-active':''">
            <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                      :class="$route.path==item.children[0].path?'is-active':''">
          <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
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
        collapsed: false,
        leftMenu: [
          {
            path: '/',
            name: '用户管理',
            menuShow: true,
            leaf: true, // 只有一个节点
            iconCls: 'iconfont icon-users', // 图标样式class
            children: [
              {path: '/admin/user', name: '用户列表', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '新闻管理',
            menuShow: true,
            iconCls: 'el-icon-arrow-left',
            children: [
              {path: '/admin/article', name: '新闻列表', menuShow: true},
              {path: '/admin/artkind', name: '新闻分类', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '产品管理',
            menuShow: true,
            iconCls: 'iconfont icon-books',
            children: [
              {path: '/admin/product', name: '产品列表', menuShow: true},
              {path: '/admin/prdkind', name: '产品分类', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '设置',
            menuShow: true,
            iconCls: 'iconfont icon-setting1',
            children: [
              {path: '/admin/userInfo', name: '个人信息', menuShow: true},
              {path: '/admin/userEdit', name: '修改密码', menuShow: true}
            ]
          }
        ]
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
        this.defaultActiveIndex = url;
        this.$router.push(url); // 用go刷新
      },
      logout() {
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
  aside
    min-width: 50px
    background: #333744
    &::-webkit-scrollbar
      display: none
      
    &.showSidebar
      overflow-x: hidden
      overflow-y: auto
      
    .el-menu
      height: 100% /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px)
      height: -webkit-calc(100% - 80px)
      height: calc(100% - 80px)
      border-radius: 0px
      background-color: #333744
      border-right: 0px
      
    .el-submenu .el-menu-item
      min-width: 60px
    
    .el-menu
      width: 180px
    
    .el-menu--collapse
      width: 60px
      
    .el-menu .el-menu-item, .el-submenu .el-submenu__title
      height: 46px
      color: white
      line-height: 46px
    
    .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover
      background-color: #7ed2df
      
  .menu-toggle
    background: #4A5064
    text-align: center
    color: white
    height: 26px
    line-height: 30px
</style>
