import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { createElement, Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

const StyledAppHeader = styled(Layout.Header)`
  background-color: #fff;
  padding-left: 12px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

const AppHeader: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <StyledAppHeader>
      {createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => setIsCollapsed(!isCollapsed),
      })}
      <div>111</div>
    </StyledAppHeader>
  )
}

export default AppHeader
