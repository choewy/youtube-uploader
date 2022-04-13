'use strict';

import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

const User = model('User', UserSchema);
export default User;
