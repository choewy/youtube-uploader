'use strict';

const userAuthMiddleware = require('../middlewares/user.auth.middle');
const articleValidMiddleware = require('../middlewares/article.valid.middle');
const CommentService = require('../services/comment.service');
const router = require('express').Router();

router.get(
    '/:articleId/comments',
    articleValidMiddleware,
    async (req, res) => {
        try {
            const { articleId } = req.params;
            const comments = await CommentService.getComments(articleId);
            return res.json({ ok: true, comments });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.post(
    '/:articleId/comments',
    userAuthMiddleware,
    articleValidMiddleware,
    async (req, res) => {
        try {
            const user = req.user;
            const { articleId } = req.params;
            const commentDto = req.body;
            const comment = await CommentService.createNewComment(user, articleId, commentDto);
            return res.json({ ok: true, comment });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.patch(
    '/:articleId/comments/:commentId',
    userAuthMiddleware,
    articleValidMiddleware,
    async (req, res) => {
        try {
            const user = req.user;
            const { articleId, commentId } = req.params;
            const commentDto = req.body;
            const comment = await CommentService.updateCommentById(user, articleId, commentId, commentDto);
            return res.json({ ok: true, comment });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        };
    }
);

router.delete(
    '/:articleId/comments/:commentId',
    userAuthMiddleware,
    articleValidMiddleware,
    async (req, res) => {
        try {
            const user = req.user;
            const { articleId, commentId } = req.params;
            await CommentService.deleteCommentById(user, articleId, commentId);
            return res.json({ ok: true });
        } catch (error) {
            const { message } = error;
            return res.json({ ok: false, error: message });
        }
    }
);

module.exports = router;