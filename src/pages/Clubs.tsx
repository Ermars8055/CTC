import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, MessageSquare, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Clubs() {
  const { user } = useAuthStore();
  
  const clubs = [
    {
      id: 'build',
      name: 'Build Club',
      description: 'Hardware and making things with your hands',
      members: 15,
      nextMeeting: '2024-03-15T15:00:00',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'robotics',
      name: 'Robotics Club',
      description: 'Building and programming robots',
      members: 12,
      nextMeeting: '2024-03-16T14:00:00',
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'genai',
      name: 'Gen AI Club',
      description: 'Exploring artificial intelligence and machine learning',
      members: 18,
      nextMeeting: '2024-03-17T16:00:00',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Research Clubs</h1>
        {user?.role === 'admin' && (
          <button className="btn-primary">Create New Club</button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="card">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={club.image}
                alt={club.name}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">{club.name}</h2>
                  <p className="text-gray-600 mt-1">{club.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>{club.members} Members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Next Meeting: {new Date(club.nextMeeting).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <span>Chat</span>
                  </div>
                  {user?.role === 'admin' && (
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span>Settings</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Link to={`/club/${club.id}/login`} className="btn-primary">
                    Club Login
                  </Link>
                  <button className="btn-primary">View Details</button>
                  {user?.role === 'admin' && (
                    <button className="btn-primary">Edit Club</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}