import { message, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { sortCourseListState, teacherListState } from '../recoil'
import { eErrorCode, IResponseData, request } from '../server'
import DashboardBlock from './common/DashboardBlock'

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

// 定義欄位
const columns: ColumnsType<Object> = [
  { title: '老師', dataIndex: 'teacher', width: 150 },
  { title: '學生', dataIndex: 'student', width: 150 },
  { title: '日期', dataIndex: 'date' },
]

const AttendanceRecord: FC = () => {
  // const courses: Array<ICourseData> = useRecoilValue(sortCourseListState)
  const teachers: Array<ITeacherData> = useRecoilValue(teacherListState)

  const [courses, setCourses] = useState<Array<Object>>([])
  useEffect(() => {
    ;(async () => {
      const { code, data }: IResponseData = await request(
        '/api/find/course/withTeacher'
      )
      if (code < eErrorCode.success) {
        message.error(`找所有出席紀錄錯誤 ${code}`)
        return
      }

      const newTableDataSource: Array<Object> = data.map(
        (_data: ICourseWithTeacher) => {
          const {
            id: key,
            time,
            Student: {
              name: student,
              Teacher: { name: teacher },
            },
          } = _data
          const date: moment.Moment = moment(time)
          return { key, teacher, student, date }
        }
      )

      // 從最後的排到最前的
      const sortFn = (a: any, b: any): number =>
        a['date'].isBefore(b['date']) ? 1 : -1

      setCourses(
        newTableDataSource.sort(sortFn).map((data: any) => ({
          ...data,
          date: data['date'].format('YYYY-MM-DD, hh:mm'),
        }))
      )
    })()
  }, [setCourses])

  return (
    <DashboardBlock title='出席紀錄'>
      <Table
        columns={columns}
        dataSource={courses}
        pagination={{ pageSize: 5 }}
      ></Table>
    </DashboardBlock>
  )
}

export default AttendanceRecord
