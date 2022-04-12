import { useState } from "react";
import { deleteCommentAction, updateCommentAction } from "../actions/comments.actions";

const CommentEdit = (props) => {
    const { articleId, comment } = props;
    const [state, setState] = useState({
        content: comment.content
    });
    const [editMode, setEditMode] = useState(false);


    const editClickHandler = () => {
        setEditMode(true);
    };

    const cancelHandler = () => {
        setEditMode(false);
    };

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

    const updateSuccess = () => {
        window.location.reload();
    }

    const deleteHandler = () => {
        const confirm = window.confirm("댓글을 삭제하시겠습니까?");

        if (!confirm) return;
        deleteCommentAction(articleId, comment.id, updateSuccess, alert);
    };

    const submitHandler = async () => {
        await updateCommentAction(articleId, comment.id, state, updateSuccess, alert);
    };

    return (
        <div className="comment-wrapper">
            {
                editMode ? (
                    <textarea className="comment-edit-textarea"
                        name="content"
                        placeholder="댓글 내용을 입력하세요."
                        value={state.content}
                        onChange={changeHandler}
                        onKeyDown={enterKeyDown} />
                ) : (<div>
                    <p className="comment-info">
                        <span>{comment.user.name}</span>
                        <span>{comment.createdAt}</span>
                    </p>
                    <div className="comment-content">
                        {comment.content}
                    </div>
                </div>)
            }
            <div className="comment-edit-button-group">
                {
                    editMode ? (<>
                        <button onClick={submitHandler}>완료</button>
                        <button onClick={cancelHandler}>취소</button>
                    </>) : (<>
                        <button onClick={editClickHandler}>수정</button>
                        <button onClick={deleteHandler}>삭제</button>
                    </>)
                }
            </div>
        </div>
    )
};

export default CommentEdit;