const mongoosePaginate = require('mongoose-paginate');

function baseSetting(schema, options) {
  const { name } = options;
  if (!name) throw Error('baseSetting opitons must have collection name!');
  schema.set('timestamps', true); // createAt, updatedAt -> UTC
  schema.set('minimize', false); // if true, if you have a field which is empty, it will not save into db
  schema.set('collection', name);
  schema.set('autoIndex', true);
  schema.set('strict', true);
  schema.set('id', true);
  schema.set('toObject', { getters: true, virtuals: true, minimize: false, id: true });
  schema.set('toJSON', { getters: true, virtuals: true, minimize: false, id: true });

  schema.plugin(mongoosePaginate);
}

module.exports = {
  baseSetting,
};
