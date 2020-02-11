import { controller, post} from '../decorator/router';
import model from '../model'
const path = require('path');
import { formatDate } from '../../common/utilDate';

@controller('/upload')
export class UploaderController {
  @post('/upImages')
  async upLoadImages(ctx, next) {
    // 设置图片上传路径
    const serverPath = path.join('.', '/static/upImages/')
    // 获取上传图片
    const result = await model.uploader.uploadFile(ctx, {
      fileType: formatDate(new Date(), 'yyyyMMdd'),
      path: serverPath
    });

    ctx.body = {
      error: 0,
      imgPath: result.imgPaths
    }
  }
}
