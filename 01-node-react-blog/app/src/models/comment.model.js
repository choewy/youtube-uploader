'use strict';

const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    content: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    article: {
        type: Number,
        ref: 'Article'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);