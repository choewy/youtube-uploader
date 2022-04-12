import CommentEdit from "./CommentEdit";
import CommentView from "./CommentView";

const Comments = (props) => {
    const { user, articleId, comments } = props;

    return (
        <div className="comments-wrapper">
            {
                comments.map((comment, key) => {
                    if (user._id === comment.user._id) {

                        const commentEditProps = { key, articleId, comment };
                        return (
                            <CommentEdit  {...commentEditProps} />
                        );
                    }
                    const commentProps = { key, comment };
                    return (
                        <CommentView {...commentProps} />
                    );
                })
            }
        </div>
    );
};

export default Comments;