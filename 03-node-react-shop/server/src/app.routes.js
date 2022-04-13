'use strict';

import UserRouter from './controllers/user.controller';

const AppRoutes = (app) => {
  app.use('/api/users', UserRouter);
  app.get('*', (_, res) => res.send('Static Page'));
};

export default AppRoutes;
