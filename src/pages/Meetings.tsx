import React from 'react';
import { Calendar, Clock, Users, Video, MessageSquare } from 'lucide-react';

export default function Meetings() {
  const meetings = [
    {
      id: 1,
      title: 'Build Club Weekly Sync',
      club: 'Build Club',
      date: '2024-03-15T15:00:00',
      attendees: 12,
      status: 'upcoming',
      description: 'Weekly sync to discuss ongoing projects and new ideas.',
    },
    {
      id: 2,
      title: 'Robotics Competition Prep',
      club: 'Robotics Club',
      date: '2024-03-16T14:00:00',
      attendees: 8,
      status: 'upcoming',
      description: 'Preparation meeting for the upcoming robotics competition.',
    },
    {
      id: 3,
      title: 'AI Model Training Workshop',
      club: 'Gen AI Club',
      date: '2024-03-14T16:00:00',
      attendees: 15,
      status: 'completed',
      description: 'Workshop on training and fine-tuning AI models.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <button className="btn-primary">Schedule Meeting</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="card">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">{meeting.title}</h2>
                  <p className="text-gray-600">{meeting.description}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>{new Date(meeting.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>{new Date(meeting.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>{meeting.attendees} Attendees</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                {meeting.status === 'upcoming' ? (
                  <>
                    <button className="btn-primary flex items-center space-x-2">
                      <Video className="h-5 w-5" />
                      <span>Join Meeting</span>
                    </button>
                    <button className="btn-primary flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Chat</span>
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500">Meeting Completed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}