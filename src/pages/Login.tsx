import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Admin credentials
    if (loginType === 'admin' && username === 'admin' && password === 'admin123') {
      setUser({
        id: '1',
        email: 'admin@kids.edu',
        name: 'Admin User',
        role: 'admin'
      });
      navigate('/');
      return;
    }

    // Student credentials
    if (loginType === 'student' && username === 'student' && password === 'student123') {
      setUser({
        id: '2',
        email: 'student@kids.edu',
        name: 'Student User',
        role: 'student'
      });
      navigate('/');
      return;
    }

    setError(`Invalid credentials. Use ${loginType}/${loginType}123`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="src/pages/images/logo.png" alt="KIDS Logo" className="h-16 w-16" />
          <h1 className="text-3xl font-bold mt-4">Welcome to KIDS</h1>
          <p className="text-gray-600 mt-2">Knowledge Integration and Discovery Space</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
              ${loginType === 'student' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setLoginType('student')}
          >
            <User className="h-5 w-5" />
            Student
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
              ${loginType === 'admin' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setLoginType('admin')}
          >
            <Shield className="h-5 w-5" />
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="input mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={loginType}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="input mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={`${loginType}123`}
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In as {loginType === 'admin' ? 'Administrator' : 'Student'}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4 space-y-1">
            <p>Demo Credentials:</p>
            <p>Student: username: <span className="font-mono">student</span> / password: <span className="font-mono">student123</span></p>
            <p>Admin: username: <span className="font-mono">admin</span> / password: <span className="font-mono">admin123</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}
