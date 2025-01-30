import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Beaker, User, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function ClubLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'student' | 'staff'>('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const { setUser } = useAuthStore();

  // Demo credentials - In production, this would be handled by Supabase
  const DEMO_CREDENTIALS = {
    'build': {
      staff: { username: 'build_staff', password: 'staff123' },
      student: { username: 'build_student', password: 'student123' }
    },
    'robotics': {
      staff: { username: 'robotics_staff', password: 'staff123' },
      student: { username: 'robotics_student', password: 'student123' }
    },
    'genai': {
      staff: { username: 'genai_staff', password: 'staff123' },
      student: { username: 'genai_student', password: 'student123' }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clubId) {
      setError('Invalid club ID');
      return;
    }

    const clubCredentials = DEMO_CREDENTIALS[clubId as keyof typeof DEMO_CREDENTIALS];
    if (!clubCredentials) {
      setError('Invalid club');
      return;
    }

    const credentials = clubCredentials[loginType];
    if (username === credentials.username && password === credentials.password) {
      setUser({
        id: `${clubId}_${loginType}_1`,
        email: `${username}@kids.edu`,
        name: `${clubId.charAt(0).toUpperCase() + clubId.slice(1)} ${loginType}`,
        role: loginType === 'staff' ? 'club_admin' : 'student',
        club_id: clubId
      });
      navigate(`/club/${clubId}/dashboard`);
      return;
    }

    setError(`Invalid credentials. Use ${credentials.username}/${credentials.password}`);
  };

  if (!clubId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="card">
          <p className="text-red-600">Invalid club ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Beaker className="h-16 w-16 text-purple-600" />
          <h1 className="text-3xl font-bold mt-4">{clubId.toUpperCase()} Club Login</h1>
          <p className="text-gray-600 mt-2">Access your club dashboard</p>
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
              ${loginType === 'staff' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setLoginType('staff')}
          >
            <Shield className="h-5 w-5" />
            Staff
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
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In as {loginType === 'staff' ? 'Staff' : 'Student'}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>Demo Credentials:</p>
            <p className="font-mono text-xs mt-1">
              {DEMO_CREDENTIALS[clubId as keyof typeof DEMO_CREDENTIALS]?.[loginType].username} / {' '}
              {DEMO_CREDENTIALS[clubId as keyof typeof DEMO_CREDENTIALS]?.[loginType].password}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}