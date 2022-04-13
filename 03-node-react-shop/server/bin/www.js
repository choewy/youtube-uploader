'use strict';

import app from '../app';

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000
const log = `Server running on port ${port}`;
app.listen(port, () => console.log(log));