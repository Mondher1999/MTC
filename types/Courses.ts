export interface LiveCourses {
    
  courseName: string;
  description: string;
  meetingLink: string;
  instructorName: string;
  date: string;
  startTime: string;
  endTime: string;
  startTimeChina?: string;
  endTimeChina?: string;
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


