'use strict';

import GoodsErrors from './goods.errors';
import Goods from './goods.model';

const GoodsService = {
  getAllGoods: async (category) => {
    return await Goods.find(category ? { category } : {});
  },
  getOneGoods: async (goodsId) => {
    const goods = await Goods.findById(goodsId);
    if (!goods) throw GoodsErrors.NotFoundGoods();
    return goods;
  },
  createGoods: async (goods) => {
    await Goods.create(goods);
  },
};

export default GoodsService;
