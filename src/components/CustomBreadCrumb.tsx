import Icon from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import menuData from '../data/menu'

type IconType = typeof Icon

interface IBreadCrumbItem {
  name: string
  Icon: IconType
}

interface IBreadCrumbMap {
  [key: string]: IBreadCrumbItem
}

// 根據 menu 定義去定義 breadcrumb 的屬性
const breadcrumbNameMap: IBreadCrumbMap = {}
menuData.map(({ name, to, IconElement }) => {
  breadcrumbNameMap[to] = { name, Icon: IconElement }
})

const StyledBreadCrumbContainer = styled(Breadcrumb)`
  margin-bottom: 8px;
  .anticon {
    margin-right: 4px;
  }
`

const CustomBreadCrumb = () => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url: string = `/${pathSnippets.slice(0, index + 1).join('/')}`
    const { name, Icon }: IBreadCrumbItem = breadcrumbNameMap[url]

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          <Icon />
          {name}
        </Link>
      </Breadcrumb.Item>
    )
  })

  return (
    <StyledBreadCrumbContainer>{breadcrumbItems}</StyledBreadCrumbContainer>
  )
}

export default CustomBreadCrumb
