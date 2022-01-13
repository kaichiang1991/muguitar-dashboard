import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { sortAttendRecordState } from '../recoil'

// 定義欄位
const columns: ColumnsType<Object> = [
  { title: '老師', dataIndex: 'teacher', width: 150 },
  { title: '學生', dataIndex: 'student', width: 150 },
  { title: '日期', dataIndex: 'date' },
]

const AttendanceRecord: FC = () => {
  const records = useRecoilValue(sortAttendRecordState)

  return (
    <Table
      columns={columns}
      dataSource={records.map(data => ({
        ...data,
        date: data.date.format('MMMM Do YYYY, h:mm'),
      }))}
      pagination={{ pageSize: 5 }}
    ></Table>
  )
}

export default AttendanceRecord
