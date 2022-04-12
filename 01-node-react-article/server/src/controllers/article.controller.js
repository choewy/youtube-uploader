'use strict';

const userAuthMiddleware = require('../middlewares/user.auth.middle');
const ArticleService = require('../services/article.service');
const router = require('express').Router();

router.get(
    '/',
    async (_, res) => {
        try {
            const articles = await ArticleService.getArticles();
            return res.json({ ok: true, articles });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.get(
    '/:articleId',
    async (req, res) => {
        try {
            const { articleId } = req.params;
            const article = await ArticleService.getArticleById(articleId);
            return res.json({ ok: true, article });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.post(
    '/',
    userAuthMiddleware,
    async (req, res) => {
        try {
            const user = req.user;
            const articleDto = req.body;
            const article = await ArticleService.createNewArticle(user, articleDto);
            return res.json({ ok: true, article });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.patch(
    '/:articleId',
    userAuthMiddleware,
    async (req, res) => {
        try {
            const { articleId } = req.params;
            const user = req.user;
            const articleDto = req.body;
            const article = await ArticleService.updateArticleById(user, articleId, articleDto);
            return res.json({ ok: true, article });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.delete(
    '/:articleId',
    userAuthMiddleware,
    async (req, res) => {
        try {
            const user = req.user;
            const { articleId } = req.params;
            await ArticleService.deleteArticleById(user, articleId);
            return res.json({ ok: true });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

module.exports = router;