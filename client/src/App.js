import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import Assignment from './pages/Assignment';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/Assignment" element={<Assignment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
