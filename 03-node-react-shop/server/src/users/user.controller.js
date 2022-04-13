'use strict';

import {
  UserAuthorizePipe,
  UserSigninPipe,
  UserSignupPipe,
} from './user.pipes';
import UserService from './user.service';
import { Router } from 'express';

const UserController = () => {
  const router = Router();

  // user signup API
  router.post('/', UserSignupPipe, async (req, res) => {
    try {
      const userDto = req.body;
      const token = await UserService.signup(userDto);
      res.cookie('token', token);
      res.status(200).send({ ok: true });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  // user signin API
  router.post('/sign', UserSigninPipe, async (req, res) => {
    try {
      const userDto = req.body;
      const token = await UserService.signin(userDto);
      res.cookie('token', token);
      res.status(200).send({ ok: true });
    } catch (error) {
      const { code, message } = error;
      res.status(code).send({ message });
    }
  });

  // user auth check API
  router.get('/auth', UserAuthorizePipe, async (req, res) => {
    return res.status(200).send({
      ok: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  });

  // user signout API
  router.delete('/out', UserAuthorizePipe, async (_, res) => {
    res.cookie('token', undefined);
    res.status(200).send({ ok: true });
  });

  return router;
};

export default UserController;
