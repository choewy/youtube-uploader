'use strict';

import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  userId: {
    type: String,
  },
  goodsId: {
    type: String,
    ref: 'Goods',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

CartSchema.set('toJSON', {
  virtuals: true,
});

const Cart = model('Cart', CartSchema);
export default Cart;
