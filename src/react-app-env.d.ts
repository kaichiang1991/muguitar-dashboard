/// <reference types="react-scripts" />

interface ILoginState {
  username: string
  password: string
}

interface IAttendenceData {
  key: string
  teacherId: number
  student: string
  date: moment.Moment
}

interface ITeacherData {
  key: number
  name: string
  salary: number
}

interface IStudentData {
  key: string
  subjects: Array<eSubjectMap>
}
