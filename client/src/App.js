import Home from './pages/Home';
import Explore from './pages/explore';
import Assignment from './pages/Assignment';
import Thankyou from './pages/thankyou';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [cookies] = useCookies(['user']);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/Assignment" element={ <Assignment />} />
        <Route path="/Thankyou" element={<Thankyou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
