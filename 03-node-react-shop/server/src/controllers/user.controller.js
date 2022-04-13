'use strict';

import User from '../models/user.model';
import { Router } from 'express';

const UserRouter = Router();

UserRouter.post('/signup', (req, res) => {
  const userDto = req.body;
  return res.send(userDto);
});

export default UserRouter;
