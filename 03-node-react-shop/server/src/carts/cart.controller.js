'use strict';

import { Router } from 'express';
import { UserAuthorizePipe } from '../users/user.pipes';
import CartService from './cart.service';

const CartController = () => {
  const router = Router();

  // 장바구니에 담긴 모든 상품 조회
  router.get('/', UserAuthorizePipe, async (req, res) => {
    const { userId } = req.user;
    const goods = await CartService.getMyGoods(userId);
    console.log(goods);
    res.status(200).send({ goods });
  });

  // 장바구니에 상품 추가
  router.post('/:goodsId', UserAuthorizePipe, async (req, res) => {
    try {
      const { userId } = req.user;
      const { goodsId } = req.params;
      const { quantity } = req.body;
      const goods = await CartService.addGoods(userId, goodsId, quantity);
      res.status(200).send({ goods });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  // 장바구니에 담긴 상품의 수 변경
  router.patch('/:goodsId', UserAuthorizePipe, async (req, res) => {
    try {
      const { userId } = req.user;
      const { goodsId } = req.params;
      const { quantity } = req.body;
      const goods = await CartService.updateGoods(userId, goodsId, quantity);
      res.status(200).send({ goods });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  // 장바구니에 담긴 상품 삭제
  router.delete('/:goodsId', UserAuthorizePipe, async (req, res) => {
    try {
      const { userId } = req.user;
      const { goodsId } = req.params;
      await CartService.deleteGoods(userId, goodsId);
      res.status(200).send({ goodsId });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  return router;
};

export default CartController;
