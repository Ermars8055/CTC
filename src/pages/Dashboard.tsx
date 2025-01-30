import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Users, Notebook as Robot, Brain, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const gotodetailspage = () => {
    navigate('/details');
  };

  const clubs = [
    {
      id: 'build',
      name: 'Build Club',
      icon: Wrench,
      color: 'bg-blue-500',
    },
    {
      id: 'robotics',
      name: 'Robotics Club',
      icon: Robot,
      color: 'bg-green-500',
    },
    {
      id: 'genai',
      name: 'Gen AI Club',
      icon: Brain,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.name}</h1>
        <div className="flex items-center space-x-4">
          <Users className="h-6 w-6 text-purple-600" />
          <span>Today's Attendance: 24 members present</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="card hover:shadow-lg transition-shadow">
            <div className={`${club.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <club.icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
            <p className="text-gray-600 mb-4">Active members: 15</p>
            <button className="btn-primary w-full" onClick={gotodetailspage}>View Details</button>
          </div>
        ))}
      </div>
    </div> 
  );
}
