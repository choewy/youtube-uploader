import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleAction, updateArticleAction } from "../actions/articles.actions";

const ArticleEdit = (props) => {
    const { user } = props;
    const { articleId } = useParams();
    const [state, setState] = useState({
        title: '',
        content: ''
    });

    const setArticle = useCallback((article) => {
        const { title, content } = article;
        if (user._id === article.user._id) {
            return setState({ title, content });
        }
        alert('해당 게시물에 대한 수정 권한이 없습니다.');
        window.location.pathname = `/${articleId}`;
    }, [user, articleId]);

    const goBack = useCallback((error) => {
        alert(error);
        window.location.pathname = `/${articleId}`;
    }, [articleId]);

    useEffect(() => {
        getArticleAction(articleId, setArticle, goBack);
        return () => { };
    }, [articleId, setArticle, goBack]);

    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setState({ ...state, [name]: value });
    };

    const updateHandler = async () => {
        const success = (article) => {
            const { id } = article;
            alert("저장되었습니다.");
            window.location.pathname = `/${id}`;
        };
        await updateArticleAction(articleId, state, success, alert);
    };

    const cancelHandler = () => {
        window.location.pathname = `/${articleId}`;
    };

    return (
        <div className="article-edit-wrapper">
            <div>
                <input
                    className="article-edit-input"
                    type="text"
                    name="title"
                    placeholder="제목을 입력하세요."
                    value={state.title}
                    onChange={changeHandler} />
            </div>
            <div>
                <textarea
                    className="article-edit-textarea"
                    type="text"
                    name="content"
                    placeholder="내용을 입력하세요."
                    rows={30}
                    value={state.content}
                    onChange={changeHandler} />
            </div>
            <div className="article-edit-button-group">
                <button onClick={updateHandler}>저장</button>
                <button onClick={cancelHandler}>취소</button>
            </div>
        </div>
    )
};

export default ArticleEdit;