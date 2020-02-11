<template>
  <section class="container">
    <input class="file" type="file" style="display:none" id="file" ref="input" @change="doUpload">
    <div class="quill-editor"
         :content="content"
         v-quill:myQuillEditor="editorOption">
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
    data () {
      const self = this;
      return {
        content: '',
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
                'image': function () { // 此处不能使用箭头函数(this是vm)，否则 this 指向不明确，此处的this应该是quill
                  this.quill.format('image', false); // 禁用quill内部上传图片方法
                  self.imgHandler(this);
                }
              }
            }
          }
        }
      };
    },
    methods: {
      imgHandler: (handle) => {
        this.quill = handle.quill;
        var inputfile = document.getElementById('file');
        inputfile.click();
      },
      doUpload: async function() {
        let file = document.getElementById('file').files[0];
        let formdata = new FormData(); // 创建form对象
        formdata.append('file', file, file.name);
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }; // 添加请求头
        let length = this.quill.getSelection().index;
        await axios.post('/upload/upImages/', formdata, config).then(res => {
          console.log('*************' + res.data.imgPath[0]);
          this.quill.insertEmbed(length, 'image', 'http://localhost:5000/upImages' + res.data.imgPath[0]);
          // this.quill.insertEmbed(length, 'image', 'https://goss4.vcg.com/editorial/vcg/800/new/VCG111179584558.jpg');
        }).catch((err) => {
          console.log('******数据上传失败*******' + err);
        });
      }
    }
  };
</script>
<style lang="css" scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
  }
  .container  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
