'use strict';

const express = require("express");
const app = express();

require('./src/app.mongoose')();
require('./src/app.middlewares')(app);
require('./src/app.routes')(app);

module.exports = app;