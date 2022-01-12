import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AttendanceRecord from '../components/AttendanceRecord'

const StyledRow = styled(Row)``

interface Props {}

const Dashboard = (props: Props) => {
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
