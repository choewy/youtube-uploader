import { Link } from "react-router-dom";

const Header = (props) => {
    const { user } = props;

    if (user === null) return <></>;

    return (
        <div className="header-wrapper">
            <ul className="header-menu-list">
                <li className="header-menu-item">
                    <Link className="header-menu-link" to="/" >홈</Link>
                </li>
                {!user && <li className="header-menu-item">
                    <Link className="header-menu-link" to="/signin" >로그인</Link>
                </li>}
                {!user && <li className="header-menu-item">
                    <Link className="header-menu-link" to="/signup" >회원가입</Link>
                </li>}
                {user && <li className="header-menu-item">
                    <Link className="header-menu-link" to="/write" >글작성</Link>
                </li>}
                {user && <li className="header-menu-item">
                    <Link className="header-menu-link" to="/signout">로그아웃</Link>
                </li>}
            </ul>
        </div>
    )
};

export default Header;