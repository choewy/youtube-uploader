'use strict';

import UserController from './users/user.controller';

const AppRoutes = (app) => {
  app.use('/api/users', UserController());
  app.get('*', (_, res) => res.send('Static Page'));
};

export default AppRoutes;
