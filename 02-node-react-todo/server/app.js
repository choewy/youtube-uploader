'use strict';

const express = require("express");
const app = express();

require('./src/app.middlewares')(app);

module.exports = app;