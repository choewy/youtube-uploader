import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/twitch/stream">Stream Keys</Link>
    </div>
  );
};

export default HomePage;
