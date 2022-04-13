'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const AppMiddlewares = (app) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(cookieParser());
  app.use(cors());
};

export default AppMiddlewares;
