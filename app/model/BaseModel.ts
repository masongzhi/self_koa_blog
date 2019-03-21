import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate';
import { Document, Types, Schema } from 'mongoose';
import dbs from '../../config/initializer';
const db = dbs.get('blog');

const ObjectId = function(id) {
  return Types.ObjectId(id);
};

class BaseModel extends Document {
  schema: any;
  name: string;
  statics?: object;
  methods?: object;
  constructor() {
    super();
    this.schema = {};
    this.statics = {};
    this.methods = {};
  }

  init() {
    const _schema: Schema = new Schema(this.schema);
    const _db = db;

    _schema.set('timestamps', true); // createAt, updatedAt -> UTC
    _schema.set('minimize', false); // Mongoose will, by default, "minimize" schemas by removing
    // empty objects.
    _schema.set('collection', this.name);
    _schema.set('strict', false);
    _schema.set('id', true);
    _schema.set('db', _db);
    _schema.set('toObject', { getters: true, virtuals: true, minimize: false, id: true });
    _schema.set('toJSON', { getters: true, virtuals: true, minimize: false, id: true });

    if (this.statics) {
      _schema.statics = this.statics;
    }
    if (this.methods) {
      _schema.methods = this.methods;
    }
    _schema.plugin(uniqueValidator);
    _schema.plugin(mongoosePaginate);

    const model = _db.model(this.name, _schema);
    model.ObjectId = ObjectId;

    return model;
  }
}

export default BaseModel;
