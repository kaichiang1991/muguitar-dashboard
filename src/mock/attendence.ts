import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

export const record: Array<IAttendenceData> = [
  {
    key: 'data0',
    teacher: 'Kai',
    student: '囧',
    date: moment([2022, 0, 12, 20, 0]), // 2022-1-12, 20:00
  },
  {
    key: 'data1',
    teacher: 'Kai',
    student: 'Banting',
    date: moment([2022, 0, 12, 10, 0]), // 2022-1-12, 10:00
  },
  {
    key: 'data2',
    teacher: 'Run',
    student: 'A',
    date: moment([2022, 0, 10, 8]), // 2022-1-10, 8:00
  },
  {
    key: 'data3',
    teacher: 'Ray',
    student: 'B',
    date: moment().year(2022).month(1).date(5).hour(15).minute(0), // 2022-2-5, 15:00
  },
]
