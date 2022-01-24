/// <reference types="react-scripts" />

interface ILoginState {
  username: string
  password: string
}

interface IAttendenceData {
  key: string
  teacherId: number
  studentId: number
  date: moment.Moment
}

interface ICourseData {
  key: number
  teacherId: number
  studentName: string
  subject: string
  time: moment.Moment
}

interface ITeacherData {
  id: number
  name: string
  salary: number
  subjects: string
}

interface IStudentData {
  id: number
  name: string
  comment?: string
  teacher_id: number
}

interface IStudentCourseData {
  key: number
  studentId: number
  courseId: number
}
