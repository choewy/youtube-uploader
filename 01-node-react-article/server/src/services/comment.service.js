'use strict';

const { dateFormatter } = require('../app.utils');
const Comment = require('../models/comment.model');
const IncrementService = require('./increment.service');
const joiner = [
    { path: 'user', select: 'name email' }
];

const CommentService = {
    getComments: async (articleId) => {
        const filter = { article: articleId, isDeleted: false };
        const sorts = { createdAt: -1 };
        const comments = await Comment
            .find(filter)
            .populate(joiner)
            .sort(sorts)

        return comments.map(comment => dateFormatter(comment));
    },
    createNewComment: async (user, articleId, commentDto) => {
        const { content } = commentDto;

        if (!content) throw Error("댓글 내용을 입력하세요.");

        const commentId = await IncrementService.getNextSequence('comment');
        const doc = { id: commentId, content, article: articleId, user: user._id };
        await Comment.create(doc);

        const filter = { id: commentId, article: articleId, user: user._id };
        const comment = await Comment
            .findOne(filter)
            .populate(joiner);

        return dateFormatter(comment);
    },
    updateCommentById: async (user, articleId, commentId, commentDto) => {
        const { content } = commentDto;

        if (!content) throw Error("댓글 내용을 입력하세요.");

        const filter = { id: commentId, article: articleId, user: user._id };
        const update = { content };
        const options = { new: true };
        const comment = await Comment
            .findOneAndUpdate(filter, update, options)
            .populate(joiner);

        if (!comment) throw Error("존재하지 않는 댓글입니다.");
        if (comment.isDeleted) throw Error("삭제된 댓글입니다.");

        return dateFormatter(comment);
    },
    deleteCommentById: async (user, articleId, commentId) => {
        const filter = { id: commentId, article: articleId, user: user._id };
        const update = { isDeleted: true };
        const comment = await Comment.findOneAndUpdate(filter, update);

        if (!comment) throw Error("존재하지 않는 댓글입니다.");
        if (comment.isDeleted) throw Error("이미 삭제된 댓글입니다.");
    }
};

module.exports = CommentService;