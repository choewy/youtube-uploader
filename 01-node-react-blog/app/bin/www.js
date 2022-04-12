'use strict';

require('dotenv').config();

const app = require('../index');
const port = process.env.NODE_PORT || 5000;
const log = `Server Running on port ${port}`;

app.listen(port, () => console.log(log));
