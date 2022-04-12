import React from 'react';

const CommentView = (props) => {
    const { comment } = props;

    return (
        <div className="comment-wrapper">
            <p className="comment-info">
                <span>{comment.user.name}</span>
                <span>{comment.createdAt}</span>
            </p>
            <div className="comment-content">
                {comment.content}
            </div>
        </div>
    )
};

export default CommentView;