'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
    },
    password: {
        type: String
    },
    saltkey: {
        type: String
    },
    token: {
        type: String,
        default: ''
    },
    tokenExp: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);