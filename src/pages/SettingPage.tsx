import {
  MoneyCollectOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import StudentEditList from '../components/StudentEditList'
import TeacherEditList from '../components/TeacherEditList'

const StyledSettingPageContainer = styled.div``
const StyledRow = styled(Row)``
const StyledInputGroup = styled(Input.Group)`
  .ant-input-affix-wrapper {
    width: 30%;
    margin-right: 20px;
  }
`

interface Props {}

const SettingPage = (props: Props) => {
  return (
    <>
      <TeacherEditList />
      <StudentEditList />
    </>
  )
}

export default SettingPage
