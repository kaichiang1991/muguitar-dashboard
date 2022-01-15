import moment from 'moment'
import { eCourseType } from '../data/enums'

const courses: Array<ICourseData> = [
  {
    key: 0,
    teacherId: 0,
    subject: eCourseType.guitar,
    time: moment([2022, 0, 1, 8]),
    studentName: '測試學生Ａ',
  },
  {
    key: 1,
    teacherId: 0,
    subject: eCourseType.mixing,
    time: moment([2022, 0, 16, 12]),
    studentName: '測試學生Ｂ',
  },
  {
    key: 2,
    teacherId: 1,
    subject: eCourseType.guitar,
    time: moment([2022, 0, 5, 16]),
    studentName: '測試學生Ａ',
  },
  {
    key: 3,
    teacherId: 2,
    subject: eCourseType.e_guitar,
    time: moment([2022, 0, 5, 7]),
    studentName: '測試學生Ｃ',
  },
]

export default courses
