const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');

class User extends BaseModel {
  constructor() {
    super();
    this.name = 'user';
    this.schema = {
      avatar: { type: String },
      email: { type: String, required: true },
      username: { type: String, required: true },
      password: {
        type: String,
        required: true,
        set: function(password) {
          return bcrypt.hashSync(password, 10);
        },
      },
      role: { type: String, default: 'normal' }, // root: 管理员
    };
  }
}

module.exports = new User().init();
