import moment from 'moment'

interface IAttendenceData {
  teacher: string
  student: string
  date: moment.Moment
}

export const record: Array<IAttendenceData> = [
  {
    teacher: 'Kai',
    student: '囧',
    date: moment([2022, 0, 12, 20, 0]),
  },
  {
    teacher: 'Kai',
    student: 'Banting',
    date: moment([2022, 0, 12, 10, 0]),
  },
  {
    teacher: 'Run',
    student: 'A',
    date: moment([2022, 0, 10, 8]),
  },
  {
    teacher: 'Ray',
    student: 'B',
    date: moment().year(2022).month(1).date(5),
  },
]
