import { Col, Divider } from 'antd'
import React, { FC, ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

const DashboardBlock: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Divider orientation='left'>{title}</Divider>
      <Col span={24}>{children}</Col>
    </>
  )
}

export default DashboardBlock
