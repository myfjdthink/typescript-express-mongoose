'use strict';
import {BaseModel} from "./BaseModel";
import {Schema, Document} from "mongoose";
import mongoose = require('mongoose');

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

class UserModel extends BaseModel<IUser> {
}
const User = new UserModel('User', _schema)
export {IUser, User}