'use strict';

require('dotenv').config();

const app = require("../app");
const port = process.env.PORT || 5000;
const log = `Server running on port ${port}`;

app.listen(port, () => console.log(log));