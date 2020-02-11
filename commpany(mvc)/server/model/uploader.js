const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

// 写入目录
const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
  return false;
};

function getSuffix (fileName) {
  return fileName.split('.').pop();
}
// 重命名
function Rename (fileName) {
  return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName);
}

// 上传到本地服务器
export async function uploadFile (ctx, options) {
  const _emmiter = new Busboy({headers: ctx.req.headers});
  const fileType = options.fileType;
  const filePath = path.join(options.path, fileType);
  const confirm = mkdirsSync(filePath);
  if (!confirm) {
    return;
  }
  let imgPaths = []; // 注意路径的定义位置
  return new Promise((resolve, reject) => {
    _emmiter.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const fileName = Rename(filename);
      const saveTo = path.join(path.join(filePath, fileName));
      file.pipe(fs.createWriteStream(saveTo));
      file.on('end', () => {
        imgPaths.push(`upImages/${fileType}/${fileName}`);
        resolve({
          imgPaths: imgPaths,
          imgKey: fileName
        });
      });
    });
    _emmiter.on('finish', () => {
      console.log('finished...');
    });
    _emmiter.on('error', (err) => {
      console.log('err...');
      reject(err);
    });
    ctx.req.pipe(_emmiter);
  });
}
