import { Layout, Menu, Row, Col, MenuTheme, MenuItemProps, message } from 'antd'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import menuData, { brandDef, IMenuObj } from '../../data/menu'
import { useHistory, useLocation } from 'react-router-dom'

//#region Logo
const StyledLogoContainer = styled(Row)`
  color: #fff;
  font-size: 20px;
  margin: 8px 0;
`

const StyledCol = styled(Col)`
  text-align: center;
`

interface ISiderLogoProps {
  isCollapsed: boolean
}

const SiderLogo: FC<ISiderLogoProps> = ({ isCollapsed }) => {
  const [spanArr, setSpanArr] = useState<Array<number>>([])
  const [logoSpan, textSpan] = spanArr
  // 控制Sider縮放時，logo 的顯示
  useEffect(() => {
    setSpanArr(isCollapsed ? [24, 0] : [4, 20])
  }, [isCollapsed, setSpanArr])

  const { Icon, name } = brandDef
  return (
    <StyledLogoContainer>
      <StyledCol span={logoSpan}>
        <Icon />
      </StyledCol>
      <StyledCol span={textSpan}>{name}</StyledCol>
    </StyledLogoContainer>
  )
}
//#endregion Logo

//#region SiderItem
const StyledItemContainer = styled(Menu.Item)``

interface ISiderItemProps extends MenuItemProps {
  name: string
  to: string
}

const SiderItem: FC<ISiderItemProps> = ({ name, to, ...props }) => {
  const history = useHistory()
  const handleClick = () => {
    history.push(to)
  }

  return (
    <StyledItemContainer {...props} onClick={handleClick}>
      {name}
    </StyledItemContainer>
  )
}
//#endregion SiderItem

//#region AppSider
const StyledAppSider = styled(Layout.Sider)``

interface Props {
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

const AppSider: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const [selectKeys, setSelectKeys] = useState<Array<string>>([])

  const { pathname } = useLocation()
  useEffect(() => {
    const match: IMenuObj | undefined = menuData.find(
      menu => menu.to === pathname
    )

    if (!match) {
      message.error('路徑錯誤，請重新整理')
      return
    }

    setSelectKeys([match.key])
  }, [menuData, pathname])

  return (
    <StyledAppSider
      theme={theme}
      breakpoint='md'
      trigger={null}
      onCollapse={(flag: boolean) => setIsCollapsed(flag)}
      collapsible
      collapsed={isCollapsed}
    >
      <SiderLogo isCollapsed={isCollapsed} />
      <Menu theme={theme} selectedKeys={selectKeys}>
        {menuData.map(({ IconElement, name, ...props }) => (
          <SiderItem {...props} name={name} icon={<IconElement />} />
        ))}
      </Menu>
    </StyledAppSider>
  )
}

export default AppSider
//#endregion AppSider
