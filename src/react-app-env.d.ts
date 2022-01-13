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
