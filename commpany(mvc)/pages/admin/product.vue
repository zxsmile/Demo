<template>
<div>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    
    <el-col :span="24" class="warp-main">
      <!--工具条 -->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input  v-model="filters.title" placeholder="产品名称" @keyup.enter.native="onSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createProduct">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      
      <!-- 列表 -->
      <!-- 当el-table元素中注入data对象数组后，在el-table-column中:
           1. 用prop属性来对应对象中的键名即可填入数据，
           2. 用label属性来定义表格的列名,
           3. 可以使用width属性来定义列宽。
      -->
      <el-table :data="products.data" highlight-current-row stripe border
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="price" label="价格" width="100" sortable></el-table-column>
        <el-table-column prop="images[0]" label="图片">
          <template slot-scope="scope">
            <!--http://localhost:5000/upImages 不需要static/upImages-->
            <img :src="'http://localhost:5000/' + scope.row.images[0]" alt="" style="width: 50px;height: 50px">
            <!-- <img src='http://localhost:5000/upImages/20181220/01.png' alt="" style="width: 50px;height: 50px"> -->
          </template>
        </el-table-column>
        <!-- 展开行 -->
        <!-- 通过设置 type="expand" 和 Scoped slot 可以开启展开行功能 -->
        <el-table-column type="expand" label="参数" width="100" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="[产品参数]">
                <el-table :data="props.row.parameters" style="width: 100%;" border stripe>
                  <el-table-column prop="key" label="参数"></el-table-column>
                  <el-table-column prop="value" label="值"></el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <!-- 自定义列模板 -->
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <template slot-scope="scope">
            <el-button size="small" @click="editProduct(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteProduct(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="onCurChange" :page-size="5" :total="products.total"
                       style="text-align:center;">
        </el-pagination>
      </el-col>
    </el-col>
  </el-row>
  <!-- 新增/编辑 -->
  <div class="edit-product" :class="{active: isAddUi}">
    <div class="edit-header">
      <div style="flex: 1;">
        <div class="material-icon" @click="isAddUi = false">close</div>
      </div>
    </div>
    <div class="edit-body">
      <div class="form edit-form">
        <div class="input-group">
          <label>标题</label>
          <input v-model="productForm.title" />
        </div>
        <div class="input-group">
          <label>价格</label>
          <input v-model="productForm.price" type="number" />
        </div>
        <div class="input-group">
          <label>简介</label>
          <!-- 富文本 start-->
          <section class="quill">
            <input class="file" type="file" style="display:none" id="file" ref="input" @change="doUpload">
            <div class="quill-editor"
                 v-model="productForm.intro"
                 v-quill:myQuillEditor="editorOption">
            </div>
          </section>
          <!-- 富文本 end-->
        </div>
        <!-- 图片上传 start-->
        <div class="input-group">
          <label>图片</label>
          <div class="upload-images">
            <div class="img" v-for="item, index in productForm.images">
              <img :src="'http://localhost:5000/' + item"/>
              <div class="tools">
                <div class="material-icon" @click="deleteImg(index)">close</div>
              </div>
            </div>
            <div class="upload-btn">
              <div class="text">上传图片</div>
              <input type="file" @change="uploadImg($event)" />
            </div>
          </div>
        </div>
        <!-- 图片上传 end-->
        <div class="input-group">
          <label>参数</label>
          <div class="parameters">
            <div class="inputs" v-for="item, index in productForm.parameters">
              <input v-model="item.key" placeholder="名称" />
              <input v-model="item.value" placeholder="值" />
              <div class="remove" @click="removeParam(index)">
                <div class="material-icon">remove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-footer">
      <button class="btn save" @click="saveProduct" v-if="!isEdit">创建产品</button>
      <button class="btn save" @click="saveProduct" v-if="isEdit">保存修改</button>
      <div class="btn add-parameter" @click="addParam">
        <div class="material-icon">add</div>添加参数
      </div>
    </div>
  </div>
  <div class="float-btn" @click="createProduct">
    <div class="material-icon">add</div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import axios from 'axios';
  export default {
    layout: 'admin', // 使用后台框架layouts/admin
    middleware: 'auth', // 登录验证
    head () { // 页面标题显示内容
      return {
        title: '产品列表'
      };
    },

    data () {
      const self = this;
      return {
        isAddUi: false, // 是否弹出编辑框界面
        isEdit: false, // 判断是新建还是编辑
        productForm: { // 新建/创建 界面中绑定属性
          title: '', // 产品名称
          price: '', // 产品价格
          intro: '', // 产品介绍
          images: [], // 产品对应的图片路径，图片可以是多个
          parameters: [] // 产品对应的参数，可以是多个
        },
        upLoadUrl: '/upload/upImages/', // 配置图片上传路由
        filters: { // 根据标题过滤
          title: ''
        },
        total: 0,
        curPage: 1, // 当前页
        pageSize: 5, // 每页显示条数
        // ---富文本相关配置开始---
        editorOption: {
          // some quill options
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],
                ['link', 'image'],
                [{'header': 1}, {'header': 2}], // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
                [{'direction': 'rtl'}], // text direction
                [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}], // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],
                ['clean'] // remove formatting button
              ],
              handlers: {
                'image': function() { // 此处不能使用箭头函数(this是vm)，否则 this 指向不明确，此处的this应该是quill
                  this.quill.format('image', false); // 禁用quill内部上传图片方法
                  self.imgHandler(this);
                }
              }
            }
          }
        } // ---富文本配置相关结束---
      };
    },
    async created() { // 获取所有产品，显示产品列表
      await this.search();
    },
    computed: { // mapState通过扩展运算符将store.state.products 映射this.products  这个this 很重要
      ...mapState({
        'products': state => state.modProduct.products
      })
    },
    methods: {
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
        await this.$store.dispatch('getProducts', params);
      },
      filterIntro (e) { // 把 intro中的 回车换行换成 <br />
        let html = e.target.value;
        html = html.replace(/\n/g, '<br />');
        this.productForm.intro = html;
      },
      imageUrl(img) {
        return 'http://localhost:5000/' + img;
      },
      async editProduct (index, item) { // 编辑产品内容，
        this.isAddUi = true;
        this.isEdit = true;
        this.productForm = item; // 把列表对应行的内容赋给修改界面
      },
      async deleteProduct (index, item) { // 删除列表对应行的内容
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(async () => {
          await this.$store.dispatch('deleteProduct', item);
          this.search();
        }).catch(() => {
        });
      },
      createProduct () { // 创建产品记录，也就是清空产品界面，以便获取新输入值
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
      async saveProduct() { // 保存修改后的产品值，或者保存新增的产品值。
        this.isEdit
          ? await this.$store.dispatch('updateProduct', this.productForm)
          : await this.$store.dispatch('addProduct', this.productForm);
        this.isAddUi = false;
        this.$confirm('产品保存成功', '提示', {type: 'warning'});
        this.search();
        this.productForm = {
          title: '',
          price: '',
          intro: '',
          images: [],
          parameters: []
        };
      },
      addParam () { // 添加产品参数
        this.productForm.parameters.push({
          key: '',
          value: ''
        });
      },
      removeParam (index) { // 移除产品参数
        this.productForm.parameters.splice(index, 1);
      },
      async uploadImg (e) { // 上传产品对应的图片
        let file = e.target.files[0];
        console.log(file);
        let formData = new FormData();
        formData.append('file', file, file.name);
        await axios.post(this.upLoadUrl, formData).then(res => {
          if (res.data.error === 0) {
            this.productForm.images.push(res.data.imgPath[0]);
          }
        }).catch((err) => {
          console.log('******数据上传失败*******' + err);
        });
      },
      deleteImg (index) { // 删除产品对应的图片
        this.productForm.images.splice(index, 1);
      },
      onCurChange(val) { // 分页功能
        this.curPage = val;
        this.search();
      },
      // ---富文本相关方法开始---
      imgHandler(handle) {
        this.quill = handle.quill;
        var inputfile = document.getElementById('file');
        inputfile.click();
      },
      doUpload: async function() { // 此处不能使用箭头函数(this是vm)，否则 this 指向不明确，此处的this应该是quill
        let file = document.getElementById('file').files[0];
        let formdata = new FormData(); // 创建form对象
        formdata.append('file', file, file.name);
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }; // 添加请求头
        let length = this.quill.getSelection().index;
        await axios.post(this.upLoadUrl, formdata, config).then(res => {
          console.log('*************' + res.data.imgPath[0]);
          this.quill.insertEmbed(length, 'image', 'http://localhost:5000/' + res.data.imgPath[0]);
          // this.quill.insertEmbed(length, 'image', 'https://goss4.vcg.com/editorial/vcg/800/new/VCG111179584558.jpg');
        }).catch((err) => {
          console.log('******数据上传失败*******' + err);
        });
      }
    }
    // ---富文本相关方法结束---
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../static/stylus/var'
  @import '../../static/stylus/color'
  .demo-table-expand label
    font-weight: bold
  .form
    display: flex
    flex-direction: column
  .btn
    &:focus
      outline: none
    &:hover
      background-color: hsla(0, 0%, 60%, 0.2)
    min-width: 88px
    min-height: 36px
    padding: 0 16px
    display: flex
    justify-content: center
    align-items: center
    position: relative
    overflow: hidden
    user-select: none
    cursor: pointer
    background: none
    border: 0
    border-radius: 2px
    color: $grey-900
    font-size: 14px
    font-weight: 500
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)
  .edit-form
    width: 60vw
    .input-group
      display: flex
      align-items: center
      border-bottom: 1px solid $grey-300
      min-height: 48px
      font-size: 14px
      .quill
        flex: 1
        max-height: 300px
        overflow-y: auto
      .quill-editor
        min-height: 150px
        max-height: 250px
        overflow-y: auto
      label
        width: 150px
        margin-right: 20px
      .images
        flex: 1
        margin-left: 20px
        max-height: 235px
        overflow: scroll
        display: flex
        flex-wrap: wrap
        .img
          border: 1px solid $grey-300
          margin: 2px
        img
          width: 100px
      input
        flex: 1
  .edit-product
    width: 480px
    min-height: 200px
    background-color: $white
    box-shadow: $shadow-4db
    position: fixed
    bottom: 0
    right: 100px
    transform: translateY(100%)
    transform-origin: top center
    transition: all 275ms $fastOutLinearIn
    border-radius: 4px 4px 0 0
    z-index: 9
    .edit-header
      width: calc(100% - 32px)
      height: 38px
      padding: 0 16px
      border-radius: 4px 4px 0 0
      display: flex
      align-items: center
      background-color: $grey-800
      color: $white
      .material-icon
        font-size: $title2
    .edit-body
      width: calc(100% - 32px)
      max-height: calc(100vh - 200px)
      overflow: scroll
      padding: 16px
      .edit-form
        width: 100%
        textarea
          min-height: 100px
          flex: 1
          margin: 16px 0
        label
          width: 80px
      .input-group
        width: 100%
      .parameters
        flex: 1
        display: flex
        flex-wrap: wrap
        padding: 16px 0
      .inputs
        display: flex
        justify-content: space-between
        margin-bottom: 10px
        flex: 1
        input
          width: 120px
          margin-right: 10px
          flex: 1
        .remove
          width: 25px
          height: 25px
          margin-top: 3px
          background-color: $red
          color: $white
          font-size: 20px
          display: flex
          justify-content: center
          align-items: center
          border-radius: 50%
          cursor: pointer
    .upload-images
      flex: 1
      min-height: 150px
      padding: 16px 0
      .img
        width: 85px
        height: 85px
        display: flex;
        justify-content:center
        align-items:center
        float: left
        margin: 0 10px 10px 0
        border: 1px solid $grey-200
        position: relative
        .tools
          width: 25px
          height: 25px
          line-height: 25px
          position: absolute
          top: 0
          right: 0
          z-index: 2
          opacity: 0.7
          .material-icon
            font-size: 22px
            color: $black
        img
          max-width: 100%
          max-height: 100%
      .upload-btn
        width: 85px
        height: 85px
        cursor: pointer
        border: 2px dotted $blue-grey-200
        border-radius: 4px
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        position: relative
        input
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          z-index: 2
          opacity: 0
        .text
          color: $blue-grey-400
    .edit-footer
      padding: 16px
      display: flex
      .save
        background-color: $blue
        color: $white
        box-shadow: $shadow-1db
      .add-parameter
        width: 80px
        margin-left: 20px
        float: left
    &.active
      transform: translateY(0)
      transition: all 275ms $linearOutSlowIn
  .float-btn
    width: 56px
    height: 56px
    display: flex
    justify-content: center
    align-items: center
    color: $white
    position: absolute
    bottom: 30px
    right: 26px
    border-radius: 50%
    box-shadow: $shadow-1db
    background-color: $pink
    cursor: pointer
    .material-icon
      font-size: 26px
</style>
