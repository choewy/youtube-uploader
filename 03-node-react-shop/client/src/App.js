import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>App</div>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
