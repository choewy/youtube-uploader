import { Link } from 'react-router-dom';

const Header = (props) => {
  const { user } = props;
  return (
    <div className="header">
      <ul>
        {!user && (
          <li>
            <Link to="/signin">로그인</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/mybucket">장바구니</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/signout">로그아웃</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
