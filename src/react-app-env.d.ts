/// <reference types="react-scripts" />

interface ILoginState {
  account: string
  password: string
  username: string
  teacher_id: number
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

interface ICourseWithTeacher {
  id: number
  student_id: number
  subject: string
  time: string
  Student: {
    name: string
    Teacher: {
      id: number
      name: string
    }
  }
}

interface ICourseTableData {
  id: number
  teacher: string
  student: string
  date: moment.Moment
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
