import axios from 'axios';

export const getArticlesAction = async (success, fail) => {
    try {
        const { data: { ok, articles, error } } = await axios.get('/api/articles');
        if (!ok) return fail(error);

        return success(articles);
    } catch (error) {
        console.log(error);
    }
};

export const getArticleAction = async (articleId, success, fail) => {
    try {
        const { data: { ok, article, error } } = await axios.get(`/api/articles/${articleId}`);
        if (!ok) return fail(error);

        return success(article);
    } catch (error) {
        console.log(error);
    }
};

export const createArticleAction = async (state, success, fail) => {
    try {
        const { title, content } = state;
        if (!title) return fail("제목을 입력하세요.");
        if (!content) return fail("내용을 입력하세요.");

        const { data: { ok, article, error } } = await axios.post('/api/articles', state);
        if (!ok) return fail(error);

        return success(article);
    } catch (error) {
        console.log(error);
    }
};

export const updateArticleAction = async (articleId, state, success, fail) => {
    try {
        const { title, content } = state;
        if (!title) return fail("제목을 입력하세요.");
        if (!content) return fail("내용을 입력하세요.");

        const { data: { ok, article, error } } = await axios.patch(`/api/articles/${articleId}`, state);
        if (!ok) return fail(error);

        return success(article);
    } catch (error) {
        console.log(error);
    }
}

export const deleteArticleAction = async (articleId, success, fail) => {
    try {
        const { data: { ok, error } } = await axios.delete(`/api/articles/${articleId}`);
        if (!ok) return fail(error);

        return success();
    } catch (error) {
        console.log(error);
    }
};