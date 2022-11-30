import { TwitchApi, Cookie } from '@/services';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TwitchRedirectPage = () => {
  const navigate = useNavigate();

  const effectCallback = useCallback(async () => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      try {
        const { accessToken } = await TwitchApi.getTokenByCode(code);
        Cookie.setTwitchAccessToken(accessToken);
        navigate('/twitch/stream', { replace: true });
      } catch (e) {
        navigate('/twitch/oauth', { replace: true });
      }
    }
  }, [navigate]);

  useEffect(() => {
    effectCallback();
  }, [effectCallback]);

  return <div>TWITCH</div>;
};

export default TwitchRedirectPage;
