'use strict';

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    value: { type: String },
    doneAt: { type: Date, default: null },
    order: { type: Number },
});

TodoSchema.virtual("todoId").get(function () {
    return this._id.toHexString();
});

TodoSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('Todo', TodoSchema);