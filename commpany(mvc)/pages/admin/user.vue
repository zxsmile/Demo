<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="用户名/姓名/昵称" style="min-width: 240px;" @keyup.enter.native="handleSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showAddDialog">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      <!--列表-->
      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="160" sortable>
        </el-table-column>
        <el-table-column prop="addr" label="地址" sortable>
        </el-table-column>
      </el-table>
  
      <el-dialog title="编辑" :visible.sync ="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="editForm.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="editForm.sex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="editForm.addr" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>
  
      <!--新增界面-->
      <el-dialog title="新增" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="editForm.sex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="editForm.addr" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  export default {
    layout: 'admin',
    middleware: 'auth', // 登录验证
    data() {
      return {
        filters: {
          name: ''
        },
        loading: false,
        users: [],
        total: 0,
        page: 1,
        limit: 10,
        editFormVisible: false, // 编辑界面是否显示
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ]
        },
        // 添加数据
        addForm: {
          id: 0,
          name: '',
          nickname: '',
          sex: '',
          email: '',
          addr: ''
        },
        // 编辑数据
        editForm: {
          id: 0,
          name: '',
          nickname: '',
          sex: '',
          email: '',
          addr: ''
        }
      };
    },
    methods: {
      // 性别显示转换
      formatSex: function (row, column) {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search();
      },
      handleSearch() {
        this.total = 0;
        this.page = 1;
        this.search();
      },
      // 获取用户列表
      search: function () {
        /* let that = this;
        let params = {
          page: that.page,
          limit: 10,
          name: that.filters.name
        };

        that.loading = true;
        API.findList(params).then(function (result) {
          that.loading = false;
          if (result && result.users) {
            that.total = result.total;
            that.users = result.users;
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        }); */
      },
      // 显示编辑界面
      showEditDialog: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          nickname: '',
          sex: '',
          email: '',
          addr: ''
        };
      }
    },
    mounted() {
      this.handleSearch();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
