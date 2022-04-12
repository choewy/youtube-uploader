import React, { useState } from "react";
import { createCommentAction } from "../actions/comments.actions";

const CommentWrite = (props) => {
    const { user, articleId } = props;
    const [state, setState] = useState({
        content: ''
    });

    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setState({ ...state, [name]: value });
    };

    const enterKeyDown = async (e) => {
        const { shiftKey, keyCode } = e;
        if (!shiftKey && keyCode === 13) {
            e.preventDefault();
            return await submitHandler();
        };
    };

    const submitHandler = async () => {
        const createSuccess = () => window.location.reload();
        await createCommentAction(articleId, state, createSuccess, alert);
    };

    return (
        <div className="comment-write-wrapper">
            <textarea className="comment-write-textarea"
                name="content"
                value={state.content}
                placeholder={user ? '댓글 내용을 입력하세요.' : '로그인 후 댓글을 남길 수 있습니다.'}
                disabled={user ? false : true}
                onChange={changeHandler}
                onKeyDown={enterKeyDown} />
            <div className="comment-write-button-group">
                <button className="comment-write-button"
                    disabled={user ? false : true}
                    onClick={submitHandler}>
                    등록
                </button>
            </div>
        </div>
    );
};

export default CommentWrite;