/// <reference types="react-scripts" />

interface ILoginState {
  username: string
  password: string
}

interface IAttendenceData {
  key: string
  teacher: string
  student: string
  date: moment.Moment
}

interface ITeacherData {
  key: string
  subjects: Array<eSubjectMap>
}

interface IStudentData {
  key: string
  subjects: Array<eSubjectMap>
}
