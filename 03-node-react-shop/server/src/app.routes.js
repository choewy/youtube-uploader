'use strict';

import CartController from './carts/cart.controller';
import GoodsController from './goods/goods.controller';
import UserController from './users/user.controller';

const AppRoutes = (app) => {
  app.use('/api/users', UserController());
  app.use('/api/goods', GoodsController());
  app.use('/api/cart', CartController());
  app.get('*', (_, res) => res.send('Static Page'));
};

export default AppRoutes;
