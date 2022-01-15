import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { studentListState } from '../recoil'
import DashboardBlock from './common/DashboardBlock'

const columns: ColumnsType<Object> = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '學習科目',
    dataIndex: 'subjects',
  },
]

const StyledStudentListContainer = styled.div``

const StudentList = () => {
  const studentList: Array<IStudentData> = useRecoilValue(studentListState)

  return (
    <DashboardBlock title='學生清單'>
      <StyledStudentListContainer>
        <Table columns={columns} dataSource={studentList} />
      </StyledStudentListContainer>
    </DashboardBlock>
  )
}

export default StudentList
