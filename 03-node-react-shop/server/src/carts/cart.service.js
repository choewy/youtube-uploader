'use strict';

import CartErrors from './cart.errors';
import Cart from './cart.model';

const CartService = {
  getMyGoods: async (userId) => {
    return await Cart.find({ userId }).populate('goodsId');
  },
  addGoods: async (userId, goodsId, quantity) => {
    await Cart.create({
      userId,
      goodsId,
      quantity: quantity ? quantity : 1,
    });
    return await Cart.findOne({ userId, goodsId }).populate('goodsId');
  },
  updateGoods: async (userId, goodsId, quantity) => {
    const goods = await Cart.findOneAndUpdate(
      { userId, goodsId },
      { $set: { quantity } },
      { new: true },
    ).populate('goodsId');
    if (!goods) throw CartErrors.NotFoundGoods();
    return goods;
  },
  deleteGoods: async (userId, goodsId) => {
    await Cart.findOneAndDelete({ userId, goodsId });
  },
};

export default CartService;
