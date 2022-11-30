import { Cookie, TwitchApi } from '@/services';
import { useSetUser } from '@/states';
import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const effectCallback = useCallback(async () => {
    try {
      const user = await TwitchApi.getUserByToken();
      setUser(user);
    } catch {
      navigate('/twitch/oauth', { replace: true });
    }
  }, [setUser, navigate]);

  useEffect(() => {
    if (Cookie.getTwitchAccessToken()) {
      effectCallback();
    } else {
      navigate('/twitch/oauth', { replace: true });
    }
  }, [effectCallback, navigate]);

  return <Outlet />;
};
