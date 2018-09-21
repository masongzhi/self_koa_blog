const fs = require('fs');
const path = require('path');

const models = fs.readdirSync(path.resolve(__dirname, './'));
let ret = {};
for (const model of models) {
  if (model === 'index.js' || model === 'BaseModel.js') {
    continue;
  }
  ret[model.slice(0, model.indexOf('.js'))] = require(`./${model}`);
}
module.exports = ret;
