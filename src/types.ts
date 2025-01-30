export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'club_admin';
  club_id?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  admin_id: string;
}

export interface Meeting {
  id: string;
  title: string;
  club_id: string;
  start_time: string;
  description: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  date: string;
  status: 'present' | 'absent';
  club_id?: string;
}