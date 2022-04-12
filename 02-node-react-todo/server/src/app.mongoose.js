'use strict';

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const mongoDBName = process.env.MONGO_DB_NAME;

const errorLog = 'MongoDB Connection Error!';
const successLog = 'MongoDB Connection Success!';

module.exports = () => mongoose.connect(
    mongoURI,
    { dbName: mongoDBName },
    (error) => error
        ? console.log(errorLog, error)
        : console.log(successLog)
);