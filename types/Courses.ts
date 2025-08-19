export interface LiveCourses {
  id?: string;  
  courseName: string;
  description: string;
  meetingLink: string;
  password: string;
  instructor: string;
  date: string;
  time: string;
  selectedStudents: string[];  
}

export interface NewRecordedCourse {
  id?: string; 
  courseName: string
  description: string
  videoLink: string
  instructor: string
  duration: string
  category: string
  recordingDate: string
  selectedStudents: string[]
}


