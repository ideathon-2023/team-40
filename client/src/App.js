import Home from './pages/Home/Home';
import Explore from './pages/explore';
import Assignment from './pages/Assignment/Assignment';
import Thankyou from './pages/thankyou/thankyou';
import Logout from './pages/logout';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnprotectedRoute><Home /></UnprotectedRoute>} />
        <Route path="/Explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/Assignment" element={<Assignment />} />
        <Route path="/Thankyou" element={<Thankyou />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
