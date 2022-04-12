'use strict';

const ArticleService = require('../services/article.service');

const articleValidMiddleware = async (req, res, next) => {
    try {
        const { articleId } = req.params;
        await ArticleService.getArticleById(articleId);
        next();
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
};

module.exports = articleValidMiddleware;