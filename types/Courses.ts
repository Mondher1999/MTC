export interface LiveCourses {
  _id: string;
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
  _id: string;
  id?: string; // Make optional since MongoDB uses _id
  courseName: string;
  description: string;
  videoFile: string; // path or URL of the uploaded video
  instructorName: string;
  instructorId?: string;
  duration: string;
  category: string;
  recordingDate: string;
  selectedStudents: string[];
  
  // Additional fields that your backend adds
  videoFileSize?: number;
  videoFileOriginalName?: string;
  videoFileMimetype?: string;
  
  // MongoDB default fields
  createdAt?: Date | string;
  updatedAt?: Date | string;
  __v?: number;
}
