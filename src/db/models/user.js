import { model, Schema } from 'mongoose';

import { handleSaveError, setUpdateSetting } from './hooks.js';

import { emailRegexp } from '../../constans/users.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError);

usersSchema.pre('findOneAndUpdate', setUpdateSetting);

usersSchema.post('findOneAndUpdate', handleSaveError);

const UsersCollection = model('users', usersSchema);

export default UsersCollection;
