import { Breadcrumb, Layout } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import CustomBreadCrumb from '../CustomBreadCrumb'
import AppHeader from './AppHeader'
import AppSider from './AppSider'

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`

const StyledLayoutContent = styled(Layout.Content)`
  padding-left: 8px;
  padding-top: 4px;
`

const DefaultLayout: React.FC = ({ children }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false)

  return (
    <StyledLayout>
      <AppSider
        isCollapsed={siderCollapsed}
        setIsCollapsed={setSiderCollapsed}
      />
      <Layout>
        <AppHeader
          isCollapsed={siderCollapsed}
          setIsCollapsed={setSiderCollapsed}
        />
        <StyledLayoutContent>
          <CustomBreadCrumb />
          {children}
        </StyledLayoutContent>
      </Layout>
    </StyledLayout>
  )
}

export default DefaultLayout
