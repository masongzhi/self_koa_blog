const { User } = require('../model');
const AppError = require('../lib/AppError');
const bcrypt = require('bcrypt');
const qiniu = require('qiniu');

class UserService {
  async register(param) {
    const oldUser = await User.findOne({ username: param.username });
    if (oldUser) throw new AppError('用户名' + param.username + '已经注册过');
    const user = await User.create(param);
    return user;
  }
  async login(param) {
    const { username, password } = param;
    const user = await User.findOne({ username });
    if (!user) throw new AppError(`用户名${username}不存在`);
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw new AppError('密码不正确，请重新输入');
    }
    return user;
  }

  async getQiniuToken() {
    const accessKey = process.env.ACCESS_KEY;
    const secretKey = process.env.SECRET_KEY;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const options = {
      scope: 'blog-avatar',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    return token;
  }
}

module.exports = new UserService();
