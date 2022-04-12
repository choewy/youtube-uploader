'use strict';

const mongoose = require('mongoose');
const IncrementService = require('./services/increment.service');
const mongoURI = process.env.MONGO_URI;
const mongoDBName = process.env.MONGO_DB_NAME;

module.exports = () => mongoose.connect(
    mongoURI,
    { dbName: mongoDBName },
    async (error) => {
        if (error) {
            return console.log('MongoDB Connection Error!', error);
        };
        await IncrementService.setNewSequcne('article');
        await IncrementService.setNewSequcne('comment');
        console.log('MongoDB Connection Success!');
    }
);