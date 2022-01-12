import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'

const columns: ColumnsType<Object> = [
  { title: '老師', dataIndex: 'name', width: 150 },
  { title: '學生', dataIndex: 'student', width: 150 },
  { title: '日期', dataIndex: 'date' },
]
interface Props {}

const useAttendanceRecord: { (): Array<Object> } = () => {
  const [arr, setArr] = useState<Array<Object>>([])
  useEffect(() => {
    // ToDo 取得 server 資料
    const data = Array(30)
      .fill(1)
      .map((_, index) => ({
        key: nanoid(),
        name: `Eric ${index}`,
        date: `2021/01/${(index + 1) % 31}`,
        student: `Student ${index}`,
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
      pagination={{ pageSize: 3 }}
    ></Table>
  )
}

export default AttendanceRecord
