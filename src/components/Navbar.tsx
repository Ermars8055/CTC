import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Users, Calendar, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="src/pages/images/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-white">KIDS</span>
        </Link>

        <div className="flex items-center space-x-6">
          {user && (
            <>
              <Link to="/attendance" className="nav-link">
                <Users className="h-5 w-5" />
                <span>Attendance</span>
              </Link>
              <Link to="/clubs" className="nav-link">
                <Calendar className="h-5 w-5" />
                <span>Clubs</span>
              </Link>
              <Link to="/meetings" className="nav-link">
                <Calendar className="h-5 w-5" />
                <span>Meetings</span>
              </Link>
              <button className="nav-link">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
