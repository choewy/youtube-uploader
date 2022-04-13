'use strict';

import { Schema, model } from 'mongoose';

const GoodsSchema = new Schema(
  {
    name: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

GoodsSchema.virtual('goodsId').get(function () {
  return this._id.toHexString();
});

GoodsSchema.set('toJSON', {
  virtuals: true,
});

const Goods = model('Goods', GoodsSchema);
export default Goods;
