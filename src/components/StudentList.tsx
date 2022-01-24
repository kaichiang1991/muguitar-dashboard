import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { studentListState, teacherListState } from '../recoil'
import DashboardBlock from './common/DashboardBlock'

const columns: ColumnsType<Object> = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '老師',
    dataIndex: 'teacher_name',
  },
  {
    title: '備註',
    dataIndex: 'comment',
  },
]

const StyledStudentListContainer = styled.div``

const StudentList = () => {
  const studentList: Array<IStudentData> = useRecoilValue(studentListState)
  const teacherList: Array<ITeacherData> = useRecoilValue(teacherListState)
  const useStudentList = studentList.map(student => ({
    ...student,
    teacher_name: teacherList.find(({ id }) => id === student.teacher_id)?.name,
  }))

  return (
    <DashboardBlock title='學生清單'>
      <StyledStudentListContainer>
        <Table columns={columns} dataSource={useStudentList} />
      </StyledStudentListContainer>
    </DashboardBlock>
  )
}

export default StudentList
