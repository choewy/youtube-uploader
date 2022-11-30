import { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/components';
import {
  HomePage,
  TwitchLoginPage,
  TwitchRedirectPage,
  TwitchStreamPage,
} from '@/pages';

const App: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="" element={<HomePage />} />
        <Route path="twitch" element={<Outlet />}>
          <Route path="oauth">
            <Route path="" element={<TwitchLoginPage />} />
            <Route path="redirect" element={<TwitchRedirectPage />} />
          </Route>
          <Route path="stream">
            <Route path="" element={<TwitchStreamPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
