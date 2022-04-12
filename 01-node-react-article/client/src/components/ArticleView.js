import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { deleteArticleAction, getArticleAction } from "../actions/articles.actions";
import { getCommentsAction } from "../actions/comments.actions";
import Comments from "./Comments";
import CommentWrite from "./CommentWrite";

const ArticleView = (props) => {
    const { user } = props;
    const { articleId } = useParams();
    const [article, setArticle] = useState({
        id: null,
        title: '',
        content: '',
        createdAt: '',
        updatedAt: '',
        user: {
            _id: '',
            name: '',
            email: ''
        }
    });

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getArticleAction(articleId, setArticle, () => { });
        return () => { };
    }, [articleId]);

    useEffect(() => {
        getCommentsAction(articleId, setComments, alert);
        return () => { };
    }, [articleId]);

    const editClickHandler = () => {
        window.location.pathname = `/${articleId}/edit`;
    };

    const deleteClickHandler = async () => {
        const confirm = window.confirm('게시글을 삭제하시겠습니까?');
        if (!confirm) return;
        const success = () => {
            alert('삭제되었습니다.');
            window.location.pathname = '/';
        };
        const fail = () => { };
        await deleteArticleAction(articleId, success, fail);
    };

    const commentWriteProps = { user, articleId };
    const commentsProps = { user, articleId, comments }

    return (<>
        <div className="article-wrapper">
            <p className="article-info">
                <span>작성자 : {article.user.name}({article.user.email})</span>
                <span>
                    작성일자 : {
                        article.createdAt === article.updatedAt
                            ? article.createdAt
                            : `${article.createdAt}(${article.updatedAt})`
                    }
                </span>
            </p>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-content">{article.content}</div>
            <div className="article-button-group">
                {user._id === article.user._id && (<>
                    <button onClick={editClickHandler}>수정</button>
                    <button onClick={deleteClickHandler}>삭제</button>
                </>)}
            </div>
        </div>
        <CommentWrite {...commentWriteProps} />
        <Comments {...commentsProps} />
    </>);
};

export default ArticleView;