'use strict';

import express from 'express';
import AppModules from './src/app.modules';
import AppMongoose from './src/app.mongoose';
import AppRoutes from './src/app.routes';

const app = express();

AppMongoose();
AppModules(app);
AppRoutes(app);

export default app;
