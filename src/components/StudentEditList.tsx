import { UserOutlined } from '@ant-design/icons'
import { Button, Col, Input, message, Select, Space } from 'antd'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { teacherListState } from '../recoil'
import { eErrorCode, IResponseData, request } from '../server'
import DashboardBlock from './common/DashboardBlock'

const { Option } = Select

interface Props {}

const StudentEditList = (props: Props) => {
  const [name, setName] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const teacherList: Array<ITeacherData> = useRecoilValue(teacherListState)
  const [teacherName, setTeacherName] = useState(teacherList[0]?.name)

  const handleNewStudent = async () => {
    if (!name || !teacherName) {
      message.warn('資料不完全')
      return
    }

    const { code }: IResponseData = await request('/api/student', 'POST', {
      data: {
        name,
        comment,
        teacher_name: teacherName,
      },
    })

    if (code < eErrorCode.success) {
      message.error('新增學生回傳失敗' + code)
      return
    }

    message.success(`新增 ${name} 成功`)
  }

  return (
    <DashboardBlock title={'新增學生'}>
      <Col offset={2} span={22}>
        <Space>
          <Input
            placeholder='姓名'
            prefix={<UserOutlined />}
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <Select
            onSelect={(value: string) => setTeacherName(value)}
            value={teacherName}
          >
            {teacherList.map(({ id, name }) => (
              <Option key={id} value={name}>
                {name}
              </Option>
            ))}
          </Select>
          <Input.TextArea
            rows={1}
            value={comment}
            onChange={({ target: { value } }) => setComment(value)}
          />
          <Button type='primary' onClick={handleNewStudent}>
            新增
          </Button>
        </Space>
      </Col>
    </DashboardBlock>
  )
}

export default StudentEditList
