import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout } from 'antd'
import { createElement, Dispatch, FC, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { ILoginState, loginState } from '../../recoil'

//#region UserInfo
interface IUserInfoProps {}

const StyledUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;

  p {
    margin: 0;
  }

  a {
    color: #333;
    border-left: 1px solid #000;
    padding-left: 8px;
    margin-left: 8px;
  }

  a:hover {
    color: #1890ff;
  }
`

const StyledUserInfo = styled.div`
  margin-left: 8px;
`

const UserInfo: FC<IUserInfoProps> = ({}) => {
  const { username }: ILoginState = useRecoilValue(loginState)

  return (
    <StyledUserInfoContainer>
      <BellOutlined />
      <StyledUserInfo>
        您好，{username}
        <Link to='/login'>登出</Link>
      </StyledUserInfo>
    </StyledUserInfoContainer>
  )
}

//#endregion UserInfo

//#region AppHeader
const StyledAppHeader = styled(Layout.Header)`
  background-color: #fff;
  padding-left: 12px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
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
      <UserInfo />
    </StyledAppHeader>
  )
}

//#endregion AppHeader
export default AppHeader
