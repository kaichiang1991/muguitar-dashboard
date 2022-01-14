import { Row } from 'antd'
import styled from 'styled-components'
import AttendanceRecord from '../components/AttendanceRecord'
import {
  useLoadDataOnce,
  useReloadAttendence,
} from '../components/common/CustomHook'
import StudentList from '../components/StudentList'
import TeacherList from '../components/TeacherList'

const StyledRow = styled(Row)``

interface Props {}

const Dashboard = (props: Props) => {
  useLoadDataOnce()
  useReloadAttendence()

  return (
    <StyledRow>
      <AttendanceRecord />
      <TeacherList />
      <StudentList />
    </StyledRow>
  )
}

export default Dashboard
