import mongoose from 'mongoose';
const Product = mongoose.model('Product');

export async function findProduct(_id) {
  const data = await Product
    .find({_id: _id})
    .exec();
  return data;
}

export async function getProducts(params) {
  let Products = await Product.find({});
  let total = 0;
  let rstPrds = []; // 最后得到的产品集合

  const {curPage, pageSize, title} = params;
  if (title.length > 0) {
    let filterProducts = Products.filter(prd => {
      return prd.title.indexOf(title) > -1;
    });
    total = filterProducts.length; // 总条数
    rstPrds = filterProducts.filter((u, index) => index < pageSize * curPage && index >= pageSize * (curPage - 1));
  } else {
    total = Products.length; // 总条数
    rstPrds = Products.filter((u, index) => index < pageSize * curPage && index >= pageSize * (curPage - 1));
  }
  return {
    total: total,
    data: rstPrds
  };
}

export async function getProduct(_id) {
  const data = await Product
    .findOne({
      _id: _id
    })
    .exec();

  return data;
}

export async function save(product) {
  product = new Product(product);
  product = await product.save();

  return product;
}

export async function update(product) {
  product = await product.save();

  return product;
}

export async function del(product) {
  try {
    await product.remove();
  } catch (e) {
  }
  return true;
}
