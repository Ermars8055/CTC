import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Clubs from './pages/Clubs';
import Meetings from './pages/Meetings';
import ClubLogin from './pages/ClubLogin';
import ClubDashboard from './pages/ClubDashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/club/:clubId/login" element={<ClubLogin />} />
            <Route path="/club/:clubId/dashboard" element={<ClubDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;