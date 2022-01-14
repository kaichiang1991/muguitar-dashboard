import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { sortAttendRecordState, teacherListState } from '../recoil'
import DashboardBlock from './common/DashboardBlock'

// 定義欄位
const columns: ColumnsType<Object> = [
  { title: '老師', dataIndex: 'teacher', width: 150 },
  { title: '學生', dataIndex: 'student', width: 150 },
  { title: '日期', dataIndex: 'date' },
]

const AttendanceRecord: FC = () => {
  const records: Array<IAttendenceData> = useRecoilValue(sortAttendRecordState)
  const teachers: Array<ITeacherData> = useRecoilValue(teacherListState)

  return (
    <DashboardBlock title='出席紀錄'>
      <Table
        columns={columns}
        dataSource={records.map(data => ({
          ...data,
          teacher: teachers.find(({ key }) => key === data.teacherId)?.name,
          date: data.date.format('MMMM Do YYYY, h:mm'),
        }))}
        pagination={{ pageSize: 5 }}
      ></Table>
    </DashboardBlock>
  )
}

export default AttendanceRecord
