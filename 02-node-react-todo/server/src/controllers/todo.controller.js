'use strict';

const express = require('express');
const Todo = require('../models/todo.model');

const router = express.Router();

router.get('/', async (_, res) => {
    const todos = await Todo
        .find()
        .sort({ order: -1 });

    return res.status(200).send({ todos });
});

router.post('/', async (req, res) => {
    const { value } = req.body;

    let order = 1;
    const maxOrderTodo = await Todo
        .findOne()
        .sort({ order: -1 });

    if (maxOrderTodo) {
        order = maxOrderTodo.order + 1;
    }

    const todo = new Todo({ value, order });
    await todo.save();

    return res.status(200).send({ todo });
});

router.patch('/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const { done } = req.query;
    const { order, value } = req.body;

    const current = await Todo.findOne({ _id: todoId });

    if (done) {
        const doneAt = done === 'false' ? new Date() : null;
        const todo = await Todo.findOneAndUpdate(
            { _id: todoId },
            { $set: { doneAt } },
            { new: true }
        );
        return res.status(200).send({ todo });
    };

    if (order) {
        const target = await Todo.findOne({ order: order });
        if (target) {
            target.order = current.order;
            await target.save();
        };
        current.order = order;

        await current.save();
        return res.status(200).send({ current, target });
    };

    if (value) {
        await Todo.findOneAndUpdate(
            { _id: todoId },
            { $set: { value } },
            { new: true }
        );
        return res.status(200).send({ ok: true });
    };
});

router.delete('/:todoId', async (req, res) => {
    const { todoId } = req.params;
    await Todo.findOneAndDelete({ _id: todoId });
    return res.status(200).send({ ok: true });
});

module.exports = router;