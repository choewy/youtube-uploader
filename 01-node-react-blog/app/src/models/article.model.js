'use strict';

const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);