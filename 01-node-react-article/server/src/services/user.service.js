'use strict';

const User = require('../models/user.model');
const { genToken, verifyPassword, verifyToken, hashPassword } = require('../app.utils');

const UserService = {
    createUser: async (userDto) => {
        const { name, email, password } = userDto;

        if (!name) throw Error("이름을 입력하세요.");
        if (!email) throw Error("이메일을 입력하세요.");
        if (!password) throw Error("비밀번호를 입력하세요.");

        const filter = { email };
        const exist = await User.findOne(filter);
        if (exist) throw Error("이미 존재하는 이메일입니다.");

        const user = new User(userDto);

        try {
            await hashPassword(user, password);
        } catch {
            throw Error('비밀번호 암호화 과정에 오류가 발생하였습니다.');
        }

        try {
            await genToken(user);
            await user.save();
            return user;
        } catch {
            throw Error('토큰 생성 중에 오류가 발생하였습니다.');
        };
    },
    verifyUser: async (userDto) => {
        const { email, password } = userDto;

        if (!email) throw Error("이메일을 입력하세요.");
        if (!password) throw Error("비밀번호를 입력하세요");

        const filter = { email };
        const user = await User.findOne(filter);
        if (!user) throw Error("존재하지 않는 계정입니다.");

        const valid = await verifyPassword(password, user);
        if (!valid) throw Error("비밀번호가 일치하지 않습니다.");

        try {
            await genToken(user);
            await user.save();
            return user;
        } catch {
            throw Error('토큰 생성 중에 오류가 발생하였습니다.');
        };
    },
    verifyAuth: async (cookieToken) => {
        try {
            const _id = await verifyToken(cookieToken);
            const filter = { _id, token: cookieToken };
            const user = await User.findOne(filter);
            if (user) return user;
        } catch {
            throw Error("유효하지 않은 토큰입니다.");
        }

        throw Error("접근 권한이 없습니다.");
    },
    expireToken: async (userDto) => {
        const { _id } = userDto;
        const filter = { _id };
        const update = { token: '', tokenExp: 0 };
        await User.findOneAndUpdate(filter, update);
    }
};

module.exports = UserService;