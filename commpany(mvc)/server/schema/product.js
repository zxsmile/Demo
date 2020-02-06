const mongoose = require('mongoose');

let ProductSchema = mongoose.Schema({
  price: String, // 产品价格
  title: String, // 产品标题
  intro: String, // 产品介绍
  images: [ // 产品对应的图片
    String
  ],
  parameters: [ // 产品对应的参数
    {
      key: String,
      value: String
    }
  ],
  meta: { // 创建日期和更新日期
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});
// 在Schema方法里，不要使用箭头函数，它会重新绑定this。
ProductSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});
// mongoose 模型定义重复引用就报错：Cannot overwrite model once compiled 怎么解决？
try {
  var model = mongoose.model('Product', ProductSchema);
  module.exports = model;
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    model = mongoose.model('Product');
  }
};
