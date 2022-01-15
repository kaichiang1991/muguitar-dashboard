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
  key: number
  name: string
  salary: number
  subjects: string
}

interface IStudentData {
  key: number
  name: string
  subjects: string
}

interface IStudentCourseData {
  key: number
  studentId: number
  courseId: number
}
