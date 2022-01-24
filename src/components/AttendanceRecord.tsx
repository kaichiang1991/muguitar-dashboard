import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { sortCourseListState, teacherListState } from '../recoil'
import DashboardBlock from './common/DashboardBlock'

// 定義欄位
const columns: ColumnsType<Object> = [
  { title: '老師', dataIndex: 'teacher', width: 150 },
  { title: '學生', dataIndex: 'student', width: 150 },
  { title: '日期', dataIndex: 'date' },
]

const AttendanceRecord: FC = () => {
  const courses: Array<ICourseData> = useRecoilValue(sortCourseListState)
  const teachers: Array<ITeacherData> = useRecoilValue(teacherListState)

  return (
    <DashboardBlock title='出席紀錄'>
      <Table
        columns={columns}
        dataSource={courses.map(({ key, teacherId, time, studentName }) => ({
          key,
          teacher: teachers.find(({ id }) => id === teacherId)?.name,
          student: studentName,
          date: time.format('MMMM DD YYYY, h:mm'),
        }))}
        pagination={{ pageSize: 5 }}
      ></Table>
    </DashboardBlock>
  )
}

export default AttendanceRecord
