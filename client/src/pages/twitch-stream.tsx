import { TwitchApi, TwitchUserStreamKeyResponse } from '@/services';
import { useUserValue } from '@/states';
import { useCallback, useEffect, useState } from 'react';

const TwitchStreamPage = () => {
  const user = useUserValue();

  const [streamKeys, setStreamKeys] = useState<TwitchUserStreamKeyResponse[]>(
    [],
  );

  const effectCallback = useCallback(async () => {
    if (user.clientId) {
      const data = await TwitchApi.getUserStreamKeys(
        user.userId,
        user.clientId,
      );

      setStreamKeys(data);
      try {
      } catch (e) {}
    }
  }, [user]);

  useEffect(() => {
    effectCallback();
  }, [effectCallback]);

  return <div>{streamKeys.map(({ streamId }) => streamId).join(', ')}</div>;
};

export default TwitchStreamPage;
