import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { teacherListState } from '../recoil'
import DashboardBlock from './common/DashboardBlock'

const columns: ColumnsType<Object> = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '科目', dataIndex: 'subjects' },
]

const StyledTeacherListContainer = styled.div``

const TeacherList = () => {
  const teacherList: Array<ITeacherData> = useRecoilValue(teacherListState)

  return (
    <DashboardBlock title='老師清單'>
      <StyledTeacherListContainer>
        <Table columns={columns} dataSource={teacherList} />
      </StyledTeacherListContainer>
    </DashboardBlock>
  )
}

export default TeacherList
