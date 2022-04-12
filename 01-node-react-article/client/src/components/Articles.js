import { Link } from "react-router-dom";

const Articles = (props) => {
    const { articles } = props;

    return (
        <div className="articles-wrapper">
            <table className="articles-table">
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>제목</th>
                        <th>작성일시</th>
                        <th>수정일시</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles
                            .filter((article) => article.user !== null)
                            .map((article, key) => {
                                const { user } = article;
                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>
                                            <Link className='articles-title-link' to={`/${article.id}`}>
                                                {article.title}
                                            </Link>
                                        </td>
                                        <td>{article.createdAt}</td>
                                        <td>{article.updatedAt}</td>
                                        <td>{user.name}</td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Articles;