import {
  UserOutlined,
  MoneyCollectOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, InputNumber, message, Space } from 'antd'
import React, { useState } from 'react'
import { eErrorCode, IResponseData, request } from '../server'
import DashboardBlock from './common/DashboardBlock'

interface Props {}

const TeacherEditList = (props: Props) => {
  const [name, setName] = useState<string>('')
  const [salary, setSalary] = useState<number>()
  const [subjects, setSubjects] = useState<string>('')

  const handleNewTeacher = async () => {
    if (!name || !salary || !subjects) {
      message.warn('資料不完全')
      return
    }

    const { code }: IResponseData = await request('/api/teacher', 'POST', {
      data: {
        name,
        salary,
        subjects,
      },
    })

    if (code < eErrorCode.success) {
      message.error('新增教師回傳失敗' + code)
      return
    }

    message.success(`新增 ${name} 成功`)
  }

  return (
    <DashboardBlock title={'新增教師'}>
      <Col offset={2} span={22}>
        <Space>
          <Input
            placeholder='姓名'
            prefix={<UserOutlined />}
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <InputNumber
            placeholder='薪資'
            prefix={<MoneyCollectOutlined />}
            controls={false}
            value={salary}
            onChange={value => setSalary(value)}
          />
          <Input
            placeholder='科目介紹'
            prefix={<UnorderedListOutlined />}
            value={subjects}
            onChange={({ target: { value } }) => setSubjects(value)}
          />
          <Button type='primary' onClick={handleNewTeacher}>
            新增
          </Button>
        </Space>
      </Col>
    </DashboardBlock>
  )
}

export default TeacherEditList
