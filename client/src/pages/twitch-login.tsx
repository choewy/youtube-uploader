import { TwitchApi } from '@/services';

const TwitchLoginPage = () => {
  const onClickButton = async () => {
    const { path } = await TwitchApi.getLoginPagePath();
    window.location.href = path;
  };

  return <button onClick={onClickButton}>트위치 로그인</button>;
};

export default TwitchLoginPage;
