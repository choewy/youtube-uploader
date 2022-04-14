'use strict';

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import CartController from './src/carts/cart.controller';
import GoodsController from './src/goods/goods.controller';
import UserController from './src/users/user.controller';

const __dirname = path.resolve();

class App {
  constructor() {
    this.env = this.env();
    this.app = express();
    this.static = path.join(__dirname, 'views');
    this.mongoose();
    this.middlewares();
    this.routers();
  }

  env() {
    dotenv.config();
    return {
      // eslint-disable-next-line no-undef
      port: process.env.PORT || 5000,
      // eslint-disable-next-line no-undef
      secret: process.env.JWT_SECRET_KEY || 'secret',
      rounds: 10,
      jwtOptions: { expiresIn: 3600 },
      mongoose: {
        // eslint-disable-next-line no-undef
        uri: process.env.MONGO_URI,
        // eslint-disable-next-line no-undef
        dbName: process.env.MONGO_DB_NAME,
      },
    };
  }

  mongoose() {
    const {
      mongoose: { uri, dbName },
    } = this.env;

    const logs = {
      success: 'MongoDB Connection Success!',
      error: 'MongoDB Connection Error!',
    };

    mongoose.connect(uri, { dbName }, (error) =>
      console.log(error ? logs.error : logs.success, error),
    );
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(this.static));
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  routers() {
    this.app.use('/api/users', UserController());
    this.app.use('/api/goods', GoodsController());
    this.app.use('/api/cart', CartController());
    this.app.get('*', (_, res) => res.send('Static Page'));
  }

  listen() {
    const { port } = this.env;
    const log = `Server running on port ${port}`;
    this.app.listen(port, () => console.log(log));
  }
}

export default App;
