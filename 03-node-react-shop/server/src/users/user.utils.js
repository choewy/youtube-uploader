'use strict';

import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppConfigs from '../app.configs';
const { rounds, secret, jwtOptions } = AppConfigs;

export const HashPassord = async (user) => {
  const salt = await bcrpyt.genSalt(rounds);
  user.password = await bcrpyt.hash(user.password, salt);
  await user.save();
};

export const VerifyPassword = async (password, user) => {
  return await bcrpyt.compare(password, user.password);
};

export const GenerateToken = async (userId) => {
  return jwt.sign({ userId }, secret, jwtOptions);
};

export const VerifyAuthorization = async (Authorization) => {
  const [type, token] = (Authorization || '').split(' ');
  if (type !== 'Bearer' || !token) return 0;
  try {
    const payload = jwt.verify(token, secret);
    if (!payload) return 1;
    return payload.userId;
  } catch (error) {
    if (error.message === 'jwt malformed') return 1;
    return 2;
  }
};
