'use strict';

const express = require('express');
const path = require('path');

const build = path.join(__dirname, '../view');
const html = path.join(__dirname, '../view/index.html');

module.exports = (app) => {
    app.use('/api/auth', require('./controllers/user.controller'));
    app.use('/api/articles', require('./controllers/article.controller'));
    app.use('/api/articles', require('./controllers/comment.controller'));

    app.use(express.static(build));
    app.get('*', (req, res) => res.sendFile(html));
};
