const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10; // 加密盐值
const MAX_LOGIN_ATTEMPTS = 5; // 登录次数
const LOCK_TIME = 2 * 60 * 60 * 1000; // 锁定时长
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: { // 角色: 普通用户(user)、管理员(admin)、超级管理员(root)
    type: String,
    default: 'admin'
  },
  nickname: String, // 昵称
  email: String, // 邮箱地址，用户账号
  password: String, // 用户密码
  hashed_password: String, // 密码
  loginAttempts: { // 尝试登录次数
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number, // 锁定时长
  meta: {
    createdAt: { // 创建时间
      type: Date,
      default: Date.now()
    },
    updatedAt: { // 更新时间
      type: Date,
      default: Date.now()
    }
  }
});
// 在Schema方法里，不要使用箭头函数，它会重新绑定this。

UserSchema.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

// 深坑：在此不能使用 => 函数，否则会改变 this，那样的话就无法获取 this.isNew
UserSchema.pre('save', function(next) {
  let user = this;
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  // if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods = {
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function (err, isMatch) {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  },
  incLoginAttempts: function (user) {
    const that = this;

    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) {
        that.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, function (err) {
          if (!err) resolve(true);
          else reject(err);
        });
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        };

        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          };
        }

        that.update(updates, err => {
          if (!err) resolve(true);
          else reject(err);
        });
      }
    });
  }
};

// mongoose 模型定义重复引用就报错：Cannot overwrite model once compiled 怎么解决？
try {
  var model = mongoose.model('User', UserSchema);
  module.exports = model;
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    model = mongoose.model('User');
  }
};
