const { User } = require('../model');
const AppError = require('../lib/AppError');
const bcrypt = require('bcrypt');

class UserService {
  async register(param) {
    const user = await User.findOne({ username: param.username });
    if (user) throw new AppError('用户名' + param.username + '已经注册过');
    await User.create(param);
    return 'success';
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
}

module.exports = new UserService();
