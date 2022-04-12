'use strict';

const userAuthMiddleware = require('../middlewares/user.auth.middle');
const UserService = require('../services/user.service');
const keys = {
    token: process.env.COOKIE_TOKEN_KEY,
    tokenExp: process.env.COOKIE_TOKEN_EXP_KEY
};

const router = require('express').Router();

router.post(
    '/',
    async (req, res) => {
        const userDto = req.body;
        try {
            const user = await UserService.createUser(userDto);
            const { _id, email, name } = user;
            res.cookie(keys.token, user.token);
            res.cookie(keys.tokenExp, user.tokenExp);
            return res.json({ ok: true, user: { _id, email, name } });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        }
    }
);

router.patch(
    '/',
    async (req, res) => {
        const userDto = req.body;
        try {
            const user = await UserService.verifyUser(userDto);
            const { _id, email, name } = user;
            res.cookie(keys.token, user.token);
            res.cookie(keys.tokenExp, user.tokenExp);
            return res.json({ ok: true, user: { _id, email, name } });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        }
    }
);

router.delete(
    '/',
    userAuthMiddleware,
    async (req, res) => {
        const userDto = req.user;
        await UserService.expireToken(userDto);
        return res.json({ ok: true });
    }
);

router.get(
    '/',
    userAuthMiddleware,
    async (req, res) => {
        const { _id, email, name } = req.user;
        return res.json({ ok: true, user: { _id, email, name } });
    }
);

module.exports = router;