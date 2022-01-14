import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

const records: Array<IAttendenceData> = [
  {
    key: 'data0',
    teacher: '002',
    student: '000',
    date: moment([2022, 0, 12, 20, 0]), // 2022-1-12, 20:00
  },
  {
    key: 'data1',
    teacher: '002',
    student: '001',
    date: moment([2022, 0, 12, 10, 0]), // 2022-1-12, 10:00
  },
  {
    key: 'data2',
    teacher: '000',
    student: '002',
    date: moment([2022, 0, 10, 8]), // 2022-1-10, 8:00
  },
  {
    key: 'data3',
    teacher: '001',
    student: '000',
    date: moment().year(2022).month(1).date(5).hour(15).minute(0), // 2022-2-5, 15:00
  },
]

export default records
