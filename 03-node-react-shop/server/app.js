'use strict';

import express from 'express';
import AppConfigs from './src/app.configs';
import AppMiddlewares from './src/app.middlewares';
import AppMongoose from './src/app.mongoose';
import AppRoutes from './src/app.routes';

const app = express();

AppConfigs(app);
AppMongoose(app);
AppMiddlewares(app);
AppRoutes(app);

export default app;