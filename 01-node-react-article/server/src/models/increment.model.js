'use strict';

const mongoose = require('mongoose');

const IncrementSchema = mongoose.Schema({
    key: {
        type: String,
        unique: true,
    },
    seq: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Increment", IncrementSchema);