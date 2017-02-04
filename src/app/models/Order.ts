'use strict';
import {BaseModel} from './BaseModel';
import {Document, Schema} from 'mongoose'

interface IOrder extends Document {
  amount: string;
  oType: string;
  pType: string;
  status: string;
  createdAt: Date;
}

const _schema = new Schema({
  amount: {type: Number},
  oType: {type: Number},
  pType: {type: Number},
  status: {type: Number},
  bankcard: {type: String},
  parent_id: {type: String},
  createdAt: {type: Date, default: Date.now}
}, {collection: 'order', id: true});

_schema.path('amount').required(true, 'Order amount cannot be blank');
_schema.path('status').required(true, 'Order status cannot be blank');

_schema.pre('remove', function (next) {
  next();
});

class Order extends BaseModel<IOrder> {
}
const order = new Order('order', _schema)
export default order
