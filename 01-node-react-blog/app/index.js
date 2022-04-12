'use strict';

const express = require('express');
const app = express();

require('./src/app.mongo')();
require('./src/app.middles')(app);
require('./src/app.routes')(app);

module.exports = app;
