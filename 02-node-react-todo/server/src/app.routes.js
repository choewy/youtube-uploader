'use strict';

module.exports = (app) => {
    app.use('/api/todos', require('./controllers/todo.controller'));
    app.get('*', (_, res) => res.sendFile('../views/index.html'));
};