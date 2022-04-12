'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.TOKEN_SECRET;
const EXPIRED = 3600;
const ROUNDS = 10;

const dateFormat = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9);

    return [
        date.getFullYear(), "-",
        `0${date.getMonth() + 1}`.slice(-2) + "-",
        `0${date.getDate()}`.slice(-2), " ",
        `0${date.getHours()}`.slice(-2), ":",
        `0${date.getMinutes()}`.slice(-2)
    ].join('');
};

module.exports = {
    dateFormatter: (doc) => {
        const { createdAt, updatedAt } = doc;
        return {
            ...doc._doc,
            createdAt: dateFormat(createdAt),
            updatedAt: dateFormat(updatedAt)
        };
    },
    hashPassword: async (user, password) => {
        const salt = await bcrypt.genSalt(ROUNDS);
        user.password = await bcrypt.hash(password, salt);
    },
    genToken: async (user) => {
        user.token = jwt.sign(user._id.toHexString(), SECRET);
        user.tokenExp = EXPIRED;
    },
    verifyPassword: async (password, user) => {
        return await bcrypt.compare(password, user.password);
    },
    verifyToken: async (token) => {
        return jwt.verify(token, SECRET);
    }
};


