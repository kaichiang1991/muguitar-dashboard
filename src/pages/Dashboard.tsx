import { Col, Row } from 'antd'
import styled from 'styled-components'
import AttendanceRecord from '../components/AttendanceRecord'
import { useReloadAttendence } from '../components/common/CustomHook'

const StyledRow = styled(Row)``

interface Props {}

const Dashboard = (props: Props) => {
  useReloadAttendence()

  return (
    <StyledRow>
      <Col span={24}>
        <h2>出席紀錄</h2>
      </Col>
      <Col span={24}>
        <AttendanceRecord />
      </Col>
    </StyledRow>
  )
}

export default Dashboard
