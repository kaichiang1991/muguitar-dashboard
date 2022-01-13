import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { record } from '../mock/attendence'

// 定義欄位
const columns: ColumnsType<Object> = [
  { title: '老師', dataIndex: 'teacher', width: 150 },
  { title: '學生', dataIndex: 'student', width: 150 },
  { title: '日期', dataIndex: 'date' },
]
interface Props {}

// ToDo 從 server 拿
// 取得出席紀錄
const useAttendanceRecord: { (): Array<Object> } = () => {
  const [arr, setArr] = useState<Array<Object>>([])
  useEffect(() => {
    const data = record.map(({ teacher, student, date }) => ({
      key: nanoid(),
      teacher,
      student,
      date: date.format('YYYY-MM-DD'),
    }))
    setArr(data)
  }, [setArr])

  return arr
}

const AttendanceRecord = (props: Props) => {
  const data = useAttendanceRecord()
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
    ></Table>
  )
}

export default AttendanceRecord
