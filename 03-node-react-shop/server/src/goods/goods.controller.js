'use strict';

import { Router } from 'express';
import GoodsService from './goods.service';

const GoodsController = () => {
  const router = Router();

  router.get('/', async (req, res) => {
    const { category } = req.query;
    const goods = await GoodsService.getAllGoods(category);
    res.status(200).send({ goods: [...goods] });
  });

  router.get('/:goodsId', async (req, res) => {
    try {
      const { goodsId } = req.params;
      const goods = await GoodsService.getOneGoods(goodsId);
      res.status(200).send({ goods });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  // 임시 데이터 추가용
  router.post('/', async (req, res) => {
    try {
      const { goods } = req.params;
      await GoodsService.createGoods(goods);
      res.status(200).send({ goods });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  return router;
};

export default GoodsController;
