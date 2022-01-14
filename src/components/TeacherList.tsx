import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { subjectMapTitle, teacherNameMap } from '../data/constants'
import { teacherListState } from '../recoil'
import DashboardBlock from './common/DashboardBlock'

const columns: ColumnsType<Object> = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '科目', dataIndex: 'subjects' },
]

const StyledTeacherListContainer = styled.div``

const TeacherList = () => {
  const teacherList = useRecoilValue(teacherListState)
  const showTeacherList = teacherList.map(teacher => ({
    ...teacher,
    name: teacherNameMap[teacher.key],
    subjects: teacher.subjects.map(sub => subjectMapTitle[sub]).join(' / '),
  }))

  return (
    <DashboardBlock title='老師清單'>
      <StyledTeacherListContainer>
        <Table columns={columns} dataSource={showTeacherList} />
      </StyledTeacherListContainer>
    </DashboardBlock>
  )
}

export default TeacherList
