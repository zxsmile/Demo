import model from '../model';
import { controller, get, post, del, put } from '../decorator/router';
// Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。
import xss from 'xss';
import R from 'ramda';

@controller('/product')
export class ProductController {

  @get('/list')
  async getProducts(ctx, next) {
    let params = {
      curPage: parseInt(ctx.query.curPage || 1), //页码（默认第1页）
      pageSize: parseInt(ctx.query.pageSize || 10), //每页显示条数（默认10条）
      title: ctx.query.title || '', //图书名称
    }

    const obj = await model.product.getProducts(params);
    ctx.body = {
      result: obj,
      success: true
    };
  }

  @get('/get/:_id')
  async getProduct(ctx, next) {
    const { params } = ctx;
    const { _id } = params;
    console.log('---------Controller/getProduct');
    if (!_id) {
      return (ctx.body = {succes: false, err: '@get(/product/:_id) _id值不合法'});
    }
    const data = await model.product.getProduct(_id);

    ctx.body = {
      data: data,
      success: true
    };
  }

  // 创建
  @post('/add')
  async addProduct(ctx, next) {
    let product = ctx.request.body;
    product = {
      title: xss(product.title),
      price: xss(product.price),
      intro: xss(product.intro),
      images: R.map(xss)(product.images),
      parameters: R.map(
        item => ({
          key: xss(item.key),
          value: xss(item.value)
        })
      )(product.parameters)
    }

    try {
      product = await model.product.save(product);
      ctx.body = {
        success: true,
        data: product
      };
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

  // 更新
  @put('/update')
  async updateProduct(ctx, next) {
    let body = ctx.request.body;
    const { _id } = body;

    if (!_id) {
      return (ctx.body = {success: false, err: '@put(/product) _id值不合法'});
    }

    let product = await model.product.getProduct(_id);

    if (!product) {
      return (ctx.body = {
        succes: false,
        err: '此产品不存在'
      });
    }

    product.title = xss(body.title);
    product.price = xss(body.price);
    product.intro = xss(body.intro);
    product.images = R.map(xss)(body.images);
    product.parameters = R.map(
      item => ({
        key: xss(item.key),
        value: xss(item.value),
      })
    )(body.parameters);

    try {
      product = await model.product.update(product);

      ctx.body = {
        success: true,
        data: product
      };
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

  @del('/del/:_id')
  async delProduct(ctx, next) {
    const params = ctx.params
    const { _id } = params
    if (!_id) {
      return (ctx.body = {success: false, err: '@del(/product/:_id) _id值不合法'});
    }

    let product = await model.product.getProduct(_id);

    if (!product) {
      return (ctx.body = {success: false, err: '产品不存在！'});
    }

    try {
      await model.product.del(product);
      ctx.body = {
        success: true
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }
}

