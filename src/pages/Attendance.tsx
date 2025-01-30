import React, { useState } from 'react';
import { Users, Check, X } from 'lucide-react';

export default function Attendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const students = [
    { id: 1, name: 'Alex Johnson', status: 'present', club: 'Build Club' },
    { id: 2, name: 'Sarah Chen', status: 'absent', club: 'Robotics Club' },
    { id: 3, name: 'Mike Peters', status: 'present', club: 'Gen AI Club' },
    { id: 4, name: 'Emma Wilson', status: 'present', club: 'Build Club' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input max-w-xs"
          />
          <button className="btn-primary">
            <Users className="h-4 w-4 mr-2 inline" />
            Mark Attendance
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Club</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.club}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-green-100 rounded">
                        <Check className="h-5 w-5 text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded">
                        <X className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}