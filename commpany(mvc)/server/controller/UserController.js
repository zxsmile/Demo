import model from '../model';
import { controller, get, post, required } from '../decorator/router';

@controller('/user')
export class UserController {

  @post('login')
  @required({body: ['email', 'password']})
  async login (ctx, next) {
    const { email, password } = ctx.request.body;
    const data = await model.user.login(email, password);
    const { user, match } = data;
    if (match) {
      if (user.role !== 'admin') {
        return (ctx.body = {
          success: false,
          err: '来错地方了'
        });
      }

      ctx.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        nickname: user.nickname
      }
      return (ctx.body = {
        success: true,
        data: {
          email: user.email,
          nickname: user.nickname
        }
      });
    }
    return (ctx.body = {
      success: false,
      err: '密码错误'
    });
  }

  @post('add')
  async addUser (ctx, next) {
    const user0 = ctx.request.body;
    const data = await model.user.save(user0);

    const { user, IsExist } = data;
    if (IsExist) {
      return (ctx.body = {
        success: false,
        err: '该用户已经注册'
      });
    }

    return (ctx.body = {
      success: true,
      data: {
        email: user.email,
        nickname: user.nickname
      }
    });
  }

  @post('logout')
  async logout (ctx, next) {
    ctx.session = null;
    return(ctx.body = {
      success: true,
      msg: '退出系统登录'
    });
  }
}

