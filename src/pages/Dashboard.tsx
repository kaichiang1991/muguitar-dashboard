import { Row } from 'antd'
import styled from 'styled-components'
import AttendanceRecord from '../components/AttendanceRecord'
import { useLoadDataOnce, useReloadData } from '../components/common/CustomHook'
import StudentList from '../components/StudentList'
import TeacherList from '../components/TeacherList'

const StyledRow = styled(Row)``

interface Props {}

const Dashboard = (props: Props) => {
  useLoadDataOnce()
  useReloadData()

  return (
    <StyledRow>
      <AttendanceRecord />
      <TeacherList />
      <StudentList />
    </StyledRow>
  )
}

export default Dashboard
