import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authCheckAction } from './actions/auth.actions';
import Header from './components/Header';
import Signin from './components/Signin';
import Signout from './components/Signout';
import Signup from './components/Signup';
import { getArticlesAction } from './actions/articles.actions';
import Articles from './components/Articles';
import Article from './components/ArticleView';
import ArticleWrite from './components/ArticleWrite';
import ArticleEdit from './components/ArticleEdit';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    authCheckAction(setUser, () => { });
    return () => { };
  }, []);

  useEffect(() => {
    getArticlesAction(setArticles, () => { });
    return () => { };
  }, []);

  if (user === null) return <>Hello!</>;

  const headerProps = { user };
  const signupProps = { setUser };
  const signinProps = { setUser };
  const articlesProps = { articles };
  const articleProps = { user, articles };
  const articleEditProps = { user };

  return (
    <div className='app'>
      <Header {...headerProps} />
      <Routes>
        <Route path="/" element={<Articles {...articlesProps} />} />
        <Route path='/write' element={user ? <ArticleWrite /> : <Navigate to='/signin' />} />
        <Route path="/:articleId/edit" element={user ? <ArticleEdit {...articleEditProps} /> : <Navigate to='/signin' />} />
        <Route path="/:articleId" element={<Article {...articleProps} />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup {...signupProps} />} />
        <Route path='/signin' element={user ? <Navigate to='/' /> : <Signin {...signinProps} />} />
        <Route path='/signout' element={user ? <Signout {...signupProps} /> : <Navigate to='/signin' />} />
      </Routes>
    </div>
  )
};

export default App;