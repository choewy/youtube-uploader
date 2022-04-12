import { useState } from "react";
import { createArticleAction } from "../actions/articles.actions";

const ArticleWrite = () => {
    const [state, setState] = useState({
        title: '',
        content: ''
    });

    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setState({ ...state, [name]: value });
    };

    const submitHandler = async () => {
        const success = (article) => {
            const { id } = article;
            window.location.pathname = `/${id}`;
        };
        await createArticleAction(state, success, alert);
    };

    const cancelHandler = () => {
        window.location.pathname = '/';
    };

    return (
        <div className="article-write-wrapper">
            <div>
                <input
                    className="article-write-input"
                    type="text"
                    name="title"
                    placeholder="제목을 입력하세요."
                    value={state.title}
                    onChange={changeHandler} />
            </div>
            <div>
                <textarea
                    className="article-write-textarea"
                    type="text"
                    name="content"
                    placeholder="내용을 입력하세요."
                    rows={30}
                    value={state.content}
                    onChange={changeHandler} />
            </div>
            <div className="article-write-button-group">
                <button onClick={submitHandler}>게시</button>
                <button onClick={cancelHandler}>취소</button>
            </div>
        </div>
    )
};

export default ArticleWrite;