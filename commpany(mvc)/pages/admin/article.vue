<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
        <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="新闻标题" @keyup.enter.native="onSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createProduct">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      
      <!--列表-->
      <el-table :data="products" highlight-current-row @selection-change="selsChange"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <!-- 展开行 -->
        <!-- 通过设置 type="expand" 和 Scoped slot 可以开启展开行功能 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="[新闻简介]">
                <span>{{ props.row.intro }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" sortable></el-table-column>
        <el-table-column prop="price" label="价格" width="100" sortable></el-table-column>
        <el-table-column prop="intro" label="描述" width="150" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <!-- 自定义列模板 -->
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <template slot-scope="scope">
            <el-button size="small" @click="editProduct(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="delProduct(scope.$index, scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchDelProducts" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="onCurChange" :page-size="5" :total="total"
                       style="text-align:center;">
        </el-pagination>
      </el-col>
      
      <!--新增界面-->
      <el-dialog title="新增" :visible.sync ="isAddUi" :close-on-click-modal="false">
        <el-form :model="productForm" label-width="80px" :rules="productRules" ref="productForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="productForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="productForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="intro">
            <el-input type="textarea" v-model="productForm.intro" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="isAddUi = false">取消</el-button>
          <el-button type="primary" @click.native="saveProduct">提交</el-button>
        </div>
      </el-dialog>
    
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
    layout: 'admin',
    middleware: 'auth', // 登录验证
    data() {
      return {
        isAddUi: false, // 是否弹出编辑框界面
        isEdit: false, // 判断是新建还是编辑
        filters: { // 根据标题过滤
          title: ''
        },
        products: [],
        total: 0,
        curPage: 1, // 当前页
        pageSize: 5, // 每页显示条数
        loading: false,
        sels: [], // 列表选中列
        productRules: { // Form验证规则
          title: [
            {required: true, message: '请输入产品名称', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入产品价格', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '请输入产品价格', trigger: 'blur'}
          ]
        },
        productForm: { // 新建/创建 界面中绑定属性
          title: '', // 产品名称
          price: '', // 产品价格
          intro: '', // 产品介绍
          images: [], // 产品对应的图片路径，图片可以是多个
          parameters: [] // 产品对应的参数，可以是多个
        }
      };
    },
    methods: {
      onCurChange(val) { // 分页功能
        this.curPage = val;
        this.search();
      },
      onSearch() { // 过滤查询
        this.total = 0;
        this.curPage = 1;
        this.search();
      },
      async search() { // 公共查询函数，提供分页、编辑、新增、删除等操作后刷新列表
        let params = {
          curPage: this.curPage,
          pageSize: this.pageSize,
          title: this.filters.title
        };
        this.loading = true;
        const {data} = await axios.get('/product/list', { params: params });
        if (data.success) {
          this.loading = false;
          this.total = data.result.total;
          this.products = data.result.data;
        }
      },
      // 显示编辑界面
      editProduct(index, item) {
        this.isAddUi = true;
        this.isEdit = true;
        this.productForm = item; // 把列表对应行的内容赋给修改界面
      },
      createProduct() { // 创建产品记录，也就是清空产品界面，以便获取新输入值
        this.isAddUi = true;
        this.isEdit = false;
        this.productForm = {
          title: '',
          price: '',
          intro: '',
          images: [],
          parameters: []
        };
      },
      // 新增
      async saveProduct() {
        this.$refs.productForm.validate(async (valid) => {
          if (valid) {
            this.isEdit ? await this.$store.dispatch('updateProduct', this.productForm) : await this.$store.dispatch('addProduct', this.productForm);
            this.$confirm('产品保存成功', '提示', {type: 'warning'});
            this.isAddUi = false;
            this.$refs['productForm'].resetFields();
            this.search();
            /* this.productForm = {
              title: '',
              price: '',
              intro: '',
              images: [],
              parameters: []
            }; */
          }
        });
      },
      selsChange(sels) { // 选中的行记录
        this.sels = sels;
      },
      // 删除
      delProduct(index, item) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(async () => {
          await this.$store.dispatch('deleteProduct', item);
          this.search();
        }).catch(() => {
        });
      },
      // 批量删除
      async batchDelProducts() {
        // let ids = this.sels.map(item => item.id).toString();
        console.log(this.sels._id);
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.loading = true;
          /* API.removeBatch(ids).then((result) => {
            this.loading = false;
            if (result && parseInt(result.errcode) === 0) {
              this.$confirm('产品删除成功', '提示', {type: 'warning'});
              this.search();
            }
          }); */
        });
      }
    },
    mounted() {
      this.onSearch();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .demo-table-expand label
    font-weight: bold
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
