'use strict';
import {Document, Schema, ModelUpdateOptions, QueryFindOneAndUpdateOptions} from 'mongoose';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId
/**
 * Module dependencies.
 */

class BaseModel<T extends Document> {
  private _model;
  private _schema: Schema;

  constructor(collection: string, schema: Schema) {
    if (!collection) {
      throw new Error('必须指定 collection name ')
    }
    this._schema = schema;
    this._model = mongoose.model<T>(collection, schema);
  }

  create(user: Object): T {
    return this._model.create(user)
  }

  findById(id: string): T {
    return this._model.findById(id).exec()
  }

  findOne(query: Object): T {
    return this._model.findOne(query).exec()
  }

  update(query: Object, doc: Object, options?: ModelUpdateOptions): {ok: number, nModified: number, n: number} {
    return this._model.update(query, doc, options).exec()
  }

  findOneAndUpdate(query: Object, doc: Object, options?: QueryFindOneAndUpdateOptions): T {
    return this._model.findOneAndUpdate(query, doc, options).exec()
  }

  remove(conditions: Object): {result: Object} {
    return this._model.remove(conditions).exec()
  }
}
export {BaseModel, ObjectId}