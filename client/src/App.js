import Home from './pages/Home';
import Explore from './pages/explore';
import Assignment from './pages/Assignment';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Assignment" element={<Assignment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
