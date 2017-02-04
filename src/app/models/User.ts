'use strict';
import {BaseModel} from "./BaseModel";
import mongoose = require('mongoose');
import {Schema, Document} from "mongoose";

interface IUser extends Document {
  phone: string;
  real_name: string;
  createdAt: Date;
}
const _schema = new Schema({
  phone: {type: String},
  real_name: {type: String},
  createdAt: {type: Date}
}, {collection: 'user', id: true});

class User extends BaseModel<IUser> {
}
const user = new User('User', _schema)
export default user
