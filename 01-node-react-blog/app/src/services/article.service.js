'use strict';

const { dateFormatter } = require('../app.utils');
const Article = require('../models/article.model');
const IncrementService = require('./increment.service');

const joiner = [{ path: 'user', select: 'name email' }];

const ArticleService = {
    getArticles: async () => {
        const filter = { isDeleted: false };
        const sorts = { createdAt: -1 };
        const articles = await Article
            .find(filter)
            .populate(joiner)
            .sort(sorts)

        return articles.map(article => dateFormatter(article));
    },
    getArticleById: async (articleId) => {
        const filter = { id: articleId };
        const article = await Article
            .findOne(filter)
            .populate(joiner);

        if (!article) throw Error("존재하지 않는 게시글입니다.");
        if (article.isDeleted) throw Error("삭제된 게시글입니다.");

        return dateFormatter(article);
    },
    createNewArticle: async (user, articleDto) => {
        const { title, content } = articleDto;

        if (!title) throw Error("제목을 입력하세요.");
        if (!content) throw Error("내용을 입력하세요.");

        const articleId = await IncrementService.getNextSequence('article');
        const doc = { id: articleId, title, content, user: user._id };
        await Article.create(doc);

        const filter = { id: articleId, user: user._id }
        const article = await Article
            .findOne(filter)
            .populate(joiner);

        return dateFormatter(article);
    },
    updateArticleById: async (user, articleId, articleDto) => {
        const { title, content } = articleDto;

        if (!title) throw Error("제목을 입력하세요.");
        if (!content) throw Error("내용을 입력하세요.");

        const filter = { id: articleId, user: user._id };
        const update = { title, content };
        const options = { new: true };
        const article = await Article
            .findOneAndUpdate(filter, update, options)
            .populate(joiner);

        if (!article) throw Error("존재하지 않는 게시글입니다.");
        if (article.isDeleted) throw Error("삭제된 게시글입니다.");

        return dateFormatter(article);
    },
    deleteArticleById: async (user, articleId) => {
        const filter = { id: articleId, user: user._id };
        const update = { isDeleted: true };
        const article = await Article.findOneAndUpdate(filter, update);

        if (!article) throw Error("존재하지 않는 게시글입니다.");
        if (article.isDeleted) throw Error("이미 삭제된 게시글입니다.");
    }
};

module.exports = ArticleService;