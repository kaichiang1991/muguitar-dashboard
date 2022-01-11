import { Layout } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import AppHeader from './AppHeader'
import AppSider from './AppSider'

const StyledLayout = styled(Layout)`
  min-height: 100vh;
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
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </StyledLayout>
  )
}

export default DefaultLayout