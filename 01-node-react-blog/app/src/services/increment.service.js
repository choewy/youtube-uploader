'use strict';

const Increment = require('../models/increment.model');

const IncrementService = {
    setNewSequcne: async (key) => {
        const filter = { key };
        const row = await Increment.findOne(filter);
        if (!row) await Increment.create({ key });
    },
    getNextSequence: async (key) => {
        const filter = { key };
        const update = { $inc: { seq: 1 } };
        const options = { new: true };
        const { seq } = await Increment.findOneAndUpdate(filter, update, options);
        return seq;
    }
};

module.exports = IncrementService;