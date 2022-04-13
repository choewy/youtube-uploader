import { useEffect, useState } from 'react';
import { authorizeAction } from './actions/user.actions';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mypage from './components/Mypage';
import Signout from './components/Signout';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      const { ok, user } = await authorizeAction();
      if (ok) return setUser(user);
      setUser(false);
    };
    authorize();
    return () => {};
  }, []);

  if (user === null) return <></>;

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<div>App</div>} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/mypage"
          element={!user ? <Navigate to="/signin" /> : <Mypage user={user} />}
        />
        <Route
          path="/signout"
          element={!user ? <Navigate sto="/signin" /> : <Signout />}
        />
      </Routes>
    </div>
  );
};

export default App;
