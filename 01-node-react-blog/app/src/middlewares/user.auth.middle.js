'use strict';

const UserService = require("../services/user.service");

const keys = {
    token: process.env.COOKIE_TOKEN_KEY,
    tokenExp: process.env.COOKIE_TOKEN_EXP_KEY
};

const userAuthMiddleware = async (req, res, next) => {
    try {
        const cookieToken = req.cookies[keys.token];
        const user = await UserService.verifyAuth(cookieToken);
        req.token = cookieToken;
        req.user = user;
        next();
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    }
};

module.exports = userAuthMiddleware;