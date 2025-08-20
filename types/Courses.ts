export interface LiveCourses {
    
  courseName: string;
  description: string;
  meetingLink: string;
  instructorName: string;
  date: string;
  time: string;
  selectedStudents: string[];  
}

export interface NewRecordedCourse {
  courseName: String,
  description: String,
  videoLink: String,
  instructorName: String,
  duration: String,
  category  : String,
  recordingDate: String,
  selectedStudents:  string[];
}


