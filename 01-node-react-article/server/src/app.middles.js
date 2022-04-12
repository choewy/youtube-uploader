'use strict';

const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors());
};
